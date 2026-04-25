# PROMPT 02 - Criar Dockerfile

## Contexto

O Dockerfile define a imagem Docker com todos os serviços. Devemos escolher versões fixas para reprodutibilidade.

## Tarefa

### Criar Dockerfile com:

1. **Base:** Ubuntu 22.04
2. **Variáveis de ambiente:**
   - `DEBIAN_FRONTEND=noninteractive` (evita prompts)
   - `TZ=America/Sao_Paulo` (timezone)

3. **Instalar na ordem correta:**

   a) **tzdata primeiro** - Evita prompts interativos
   ```dockerfile
   RUN apt-get update && apt-get install -y tzdata
   ```

   b) **Pacotes base:**
   ```dockerfile
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

   c) **Node.js 24.x:**
   ```dockerfile
   RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
       && apt-get install -y nodejs=24.* || apt-get install -y nodejs
   ```

   d) **phpMyAdmin:**
   ```dockerfile
   RUN DEBIAN_FRONTEND=noninteractive apt-get install -y phpmyadmin
   ```

   e) **Tomcat 11.x:**
   ```dockerfile
   RUN wget https://downloads.apache.org/tomcat/tomcat-11/v11.0.21/bin/apache-tomcat-11.0.21.tar.gz \
       && tar xzf apache-tomcat-11.0.21.tar.gz -C /opt \
       && mv /opt/apache-tomcat-11.0.21 /opt/tomcat \
       && rm apache-tomcat-11.0.21.tar.gz
   ```

4. **Criar diretórios e permissões:**
   ```dockerfile
   RUN mkdir -p /var/run/mysqld /run/mysqld \
       && chown -R mysql:mysql /var/run/mysqld /run/mysqld
   RUN usermod -a -G mysql www-data
   RUN chown -R root:root /opt/tomcat && chmod -R 755 /opt/tomcat
   ```

5. **Expor portas:**
   ```dockerfile
   EXPOSE 80 3306 8080 3000
   ```

## Por Que Estas Versões?

| Componente | Versão | Motivo |
|------------|--------|--------|
| Ubuntu | 22.04 | LTS, estável |
| Node.js | 24.x | Mais recente LTS |
| Tomcat | 11.x | Última versão estável |
| OpenJDK | 21 | LTS atual |
| MySQL | 8.x | Via apt Ubuntu |

## Verificação

```bash
docker build -t test . 2>&1 | tail -20
# Deve completar sem erros
```

## Próximo Passo

Ver [PROMPT-03-DOCKER-COMPOSE.md](PROMPT-03-DOCKER-COMPOSE.md)