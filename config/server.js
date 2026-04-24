const http = require('http');

const PORT = 3000;

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js API - Super XAMPP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #64748b;
            --dark: #0f172a;
            --dark-light: #1e293b;
            --light: #f8fafc;
            --success: #22c55e;
            --info: #3b82f6;
        }
        body {
            background: linear-gradient(135deg, var(--dark) 0%, var(--dark-light) 100%);
            min-height: 100vh;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .hero-section {
            padding: 60px 0;
            text-align: center;
            background: linear-gradient(180deg, rgba(65, 165, 94, 0.1) 0%, transparent 100%);
        }
        .logo-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #41a54e 0%, #2d7a35 100%);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 25px;
            box-shadow: 0 20px 40px rgba(65, 165, 94, 0.3);
        }
        .logo-icon i { font-size: 40px; color: white; }
        .hero-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: white;
            margin-bottom: 15px;
            letter-spacing: -0.02em;
        }
        .hero-subtitle {
            font-size: 1.1rem;
            color: var(--secondary);
            max-width: 500px;
            margin: 0 auto;
        }
        .status-bar {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.2);
            padding: 8px 20px;
            border-radius: 50px;
            margin-top: 25px;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            background: var(--success);
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .status-text { color: var(--success); font-weight: 600; font-size: 0.9rem; }
        .api-section { margin-top: 40px; }
        .api-card {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 25px;
            margin-bottom: 20px;
        }
        .api-title {
            color: white;
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .api-title .badge {
            background: var(--success);
            font-size: 0.75rem;
            font-weight: 600;
        }
        .endpoint {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            margin-bottom: 10px;
        }
        .endpoint-method {
            font-weight: 700;
            font-size: 0.8rem;
            padding: 4px 10px;
            border-radius: 6px;
            min-width: 60px;
            text-align: center;
        }
        .method-get { background: rgba(59, 130, 246, 0.2); color: var(--info); }
        .method-post { background: rgba(34, 197, 94, 0.2); color: var(--success); }
        .endpoint-path { color: white; font-family: monospace; font-size: 0.95rem; }
        .endpoint-desc { color: var(--secondary); font-size: 0.85rem; margin-top: 5px; }
        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            margin-bottom: 30px;
        }
        .back-link:hover { color: white; }
        .json-response {
            background: rgba(0, 0, 0, 0.4);
            border-radius: 8px;
            padding: 20px;
            font-family: monospace;
            font-size: 0.9rem;
            color: #a5f3fc;
            white-space: pre-wrap;
            overflow-x: auto;
        }
        .footer { text-align: center; padding: 40px 0; color: var(--secondary); font-size: 0.85rem; }
        @media (max-width: 768px) { .hero-title { font-size: 1.8rem; } }
    </style>
</head>
<body>
    <div class="container py-5">
        <a href="http://localhost/" class="back-link">
            <i class="bi bi-arrow-left"></i> Voltar ao Super XAMPP
        </a>
        <section class="hero-section">
            <div class="logo-icon"><i class="bi bi-code-slash"></i></div>
            <h1 class="hero-title">Node.js API</h1>
            <p class="hero-subtitle">Runtime JavaScript server-side para APIs e aplicações backend.</p>
            <div class="status-bar">
                <span class="status-dot"></span>
                <span class="status-text">Servidor online</span>
            </div>
        </section>
        <section class="api-section">
            <div class="api-card">
                <h3 class="api-title">
                    <i class="bi bi-database"></i>
                    Endpoints Disponíveis
                    <span class="badge">JSON</span>
                </h3>
                <div class="endpoint">
                    <span class="endpoint-method method-get">GET</span>
                    <div>
                        <code class="endpoint-path">http://localhost:3000/</code>
                        <p class="endpoint-desc">Esta página</p>
                    </div>
                </div>
                <div class="endpoint">
                    <span class="endpoint-method method-get">GET</span>
                    <div>
                        <code class="endpoint-path">http://localhost:3000/api/status</code>
                        <p class="endpoint-desc">Status do servidor</p>
                    </div>
                </div>
                <div class="endpoint">
                    <span class="endpoint-method method-get">GET</span>
                    <div>
                        <code class="endpoint-path">http://localhost:3000/api/health</code>
                        <p class="endpoint-desc">Health check</p>
                    </div>
                </div>
                <div class="endpoint">
                    <span class="endpoint-method method-get">GET</span>
                    <div>
                        <code class="endpoint-path">http://localhost:3000/api/info</code>
                        <p class="endpoint-desc">Informações do sistema</p>
                    </div>
                </div>
            </div>
            <div class="api-card">
                <h3 class="api-title"><i class="bi bi-terminal"></i> Exemplo de Resposta</h3>
                <div class="json-response" id="example-response">Carregando...</div>
            </div>
        </section>
        <footer class="footer"><p>Node.js API - Super XAMPP</p></footer>
    </div>
    <script>
        fetch('/api/status')
            .then(r => r.json())
            .then(data => {
                document.getElementById('example-response').textContent = JSON.stringify(data, null, 2);
            })
            .catch(err => {
                document.getElementById('example-response').textContent = JSON.stringify({error: err.message}, null, 2);
            });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

const JSON_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(HTML_CONTENT);
    } else if (url === '/api/status') {
        res.writeHead(200, JSON_HEADERS);
        res.end(JSON.stringify({
            status: 'online',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            version: '1.0.0'
        }));
    } else if (url === '/api/health') {
        res.writeHead(200, JSON_HEADERS);
        res.end(JSON.stringify({ healthy: true, timestamp: new Date().toISOString() }));
    } else if (url === '/api/info') {
        res.writeHead(200, JSON_HEADERS);
        res.end(JSON.stringify({
            platform: process.platform,
            nodeVersion: process.version,
            pid: process.pid,
            timestamp: new Date().toISOString()
        }));
    } else if (url === '/api/endpoints') {
        res.writeHead(200, JSON_HEADERS);
        res.end(JSON.stringify({
            endpoints: [
                { method: 'GET', path: '/', description: 'This page' },
                { method: 'GET', path: '/api/status', description: 'Server status' },
                { method: 'GET', path: '/api/health', description: 'Health check' },
                { method: 'GET', path: '/api/info', description: 'System info' }
            ]
        }));
    } else {
        res.writeHead(404, JSON_HEADERS);
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
    }
});

server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});