# Super XAMPP - Setup Inicial do Repositório

## Objetivo

Documentar o processo de criação e configuração inicial do repositório Git.

## 1. Inicializar Repositório

```bash
cd projeto
git init
git add .
git commit -m "Initial commit"
```

## 2. Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Repository name: `docker_super_xampp`
3. Description: "Ambiente Docker completo com Apache, MySQL, Node.js, Tomcat e phpMyAdmin"
4. Private ou Public conforme necessidade
5. NÃO inicializar com README (já temos arquivos)
6. Create repository

## 3. Conectar e Push

```bash
git remote add origin https://github.com/username/docker_super_xampp.git
git branch -M main
git push -u origin main
```

## 4. Criar Branch de Desenvolvimento

```bash
git checkout -b develop
git push -u origin develop
```

## 5. Estrutura de Branches

```
main    ──── Versão estável (produção)
  │
develop ──── Trabalho em andamento (desenvolvimento)
```

## 6. Fluxo de Trabalho

```
develop ◄────────────────────────┐
    │                             │
    ├── Trabalho ────────────────┤
    │                             │
    ├── Commit ──────────────────┤
    │                             │
    └── Push ────────────────────┘

 Quando pronto:
    │
    ▼
merge develop → main (no GitHub ou PR)
```

## 7. Comandos Essenciais

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

### Sincronizar
```bash
git pull origin develop
git push origin develop
```

### Branches
```bash
git branch                    # Lista branches
git checkout develop          # Troca para develop
git checkout -b nova-funcionalidade  # Cria e troca
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

## 9. Manter Documentação Atualizada

### Regra Principal

**SEMPRE atualizar a documentação ANTES de fazer push.**

### Checklist Pré-Push

- [ ] README.md reflete mudanças?
- [ ] AGENT.md registra decisões importantes?
- [ ] docs/ está com informações corretas?
- [ ] CHECKLIST verifica as novas funcionalidades?

### O que Documentar

1. **Configurações novas** → README.md
2. **Decisões técnicas** → AGENT.md
3. **Problemas resolvidos** → docs/05-DEBUGGING.md
4. **Novos serviços** → docs/03-ETAPA-SERVICOS.md
5. **Mudanças de design** → docs/04-ETAPA-INTERFACE.md

## 10. Sincronizar com Dokumentation

Se outra IA ou pessoa vai continuar o projeto:

```bash
git clone https://github.com/DenersonNobre/docker_super_xampp.git
cd docker_super_xampp
git checkout develop
cat docs/00-PLANO-EXECUCAO.md  # Comece aqui!
```

## 11. Checklist de Setup

- [ ] git init feito
- [ ] .gitignore configurado
- [ ] Prime commit criado
- [ ] Repositório GitHub criado
- [ ] origin configurado
- [ ] Branch mainpushada
- [ ] Branch develop criada
- [ ] develop pushada

## Próximo Passo

Ver [00-PLANO-EXECUCAO.md](00-PLANO-EXECUCAO.md)