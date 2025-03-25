(function () {
    // Create chat toggle button
    const chatToggleButton = document.createElement("button");
    chatToggleButton.innerHTML = "💬";
    chatToggleButton.style.position = "fixed";
    chatToggleButton.style.bottom = "20px";
    chatToggleButton.style.right = "20px";
    chatToggleButton.style.width = "60px";
    chatToggleButton.style.height = "60px";
    chatToggleButton.style.borderRadius = "50%";
    chatToggleButton.style.backgroundColor = "#007bff";
    chatToggleButton.style.color = "white";
    chatToggleButton.style.border = "none";
    chatToggleButton.style.fontSize = "24px";
    chatToggleButton.style.cursor = "pointer";
    chatToggleButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    chatToggleButton.style.zIndex = "1000";

    // Create chat container
    const chatContainer = document.createElement("div");
    chatContainer.id = "chat-container";
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "100px";
    chatContainer.style.right = "20px";
    chatContainer.style.width = "350px";
    chatContainer.style.height = "500px";
    chatContainer.style.backgroundColor = "white";
    chatContainer.style.border = "1px solid #ccc";
    chatContainer.style.borderRadius = "15px";
    chatContainer.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
    chatContainer.style.overflow = "hidden";
    chatContainer.style.display = "none";
    chatContainer.style.flexDirection = "column";
    chatContainer.style.fontFamily = "Arial, sans-serif";

    // Chat header
    const chatHeader = document.createElement("div");
    chatHeader.style.backgroundColor = "#007bff";
    chatHeader.style.color = "white";
    chatHeader.style.padding = "10px";
    chatHeader.style.display = "flex";
    chatHeader.style.justifyContent = "space-between";
    chatHeader.style.alignItems = "center";
    chatHeader.innerHTML = `
        <span>Chat Assistant</span>
        <button id="close-chat" style="background:none; border:none; color:white; font-size:20px; cursor:pointer;">✖</button>
    `;

    // Chat messages area
    const chatMessages = document.createElement("div");
    chatMessages.id = "chat-messages";
    chatMessages.style.flex = "1";
    chatMessages.style.padding = "15px";
    chatMessages.style.overflowY = "auto";
    chatMessages.style.backgroundColor = "#f8f9fa";

    // Input area
    const inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.style.padding = "10px";
    inputContainer.style.backgroundColor = "white";
    inputContainer.style.borderTop = "1px solid #e0e0e0";

    const chatInput = document.createElement("input");
    chatInput.id = "chat-input";
    chatInput.placeholder = "Type a message...";
    chatInput.style.flex = "1";
    chatInput.style.border = "1px solid #ced4da";
    chatInput.style.borderRadius = "20px";
    chatInput.style.padding = "10px";
    chatInput.style.marginRight = "10px";

    const sendButton = document.createElement("button");
    sendButton.innerHTML = "Send";
    sendButton.style.backgroundColor = "#007bff";
    sendButton.style.color = "white";
    sendButton.style.border = "none";
    sendButton.style.borderRadius = "20px";
    sendButton.style.padding = "10px 20px";
    sendButton.style.cursor = "pointer";

    // Append elements
    inputContainer.appendChild(chatInput);
    inputContainer.appendChild(sendButton);

    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(chatMessages);
    chatContainer.appendChild(inputContainer);

    document.body.appendChild(chatToggleButton);
    document.body.appendChild(chatContainer);

    // Toggle chat visibility
    chatToggleButton.addEventListener("click", () => {
        if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
            chatContainer.style.display = "flex";
            chatInput.focus();
        } else {
            chatContainer.style.display = "none";
        }
    });

    // Close chat button
    document.getElementById("close-chat").addEventListener("click", () => {
        chatContainer.style.display = "none";
    });

    // Message sending function
    function addMessage(sender, message, type = "text") {
        const messageDiv = document.createElement("div");
        messageDiv.style.marginBottom = "10px";
        messageDiv.style.display = "flex";
        messageDiv.style.justifyContent = sender === "Bot" ? "flex-start" : "flex-end";

        const messageBubble = document.createElement("div");
        messageBubble.style.maxWidth = "80%";
        messageBubble.style.padding = "10px 15px";
        messageBubble.style.borderRadius = "15px";
        messageBubble.style.fontSize = "14px";

        if (sender === "Bot") {
            messageBubble.style.backgroundColor = "#e9ecef";
            messageBubble.style.color = "black";
        } else {
            messageBubble.style.backgroundColor = "#007bff";
            messageBubble.style.color = "white";
        }

        messageBubble.textContent = message;
        messageDiv.appendChild(messageBubble);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Bot response function with more advanced responses
    function botResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response;

        const responses = {
            "hello": ["Hi there!", "Hello!", "Greetings!"],
            "how are you": ["I'm doing great!", "All good here!", "Feeling awesome!"],
            "bye": ["Goodbye!", "See you later!", "Take care!"],
            "help": ["How can I assist you today?", "I'm here to help!", "What do you need?"]
        };

        // Find a matching response
        for (const [key, options] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                response = options[Math.floor(Math.random() * options.length)];
                break;
            }
        }

        // Default response
        if (!response) {
            response = "I'm a simple chatbot. Try saying hello, how are you, or bye!";
        }

        // Simulate typing delay
        setTimeout(() => addMessage("Bot", response), 500);
    }

    // Send message on button click
    sendButton.addEventListener("click", sendMessage);

    // Send message on Enter key
    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Send message function
    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage("You", userMessage);
            chatInput.value = "";
            botResponse(userMessage);
        }
    }
})();
