const socket = io(); // Automatically connects to the server on localhost:3000

// Assume the client has a unique ID (e.g., socket.id or a user-specific ID)
let userId;

socket.on('connect', () => {
    // Get the unique ID of the socket connection
    userId = socket.id;
});

// Send a message to the server
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value;

    if (messageText.trim()) {
        // Send the message along with the user ID
        socket.emit('message', { text: messageText, senderId: userId });

        // Add the sent message to the UI
        addMessage('sent', messageText);
        messageInput.value = ''; // Clear the input field
    }
}

// Receive messages from the server
socket.on('message', (message) => {
    // Check if the message is from the current user or another user
    if (message.senderId === userId) {
        // It's a message sent by this client, no need to display as "received"
        return;
    }

    // Add the received message to the UI
    addMessage('received', message.text);
});

// Function to add a message to the UI
function addMessage(type, messageText) {
    const chat = document.getElementById('chat');

    // Create a new message div
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.innerText = messageText;

    // Append the message to the chat container
    chat.appendChild(messageDiv);

    // Scroll to the bottom of the chat
    chat.scrollTop = chat.scrollHeight;
}
