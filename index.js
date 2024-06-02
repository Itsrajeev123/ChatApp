const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Setup
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve index.html on root request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming message
    socket.on('chat message', ({ username, message }) => {
        io.emit('chat message', { username, message });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


