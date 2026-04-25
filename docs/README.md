# Super XAMPP - Documentação

## Como Usar Esta Documentação

### Para Recriar do Zero

Esta documentação contém **prompts sequenciais** que guiam a criação do Super XAMPP do absoluto zero.

1. **Comece aqui:** Leia `PROMPTS-README.md`
2. **Siga em ordem:** PROMPT-01 → PROMPT-02 → ... → PROMPT-11
3. **Teste:** Execute os testes ao final

### Estrutura

```
docs/
├── README.md              ← (este) Visão geral
├── PROMPTS-README.md      ← Como usar os prompts
├── PROMPT-01-FUNDACAO.md  ← 1. Criar estrutura
├── PROMPT-02-DOCKERFILE.md
├── PROMPT-03-DOCKER-COMPOSE.md
├── PROMPT-04-SUPERVISOR.md
├── PROMPT-05-ENTRYPOINT.md
├── PROMPT-06-MYSQL.md
├── PROMPT-07-APACHE.md
├── PROMPT-08-NODEJS.md
├── PROMPT-09-TOMCAT.md
├── PROMPT-10-LANDING-PAGE.md
├── PROMPT-11-TESTES.md
├── SETUP-GIT.md           ← Setup Git
├── 00-PLANO-EXECUCAO.md   ← Visão geral do projeto
├── 05-ETAPA-DEBUGGING.md  ← Solução de problemas
├── test.sh                ← Script de testes
└── test-host.ps1          ← Testes Windows
```

### Fluxo de Prompts

```
FUNDACAO → DOCKERFILE → COMPOSE → SUPERVISOR → ENTRYPOINT → MYSQL → APACHE → NODEJS → TOMCAT → LANDING → TESTES
    ↓           ↓           ↓           ↓            ↓          ↓        ↓         ↓        ↓         ↓        ↓
 Estrutura   Imagem      Volumes   Processos     Init      TCP/IP   HTTP      API      Java     UI      Verifica
```

### Para IA

Uma IA pode seguir estes prompts para recriar o projeto. Cada prompt contém:
- **Contexto** - Por que estamos fazendo isso
- **Tarefa** - O que criar/copiar
- **Verificação** - Como testar
- **Próximo passo** - Continuação natural

### Referência Rápida

| Serviço | Porta | URL |
|---------|-------|-----|
| Apache | 80 | http://localhost |
| MySQL | 3306 | localhost:3306 |
| Node.js | 3000 | http://localhost:3000 |
| Tomcat | 8080 | http://localhost:8080 |
| phpMyAdmin | - | http://localhost/phpmyadmin |

**Credenciais:** root / root