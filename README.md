# Super XAMPP

Uma imagem Docker completa com Apache, MySQL, Node.js, Tomcat e phpMyAdmin.

## Serviços

| Serviço      | Porta | URL                              |
|-------------|------|----------------------------------|
| Apache      | 80   | http://localhost                |
| MySQL       | 3306 | localhost:3306               |
| Node.js     | 3000 | http://localhost:3000       |
| Tomcat     | 8080 | http://localhost:8080       |
| phpMyAdmin | -    | http://localhost/phpmyadmin  |

## Credenciais

- **MySQL root**: `root` / `root`
- **phpMyAdmin**: `root` / `root`

## Estrutura

```
xampp_server/
├── config/              # Arquivos de configuração
│   ├── entrypoint.sh    # Script de inicialização
│   ├── my.cnf          # Configuração MySQL
│   ├── server.js       # Servidor Node.js
│   ├── supervisord.conf
│   ├── sql-scripts/
│   └── test_mysql.php
├── htdocs/             # Documentos Apache
├── tomcat_webapps/     # Aplicações Tomcat
├── mysql_data/         # Dados MySQL (persistidos)
├── Dockerfile
└── docker-compose.yml
```

## Uso Rápido

### Iniciar
```bash
docker-compose up -d
```

### Parar
```bash
docker-compose down
```

### Rebuild
```bash
docker-compose build
docker-compose up -d
```

### Acessar Container
```bash
docker exec -it super_xampp bash
```

### Testar MySQL
```bash
docker exec super_xampp mysql -u root -proot
```

## Volumes

- `A:/Htdocs` → `/var/www/html` (Apache)
- `./mysql_data` → `/var/lib/mysql` (MySQL)
- `./tomcat_webapps` → `/opt/tomcat/webapps` (Tomcat)

## Tecnologias

- Ubuntu 22.04
- Apache 2
- PHP 8.x
- MySQL 8.x
- Node.js 24.x
- Tomcat 11.x
- phpMyAdmin
- OpenJDK 21

## Configuração Automática

Na primeira execução, o entrypoint.sh configura automaticamente:
1. MySQL com senha root
2. Banco de dados phpMyAdmin
3. Tabelas internas do phpMyAdmin

## Histórico

Ver `AGENT.md` para histórico completo de desenvolvimento.