# PROMPT 01 - Fundação do Projeto

## Contexto

Vamos criar o "Super XAMPP" - um ambiente Docker completo de desenvolvimento que roda Apache, MySQL, Node.js, Tomcat e phpMyAdmin em um único container.

**Inspiração:** XAMPP tradicional, mas moderno, com tecnologias atualizadas:
- Node.js 24.x (não só PHP)
- Tomcat 11.x (Java moderno)
- MySQL 8.x
- Bootstrap 5 UI

## Tarefa

### 1. Criar estrutura de diretórios

```bash
mkdir super-xampp
cd super-xampp
mkdir config htdocs/super-xampp mysql_data
```

### 2. Criar .gitignore

O projeto NÃO deve versionar:
- Volumes de dados (mysql_data)
- Logs
- Arquivos temporários
- node_modules (se houver)

## Verificação

Execute:
```bash
ls -la
# Deve mostrar: config/  htdocs/  mysql_data/
```

## Decisões Técnicas

Por que Ubuntu 22.04?
- Estável e bem suportado
- Repositórios com MySQL 8.x nativo
- Boa compatibilidade com todas tecnologias

Por que um único container?
- Simplicidade de deployment
- Todos os serviços comunicam via localhost
- Menos overhead que múltiplos containers

## Próximo Passo

Ver [PROMPT-02-DOCKERFILE.md](PROMPT-02-DOCKERFILE.md)