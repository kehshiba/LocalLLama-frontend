
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Field = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    if (inputText.trim() !== '') {
      onSendMessage(inputText);
      setInputText('');
    }
  };
  
  let _csrfToken = null;

  async function getCsrfToken() {
    if (_csrfToken === null) {
      const response = await fetch(`http://localhost:8000/get-csrf-token`, {
        credentials: 'include',
      });
      const data = await response.json();
      _csrfToken = data.csrfToken;
    }
    return _csrfToken;
  }
  


//   async function handleFileUpload(file) {
//     const csrfToken = await getCsrfToken(); 
//     const formData = new FormData();
//     formData.append('audio_file', file);

//     const response = await fetch(`http://localhost:8000/upload/`, {
//         method: 'POST',
//         headers: {
//             'X-CSRFToken': csrfToken, 
//         },
//         credentials: 'include',
//         body: formData,
//     });

//     if (response.ok) {
//       toast.success('File uploaded successfully!', {
//         position: toast.POSITION.TOP_CENTER,
//       });
//     }
    
//     const data = await response.json();
//     return data;
// }

  return (
    <div>
      <ToastContainer />

        <div className="m-10 flex max-w-md gap-x-4">
        <div className="relative flex">
  <input
    type="text"
    value={inputText}
    onChange={handleInputChange}
    required
    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"
    placeholder="Enter Prompt"
  />
  <div className="relative">
    <label
      htmlFor="mp3Input"
      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
    >
      <svg
        className="w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </label>
    <input
      type="file"
      id="mp3Input"
      accept="audio/mp3"
      required
      on
      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer border-0 bg-white/5 px-3 py-2 text-gray-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-stone-500 sm:text-sm sm:leading-6"
    />
  </div>
</div>


              <button
                type="submit"
                onClick={handleSend}
                className="flex-none rounded-md bg-stone-100 px-3.5 py-2.5 text-sm font-semibold text-gray-400 shadow-sm hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-100"
              >
                Send
              </button>

              <div>
                
              </div>
            </div>
    </div>
  );
};

export default Field;
