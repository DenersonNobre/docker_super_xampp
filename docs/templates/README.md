# Templates - Recriar do Zero

Este 폴더 contém todos os arquivos necessários para recriar o Super XAMPP do absoluto zero.

## Estrutura

```
templates/
├── Dockerfile
├── docker-compose.yml
├── README.md              ← (este)
├── config/
│   ├── entrypoint.sh
│   ├── my.cnf
│   ├── supervisord.conf
│   └── server.js
└── htdocs/
    └── super-xampp/
        └── index.html
```

## Como Usar

### 1. Criar Estrutura de Diretórios

```bash
mkdir super-xampp
cd super-xampp
mkdir config htdocs/super-xampp mysql_data
```

### 2. Copiar Arquivos

Copie o conteúdo de cada arquivo desta pasta para a estrutura criada.

### 3. Estrutura Final

```
super-xampp/
├── config/
│   ├── entrypoint.sh
│   ├── my.cnf
│   ├── supervisord.conf
│   └── server.js
├── htdocs/
│   └── super-xampp/
│       └── index.html
├── Dockerfile
├── docker-compose.yml
└── mysql_data/           ← (vazio, será criado pelo Docker)
```

### 4. Build e Run

```bash
docker-compose build
docker-compose up -d
```

### 5. Aguardar Inicialização

```bash
sleep 30
docker exec super_xampp mysql -u root -proot -e "SELECT 'OK'"
```

### 6. Verificar

```bash
# Testar todos os serviços
docker exec super_xampp /bin/bash /test.sh

# Ou teste manual
curl http://localhost/
curl http://localhost/phpmyadmin/
curl http://localhost:3000/
curl http://localhost:8080/
```

## Serviços

| Serviço | Porta | URL |
|---------|-------|-----|
| Apache | 80 | http://localhost |
| MySQL | 3306 | localhost:3306 |
| Node.js | 3000 | http://localhost:3000 |
| Tomcat | 8080 | http://localhost:8080 |
| phpMyAdmin | - | http://localhost/phpmyadmin |

## Credenciais

- **MySQL**: root / root
- **MySQL Workbench**: localhost:3306, root/root
- **phpMyAdmin**: root / root

## Solução de Problemas

Se algo falhar, consulte `../05-ETAPA-DEBUGGING.md`