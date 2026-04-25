# Etapa 01 - Fundação

## Objetivo

Definir a base tecnológica e estrutura inicial do projeto.

## 1.1 Escolha do Sistema Operacional

**Decisão:** Ubuntu 22.04

**Justificativa:**
- Estável e bem suportado
- Repositórios com MySQL 8.x nativo
- Boa compatibilidade com todas as tecnologias escolhidas
- Imagem Docker oficial bem mantida

## 1.2 Instalação de Pacotes Base

```dockerfile
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Sao_Paulo

# Atualiza e instala dependências
RUN apt-get update && apt-get install -y tzdata
RUN apt-get update && apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    mysql-server \
    wget \
    curl \
    unzip \
    openjdk-21-jdk \
    supervisor \
    git \
    ca-certificates \
    gnupg \
    procps
```

**Nota:** `tzdata` instalado separadamente para evitar prompts interativos.

## 1.3 Node.js

```dockerfile
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs=24.* || apt-get install -y nodejs
```

**Versão:** 24.x (mais recente LTS disponível no NodeSource)

## 1.4 Tomcat

```dockerfile
RUN wget https://downloads.apache.org/tomcat/tomcat-11/v11.0.21/bin/apache-tomcat-11.0.21.tar.gz \
    && tar xzf apache-tomcat-11.0.21.tar.gz -C /opt \
    && mv /opt/apache-tomcat-11.0.21 /opt/tomcat \
    && rm apache-tomcat-11.0.21.tar.gz
```

**Versão:** 11.0.21 (última versão estável da branch 11)

## 1.5 phpMyAdmin

```dockerfile
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y phpmyadmin
```

**Instalação via apt** (não manual) para facilitar atualizações e dependências.

## 1.6 Estrutura de Diretórios

```
projeto/
├── config/              # Arquivos de configuração
│   ├── entrypoint.sh     # Script de inicialização
│   ├── my.cnf            # MySQL config
│   ├── server.js         # Node.js API
│   └── supervisord.conf  # Gerenciador de processos
├── htdocs/               # Documentos Apache
├── Dockerfile
└── docker-compose.yml
```

## 1.7 Docker Compose Inicial

```yaml
services:
  super-xampp:
    build: .
    image: dnoi/super-xampp:1.0.0
    container_name: super_xampp
    restart: always
    ports:
      - "80:80"       # Apache
      - "3306:3306"   # MySQL
      - "8080:8080"  # Tomcat
      - "3000:3000"  # Node.js

volumes:
  mysql_data:
```

## Checklist desta Etapa

- [ ] Ubuntu 22.04 como base
- [ ] Apache2 instalado
- [ ] MySQL Server instalado
- [ ] PHP instalado
- [ ] Node.js 24.x instalado
- [ ] Tomcat 11.x instalado
- [ ] phpMyAdmin instalado
- [ ] OpenJDK 21 instalado
- [ ] Supervisor instalado
- [ ] Estrutura de diretórios criada
- [ ] Docker Compose configurado

## Próximo Passo

[02-ETAPA-CONTAINER.md](02-ETAPA-CONTAINER.md)