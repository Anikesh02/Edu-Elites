import React, { useState } from "react";
import axios from "axios";

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle Chat Window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Close Chat Window
  const closeChat = () => {
    setIsChatOpen(false);
  };

  // Send Message to Server
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/chatbot", {
        message: userInput,
      });

      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserInput("");
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="bg-primaryColor text-white p-4 rounded-full shadow-lg hover:bg-irisBlueColor transition-colors"
        >
          <i className="fa-brands fa-rocketchat"></i>
        </button>
      )}

      {isChatOpen && (
        <>
        <div className="bg-white rounded-lg p-5 w-[350px] h-[450px] shadow-lg relative mt-3">
          <button
            onClick={closeChat}
            className="absolute right-1 text-black-600 hover:text-black-900 w-1/6"
          >
            <i className="fa-solid fa-times"></i>
          </button>

          <div className="h-[350px] overflow-y-auto mb-4 p-2 pt-8 rounded-lg">
            {messages.map((msg, index) => (
                <div
                key={index}
                className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                {msg.sender === "bot" ? (
                    <div className="flex items-center">
                    <div className="bg-primaryColor rounded-full p-2">
                        <i className="fa-solid fa-robot text-white"></i>
                    </div>
                    <p className="text-gray-700 inline ml-2">{msg.text}</p>
                    </div>
                ) : (
                    <div className="flex items-center">
                    <p className="text-gray-700 inline mr-2">{msg.text}</p>
                    <div className="bg-irisBlueColor rounded-full p-2">
                        <i className="fa-solid fa-user text-white"></i>
                    </div>
                    </div>
                )}
                </div>
        
            ))}
        </div>


          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex p-2 border rounded-lg focus:outline-none"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="bg-primaryColor text-white p-2 ml-2 rounded-lg w-1/3"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
