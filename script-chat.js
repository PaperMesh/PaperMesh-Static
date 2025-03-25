(function () {
    // Unique wrapper to prevent global scope pollution
    if (window.ChatWidgetInitialized) return;
    window.ChatWidgetInitialized = true;

    // Ensure the script runs after the DOM is fully loaded
    function initializeChatWidget() {
        // Create chat toggle button
        const chatToggleButton = document.createElement("button");
        chatToggleButton.innerHTML = "💬";
        chatToggleButton.id = "chat-toggle-button";
        chatToggleButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #007bff;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: block;
            outline: none;
        `;

        // Create chat container
        const chatContainer = document.createElement("div");
        chatContainer.id = "chat-container";
        chatContainer.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 350px;
            height: 500px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 15px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            display: none;
            flex-direction: column;
            font-family: Arial, sans-serif;
            z-index: 1001;
        `;

        // Chat header
        const chatHeader = document.createElement("div");
        chatHeader.style.cssText = `
            background-color: #007bff;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        chatHeader.innerHTML = `
            <span>Chat Assistant</span>
            <button id="close-chat" style="background:none; border:none; color:white; font-size:20px; cursor:pointer;">✖</button>
        `;

        // Chat messages area
        const chatMessages = document.createElement("div");
        chatMessages.id = "chat-messages";
        chatMessages.style.cssText = `
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background-color: #f8f9fa;
        `;

        // Input area
        const inputContainer = document.createElement("div");
        inputContainer.style.cssText = `
            display: flex;
            padding: 10px;
            background-color: white;
            border-top: 1px solid #e0e0e0;
        `;

        const chatInput = document.createElement("input");
        chatInput.id = "chat-input";
        chatInput.placeholder = "Type a message...";
        chatInput.style.cssText = `
            flex: 1;
            border: 1px solid #ced4da;
            border-radius: 20px;
            padding: 10px;
            margin-right: 10px;
        `;

        const sendButton = document.createElement("button");
        sendButton.innerHTML = "Send";
        sendButton.style.cssText = `
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 10px 20px;
            cursor: pointer;
        `;

        // Append elements
        inputContainer.appendChild(chatInput);
        inputContainer.appendChild(sendButton);

        chatContainer.appendChild(chatHeader);
        chatContainer.appendChild(chatMessages);
        chatContainer.appendChild(inputContainer);

        // Append to body
        document.body.appendChild(chatToggleButton);
        document.body.appendChild(chatContainer);

        // Advanced Chatbot Class
        class EcommerceChatbot {
            constructor() {
                this.responses = {
                    greeting: {
                        keywords: ["hello", "hi", "hey", "greetings"],
                        responses: [
                            "Welcome to our store! How can I help you today?",
                            "Hi there! What can I assist you with?",
                            "Hello! Ready to find something amazing?"
                        ]
                    },
                    product_inquiry: {
                        keywords: ["product", "item", "looking for", "find"],
                        responses: [
                            "I'd be happy to help you find the perfect product!",
                            "What specific item are you interested in?",
                            "Our catalog has a wide range of products. What are you searching for?"
                        ]
                    },
                    order_status: {
                        keywords: ["order", "shipping", "delivery", "track"],
                        responses: [
                            "To check your order status, please provide your order number.",
                            "I can help you track your recent purchase.",
                            "What order would you like to inquire about?"
                        ]
                    },
                    pricing: {
                        keywords: ["price", "cost", "discount", "sale"],
                        responses: [
                            "We have competitive pricing and regular sales!",
                            "Let me help you find the best deals.",
                            "Discounts are available on select items."
                        ]
                    },
                    support: {
                        keywords: ["help", "problem", "issue", "support"],
                        responses: [
                            "Our support team is ready to assist you.",
                            "What problem are you experiencing?",
                            "I'm here to help resolve any issues."
                        ]
                    }
                };

                // Spelling correction dictionary
                this.spellingCorrections = {
                    "prodct": "product",
                    "shippng": "shipping",
                    "ordr": "order",
                    "delyvery": "delivery",
                    "custmer": "customer"
                };
            }

            // Spelling correction method
            correctSpelling(message) {
                let correctedMessage = message.toLowerCase();
                for (const [misspelled, correct] of Object.entries(this.spellingCorrections)) {
                    correctedMessage = correctedMessage.replace(misspelled, correct);
                }
                return correctedMessage;
            }

            // Fuzzy string matching
            fuzzyMatch(input, target, threshold = 0.7) {
                input = input.toLowerCase();
                target = target.toLowerCase();
                
                // Levenshtein distance calculation
                const levenshteinDistance = (s1, s2) => {
                    const dp = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(null));
                    
                    for (let i = 0; i <= s1.length; i++) {
                        dp[i][0] = i;
                    }
                    
                    for (let j = 0; j <= s2.length; j++) {
                        dp[0][j] = j;
                    }
                    
                    for (let i = 1; i <= s1.length; i++) {
                        for (let j = 1; j <= s2.length; j++) {
                            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                            dp[i][j] = Math.min(
                                dp[i - 1][j] + 1,
                                dp[i][j - 1] + 1,
                                dp[i - 1][j - 1] + cost
                            );
                        }
                    }
                    
                    return dp[s1.length][s2.length];
                };

                // Calculate similarity
                const distance = levenshteinDistance(input, target);
                const similarity = 1 - (distance / Math.max(input.length, target.length));
                
                return similarity >= threshold;
            }

            // Generate response method
            generateResponse(userMessage) {
                // First, correct spelling
                const correctedMessage = this.correctSpelling(userMessage);

                // Check for category matches
                for (const [category, data] of Object.entries(this.responses)) {
                    for (const keyword of data.keywords) {
                        if (this.fuzzyMatch(correctedMessage, keyword) || 
                            correctedMessage.includes(keyword)) {
                            return data.responses[Math.floor(Math.random() * data.responses.length)];
                        }
                    }
                }

                // Fallback response
                return [
                    "I'm not sure I understand. Could you rephrase that?",
                    "Can you provide more details?",
                    "I'm listening, but I didn't quite catch that."
                ][Math.floor(Math.random() * 3)];
            }

            // Method to handle user input
            handleUserInput(userMessage) {
                return this.generateResponse(userMessage);
            }
        }

        // Initialize chatbot
        const chatbotInstance = new EcommerceChatbot();

        // Add event listeners
        const closeChat = document.getElementById("close-chat");
        
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
        closeChat.addEventListener("click", () => {
            chatContainer.style.display = "none";
        });

        // Message adding function
        function addMessage(sender, message) {
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

        // Send message function
        function sendMessage() {
            const userMessage = chatInput.value.trim();
            if (userMessage) {
                // Add user message
                addMessage("You", userMessage);
                
                // Generate bot response
                const response = chatbotInstance.handleUserInput(userMessage);
                
                // Clear input
                chatInput.value = "";
                
                // Add bot response with slight delay
                setTimeout(() => {
                    addMessage("Bot", response);
                }, 500);
            }
        }

        // Send message on button click
        sendButton.addEventListener("click", sendMessage);

        // Send message on Enter key
        chatInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChatWidget);
    } else {
        initializeChatWidget();
    }
})();
