# Checklist Final de Verificação

## Objetivo

Verificar que todos os serviços estão funcionando corretamente após setup.

## Como Usar

Execute cada comando e marque ✓ se o resultado for positivo.

## 1. Container

```bash
docker ps | grep super_xampp
```

- [ ] Container `super_xampp` está rodando

```bash
docker logs super_xampp 2>&1 | tail -10
```

- [ ] Sem erros críticos nos logs

## 2. Processos

```bash
docker exec super_xampp ps aux | grep -E "apache|mysql|node|tomcat"
```

- [ ] Apache2 rodando
- [ ] MySQL rodando
- [ ] Node.js rodando
- [ ] Tomcat rodando

## 3. Portas

```bash
powershell Test-NetConnection localhost -Port 80
powershell Test-NetConnection localhost -Port 3306
powershell Test-NetConnection localhost -Port 3000
powershell Test-NetConnection localhost -Port 8080
```

- [ ] Porta 80 (Apache) aberta
- [ ] Porta 3306 (MySQL) aberta
- [ ] Porta 3000 (Node.js) aberta
- [ ] Porta 8080 (Tomcat) aberta

## 4. Apache

```bash
curl -I http://localhost/
```

- [ ] HTTP 200 OK

```bash
curl -I http://localhost/super-xampp/
```

- [ ] Página principal carrega

## 5. phpMyAdmin

```bash
curl -I http://localhost/phpmyadmin/
```

- [ ] HTTP 200 OK

```bash
curl -s http://localhost/phpmyadmin/ | grep -i "phpmyadmin"
```

- [ ] Título phpMyAdmin presente

## 6. MySQL

### Teste via Socket

```bash
docker exec super_xampp mysql -u root -proot -e "SELECT 1"
```

- [ ] Query retorna resultado

### Teste via TCP

```bash
docker exec super_xampp mysql -h 127.0.0.1 -u root -proot -e "SELECT 'TCP OK'"
```

- [ ] TCP connection funciona

### Verificar Usuários

```bash
docker exec super_xampp mysql -u root -proot -e "SELECT user, host FROM mysql.user WHERE user='root'"
```

- [ ] `root@localhost` existe
- [ ] `root@%` existe

### Verificar bind-address

```bash
docker exec super_xampp cat /etc/mysql/mysql.conf.d/mysqld.cnf | grep bind-address
```

- [ ] `bind-address = 0.0.0.0`

## 7. Node.js API

```bash
curl http://localhost:3000/
```

- [ ] Página da API carrega

```bash
curl http://localhost:3000/api/status
```

- [ ] Retorna JSON com status

```bash
curl http://localhost:3000/api/time
```

- [ ] Retorna timestamp

```bash
curl http://localhost:3000/api/random
```

- [ ] Retorna número aleatório

## 8. Tomcat

```bash
curl -I http://localhost:8080/
```

- [ ] HTTP 200 OK

```bash
curl -s http://localhost:8080/ | grep -i "tomcat"
```

- [ ] Título Tomcat presente

## 9. MySQL Workbench (Manual)

- [ ] Abre MySQL Workbench
- [ ] Nova conexão com localhost:3306
- [ ] Test Connection bem-sucedido

## 10. Interface Web

Acesse no navegador:

- [ ] http://localhost/super-xampp/ - Landing page
- [ ] http://localhost/phpmyadmin/ - phpMyAdmin
- [ ] http://localhost:3000/ - API
- [ ] http://localhost:8080/ - Tomcat

Verificar:
- [ ] Tema claro aplicado
- [ ] Todos os links funcionais
- [ ] Status "Online" nos badges

## Resumo

Total de checks: 35
Mínimo para funcionar: 30

| Categoria | Checks | Passou |
|-----------|--------|--------|
| Container | 2 | __ |
| Processos | 4 | __ |
| Portas | 4 | __ |
| Apache | 2 | __ |
| phpMyAdmin | 2 | __ |
| MySQL | 5 | __ |
| Node.js | 4 | __ |
| Tomcat | 2 | __ |
| Workbench | 3 | __ |
| Interface | 7 | __ |

## Se Algo Falhar

Consulte [05-ETAPA-DEBUGGING.md](05-ETAPA-DEBUGGING.md) para soluções de problemas comuns.

## Resultado Esperado

```
Super XAMPP - All Systems Online
✓ Apache     : http://localhost
✓ MySQL      : localhost:3306 (TCP)
✓ Node.js    : http://localhost:3000
✓ Tomcat     : http://localhost:8080
✓ phpMyAdmin : http://localhost/phpmyadmin
```