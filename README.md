# Super XAMPP

Ambiente de desenvolvimento Docker completo com Apache, MySQL, Node.js, Tomcat e phpMyAdmin.

## Serviços

| Serviço      | Porta  | URL                           |
|-------------|--------|-------------------------------|
| Apache      | 80     | http://localhost              |
| MySQL       | 3306   | localhost:3306                |
| Node.js     | 3000   | http://localhost:3000         |
| Tomcat      | 8080   | http://localhost:8080         |
| phpMyAdmin  | -      | http://localhost/phpmyadmin   |

## Credenciais

- **MySQL root**: `root` / `root`
- **phpMyAdmin**: `root` / `root`

## Quick Start

```bash
docker-compose up -d
```

Acesse http://localhost para ver a página principal com links para todos os serviços.

## Estrutura

```
xampp_server/
├── config/              # Arquivos de configuração
│   ├── entrypoint.sh     # Script de inicialização
│   ├── my.cnf            # Configuração MySQL
│   ├── server.js          # Servidor Node.js (API)
│   ├── supervisord.conf  # Supervisor config
│   └── sql-scripts/       # Scripts SQL
├── htdocs/               # Documentos Apache
│   └── index.html         # Página principal
├── tomcat_webapps/        # Aplicações Tomcat
├── mysql_data/            # Dados MySQL (persistidos)
├── Dockerfile
└── docker-compose.yml
```

## Páginas

- **http://localhost/** - Página principal com links para todos os serviços
- **http://localhost:3000/** - API Node.js com documentação dos endpoints
- **http://localhost/phpmyadmin** - Gerenciamento MySQL

## Node.js API Endpoints

| Método | Endpoint               | Descrição           |
|--------|----------------------|---------------------|
| GET    | /                    | Página da API       |
| GET    | /api/status           | Status do servidor  |
| GET    | /api/health           | Health check        |
| GET    | /api/info             | Informações do sistema |
| GET    | /api/endpoints        | Lista de endpoints  |

## Uso

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
docker-compose build && docker-compose up -d
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
- Bootstrap 5
- Bootstrap Icons

## Configuração Automática

Na primeira execução, o entrypoint.sh configura automaticamente:
1. MySQL com senha root
2. Banco de dados phpMyAdmin
3. Tabelas internas do phpMyAdmin

## Design System

- **Tema**: Dark mode profissional
- **Framework**: Bootstrap 5
- **Ícones**: Bootstrap Icons
- **Paleta**: Roxo (#6366f1), Verde (#22c55e), Azul (#3b82f6)

## Branches

- `main` - Versão estável
- `develop` - Desenvolvimento

## Histórico

Ver `AGENT.md` para histórico completo.