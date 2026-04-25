# Etapa 04 - Interface Web

## Objetivo

Criar páginas web profissionais usando Bootstrap 5 com tema claro.

## 4.1 Design System

### Paleta de Cores

```css
:root {
    --primary: #6366f1;      /* Roxo - cor principal */
    --success: #22c55e;      /* Verde - status online */
    --info: #3b82f6;         /* Azul - informações */
    --bg: #f8fafc;           /* Fundo claro */
    --bg-card: #ffffff;      /* Cards brancos */
    --text: #1e293b;         /* Texto principal */
    --text-muted: #64748b;   /* Texto secundário */
}
```

### Tipografia

- **Font family**: system-ui, sans-serif
- **Ícones**: Bootstrap Icons

### Frameworks CDN

```html
<!-- Bootstrap 5 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
```

## 4.2 Landing Page

### htdocs/super-xampp/index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Super XAMPP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --success: #22c55e;
            --info: #3b82f6;
            --bg: #f8fafc;
            --bg-card: #ffffff;
            --text: #1e293b;
            --text-muted: #64748b;
        }
        body { background: var(--bg); font-family: system-ui, sans-serif; }
        /* ... mais estilos */
    </style>
</head>
<body>
    <!-- Header com logo -->
    <!-- Cards de serviços -->
    <!-- Status badges -->
    <!-- Scripts Bootstrap -->
</body>
</html>
```

### Estrutura da Página

1. **Header** - Logo, título, subtítulo
2. **Status Badge** - Verde "All Systems Online"
3. **Cards de Serviços** - Apache, MySQL, Node.js, Tomcat, phpMyAdmin
4. **Footer** - Créditos

## 4.3 Node.js API Page

A página da API é served pelo próprio Node.js em `/var/www/html/server.js`.

```javascript
const HTML = `<!DOCTYPE html>
<html>
<head>
    <title>Node.js API</title>
    <!-- Bootstrap -->
</head>
<body>
    <h1>Node.js API</h1>
    <div class="card">
        <h3>GET /api/status</h3>
        <p>Status do servidor</p>
    </div>
    <!-- Endpoint examples -->
    <pre id="output">Carregando...</pre>
    <script>
        fetch('/api/status')
            .then(r => r.json())
            .then(d => document.getElementById('output').textContent = JSON.stringify(d, null, 2));
    </script>
</body>
</html>`;
```

## 4.4 Cards de Serviço

```html
<div class="card">
    <div class="d-flex align-items-center gap-3 mb-3">
        <div class="service-icon">
            <i class="bi bi-server text-primary"></i>
        </div>
        <div>
            <h5 class="mb-1">Apache</h5>
            <p class="text-muted mb-0">Web Server</p>
        </div>
        <span class="badge bg-success ms-auto">Online</span>
    </div>
    <a href="http://localhost" class="btn btn-outline-primary btn-sm">
        <i class="bi bi-box-arrow-up-right"></i> Acessar
    </a>
</div>
```

## 4.5 phpMyAdmin

O phpMyAdmin é served pelo Apache via symlink:

```bash
ln -sf /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

Acessível em: http://localhost/phpmyadmin

## Checklist

- [ ] Tema claro definido com CSS variables
- [ ] Landing page com Bootstrap 5
- [ ] Cards de serviços com ícones
- [ ] Status badges funcionais
- [ ] Links para todos os serviços
- [ ] Node.js API page com documentação

## Próximo Passo

[05-ETAPA-DEBUGGING.md](05-ETAPA-DEBUGGING.md)