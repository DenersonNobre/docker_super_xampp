# Etapa 05 - Debugging e Correções

## Objetivo

Documentar problemas encontrados durante o desenvolvimento e suas soluções.

## 5.1 Problema: phpMyAdmin 404

### Sintoma
Acessar http://localhost/phpmyadmin retorna erro 404.

### Causa
O symlink para phpMyAdmin foi removido durante refatoração do entrypoint.sh.

### Solução
Adicionar no entrypoint.sh:

```bash
ln -sf /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

### Verificação
```bash
curl -I http://localhost/phpmyadmin/
# Esperado: HTTP/1.1 200 OK
```

## 5.2 Problema: Node.js Endpoints Não Funcionam

### Sintoma
Acessar http://localhost:3000/api/status retorna erro ou página vazia.

### Causa Original
O server.js tinha problemas de sintaxe e lógica de roteamento incorreta.

### Solução
Reescrever server.js com lógica simples e correta:

```javascript
http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    
    if (u === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(HTML);
    } else if (u === '/api/status') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ status: 'online', ... }));
    } else if (u === '/api/time') { ... }
    // ...
}).listen(PORT, () => console.log('Server on ' + PORT));
```

### Verificação
```bash
curl http://localhost:3000/api/status
# Esperado: {"status":"online","uptime":123,"version":"1.0.0"}
```

## 5.3 Problema: Tema Escuro na Landing Page

### Sintoma
Usuário prefere tema claro, mas página tinha tema escuro.

### Solução
Alterar CSS variables:

```css
:root {
    --bg: #f8fafc;           /* Fundo claro */
    --bg-card: #ffffff;      /* Cards brancos */
    --text: #1e293b;         /* Texto escuro */
    --text-muted: #64748b;   /* Texto secundário */
}
```

## 5.4 Problema: MySQL Não Inicia

### Sintoma
MySQL não aparece na lista de processos após container start.

### Causa
O entrypoint.sh configurava senha root ANTES de iniciar o MySQL, mas o Supervisor só iniciava depois.

### Solução
Reescrever entrypoint.sh para:
1. Iniciar MySQL manualmente
2. Configurar senha
3. Criar usuário remoto
4. Parar MySQL
5. Deixar Supervisor iniciar novamente

```bash
# Start MySQL antes da configuração
if [ ! -f "/var/lib/mysql/.password_set" ]; then
    echo "Iniciando MySQL..."
    mysqld --user=mysql &
    MYSQL_PID=$!
    
    # Aguarda MySQL ficar pronto
    for i in {1..30}; do
        if mysql -u root -e "SELECT 1" >/dev/null 2>&1; then
            break
        fi
        sleep 1
    done
    
    # Configura
    mysql -u root -e "ALTER USER 'root'@'localhost' ..."
    mysql -u root -proot -e "CREATE USER IF NOT EXISTS 'root'@'%' ..."
    
    # Para e deixa Supervisor iniciar
    kill $MYSQL_PID
    sleep 2
fi
```

## 5.5 Problema: MySQL Não Aceita Conexões TCP

### Sintoma
MySQL Workbench não conecta - "Can't connect to MySQL server on '127.0.0.1:3306'"

### Causas Múltiplas

1. **bind-address em /etc/mysql/mysql.conf.d/mysqld.cnf**
   ```bash
   # Estava: bind-address = 127.0.0.1
   # Era: bind-address = 0.0.0.0
   ```

2. **supervisord.conf usando mysqld_safe**
   ```bash
   # Evitar - conflita com Supervisor
   # Era: command=/usr/bin/mysqld_safe --bind-address=127.0.0.1
   # Agora: command=/usr/sbin/mysqld
   ```

3. **Falta usuário para conexões remotas**
   ```sql
   CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
   ```

### Solução Completa

**No Dockerfile:**
```dockerfile
RUN sed -i 's/bind-address.*=.*127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
```

**No supervisord.conf:**
```ini
[program:mysql]
command=/usr/sbin/mysqld
```

**No entrypoint.sh:**
```bash
mysql -u root -proot -e "CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';"
```

## 5.6 Problema: Erro de Sintaxe no entrypoint.sh

### Sintoma
```
/entrypoint.sh: line 45: syntax error near unexpected token `fi'
```

### Causa
`2>&` deveria ser `2>&1`

### Solução
```bash
# Errado
if mysql -u root -e "SELECT 1" >/dev/null 2>& then

# Correto
if mysql -u root -e "SELECT 1" >/dev/null 2>&1 then
```

## 5.7 Comandos Úteis para Debug

### Ver processos rodando
```bash
docker exec super_xampp ps aux
```

### Ver logs do container
```bash
docker logs super_xampp
```

### Ver logs do MySQL
```bash
docker exec super_xampp tail -30 /var/log/mysql/error.log
```

### Testar porta TCP
```bash
powershell Test-NetConnection localhost -Port 3306
```

### Ver configuração MySQL
```bash
docker exec super_xampp cat /etc/mysql/mysql.conf.d/mysqld.cnf | grep bind
```

### Testar MySQL interno
```bash
docker exec super_xampp mysql -u root -proot -e "SELECT 1"
```

### Testar MySQL TCP
```bash
docker exec super_xampp mysql -h 127.0.0.1 -u root -proot -e "SELECT 1"
```

## Checklist

- [ ] phpMyAdmin 404 resolvido
- [ ] Node.js endpoints funcionais
- [ ] Tema claro aplicado
- [ ] MySQL iniciando corretamente
- [ ] MySQL aceitando TCP
- [ ] Workbench conectando

## Próximo Passo

[06-ETAPA-MYSQL-REMOTO.md](06-ETAPA-MYSQL-REMOTO.md)