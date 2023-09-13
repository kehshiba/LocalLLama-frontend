
import React, { useState, useEffect } from 'react';
import Field from './Field';

const ChatComponent = () => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    const response = await fetch('http://localhost:8000/chat/');
    const data = await response.json();
    setChatHistory(data.result);
  };

  const handleSendMessage = async (message) => {
    try {
      const response = await fetch(`http://localhost:8000/chat/${message}/`);
      if (response.ok) {
        fetchChatHistory();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <div className="chat-history p-10">
          {chatHistory.map((chat, index) => (
            <ul role="list" className="divide-y divide-gray-100">
              <li key={index} className="flex justify-between gap-x-6 py-5 font-medium text-gray-700">
                {chat.response}
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="footer fixed bottom-0 left-0 w-full flex justify-end">
        <Field onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
export default ChatComponent;
