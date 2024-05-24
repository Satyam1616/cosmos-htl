function sendMessage() {
  const userMessage = document.getElementById("message").value;
  if (!userMessage) return;

  fetch("/get_response", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert(data.error);
      } else {
          const chatBox = document.getElementById("chat-box");
          chatBox.innerHTML += `<div class="message user">User: ${userMessage}</div>`;
          chatBox.innerHTML += `<div class="message bot">Bot: ${data.response}</div>`;
          chatBox.scrollTop = chatBox.scrollHeight;
          updateHistory(userMessage);
      }
  })
  .catch(error => console.error("Error:", error));
}

function updateHistory(message) {
  const historyBox = document.getElementById("history-box");
  historyBox.innerHTML += `<div class="history-item">${message}</div>`;
}