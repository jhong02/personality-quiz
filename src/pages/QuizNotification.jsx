import React from 'react';
import '../styles/chatroom.css';

export default function QuizNotification({ onClick, onIgnore }) {
  return (
    <div className="quiz-invite-popup" onClick={(e) => e.stopPropagation()}>
      <p className="quiz-invite-text">
        🪲 mysterious_bug wants to chat with you...
      </p>
      <div className="quiz-invite-buttons">
        <button className="invite-btn" onClick={onClick}>Chat Now</button>
        <button className="invite-btn ignore" onClick={onIgnore}>Ignore</button>
      </div>
    </div>
  );
}
