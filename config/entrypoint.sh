#!/bin/bash

# phpMyAdmin link and config
ln -sf /usr/share/phpmyadmin /var/www/html/phpmyadmin

cat > /etc/phpmyadmin/config-db.php << 'PHPEOF'
<?php
$cfg['blowfish_secret'] = 'super_xampp_secret_key_2024';
$dbuser='root';
$dbpass='root';
$basepath='';
$dbname='phpmyadmin';
$dbserver='127.0.0.1';
$dbport='3306';
$dbtype='mysql';
PHPEOF

cat > /etc/phpmyadmin/conf.d/override.php << 'PHPEOF'
<?php
$cfg['Servers'][$i]['host'] = '127.0.0.1';
$cfg['Servers'][$i]['socket'] = '';
$cfg['Servers'][$i]['connect_type'] = 'tcp';
// Auto-login config
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = 'root';
// Session settings
$cfg['LoginCookieValidity'] = 3600 * 24; // 24 hours
$cfg['SessionGC-maxlifetime'] = 3600 * 24;
PHPEOF

# MySQL directories
mkdir -p /var/run/mysqld
chown -R mysql:mysql /var/run/mysqld /var/lib/mysql

# Initialize only if no data
if [ ! -f "/var/lib/mysql/mysql.ibd" ]; then
    echo "Inicializando MySQL..."
    mysqld --initialize-insecure --user=mysql
fi
chown -R mysql:mysql /var/lib/mysql /var/run/mysqld

# Start node before supervisord
nohup node /var/www/html/server.js > /var/log/node.log 2>&1 &
sleep 2

exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf