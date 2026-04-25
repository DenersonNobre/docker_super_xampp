# PROMPT 07 - Apache Configuração

## Contexto

Apache já vem pré-configurado no Ubuntu. Precisamos:
1. Verificar que está habilitado
2. Criar página principal
3. Garantir que serviremos o htdocs

## Tarefa

### 1. O Apache já vem pronto, mas verificar no Dockerfile:

```dockerfile
# Habilitar módulos e configs padrão Ubuntu são suficientes
# Não precisa de configuração adicional
```

### 2. Copiar arquivos para /var/www/html:

```dockerfile
COPY htdocs /var/www/html
```

### 3. Garantir permissões:

O Apache (www-data) precisa ler htdocs, que já é o default.

## Estrutura de Arquivos

```
htdocs/
└── super-xampp/
    └── index.html
```

Quando acessamos `http://localhost/super-xampp/`, o Apache serve de `/var/www/html/super-xampp/`.

## phpMyAdmin via Apache

O entrypoint já criou symlink:
```bash
ln -sf /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

Isso faz Apache servir phpMyAdmin em `http://localhost/phpmyadmin/`.

## Verificação

Não há muito o que verificar ainda, mas após build e run:
```bash
curl http://localhost/super-xampp/
# Deve retornar HTML da landing page
```

## Próximo Passo

Ver [PROMPT-08-NODEJS.md](PROMPT-08-NODEJS.md)