// Chatbot Script Loader and Initializer
(function() {
    // Ensure the script runs after the DOM is fully loaded
    function initializeChatbot() {
        // Create Chatbot Container
        function createChatbotContainer() {
            // Main chatbot container
            const chatbotContainer = document.createElement('div');
            chatbotContainer.id = 'custom-chatbot-container';
            chatbotContainer.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                border: 1px solid #e0e0e0;
                background: white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                border-radius: 8px;
                overflow: hidden;
                display: none;
                z-index: 1000;
            `;

            // Chatbot content
            chatbotContainer.innerHTML = `
                <div style="
                    background: #f0f0f0;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <span>User Assistant</span>
                    <button id="chatbot-close-btn" style="
                        background: none;
                        border: none;
                        font-size: 20px;
                        cursor: pointer;
                    ">×</button>
                </div>
                <div id="chatbot-messages" style="
                    height: 400px;
                    overflow-y: auto;
                    padding: 10px;
                "></div>
                <div style="
                    display: flex;
                    padding: 10px;
                    border-top: 1px solid #e0e0e0;
                ">
                    <input type="text" id="chatbot-input" placeholder="Type your message..." style="
                        flex-grow: 1;
                        padding: 8px;
                        border: 1px solid #d0d0d0;
                        border-radius: 4px;
                        margin-right: 10px;
                    ">
                    <button id="chatbot-send" style="
                        padding: 8px 15px;
                        background: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 4px;
                    ">Send</button>
                </div>
            `;

            document.body.appendChild(chatbotContainer);
            return chatbotContainer;
        }

        // Create Chatbot Toggle Button
        function createChatbotToggleButton() {
            const buttonContainer = document.createElement('div');
            buttonContainer.id = 'chatbot-toggle-container';
            buttonContainer.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1001;
            `;

            const toggleButton = document.createElement('button');
            toggleButton.id = 'chatbot-toggle-btn';
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

            // SVG Icon for chat
            toggleButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
            `;

            // Toggle chatbot visibility
            toggleButton.addEventListener('click', () => {
                const chatbotContainer = document.getElementById('custom-chatbot-container');
                chatbotContainer.style.display = 
                    chatbotContainer.style.display === 'none' ? 'block' : 'none';
            });

            buttonContainer.appendChild(toggleButton);
            document.body.appendChild(buttonContainer);
        }

        // Chatbot Interaction Logic
        function setupChatbotInteractions() {
            const chatbotContainer = document.getElementById('custom-chatbot-container');
            const closeBtn = document.getElementById('chatbot-close-btn');
            const sendBtn = document.getElementById('chatbot-send');
            const inputField = document.getElementById('chatbot-input');
            const messagesContainer = document.getElementById('chatbot-messages');

            // Close button functionality
            closeBtn.addEventListener('click', () => {
                chatbotContainer.style.display = 'none';
            });

            // Send message functionality
            function sendMessage() {
                const message = inputField.value.trim();
                if (!message) return;

                // Add user message
                const userMessageEl = document.createElement('div');
                userMessageEl.innerHTML = `<strong>You:</strong> ${message}`;
                messagesContainer.appendChild(userMessageEl);

                // Clear input
                inputField.value = '';

                // Simulate bot response (replace with your actual logic)
                const botMessageEl = document.createElement('div');
                botMessageEl.innerHTML = `<strong>Bot:</strong> I received your message: "${message}"`;
                messagesContainer.appendChild(botMessageEl);

                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }

            // Send on button click
            sendBtn.addEventListener('click', sendMessage);

            // Send on Enter key
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }

        // Initialize all components
        createChatbotContainer();
        createChatbotToggleButton();
        setupChatbotInteractions();
    }

    // Ensure the script runs after DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeChatbot);
    } else {
        initializeChatbot();
    }
})();

// Expose global toggle function
window.toggleChatbot = function() {
    const chatbotContainer = document.getElementById('custom-chatbot-container');
    if (chatbotContainer) {
        chatbotContainer.style.display = 
            chatbotContainer.style.display === 'none' ? 'block' : 'none';
    }
};
