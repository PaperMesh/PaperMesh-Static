/**
 * E-Commerce User Support & Data Management Script
 * This script will:
 * 1. Fetch user details if logged in (without API calls).
 * 2. Handle customer queries (orders, delivery, payment, errors, etc.).
 * 3. Redirect to customer support if no solution is found.
 * 4. Log user interactions locally for analytics.
 * 5. Can be hosted on GitHub & used on your website.
 */

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

// Initialize script on page load
window.addEventListener("load", UserSupportBot.init);
