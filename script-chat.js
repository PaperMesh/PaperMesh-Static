(function () {
    // Create chat button
    let chatButton = document.createElement("button");
    chatButton.id = "chat-button";
    chatButton.innerHTML = "💬";
    chatButton.style.position = "fixed";
    chatButton.style.bottom = "20px";
    chatButton.style.right = "20px";
    chatButton.style.backgroundColor = "#007bff";
    chatButton.style.color = "white";
    chatButton.style.border = "none";
    chatButton.style.borderRadius = "50%";
    chatButton.style.width = "60px";
    chatButton.style.height = "60px";
    chatButton.style.fontSize = "24px";
    chatButton.style.cursor = "pointer";
    chatButton.style.display = "flex";
    chatButton.style.alignItems = "center";
    chatButton.style.justifyContent = "center";
    chatButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    
    document.body.appendChild(chatButton);

    chatButton.addEventListener("click", function () {
        if (document.getElementById("chat-container")) return; // Prevent multiple instances

        // Create chat container
        let chatContainer = document.createElement("div");
        chatContainer.id = "chat-container";
        chatContainer.style.position = "fixed";
        chatContainer.style.bottom = "80px";
        chatContainer.style.right = "20px";
        chatContainer.style.width = "300px";
        chatContainer.style.height = "400px";
        chatContainer.style.backgroundColor = "white";
        chatContainer.style.border = "1px solid #ccc";
        chatContainer.style.borderRadius = "10px";
        chatContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        chatContainer.style.overflow = "hidden";
        chatContainer.style.display = "flex";
        chatContainer.style.flexDirection = "column";
        chatContainer.style.fontFamily = "Arial, sans-serif";

        // Chat messages
        let chatMessages = document.createElement("div");
        chatMessages.id = "chat-messages";
        chatMessages.style.flex = "1";
        chatMessages.style.padding = "10px";
        chatMessages.style.overflowY = "auto";

        // Input field
        let chatInput = document.createElement("input");
        chatInput.id = "chat-input";
        chatInput.placeholder = "Type a message...";
        chatInput.style.width = "100%";
        chatInput.style.border = "none";
        chatInput.style.padding = "10px";
        chatInput.style.boxSizing = "border-box";

        chatInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                let userMessage = chatInput.value.trim();
                if (userMessage) {
                    addMessage("You", userMessage);
                    chatInput.value = "";
                    botResponse(userMessage);
                }
            }
        });

        // Close button
        let closeButton = document.createElement("button");
        closeButton.innerHTML = "✖";
        closeButton.style.position = "absolute";
        closeButton.style.top = "5px";
        closeButton.style.right = "5px";
        closeButton.style.border = "none";
        closeButton.style.background = "transparent";
        closeButton.style.cursor = "pointer";
        closeButton.style.fontSize = "18px";
        closeButton.style.color = "#888";
        
        closeButton.addEventListener("click", function () {
            document.body.removeChild(chatContainer);
        });

        // Append elements
        chatContainer.appendChild(closeButton);
        chatContainer.appendChild(chatMessages);
        chatContainer.appendChild(chatInput);
        document.body.appendChild(chatContainer);

        function addMessage(sender, message) {
            let messageDiv = document.createElement("div");
            messageDiv.textContent = `${sender}: ${message}`;
            messageDiv.style.marginBottom = "5px";
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function botResponse(userMessage) {
            let response;
            if (userMessage.toLowerCase().includes("hello")) {
                response = "Hi there! How can I help you?";
            } else if (userMessage.toLowerCase().includes("how are you")) {
                response = "I'm just a bot, but I'm doing great! 😊";
            } else if (userMessage.toLowerCase().includes("bye")) {
                response = "Goodbye! Have a great day! 👋";
            } else {
                response = "I'm just a simple chatbot. Try saying 'hello' or 'how are you'.";
            }
            setTimeout(() => addMessage("Bot", response), 500);
        }
    });
})();
