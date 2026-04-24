# Dockerfile - Super XAMPP
FROM ubuntu:22.04

# Evita prompts interativos e define timezone
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Sao_Paulo

# Instala tzdata primeiro para não travar o build
RUN apt-get update && apt-get install -y tzdata

# Pacotes base (MySQL 8.x via apt do Ubuntu 22.04)
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

# Instala Node.js 24.x LTS (fixo)
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs=24.* || apt-get install -y nodejs

# Instala phpMyAdmin sem prompts
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y phpmyadmin

# Instala Tomcat 11.0.21 (fixo)
RUN wget https://downloads.apache.org/tomcat/tomcat-11/v11.0.21/bin/apache-tomcat-11.0.21.tar.gz \
    && tar xzf apache-tomcat-11.0.21.tar.gz -C /opt \
    && mv /opt/apache-tomcat-11.0.21 /opt/tomcat \
    && rm apache-tomcat-11.0.21.tar.gz

# Copia config
COPY config/my.cnf /etc/mysql/conf.d/my.cnf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY config/entrypoint.sh /entrypoint.sh
COPY config/server.js /var/www/html/server.js
COPY config/sql-scripts /docker-entrypoint-initdb.d
COPY ./htdocs /var/www/html

# Ajustes de permissões
RUN chown -R root:root /opt/tomcat \
    && chmod -R 755 /opt/tomcat

# Copia entrypoint e define como entrypoint
RUN chmod +x /entrypoint.sh

# Prepara diretórios MySQL
RUN mkdir -p /var/run/mysqld /run/mysqld \
    && chown -R mysql:mysql /var/run/mysqld /run/mysqld

# Adiciona www-data ao grupo mysql para acesso ao socket
RUN usermod -a -G mysql www-data

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80 3306 8080 3000