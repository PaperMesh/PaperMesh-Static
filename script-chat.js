<script>
document.addEventListener("DOMContentLoaded", function () {
    let chatButton = document.createElement("button");
    chatButton.innerText = "Chat with us";
    chatButton.style.position = "fixed";
    chatButton.style.bottom = "20px";
    chatButton.style.right = "20px";
    chatButton.style.padding = "10px 15px";
    chatButton.style.background = "#007bff";
    chatButton.style.color = "#fff";
    chatButton.style.borderRadius = "50px";
    chatButton.style.cursor = "pointer";
    
    document.body.appendChild(chatButton);

    let chatBox = document.createElement("div");
    chatBox.style.position = "fixed";
    chatBox.style.bottom = "60px";
    chatBox.style.right = "20px";
    chatBox.style.width = "250px";
    chatBox.style.background = "#fff";
    chatBox.style.border = "1px solid #ccc";
    chatBox.style.display = "none";
    chatBox.innerHTML = `
        <div style="background:#007bff;color:white;padding:10px;text-align:center;">Chatbot</div>
        <div id="chatArea" style="padding:10px; max-height:200px; overflow-y:auto;">Hello! How can I help?</div>
        <input id="userInput" type="text" placeholder="Type here..." style="width:100%; padding:5px;">
    `;

    document.body.appendChild(chatBox);

    chatButton.addEventListener("click", function () {
        chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
    });

    document.getElementById("userInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let input = this.value.toLowerCase();
            let chatArea = document.getElementById("chatArea");

            let response = "Sorry, I don’t understand.";
            if (input.includes("delivery")) response = "We deliver within 3-5 business days.";
            if (input.includes("return")) response = "You can return products within 7 days.";
            if (input.includes("payment")) response = "We accept UPI, credit cards, and cash on delivery.";

            chatArea.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
            chatArea.innerHTML += `<p><strong>Bot:</strong> ${response}</p>`;
            this.value = "";
            chatArea.scrollTop = chatArea.scrollHeight;
        }
    });
});
</script>
