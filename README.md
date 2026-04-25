# Super XAMPP

Ambiente de desenvolvimento Docker completo com Apache, MySQL, Node.js, Tomcat e phpMyAdmin.

## Comece Aqui

1. [docs/SETUP-GIT.md](docs/SETUP-GIT.md) - Setup do repositório Git
2. [docs/00-PLANO-EXECUCAO.md](docs/00-PLANO-EXECUCAO.md) - Plano de execução completo

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
- **MySQL Workbench**: `root` / `root` (localhost:3306)
- **phpMyAdmin**: `root` / `root`

## Quick Start

```bash
docker-compose up -d
```

Acesse http://localhost para ver a página principal com links para todos os serviços.

## Conectar MySQL Workbench

1. Abra MySQL Workbench
2. Nueva conexión:
   - **Hostname**: localhost
   - **Port**: 3306
   - **Username**: root
   - **Password**: root
3. Clique em "Test Connection"

## Estrutura

```
xampp_server/
├── config/              # Arquivos de configuração
│   ├── entrypoint.sh     # Script de inicialização
│   ├── my.cnf            # Configuração MySQL
│   ├── server.js         # Servidor Node.js (API)
│   ├── supervisord.conf  # Supervisor config
│   └── sql-scripts/      # Scripts SQL
├── htdocs/              # Documentos Apache
│   └── super-xampp/     # Página principal
├── Dockerfile
└── docker-compose.yml
```

## Páginas

- **http://localhost/super-xampp/** - Página principal com links para todos os serviços
- **http://localhost:3000/** - API Node.js com documentação dos endpoints
- **http://localhost/phpmyadmin** - Gerenciamento MySQL
- **http://localhost:8080/** - Tomcat

## Node.js API Endpoints

| Método | Endpoint         | Descrição           |
|--------|------------------|---------------------|
| GET    | /                | Página da API       |
| GET    | /api/status      | Status do servidor  |
| GET    | /api/time        | Horário atual       |
| GET    | /api/random      | Número aleatório    |

**Exemplo de resposta:**
```json
{
  "status": "online",
  "uptime": 1234,
  "version": "1.0.0"
}
```

## Uso

### Iniciar
```bash
docker-compose up -d
```

### Parar
```bash
docker-compose down
```

### Rebuild (após mudanças)
```bash
docker-compose build && docker-compose up -d
```

### Acessar Container
```bash
docker exec -it super_xampp bash
```

### Testar MySQL interno
```bash
docker exec super_xampp mysql -u root -proot
```

### Testar MySQL TCP
```bash
docker exec super_xampp mysql -h 127.0.0.1 -u root -proot
```

## Volumes

- `mysql_data` → `/var/lib/mysql` (MySQL - persistido)

## Tecnologias

- Ubuntu 22.04
- Apache 2
- PHP 8.x
- MySQL 8.x (suporta conexões TCP remotas)
- Node.js 24.x
- Tomcat 11.x
- phpMyAdmin
- OpenJDK 21
- Bootstrap 5
- Bootstrap Icons

## Configuração Automática

Na primeira execução, o `entrypoint.sh` configura automaticamente:
1. MySQL com senha root
2. Usuário root@'%' para conexões remotas (Workbench)
3. Banco de dados phpMyAdmin
4. Tabelas internas do phpMyAdmin

## Design System

- **Tema**: Light mode profissional
- **Framework**: Bootstrap 5
- **Ícones**: Bootstrap Icons
- **Paleta**: Roxo (#6366f1), Verde (#22c55e), Azul (#3b82f6)

## Branches

- `main` - Versão estável
- `develop` - Desenvolvimento

## Repositório

https://github.com/DenersonNobre/docker_super_xampp