const express = require('express');
const http = require('http');
const net = require('net');
const next = require('next');
const { Server } = require('socket.io');

const requestedPort = Number(process.env.PORT || 3000);
const hostname = '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';

function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(error);
      }
    });
    probe.listen(startPort, hostname, () => {
      probe.close(() => resolve(startPort));
    });
  });
}

findAvailablePort(requestedPort).then((port) => {
  const nextApp = next({
    dev,
    hostname,
    port,
  });
  const handle = nextApp.getRequestHandler();

  return nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('join-room', (room) => {
      if (room) socket.join(room);
    });

    socket.on('chat-message', (payload) => {
      const { room, ...message } = payload || {};
      if (room) {
        io.to(room).emit('chat-message', message);
      }
    });
  });

  app.use(express.json({ limit: '2mb' }));

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      ok: true,
      port,
      attemptedPort: requestedPort,
      wrapper: 'custom',
      buildable: true,
      auth: 'supabase-ssr-middleware',
      env: dev ? 'development' : 'production',
      timestamp: new Date().toISOString(),
    });
  });

  app.all('*', (req, res) => handle(req, res));

  server.listen(port, hostname, () => {
    console.log(`> ✅ Wrapper listening on http://localhost:${port} (attempted ${requestedPort})`);
    if (port !== requestedPort) {
      console.log(`> ⚠️ Port ${requestedPort} was busy - advanced to ${port} successfully`);
    }
  });
}).catch((error) => {
  console.error('Failed to start app server:', error);
  process.exit(1);
});
});
