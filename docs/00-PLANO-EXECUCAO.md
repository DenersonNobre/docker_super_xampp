# Plano de Execução - Super XAMPP

## Visão Geral

Criar uma imagem Docker que funcione como alternativa moderna ao XAMPP, com Apache, MySQL, Node.js, Tomcat e phpMyAdmin.

## Estrutura de Documentação

```
docs/
├── SETUP-GIT.md             # Setup Git e regras de commit
├── 00-PLANO-EXECUCAO.md     # Visão geral e fluxo (este)
├── 01-ETAPA-FUNDACAO.md     # Setup inicial e tecnologias
├── 02-ETAPA-CONTAINER.md    # Dockerfile e docker-compose
├── 03-ETAPA-SERVICOS.md     # Configuração de cada serviço
├── 04-ETAPA-INTERFACE.md    # Páginas web e design
├── 05-ETAPA-DEBUGGING.md    # Problemas encontrados e soluções
├── 06-ETAPA-MYSQL-REMOTO.md # Configuração MySQL para conexões externas
└── 07-CHECKLIST.md          # Verificação final
```

## Fluxo de Execução

```
SETUP-GIT → 00-PLANO → 01-FUNDACAO → 02-CONTAINER → 03-SERVICOS → 04-INTERFACE → 05-DEBUGGING → 06-MYSQL → 07-CHECKLIST
   ↓           ↓            ↓              ↓             ↓              ↓              ↓           ↓          ↓
 Git init    Overview    Ubuntu 22    dockerfiles   Apache/MySQL   Bootstrap UI    Fixes      Workbench   Testes
```

## Tecnologias Escolhidas

| Componente | Tecnologia | Versão | Motivo |
|------------|------------|--------|--------|
| OS Base | Ubuntu | 22.04 | Estável, bom suporte |
| Web Server | Apache2 | latest | Padrão Ubuntu |
| Database | MySQL | 8.x | Via apt Ubuntu |
| Runtime JS | Node.js | 24.x | LTS recente |
| Java EE | Tomcat | 11.x | Última versão estável |
| Admin DB | phpMyAdmin | latest | Interface web MySQL |
| Java | OpenJDK | 21 | LTS atual |
| Process Manager | Supervisor | latest | Gerencia serviços |

## Meta Final

Uma imagem Docker que:
1. Start com `docker-compose up -d`
2. Todos os serviços rodando simultaneamente
3. Interface web com links para todos os serviços
4. MySQL aceitando conexões TCP remotas (Workbench)
5. Tema visual clean com Bootstrap 5

## Tempo Estimado

- Etapas 01-02: 30 minutos (setup)
- Etapas 03-04: 1 hora (serviços e UI)
- Etapas 05-06: 1-2 horas (debugging)
- Total: ~3 horas

## Como Usar Este Plano

1. **Leia 00-PLANO-EXECUCAO.md** - Entenda a visão geral
2. **Siga 01 a 06 em ordem** - Cada etapa prepara para a próxima
3. **Use 07-CHECKLIST.md** - Verifique o resultado final
4. **Consulte 05-DEBUGGING.md** - Se encontrar problemas

## Para Recomeçar do Zero

Se outra IA precisar continuar o projeto:

1. Clone o repositório
2. Leia esta pasta `docs/` completa
3. Execute cada etapa em ordem
4. Use o checklist para verificar

## Próximo Passo

Ver [01-ETAPA-FUNDACAO.md](01-ETAPA-FUNDACAO.md)