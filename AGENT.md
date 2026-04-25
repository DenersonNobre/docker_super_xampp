# Super XAMPP - Agent Logs

## Objetivo
Criar e manter imagem Docker "Super XAMPP" com Apache, MySQL, Tomcat, Node.js e phpMyAdmin.

## Restrições
- Ubuntu 22.04 base
- MySQL 8.x
- Node.js 24.x
- Tomcat 11.x
- Design clean com Bootstrap 5, tema claro
- Commitar antes de push

## Histórico de Sessões

### Sessão 24/04/2026 - Correções e MySQL Remoto

**Problemas resolvidos:**
1. phpMyAdmin retornando 404 - symlink removido do entrypoint.sh
2. Node.js endpoints não funcionavam - reescrito server.js
3. Tema escuro - alterado para tema claro
4. MySQL Workbench não conectava - bind-address 127.0.0.1 → 0.0.0.0

**Mudanças técnicas:**
- `config/my.cnf` - bind-address = 0.0.0.0
- `config/supervisord.conf` - removeu --bind-address do mysqld_safe
- `config/entrypoint.sh` - reescrito para iniciar MySQL antes de configurar
- `Dockerfile` - adiciona sed para corrigir mysqld.cnf do Ubuntu
- `htdocs/super-xampp/index.html` - tema claro
- `config/server.js` - novos endpoints /api/status, /api/time, /api/random

**MySQL remote access:**
- root@localhost com mysql_native_password
- root@'%' criado para conexões remotas (Workbench)

**Commits:**
- `cc01839` Fix pages and services
- `3cdbbfb` Enable MySQL remote connections  
- `00b3a43` Create root@'%' user for MySQL Workbench remote access

**Endpoints Node.js:**
- GET /api/status → {status, uptime, version}
- GET /api/time → {timestamp, unix}
- GET /api/random → {number}

### Sessão 24/04/2026 - Merge para main

**Push para origin:**
- develop → origin/develop ✓

**Documentação:**
- README.md atualizado com:
  - MySQL Workbench instructions
  - Endpoint examples
  - Clear usage commands
  - Design system info

## Configurações Importantes

### MySQL
```
bind-address = 0.0.0.0
port = 3306
root@localhost e root@'%' com mysql_native_password
```

### Container
- nome: super_xampp
- portas: 80, 3306, 8080, 3000
- volume: mysql_data (persistência)

### Credenciais
- MySQL: root/root
- phpMyAdmin: root/root

## Repositório
https://github.com/DenersonNobre/docker_super_xampp