# PROMPT 06 - MySQL Configuração

## Contexto

MySQL por padrão no Ubuntu escuta apenas em 127.0.0.1 (localhost). Precisamos que aceite conexões TCP de qualquer host para:
- MySQL Workbench no host
- Aplicações externas
- Outros containers

**Problema:** O Ubuntu tem configuração padrão em `/etc/mysql/mysql.conf.d/mysqld.cnf` com `bind-address=127.0.0.1`.

## Tarefa

### Criar config/my.cnf:

```ini
[mysqld]
socket     = /var/run/mysqld/mysqld.sock
bind-address = 0.0.0.0
port       = 3306
```

### No Dockerfile, adicionar correção:

Adicione AO FINAL do Dockerfile (depois do COPY):
```dockerfile
# Permitir conexões MySQL remotas (sobrescreve Ubuntu default)
RUN sed -i 's/bind-address.*=.*127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
```

## Por Que bind-address = 0.0.0.0?

```
127.0.0.1 (localhost)  ──► MySQL aceita só conexões locais
0.0.0.0 (any)          ──► MySQL aceita conexões de qualquer IP
```

Na prática:
- Container Docker tem IP interno (ex: 172.17.0.2)
- Host Windows acessa via localhost:3306 (mapeado para container)
- Qualquer aplicação pode conectar

## Usuários MySQL

O entrypoint já cria:
- `root@localhost` - Para socket local (phpMyAdmin)
- `root@'%'` - Para TCP remoto (Workbench)

Ambos com `mysql_native_password` para compatibilidade.

## Verificação

```bash
docker build -t test . && docker run --rm test cat /etc/mysql/mysql.conf.d/mysqld.cnf | grep bind
# Deve mostrar: bind-address = 0.0.0.0
```

## Próximo Passo

Ver [PROMPT-07-APACHE.md](PROMPT-07-APACHE.md)