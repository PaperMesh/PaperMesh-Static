/**
 * E-Commerce User Support & Data Management Script
 * This script will:
 * 1. Fetch user details if logged in (without API calls).
 * 2. Handle customer queries (orders, delivery, payment, errors, etc.).
 * 3. Redirect to customer support if no solution is found.
 * 4. Log user interactions locally for analytics.
 * 5. Can be hosted on GitHub & used on your website.
 */
class UserCustomChatbot {
    constructor() {
        // Configuration
        this.config = {
            dbName: 'UserChatbotDB',
            version: 1,
            storagePrefix: 'user_chatbot_'
        };

        // Response Templates (previous implementation remains the same)
        this.responseTemplates = {
            // ... (previous response templates remain unchanged)
        };

        // Initialize methods
        this.initializeDatabase();
        this.createChatbotToggleButton();
        this.initializeChatbotUI();
    }

    // Create Chatbot Toggle Button
    createChatbotToggleButton() {
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'chatbot-toggle-container';

        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'chatbot-toggle-btn';
        toggleButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
        `;

        // Add styling to button container
        buttonContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        `;

        // Add button styling
        toggleButton.style.cssText = `
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
        `;

        // Hover and active states
        toggleButton.addEventListener('mouseenter', () => {
            toggleButton.style.transform = 'scale(1.1)';
            toggleButton.style.backgroundColor = '#45a049';
        });

        toggleButton.addEventListener('mouseleave', () => {
            toggleButton.style.transform = 'scale(1)';
            toggleButton.style.backgroundColor = '#4CAF50';
        });

        // Toggle chatbot visibility
        toggleButton.addEventListener('click', () => {
            const chatbotContainer = document.getElementById('custom-chatbot-container');
            if (chatbotContainer) {
                chatbotContainer.style.display = 
                    chatbotContainer.style.display === 'none' ? 'block' : 'none';
            }
        });

        // Append button to body
        buttonContainer.appendChild(toggleButton);
        document.body.appendChild(buttonContainer);
    }

    // Existing Chatbot UI Initialization
    initializeChatbotUI() {
        // Create chatbot container
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'custom-chatbot-container';
        chatbotContainer.style.display = 'none'; // Initially hidden
        chatbotContainer.innerHTML = `
            <div id="chatbot-header">
                User Assistant
                <button id="chatbot-close-btn" style="
                    float: right;
                    background: none;
                    border: none;
                    color: #666;
                    font-size: 20px;
                    cursor: pointer;
                ">×</button>
            </div>
            <div id="chatbot-messages"></div>
            <div id="chatbot-input-container">
                <input type="text" id="chatbot-input" placeholder="Ask about orders, delivery, profile...">
                <button id="chatbot-send">Send</button>
            </div>
        `;
        document.body.appendChild(chatbotContainer);

        // Add close button functionality
        const closeButton = chatbotContainer.querySelector('#chatbot-close-btn');
        closeButton.addEventListener('click', () => {
            chatbotContainer.style.display = 'none';
        });

        // Add existing styles and event listeners
        this.addChatbotStyles();
        this.attachEventListeners();
    }

    // Rest of the previous implementation remains the same
    // (All previous methods like initializeDatabase, handleUserMessage, 
    // processUserMessage, etc. remain unchanged)

    // Optional: Add a method to programmatically open/close chatbot
  

const UserSupportBot = (function () {
    let userData = null;

    function fetchUserData() {
        if (localStorage.getItem("user")) {
            userData = JSON.parse(localStorage.getItem("user"));
            console.log("User Data Loaded:", userData);
        } else {
            console.warn("User not logged in");
        }
    }

    function handleUserQuery(query) {
        console.log("User Query:", query);
        
        let responses = {
            "order status": "Your order is being processed. Check your account for details.",
            "delivery time": "Standard delivery takes 3-5 business days.",
            "payment options": "We accept UPI, credit cards, and cash on delivery.",
            "return policy": "You can return products within 7 days. Check return policy for more details."
        };
        
        let response = responses[query.toLowerCase()] || "Sorry, I don’t understand. Redirecting to customer support...";
        
        if (response.includes("Redirecting to customer support")) {
            redirectToSupport();
        }

        logUserInteraction(query, response);
        return response;
    }

    function redirectToSupport() {
        window.location.href = "https://your-website.com/support";
    }

    function logUserInteraction(query, response) {
        let logs = JSON.parse(localStorage.getItem("chat_logs")) || [];
        logs.push({ query, response, timestamp: new Date().toISOString() });
        localStorage.setItem("chat_logs", JSON.stringify(logs));
    }

    return {
        init: fetchUserData,
        ask: function (query) {
            return handleUserQuery(query);
        },
    };
})();
  toggleChatbot(forceState = null) {
        const chatbotContainer = document.getElementById('custom-chatbot-container');
        if (chatbotContainer) {
            if (forceState !== null) {
                chatbotContainer.style.display = forceState ? 'block' : 'none';
            } else {
                chatbotContainer.style.display = 
                    chatbotContainer.style.display === 'none' ? 'block' : 'none';
            }
        }
    }
}

// Initialize the Custom Chatbot
const userCustomChatbot = new UserCustomChatbot();

// Export for potential module usage
export default userCustomChatbot;

// Optional: Add global access method
window.toggleUserChatbot = () => {
    userCustomChatbot.toggleChatbot();
};
// Initialize script on page load
window.addEventListener("load", UserSupportBot.init);
