#!/bin/bash

ln -sf /usr/share/phpmyadmin /var/www/html/phpmyadmin

cat > /etc/phpmyadmin/config-db.php << 'EOF'
<?php
$dbuser='root';
$dbpass='root';
$basepath='';
$dbname='phpmyadmin';
$dbserver='127.0.0.1';
$dbport='3306';
$dbtype='mysql';
EOF

cat > /etc/phpmyadmin/conf.d/override.php << 'EOF'
<?php
$cfg['Servers'][$i]['host'] = '127.0.0.1';
$cfg['Servers'][$i]['socket'] = '';
$cfg['Servers'][$i]['connect_type'] = 'tcp';
EOF

mkdir -p /var/run/mysqld
chown -R mysql:mysql /var/run/mysqld /var/lib/mysql

if [ ! -f "/var/lib/mysql/mysql.ibd" ]; then
    echo "Inicializando MySQL..."
    mysqld --initialize-insecure --user=mysql
fi
chown -R mysql:mysql /var/lib/mysql /var/run/mysqld

if [ ! -f "/var/lib/mysql/.password_set" ]; then
    echo "Iniciando MySQL..."
    mysqld --user=mysql &
    MYSQL_PID=$!
    
    for i in {1..30}; do
        if mysql -u root -e "SELECT 1" >/dev/null 2>&1; then
            break
        fi
        sleep 1
    done
    
    echo "Configurando MySQL..."
    mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';"
    mysql -u root -proot -e "CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';"
    mysql -u root -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;"
    mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS phpmyadmin;"
    mysql -u root -proot phpmyadmin < /usr/share/phpmyadmin/sql/create_tables.sql
    mysql -u root -proot -e "GRANT ALL PRIVILEGES ON phpmyadmin.* TO 'root'@'localhost'; FLUSH PRIVILEGES;"
    
    touch /var/lib/mysql/.password_set
    kill $MYSQL_PID
    sleep 2
    echo "MySQL configurado"
fi

nohup node /var/www/html/server.js > /var/log/node.log 2>&1 &
sleep 2

exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf