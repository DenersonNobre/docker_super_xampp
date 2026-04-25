# PROMPT 11 - Build e Testes

## Contexto

Tudo está criado. Agora vamos buildar, rodar e testar todos os serviços.

## Tarefa

### 1. Build

```bash
docker-compose build
```

**可能的错误:**
- Faltando arquivo
- Erro de sintaxe no Dockerfile

**Solução:** Verifique se todos os arquivos de config estão no lugar.

### 2. Run

```bash
docker-compose up -d
```

### 3. Aguardar inicialização

```bash
sleep 30
```

**Importante:** MySQL demora ~30s para iniciar na primeira vez.

### 4. Verificar processos

```bash
docker exec super_xampp ps aux | grep -E "apache|mysql|node|tomcat"
```

Deve mostrar:
- apache2 (2+ processos)
- mysqld
- node
- java (tomcat)

### 5. Testar serviços

```bash
# Apache
curl -I http://localhost/

# phpMyAdmin
curl -I http://localhost/phpmyadmin/

# Node.js API
curl http://localhost:3000/api/status

# Tomcat
curl -I http://localhost:8080/

# MySQL TCP
docker exec super_xampp mysql -h 127.0.0.1 -u root -proot -e "SELECT 'OK'"
```

### 6. Testar MySQL Workbench

Abrir MySQL Workbench:
- Host: localhost
- Port: 3306
- User: root
- Password: root

Clicar "Test Connection".

## Problemas Comuns

### MySQL não inicia
```
docker logs super_xampp
```
Verificar se há erro de inicialização.

### phpMyAdmin 404
Verificar se symlink foi criado:
```bash
docker exec super_xampp ls -la /var/www/html/phpmyadmin
```

### Node.js não responde
```bash
docker exec super_xampp cat /var/log/node.log
```

### MySQL Workbench não conecta
Verificar:
```bash
docker exec super_xampp cat /etc/mysql/mysql.conf.d/mysqld.cnf | grep bind
# Deve mostrar: bind-address = 0.0.0.0
```

## Sucesso!

Se todos os testes passaram, parabens! O Super XAMPP está funcionando.

## Próximos Passos (Opcional)

1. Commit para Git
2. Push para repositório
3. Adicionar mais funcionalidades

Ver [test.sh](test.sh) para verificação completa.