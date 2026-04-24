const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Super XAMPP</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #1a1a2e; color: #fff; }
        h1 { color: #00ff88; }
        .info { background: #16213e; padding: 20px; border-radius: 8px; }
        a { color: #00ff88; }
      </style>
    </head>
    <body>
      <h1>Super XAMPP Server</h1>
      <div class="info">
        <p><strong>Status:</strong> Online</p>
        <p><strong>Porta:</strong> 3000 (Node.js)</p>
        <p><strong>Apache:</strong> <a href="http://localhost:80">localhost:80</a></p>
        <p><strong>MySQL:</strong> localhost:3306</p>
        <p><strong>Tomcat:</strong> <a href="http://localhost:8080">localhost:8080</a></p>
        <p><strong>phpMyAdmin:</strong> <a href="http://localhost/phpmyadmin">localhost/phpmyadmin</a></p>
      </div>
    </body>
    </html>
  `);
});

server.listen(3000, '0.0.0.0', () => {
  const msg = 'Server running on http://localhost:3000\n';
  process.stdout.write(msg);
  fs.writeFileSync('/tmp/node.log', msg);
});