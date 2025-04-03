const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let clientCount = 0;
const clients = new Map();

wss.on("connection", (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    clientCount++;
    clients.set(ws, { ip: clientIp, number: clientCount });
    
    console.log(`🔵 [INFO] New system connected! Client ${clientCount} (IP: ${clientIp}) | Total Clients: ${clientCount}`);

    ws.on("message", (message) => {
        console.log(`📩 [MESSAGE] Received from Client ${clients.get(ws).number} (IP: ${clientIp}): ${message}`);

        // Send message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                console.log("📢 [BROADCAST] Sending message to all clients...");
                client.send("All the Best for Exam!");
            }
        });
    });

    ws.on("close", () => {
        console.log(`❌ [DISCONNECT] Client ${clients.get(ws).number} (IP: ${clientIp}) disconnected! Total Clients: ${clientCount - 1}`);
        clients.delete(ws);
        clientCount--;
    });
});

console.log("✅ [SERVER STARTED] WebSocket Server running on ws://10.70.9.141:8080");
