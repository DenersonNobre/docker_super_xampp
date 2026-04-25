# Etapa 02 - Container e Compose

## Objetivo

Configurar o Dockerfile completo e docker-compose.yml funcional.

## 2.1 Dockerfile Completo

```dockerfile
# Dockerfile - Super XAMPP
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Sao_Paulo

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

RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs=24.* || apt-get install -y nodejs

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y phpmyadmin

RUN wget https://downloads.apache.org/tomcat/tomcat-11/v11.0.21/bin/apache-tomcat-11.0.21.tar.gz \
    && tar xzf apache-tomcat-11.0.21.tar.gz -C /opt \
    && mv /opt/apache-tomcat-11.0.21 /opt/tomcat \
    && rm apache-tomcat-11.0.21.tar.gz

COPY config/my.cnf /etc/mysql/conf.d/my.cnf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY config/entrypoint.sh /entrypoint.sh
COPY config/server.js /var/www/html/server.js
COPY ./htdocs /var/www/html

RUN chown -R root:root /opt/tomcat \
    && chmod -R 755 /opt/tomcat

RUN chmod +x /entrypoint.sh

RUN mkdir -p /var/run/mysqld /run/mysqld \
    && chown -R mysql:mysql /var/run/mysqld /run/mysqld

RUN usermod -a -G mysql www-data

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80 3306 8080 3000
```

## 2.2 Docker Compose Final

```yaml
services:
  super-xampp:
    build: .
    image: dnoi/super-xampp:1.0.0    
    container_name: super_xampp
    restart: always
    ports:
      - "80:80"
      - "3306:3306"
      - "8080:8080"
      - "3000:3000"
    volumes:
      - ./mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## 2.3 Permissões Importantes

### Tomcat
```dockerfile
RUN chown -R root:root /opt/tomcat \
    && chmod -R 755 /opt/tomcat
```

### MySQL
```dockerfile
RUN mkdir -p /var/run/mysqld /run/mysqld \
    && chown -R mysql:mysql /var/run/mysqld /run/mysqld
```

### Apache + MySQL
```dockerfile
RUN usermod -a -G mysql www-data
```

**Justificativa:** www-data (Apache) precisa acessar socket MySQL para phpMyAdmin.

## 2.4 Ordem de Build

A ordem das instruções no Dockerfile importa:

1. **Base** → Ubuntu
2. **tzdata** → Evita prompts
3. **Pacotes base** → Apache, MySQL, etc
4. **Node.js** → Runtime JavaScript
5. **Tomcat** → Download e extração
6. **Config files** → COPY
7. **Permissions** → CHOWN, CHMOD
8. **Entrypoint** → Script de start

## 2.5 Expor Portas

```dockerfile
EXPOSE 80 3306 8080 3000
```

| Porta | Serviço |
|-------|---------|
| 80 | Apache |
| 3306 | MySQL |
| 8080 | Tomcat |
| 3000 | Node.js |

## Checklist

- [ ] Dockerfile completo com todas as instruções
- [ ] Docker Compose com portas corretas
- [ ] Volumes configurados para persistência
- [ ] Permissões aplicadas
- [ ] Entrypoint definido

## Próximo Passo

[03-ETAPA-SERVICOS.md](03-ETAPA-SERVICOS.md)