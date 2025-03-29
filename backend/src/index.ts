import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    const interval = setInterval(() => {
        ws.ping();
    }, 30000); // Every 30 seconds

    gameManager.addUser(ws);

    ws.on('disconnect', () => gameManager.removeUser(ws));
});