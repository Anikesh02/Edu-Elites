import React, { useState } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Add the user's message to the chat
    setMessages([...messages, { text: message, sender: 'user' }]);
    setMessage('');

    // Here, you can send the user's message to a chatbot API for processing
    // and add the chatbot's response to the chat.
    // For simplicity, we won't implement the chatbot logic in this example.
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <div className="h-40 overflow-y-auto mb-4 p-2 border rounded-lg bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg outline-none mr-2" // Adjust width with 'flex-1' class
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
