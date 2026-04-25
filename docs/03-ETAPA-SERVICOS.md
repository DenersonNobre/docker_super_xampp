# Etapa 03 - Configuração de Serviços

## Objetivo

Configurar cada serviço individualmente para funcionar corretamente no container.

## 3.1 Supervisor - Orquestrador de Processos

O Supervisor é essencial para rodar múltiplos serviços em foreground no Docker.

### Por que Supervisor?

- Docker containers precisam de processo principal (PID 1)
- Precisamos rodar Apache, MySQL, Tomcat simultaneamente
- Supervisor reinicia serviços automaticamente se morrerem

### config/supervisord.conf

```ini
[supervisord]
nodaemon=true

[program:apache2]
command=/usr/sbin/apachectl -D FOREGROUND
autostart=true
autorestart=true

[program:mysql]
command=/usr/sbin/mysqld
autostart=true
autorestart=true

[program:tomcat]
command=/opt/tomcat/bin/catalina.sh run
autostart=true
autorestart=true
```

**Importante:** Não usar `mysqld_safe` - ele conflita com o Supervisor.

## 3.2 Apache2

O Apache já vem configurado por padrão no Ubuntu. Apenas verificar:

```bash
# Habilitar módulo PHP
a2enmod php

# Habilitar site default
a2ensite 000-default.conf
```

### Configuração do site (opcional em /etc/apache2/sites-available)

```apache
<VirtualHost *:80>
    DocumentRoot /var/www/html
    
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## 3.3 MySQL

### config/my.cnf

```ini
[mysqld]
socket     = /var/run/mysqld/mysqld.sock
bind-address = 0.0.0.0
port       = 3306
```

**CRÍTICO:** `bind-address = 0.0.0.0` permite conexões TCP externas.

### Correção no Dockerfile

O Ubuntu tem configuração padrão em `/etc/mysql/mysql.conf.d/mysqld.cnf` que precisa ser alterada:

```dockerfile
RUN sed -i 's/bind-address.*=.*127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf \
    && sed -i 's/mysqlx-bind-address.*=.*127.0.0.1/mysqlx_bind_address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
```

## 3.4 Node.js API

### config/server.js

```javascript
const http = require('http');

const PORT = 3000;

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Node.js API</title>
    <!-- Bootstrap CSS -->
</head>
<body>
    <h1>Node.js API</h1>
    <!-- Endpoints list -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    
    if (u === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(HTML);
    } else if (u === '/api/status') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ status: 'online', uptime: Math.floor(process.uptime()), version: '1.0.0' }));
    } else if (u === '/api/time') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ timestamp: new Date().toISOString(), unix: Date.now() }));
    } else if (u === '/api/random') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ number: Math.floor(Math.random() * 1000) }));
    } else {
        res.writeHead(404, HEADERS);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
}).listen(PORT, () => console.log('Server on ' + PORT));
```

## 3.5 Tomcat

O Tomcat funciona out-of-the-box após extração. Não precisa de configuração adicional além das permissões.

```bash
# Verificar que está rodando
docker exec super_xampp ps aux | grep tomcat
```

### Acessar Manager App (opcional)

Editar `/opt/tomcat/conf/tomcat-users.xml` para adicionar usuários.

## 3.6 phpMyAdmin

O phpMyAdmin precisa de configuração customizada para funcionar corretamente:

### config/entrypoint.sh

```bash
# Criar link simbólico para Apache
ln -sf /usr/share/phpmyadmin /var/www/html/phpmyadmin

# Configurar conexão com MySQL
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
```

## Checklist

- [ ] Supervisor configurado com 3 programas
- [ ] Apache2 funcional
- [ ] MySQL com bind-address = 0.0.0.0
- [ ] Node.js API com endpoints
- [ ] Tomcat rodando
- [ ] phpMyAdmin configurado

## Próximo Passo

[04-ETAPA-INTERFACE.md](04-ETAPA-INTERFACE.md)