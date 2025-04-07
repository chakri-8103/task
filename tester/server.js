const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080, host: "0.0.0.0" });

let clientCount = 0;
const clients = new Map();

wss.on("connection", (ws, req) => {
    let clientIp = req.socket.remoteAddress.replace(/^::ffff:/, "");
    clientCount++;
    clients.set(ws, { ip: clientIp, number: clientCount });

    const connectedClients = [...clients.values()]
        .map(client => `${client.ip}`)
        .join(" , ");

    console.log(`🔵 CONNECTED ${clientIp} \nTOTAL COUNT ${clientCount}`);

    ws.on("message", (message) => {
        const msgText = message.toString(); // ✅ Ensure it's a string
        console.log(`📩 MESSAGE Client ${clients.get(ws).number} ➜ ${clientIp}: ${msgText}`);

        const recipientIps = [];

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msgText); // ✅ Always send as string
                recipientIps.push(clients.get(client)?.ip || "unknown");
            }
        });

        console.log(`📢 BROADCAST Sent message from ${clientIp} to ${recipientIps.join(" , ")}`);
    });

    ws.on("close", () => {
        console.log(`❌ DISCONNECTED Client ${clients.get(ws).number} ${clientIp}`);
        clients.delete(ws);
        clientCount--;

        const updatedClients = [...clients.values()]
            .map(client => `${client.ip}`)
            .join(" | ") || "None";

        console.log(`TOTAL COUNT ${clientCount}`);
    });
});

console.log("✅ SERVER STARTED WebSocket Server running on ws://0.0.0.0:8080");




// // Connected IP's  ${connectedClients}



// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8080, host: "0.0.0.0" });

// let clientCounter = 0;
// const clients = new Map();

// wss.on("connection", (ws) => {
//     clientCounter++;
//     const clientNumber = clientCounter;
//     clients.set(ws, clientNumber);

//     console.log(`🔵 CONNECTED: Client ${clientNumber}`);

//     ws.on("message", (message) => {
//         console.log(`📩 MESSAGE from Client ${clientNumber}: ${message}`);

//         // Broadcast message to all connected clients
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     });

//     ws.on("close", () => {
//         console.log(`❌ DISCONNECTED: Client ${clientNumber}`);
//         clients.delete(ws);
//     });
// });

// console.log("✅ WebSocket server running on ws://0.0.0.0:8080");




// working
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({ port: 8080, host: "0.0.0.0" });

// let clientCount = 0;
// const clients = new Map();

// wss.on("connection", (ws, req) => {
//     let clientIp = req.socket.remoteAddress.replace(/^::ffff:/, "");
//     clientCount++;
//     clients.set(ws, { ip: clientIp, number: clientCount });

//     console.log(`🔵 CONNECTED CLIENT
//     TOTAL COUNT ${clientCount}`);

//     ws.on("message", (message) => {
//         console.log(
//             `📩 MESSAGE Client ${clients.get(ws).number} ➜ : ${message}`,
//         );

//         const recipientIps = [];
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 recipientIps.push(clients.get(client)?.ip || "Unknown");
//                 client.send("Are you Intersted to join the Meeting");
//             }
//         });
//     });

//     ws.on("close", () => {
//         console.log(`❌ DISCONNECTED Client ${clients.get(ws).number}`);
//         clients.delete(ws);
//         clientCount--;

//         console.log(`TOTAL COUNT ${clientCount}`);
//     });
// });

// console.log("✅ SERVER STARTED WebSocket Server running on ws://0.0.0.0:8080");
