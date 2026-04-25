# Super XAMPP - Setup Inicial do Repositório

## Objetivo

Documentar o processo de criação e configuração inicial do repositório Git.

## 1. Criar Pasta do Projeto

```bash
mkdir super-xampp
cd super-xampp
```

## 2. Inicializar Repositório

```bash
git init
```

## 3. Estrutura Inicial

```
super-xampp/
├── config/
├── htdocs/super-xampp/
├── mysql_data/
├── Dockerfile          (criar via prompts)
├── docker-compose.yml  (criar via prompts)
└── .gitignore          (criar via prompts)
```

## 4. Comandos Essenciais

### Status
```bash
git status
git log --oneline -5
```

### Adicionar e Commitar
```bash
git add arquivo.txt
git add .                    # Todos os arquivos
git commit -m "Mensagem"
```

### Branches
```bash
git branch                    # Lista branches
git checkout -b develop       # Cria e troca para develop
```

## 5. Criar Repositório no GitHub (opcional)

1. Acesse https://github.com/new
2. Repository name: `docker_hiper_xampp`
3. Description: "Ambiente Docker completo com Apache, MySQL, Node.js, Tomcat e phpMyAdmin"
4. Private ou Public conforme necessidade
5. Create repository

### Conectar e Push
```bash
git remote add origin https://github.com/username/docker_hiper_xampp.git
git branch -M main
git push -u origin main
git push -u origin develop
```

## 6. Estrutura de Branches

```
main    ──── Versão estável (produção)
  │
develop ──── Trabalho em andamento (desenvolvimento)
```

## 7. Fluxo de Trabalho

```
develop ◄────────────────────────┐
    │                             │
    ├── Trabalho ────────────────┤
    │                             │
    ├── Commit ──────────────────┤
    │                             │
    └── Push ────────────────────┘
```

## 8. Regras de Commits

### Quando Commitar

- ✅ Após resolver um problema
- ✅ Após adicionar funcionalidade
- ✅ Antes de fazer push
- ✅ Após atualizar documentação

- ❌ NÃO commit com código quebrado
- ❌ NÃO commit sem mensagem descritiva

### Formato de Mensagem

```
<tipo>: <descrição curta>

[corpo opcional com mais detalhes]
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `refactor`: Refatoração
- `config`: Configuração

**Exemplos:**
```bash
git commit -m "feat: Add MySQL Workbench support"
git commit -m "fix: MySQL TCP connection"
git commit -m "docs: Add troubleshooting guide"
```

## 9. Checklist de Setup

- [ ] git init feito
- [ ] .gitignore configurado
- [ ] Pasta `config/` criada
- [ ] Pasta `htdocs/super-xampp/` criada
- [ ] Branch develop criada

## Próximo Passo

Ver [PROMPTS-README.md](PROMPTS-README.md)