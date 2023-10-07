import React, { useState } from 'react';
import './ChatInterface.css'

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Send the user's message to the chatbot backend and update messages state with the response.
    // You'll need to implement this logic.
  };

  return (
    <div className="chat-interface">
      <div className="chat-window">
        {/* Display chat messages */}
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
