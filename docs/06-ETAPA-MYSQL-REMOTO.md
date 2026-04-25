# Etapa 06 - MySQL para Conexões Externas

## Objetivo

Configurar MySQL para aceitar conexões TCP de ferramentas externas como MySQL Workbench.

## 6.1 Entendendo o Problema

Por padrão, MySQL no Ubuntu escuta apenas em socket UNIX (local) ou 127.0.0.1. Isso impede conexões de:
- MySQL Workbench
- DBeaver
- Qualquer aplicação externa
- MySQL CLI de outros containers

## 6.2 Arquitetura de Conexões MySQL

```
┌─────────────────┐      SOCKET       ┌─────────────────┐
│  phpMyAdmin      │ ───────────────▶   │                 │
│  (mesmo host)    │                    │    MySQL        │
└─────────────────┘                    │                 │
        │                               │  localhost      │
        │ TCP:3306                      │  127.0.0.1      │
        ▼                               │                 │
┌─────────────────┐                     │                 │
│  Workbench      │ ───────────────▶    │                 │
│  (máquina host)  │                     │                 │
└─────────────────┘                     └─────────────────┘

PROBLEMA: Se bind-address=127.0.0.1, a seta TCP não funciona!
```

## 6.3 Configurações Necessárias

### 6.3.1 bind-address = 0.0.0.0

**Arquivo:** `/etc/mysql/mysql.conf.d/mysqld.cnf`

```ini
[mysqld]
bind-address = 0.0.0.0
```

**No Dockerfile:**
```dockerfile
RUN sed -i 's/bind-address.*=.*127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
```

### 6.3.2 Usuário para Conexões Remotas

O MySQL tem autenticação por host. root@localhost só aceita conexões locais.

```sql
-- Criar usuário que aceita conexões de qualquer host (%)
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

**Hosts MySQL:**
| Host | Significado |
|------|-------------|
| localhost | Conexão via socket UNIX |
| 127.0.0.1 | Conexão TCP localhost |
| % | Qualquer host (remoto) |

### 6.3.3 Plugin de Autenticação

MySQL 8.x usa `caching_sha2_password` por padrão, que pode causar problemas com clientes antigos.

```sql
-- Forçar mysql_native_password
CREATE USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
```

## 6.4 entrypoint.sh Completo

```bash
#!/bin/bash

# phpMyAdmin link
ln -sf /usr/share/phpmyadmin /var/www/html/phpmyadmin

# Config phpMyAdmin
cat > /etc/phpmyadmin/config-db.php << 'EOF'
<?php
$dbuser='root';
$dbpass='root';
$dbserver='127.0.0.1';
$dbport='3306';
EOF

cat > /etc/phpmyadmin/conf.d/override.php << 'EOF'
<?php
$cfg['Servers'][$i]['host'] = '127.0.0.1';
$cfg['Servers'][$i]['socket'] = '';
$cfg['Servers'][$i]['connect_type'] = 'tcp';
EOF

# MySQL dirs
mkdir -p /var/run/mysqld
chown -R mysql:mysql /var/run/mysqld /var/lib/mysql

# Initialize if no data
if [ ! -f "/var/lib/mysql/mysql.ibd" ]; then
    echo "Inicializando MySQL..."
    mysqld --initialize-insecure --user=mysql
fi

# Start MySQL for config
if [ ! -f "/var/lib/mysql/.password_set" ]; then
    echo "Iniciando MySQL..."
    mysqld --user=mysql &
    MYSQL_PID=$!
    
    # Wait for MySQL ready
    for i in {1..30}; do
        if mysql -u root -e "SELECT 1" >/dev/null 2>&1; then
            break
        fi
        sleep 1
    done
    
    echo "Configurando MySQL..."
    
    # root@localhost
    mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';"
    
    # root@'%' para conexões remotas
    mysql -u root -proot -e "CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';"
    mysql -u root -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;"
    
    # phpMyAdmin database
    mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS phpmyadmin;"
    mysql -u root -proot phpmyadmin < /usr/share/phpmyadmin/sql/create_tables.sql
    mysql -u root -proot -e "GRANT ALL PRIVILEGES ON phpmyadmin.* TO 'root'@'localhost'; FLUSH PRIVILEGES;"
    
    touch /var/lib/mysql/.password_set
    kill $MYSQL_PID
    sleep 2
    echo "MySQL configurado"
fi

# Start Node.js
nohup node /var/www/html/server.js > /var/log/node.log 2>&1 &
sleep 2

exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
```

## 6.5 Verificar Configurações

### Ver usuários MySQL
```bash
docker exec super_xampp mysql -u root -proot -e "SELECT user, host, plugin FROM mysql.user;"
```

**Saída esperada:**
```
user    host    plugin
root    %       mysql_native_password
root    localhost       mysql_native_password
```

### Ver bind-address
```bash
docker exec super_xampp grep bind /etc/mysql/mysql.conf.d/mysqld.cnf
```

**Saída esperada:**
```
bind-address = 0.0.0.0
```

### Testar TCP interno
```bash
docker exec super_xampp mysql -h 127.0.0.1 -u root -proot -e "SELECT 'OK'"
```

### Testar TCP externo (host)
```bash
powershell Test-NetConnection localhost -Port 3306
```

## 6.6 Conectar MySQL Workbench

### Passo a Passo

1. **Abrir MySQL Workbench**
2. **Clique em "New Connection"** (ícone +)
3. **Configurar:**
   - Connection Name: `Super XAMPP`
   - Hostname: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: `root` (clique em "Store in Vault")
4. **Testar Connection**
5. **OK**

### Troubleshooting Workbench

| Erro | Solução |
|------|---------|
| Can't connect to MySQL server | Verificar se porta 3306 está exposta no docker-compose |
| Access denied | Verificar usuário root@'%' existe |
| Plugin not supported | Verificar mysql_native_password |

### Teste via CMD

```cmd
mysql -h localhost -P 3306 -u root -proot -e "SELECT 1"
```

Se MySQL client instalado no Windows.

## 6.7 Volumes e Persistência

```yaml
volumes:
  - ./mysql_data:/var/lib/mysql
```

**Atenção:** Se mudar configuração de usuário, pode ser necessário limpar o volume:

```bash
docker volume rm xampp_server_mysql_data
docker-compose down
docker-compose up -d
```

## Checklist

- [ ] bind-address = 0.0.0.0
- [ ] root@'%' criado
- [ ] mysql_native_password
- [ ] Port 3306 exposta no docker-compose
- [ ] Workbench conecta

## Próximo Passo

[07-CHECKLIST.md](07-CHECKLIST.md)