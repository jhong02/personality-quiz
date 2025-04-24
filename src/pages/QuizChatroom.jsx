import React from 'react';

export default function QuizChatroom({ chats, setChats, username }) {
  return (
    <div className="chat-messages">
      {chats["mysterious_bug"].map((msg, index) => (
        <div
          key={index}
          className={`message-wrapper ${msg.sender === 'You' ? 'right-wrapper' : 'left-wrapper'}`}
        >
          <div className={`message ${msg.sender === 'You' ? 'right' : 'left'}`}>
            {msg.text}
          </div>
        </div>
      ))}
      {/* TODO: Add quiz interaction logic here */}
    </div>
  );
}
