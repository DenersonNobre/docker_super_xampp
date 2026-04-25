# Prompts - Recriar Super XAMPP do Zero

## Introdução

Estes prompts guiam uma IA (ou desenvolvedor) através da criação completa do Super XAMPP, do absoluto zero. Cada prompt deve ser executado em sequência, com verificação antes de prosseguir.

## Fluxo de Prompts

```
PROMPT 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11
   ↓        ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
Fundação  Docker Compose Entrypoint  MySQL    Apache  Node.js Tomcat phpMyAdmin Testes
```

## Visão Geral do Projeto

**Nome:** Super XAMPP
**Objetivo:** Criar ambiente Docker de desenvolvimento completo
**Tecnologias:** Apache, MySQL, Node.js, Tomcat, phpMyAdmin
**Base:** Ubuntu 22.04

## Estrutura de Diretórios a Ser Criada

```
projeto/
├── config/
│   ├── entrypoint.sh
│   ├── my.cnf
│   ├── server.js
│   └── supervisord.conf
├── htdocs/
│   └── super-xampp/
│       └── index.html
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── docs/
    └── [prompts de testes]
```

## Comece pelo Prompt 01

Ver [PROMPT-01-FUNDACAO.md](PROMPT-01-FUNDACAO.md)