# PROMPT 05 - Entrypoint Script

## Contexto

O entrypoint.sh executa na inicialização do container. Deve:
1. Configurar phpMyAdmin
2. Iniciar MySQL temporariamente
3. Definir senha root
4. Criar banco phpMyAdmin
5. Iniciar Supervisor

**Problema específico:** MySQL precisa estar rodando para ser configurado, mas o Supervisor só inicia depois do entrypoint. A solução é iniciar MySQL manualmente durante setup.

## Tarefa

### Criar config/entrypoint.sh:

```bash
#!/bin/bash

# 1. phpMyAdmin link e config
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

# 2. MySQL directories
mkdir -p /var/run/mysqld
chown -R mysql:mysql /var/run/mysqld /var/lib/mysql

# 3. Initialize se não existir dados
if [ ! -f "/var/lib/mysql/mysql.ibd" ]; then
    echo "Inicializando MySQL..."
    mysqld --initialize-insecure --user=mysql
fi
chown -R mysql:mysql /var/lib/mysql /var/run/mysqld

# 4. Start MySQL para configuração (só primeira vez)
if [ ! -f "/var/lib/mysql/.password_set" ]; then
    echo "Iniciando MySQL para configuração..."
    mysqld --user=mysql &
    MYSQL_PID=$!
    
    # Aguarda MySQL ficar pronto
    for i in {1..30}; do
        if mysql -u root -e "SELECT 1" >/dev/null 2>&1; then
            break
        fi
        sleep 1
    done
    
    echo "Configurando MySQL..."
    
    # root@localhost com senha
    mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';"
    
    # root@'%' para conexões remotas (Workbench)
    mysql -u root -proot -e "CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';"
    mysql -u root -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;"
    
    # Banco phpMyAdmin
    mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS phpmyadmin;"
    mysql -u root -proot phpmyadmin < /usr/share/phpmyadmin/sql/create_tables.sql
    mysql -u root -proot -e "GRANT ALL PRIVILEGES ON phpmyadmin.* TO 'root'@'localhost'; FLUSH PRIVILEGES;"
    
    # Marca como configurado
    touch /var/lib/mysql/.password_set
    
    # Para MySQL (Supervisor reiniciará)
    kill $MYSQL_PID
    sleep 2
    echo "MySQL configurado"
fi

# 5. Start Node.js
nohup node /var/www/html/server.js > /var/log/node.log 2>&1 &
sleep 2

# 6. Start Supervisor
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
```

### Tornar executável:
```bash
chmod +x config/entrypoint.sh
```

## Por Que These Decisões?

### mysqld --initialize-insecure
- Cria banco sem senha inicial (root@localhost sem senha)
- `--initialize-insecure` é necessário para não dar erro no container

### mysql_native_password
- MySQL 8.x usa `caching_sha2_password` por padrão
- Pode causar problemas com clientes antigos e Workbench
- `mysql_native_password` é mais compatível

### root@'%'
- MySQL autentica por HOST
- root@localhost só aceita conexões via socket
- root@'%' aceita conexões TCP de qualquer host

## Verificação

```bash
docker build -t test . && docker run --rm test ls -la /entrypoint.sh
# Deve mostrar o arquivo executável
```

## Próximo Passo

Ver [PROMPT-06-MYSQL.md](PROMPT-06-MYSQL.md)