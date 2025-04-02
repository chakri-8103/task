const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let clientCount = 0;

wss.on("connection", (ws) => {
    clientCount++;
    console.log(`🔵 [INFO] New system connected! Total Clients: ${clientCount}`);

    ws.on("message", (message) => {
        console.log(`📩 [MESSAGE] Received from client: ${message}`);

        // Send message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                console.log("📢 [BROADCAST] Sending message to all clients...");
                client.send("Action Required on Your System!");
            }
        });
    });

    ws.on("close", () => {
        clientCount--;
        console.log(`❌ [DISCONNECT] A system disconnected! Total Clients: ${clientCount}`);
    });
});

console.log("✅ [SERVER STARTED] WebSocket Server running on ws://10.70.9.141:8080");
