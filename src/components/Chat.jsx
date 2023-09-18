
import React, { useState, useEffect } from 'react';
import Field from './Field';
import { ToastContainer, toast } from 'react-toastify';


const ChatComponent = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isAborting, setIsAborting] = useState(false);

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/chat/save/', {
        method: 'POST'
      });

      if (response.ok) {
        console.log('Current log saved to output.json');
      } else {
        console.error('Error saving log:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving log:', error);
    }
  };
  const handleSendMessage = async (message) => {
    try {
      const response = await fetch(`http://localhost:8000/chat/${message}/`);

      if (response.ok) {
        const reader = response.body.getReader();

        const processStream = async () => {
          let accumulatedChunks = '';
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }
            const outputChunk = new TextDecoder().decode(value);
            console.log(outputChunk);
            accumulatedChunks = outputChunk;

            // eslint-disable-next-line no-loop-func
            setChatHistory(prevChatHistory => [
              ...prevChatHistory,
              { response: accumulatedChunks }
            ]);
          }
        };

        await processStream();
      } else {
        console.error('Error retrieving message:', response.statusText);
        toast.error(`Error ${response.status}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };


  return (
      <>
      <ToastContainer />
  <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto">
          <div className="chat-history p-10">
            {chatHistory.map((item, index) => (
                <div key={index}>{item.response}</div>
            ))}
          </div>
        </div>
        <div className="footer fixed bottom-0 left-0 w-full flex justify-end">
        <Field onSendMessage={handleSendMessage} />
        </div>
      </div>
      </>
  );
};
export default ChatComponent;
