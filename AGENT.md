# Super XAMPP - Documentação de Desenvolvimento

## Objetivo

Criar uma imagem Docker "Super XAMPP" com todos os serviços necessários para desenvolvimento web local:
- Apache (porta 80)
- MySQL (porta 3306)
- Node.js (porta 3000)
- Tomcat (porta 8080)
- phpMyAdmin

## Requisitos

- Ubuntu 22.04 como base
- MySQL 8.x
- Node.js 24.x
- Tomcat 11.x
- phpMyAdmin com auto-login (root/root)
- Todos serviços startando automaticamente via supervisord

## Decisões Técnicas

### Stack
- **Base**: Ubuntu 22.04
- **MySQL**: 8.x (via apt do Ubuntu)
- **Node.js**: 24.x (NodeSource)
- **Tomcat**: 11.0.21 (download direto)
- **PHP**: 8.x (via apt)
- **Supervisor**: gerencia serviços

### MySQL

#### Problema Inicial
MySQL não iniciava corretamente. Tentativas de solução:

1. **Tentativa**: Inicializar com `mysqld --initialize-insecure` e configurar senha durante entrypoint
   - **Problema**: MySQL travava em loop de restart pelo supervisord

2. **Tentativa**: Não tentar configurar senha no entrypoint, deixar socket sem senha
   - **Resultado**: Funciona! MySQL inicializa sem senha, acesso via socket funciona

#### Solução Final
- MySQL inicializa sem senha (`--initialize-insecure`)
- Acesso funciona via socket: `mysql -u root`
- phpMyAdmin configurado para usar TCP 127.0.0.1

### phpMyAdmin

#### Problemas
1. Symlink sobrescrito pelo volume mount
   - **Solução**: Criar symlink no entrypoint DEPOIS do volume

2. Conexão via socket falhava (permissões)
   - **Solução**: Usar TCP (127.0.0.1) em vez de socket

#### Configuração
```php
$cfg['Servers'][$i]['host'] = '127.0.0.1';
$cfg['Servers'][$i]['socket'] = '';
```

### Node.js

#### Problema
- supervisord não conseguia iniciar Node.js (exit status 1)
- **Solução**: Iniciar no entrypoint ANTES do supervisord

```bash
nohup node /var/www/html/server.js > /var/log/node.log 2>&1 &
```

### Volumes

- `A:/Htdocs` → Apache document root
- `mysql_data` → dados MySQL (persistência)
- `tomcat_webapps` → apps Tomcat

## Estrutura de Arquivos

```
xampp_server/
├── config/
│   ├── entrypoint.sh        # Init script
│   ├── my.cnf             # MySQL config
│   ├── server.js          # Node.js server
│   ├── supervisord.conf   # Supervisor config
│   ├── sql-scripts/
│   │   └── init.sql
│   ├── test_mysql.php
│   ├── phpmyadmin-config.php
│   └── phpmyadmin-override.php
├── htdocs/
│   └── index.html
├── tomcat_webapps/
│   └── ROOT/
│       └── index.jsp
├── mysql_data/           # Dados MySQL
├── Dockerfile
└── docker-compose.yml
```

## Comandos Úteis

### Build
```bash
docker-compose build
```

### Start
```bash
docker-compose up -d
```

### Logs
```bash
docker logs super_xampp
```

### Acessar
```bash
docker exec -it super_xampp bash
```

### MySQL
```bash
docker exec super_xampp mysql -u root
```

## Histórico de Mudanças

### v1.0.0 (2026-04-24)
- Imagem funcional com todos os serviços
- Estrutura reorganizada em pastas `config/`, `htdocs/`, `tomcat_webapps/`
- docker-compose.yml corrigido com caminhos absolutos

## To-Do

- [ ] Configurar MySQL com senha TCP (atualmente só socket)
- [ ] Adicionar mais apps exemplo
- [ ] Configurar SSL/HTTPS
- [ ] Adicionar Redis