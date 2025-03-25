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

    // Advanced Chatbot with Spelling Correction and Fuzzy Matching
class EcommerceChatbot {
    constructor() {
        // Predefined response categories
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

// Product Search Functionality
class ProductSearch {
    constructor(products) {
        this.products = products;
    }

    // Search products by name or category
    searchProducts(query) {
        query = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.category.toLowerCase().includes(query)
        );
    }

    // Filter products by price range
    filterByPrice(minPrice, maxPrice) {
        return this.products.filter(product => 
            product.price >= minPrice && product.price <= maxPrice
        );
    }

    // Sort products by different criteria
    sortProducts(criteria = 'price', ascending = true) {
        return [...this.products].sort((a, b) => {
            if (ascending) {
                return a[criteria] - b[criteria];
            } else {
                return b[criteria] - a[criteria];
            }
        });
    }
}

// Cart Management
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Add item to cart
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Calculate total cart value
    calculateTotal() {
        return this.items.reduce((total, item) => 
            total + (item.product.price * item.quantity), 0
        );
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
    }
}

// Example Usage
const chatbot = new EcommerceChatbot();
const productSearch = new ProductSearch([
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 99.99 },
    { id: 2, name: "Smart Watch", category: "Electronics", price: 199.99 },
    { id: 3, name: "Leather Wallet", category: "Accessories", price: 49.99 }
]);
const cart = new ShoppingCart();

// Demonstration
console.log(chatbot.handleUserInput("Helo, I wnt to find a prodct"));
console.log(productSearch.searchProducts("Electronics"));
cart.addItem(productSearch.products[0]);
console.log(cart.calculateTotal());
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
