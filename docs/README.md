# Super XAMPP - Documentação

## Como Usar

Esta documentação contém **prompts sequenciais** que guiam a criação do Super XAMPP do absoluto zero.

### Estrutura Final

```
docs/
├── README.md               ← (este) Visão geral
├── PROMPTS-README.md       ← Como usar os prompts
├── SETUP-GIT.md            ← Setup Git (importante!)
├── PROMPT-01-FUNDACAO.md   ← 1. Criar estrutura
├── PROMPT-02-DOCKERFILE.md ← 2. Dockerfile
├── PROMPT-03-DOCKER-COMPOSE.md
├── PROMPT-04-SUPERVISOR.md
├── PROMPT-05-ENTRYPOINT.md
├── PROMPT-06-MYSQL.md
├── PROMPT-07-APACHE.md
├── PROMPT-08-NODEJS.md
├── PROMPT-09-TOMCAT.md
├── PROMPT-10-LANDING-PAGE.md
├── PROMPT-11-TESTES.md
├── test.sh                 ← Testes dentro do container
└── test-host.ps1           ← Testes no host Windows
```

### Fluxo

```
SETUP-GIT → PROMPT-01 → ... → PROMPT-11 → Testes
    ↓
Config Git antes de começar
```

### Comece Por

1. Leia `SETUP-GIT.md` (setup do repositório Git)
2. Leia `PROMPTS-README.md` (como usar os prompts)
3. Siga `PROMPT-01-FUNDACAO.md` até `PROMPT-11-TESTES.md`

### Para Recriar do Zero

Uma IA pode seguir os prompts sequenciais para recriar todo o projeto. Cada prompt contém:
- **Contexto** - Por que estamos fazendo isso
- **Tarefa** - O que criar/copiar
- **Verificação** - Como testar
- **Próximo passo** - Continuação

### Referência Rápida

| Serviço | Porta | URL |
|---------|-------|-----|
| Apache | 80 | http://localhost |
| MySQL | 3306 | localhost:3306 |
| Node.js | 3000 | http://localhost:3000 |
| Tomcat | 8080 | http://localhost:8080 |
| phpMyAdmin | - | http://localhost/phpmyadmin |

**Credenciais:** root / root