# PROMPT 09 - Tomcat

## Contexto

Tomcat é o servidor Java (JSP servlet container). Já foi instalado no Dockerfile. O Supervisor já está configurado para iniciá-lo.

## Tarefa

### 1. Tomcat já está pronto, verificar apenas:

- Arquivo existe em `/opt/tomcat/`
- Permissões corretas (já configurado no Dockerfile)

### 2. Não precisa de configuração adicional

O Tomcat funciona out-of-the-box após extração.

## Acessar Tomcat

- URL: http://localhost:8080
- Página padrão mostra "If you're seeing this, you've successfully installed Tomcat!"

## Verificação

```bash
curl http://localhost:8080/
# Deve mostrar página do Tomcat
```

## Próximo Passo

Ver [PROMPT-10-LANDING-PAGE.md](PROMPT-10-LANDING-PAGE.md)