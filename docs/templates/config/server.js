const http = require('http');

const PORT = 3000;

const HTML = `<!DOCTYPE html>
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
            --success: #22c55e;
            --bg: #f8fafc;
            --bg-card: #ffffff;
            --text: #1e293b;
            --text-muted: #64748b;
        }
        body { background: var(--bg); font-family: system-ui, sans-serif; color: var(--text); }
        .header { text-align: center; padding: 60px 0 40px; }
        .logo {
            width: 64px; height: 64px;
            background: linear-gradient(135deg, #41a54e, #2d7a35);
            border-radius: 16px; display: flex; align-items: center; justify-content: center;
            margin: 0 auto 20px; font-size: 28px;
        }
        h1 { font-size: 2rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .subtitle { color: var(--text-muted); }
        .status {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3);
            padding: 8px 20px; border-radius: 50px; margin-top: 20px;
            color: var(--success); font-size: 0.9rem; font-weight: 600;
        }
        .status-dot { width: 8px; height: 8px; background: var(--success); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .card {
            background: var(--bg-card); border: 1px solid #e2e8f0; border-radius: 16px;
            padding: 24px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        h3 { font-size: 1rem; font-weight: 600; color: var(--text); margin-bottom: 12px; }
        .method {
            display: inline-block; padding: 4px 12px; border-radius: 6px;
            background: rgba(59, 130, 246, 0.1); color: #3b82f6; font-size: 0.8rem; font-weight: 700;
        }
        .path { font-family: monospace; color: var(--text); font-size: 0.95rem; }
        .desc { color: var(--text-muted); font-size: 0.85rem; margin-top: 4px; }
        pre {
            background: #1e293b; color: #a5f3fc; padding: 16px; border-radius: 8px;
            font-size: 0.85rem; overflow-x: auto;
        }
        .back { color: var(--primary); text-decoration: none; font-weight: 500; }
        .back:hover { color: #4f46e5; }
        footer { text-align: center; padding: 40px 0; color: var(--text-muted); font-size: 0.85rem; }
    </style>
</head>
<body>
    <div class="container">
        <a href="http://localhost/super-xampp/" class="back mb-4 d-inline-flex align-items-center gap-2">
            <i class="bi bi-arrow-left"></i> Voltar
        </a>
        
        <div class="header">
            <div class="logo"><i class="bi bi-braces text-white"></i></div>
            <h1>Node.js API</h1>
            <p class="subtitle">Endpoints disponíveis</p>
            <div class="status">
                <span class="status-dot"></span> Online
            </div>
        </div>
        
        <div class="card">
            <h3><i class="bi bi-list-ul"></i> Endpoints</h3>
            <div class="mb-3">
                <span class="method">GET</span>
                <div class="path">/api/status</div>
                <div class="desc">Status do servidor</div>
            </div>
            <div class="mb-3">
                <span class="method">GET</span>
                <div class="path">/api/time</div>
                <div class="desc">Horário atual</div>
            </div>
            <div>
                <span class="method">GET</span>
                <div class="path">/api/random</div>
                <div class="desc">Número aleatório</div>
            </div>
        </div>
        
        <div class="card">
            <h3><i class="bi bi-terminal"></i> Exemplo</h3>
            <pre id="output">Carregando...</pre>
        </div>
        
        <footer>Node.js API • Super XAMPP</footer>
    </div>
    <script>
        fetch('/api/status')
            .then(r => r.json())
            .then(d => document.getElementById('output').textContent = JSON.stringify(d, null, 2));
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    
    if (u === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(HTML);
    } else if (u === '/api/status') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ status: 'online', uptime: Math.floor(process.uptime()), version: '1.0.0' }));
    } else if (u === '/api/time') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ timestamp: new Date().toISOString(), unix: Date.now() }));
    } else if (u === '/api/random') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ number: Math.floor(Math.random() * 1000) }));
    } else {
        res.writeHead(404, HEADERS);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
}).listen(PORT, () => console.log('Server on ' + PORT));