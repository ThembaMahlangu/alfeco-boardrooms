import React, { useState, useEffect } from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const ChatIcon = () => {
  const [showChat, setShowChat] = useState(false);
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const chatInterval = setInterval(() => {
      setShowChat(true);
      setTimeout(() => {
        setShowChat(false);
      }, 3000);
    }, 8000);

    return () => clearInterval(chatInterval);
  }, []);

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
        setShowBg(true);
        setTimeout(() => {
            setShowBg(false);
        }, 4000);
        }, 7500);

    return () => clearInterval(backgroundInterval);
  }, []);

  const handleChatClick = () => {
    const subject = encodeURIComponent('Boardrooms management support');
    const email = 'themba.mahlangu@vanorthstar.com';
    const mailtoLink = `mailto:${email}?subject=${subject}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 hover:cursor-pointer" onClick={handleChatClick}>
      <div className={showBg ? `flex items-center p-4 bg-black rounded-lg shadow-md` : `hidden`}>
        <FiMessageSquare className={`text-white mr-2 ${showChat ? 'opacity-100' : 'opacity-0'}`} size={20} />
        <span className={`text-sm text-white font-bold transition-opacity duration-500 ${showChat ? 'opacity-100' : 'opacity-0'}`}>
          Click here to chat with support
        </span>
      </div>
    </div>
  );
};

export default ChatIcon;
