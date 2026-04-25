# Como Recriar Este Projeto do Zero

## Para IA ou Desenvolvedor

### Comece Aqui

```
docs/
├── templates/              ← Arquivos prontos para copiar
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── config/
│   │   ├── entrypoint.sh
│   │   ├── my.cnf
│   │   ├── supervisord.conf
│   │   └── server.js
│   ├── htdocs/super-xampp/
│   │   └── index.html
│   ├── test.sh
│   └── test-host.ps1
├── SETUP-GIT.md            ← Setup Git
└── README.md               ← (este)
```

### Passo a Passo

1. **Criar pasta do projeto**
   ```bash
   mkdir super-xampp && cd super-xampp
   mkdir config htdocs/super-xampp mysql_data
   ```

2. **Copiar arquivos de `docs/templates/`**

3. **Build**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

4. **Aguardar** (MySQL demora ~30s para iniciar)
   ```bash
   sleep 30
   ```

5. **Testar**
   ```bash
   docker exec super_xampp /test.sh
   ```

### O Que Está Incluído

- ✅ Ubuntu 22.04 base
- ✅ Apache2 + PHP
- ✅ MySQL 8.x com TCP remoto
- ✅ Node.js 24.x API
- ✅ Tomcat 11.x
- ✅ phpMyAdmin
- ✅ Landing page Bootstrap 5
- ✅ Scripts de teste

### Estrutura Final

```
super-xampp/
├── config/
│   ├── entrypoint.sh
│   ├── my.cnf
│   ├── supervisord.conf
│   └── server.js
├── htdocs/super-xampp/
│   └── index.html
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── mysql_data/
```

### Serviços e Portas

| Serviço | Porta | URL |
|---------|-------|-----|
| Apache | 80 | http://localhost |
| MySQL | 3306 | localhost:3306 |
| Node.js | 3000 | http://localhost:3000 |
| Tomcat | 8080 | http://localhost:8080 |
| phpMyAdmin | - | http://localhost/phpmyadmin |

### Credenciais

- **MySQL root**: `root` / `root`
- **MySQL Workbench**: conecta em `localhost:3306`
- **phpMyAdmin**: `root` / `root`

### Problemas?

Consulte [05-ETAPA-DEBUGGING.md](05-ETAPA-DEBUGGING.md)