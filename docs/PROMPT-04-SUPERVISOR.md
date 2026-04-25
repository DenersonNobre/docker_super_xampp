# PROMPT 04 - Supervisor

## Contexto

Docker containers precisam de um processo principal (PID 1). Como precisamos de múltiplos serviços, usamos Supervisor para gerenciar todos.

**Problema:** Se iniciarmos MySQL, Apache e Tomcat no background separadamente, se um morrer não será reiniciado.

**Solução:** Supervisor é um process manager que mantém serviços vivos e reinicia se morrerem.

## Tarefa

### Criar config/supervisord.conf:

```ini
[supervisord]
nodaemon=true

[program:apache2]
command=/usr/sbin/apachectl -D FOREGROUND
autostart=true
autorestart=true

[program:mysql]
command=/usr/sbin/mysqld
autostart=true
autorestart=true

[program:tomcat]
command=/opt/tomcat/bin/catalina.sh run
autostart=true
autorestart=true
```

## Pontos Importantes

1. **`nodaemon=true`** - Supervisor roda em foreground (não daemoniza)

2. **Apache `-D FOREGROUND`** - Apache precisa rodar em foreground para Supervisor gerenciar

3. **MySQL direto, não mysqld_safe** - `mysqld_safe` conflita com Supervisor (cada um quer ser "pai" do MySQL)

4. **Tomcat `catalina.sh run`** - Modo foreground do Tomcat

## Por Que Supervisor?

| Opção | Prós | Contras |
|-------|------|---------|
| Supervisor | Reinicia automático, log centralizado | Mais dependências |
| rc.local | Simples | Sem restart automático |
| runit | Leve | Menos familiar |

Supervisor é escolha mais prática para este caso.

## Verificação

Ainda não dá para testar, mas o arquivo deve existir:
```bash
ls -la config/
```

## Próximo Passo

Ver [PROMPT-05-ENTRYPOINT.md](PROMPT-05-ENTRYPOINT.md)