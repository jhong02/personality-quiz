import React from 'react';
import '../styles/chatroom.css';

export default function QuizNotification({ onClick }) {
  return (
    <div className="quiz-invite-popup" onClick={onClick}>
      🪲 mysterious_bug wants to chat with you... (click to continue)
    </div>
  );
}
