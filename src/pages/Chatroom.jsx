import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/chatroom.css';
import QuizChatroom from './QuizChatroom';
import QuizNotification from './QuizNotification';
import LoadingScreen from '../components/LoadingScreen';

import userIcon from '../assets/images/user1.png';
import enterSound from '../assets/sounds/enter-sound.wav';
import messageSent from '../assets/sounds/message-sent.wav';
import messageReceived from '../assets/sounds/message-received.wav';
import notificationSound from '../assets/sounds/notification-sound.wav';
import buttonClickSound from '../assets/sounds/button-click.wav';

const chatUsernames = [
  'fungai_5252', 'goobi', 'smider55', 'green_bone4',
  'greetur_', 'yerba985', 'Jake235', 'wagagaga',
  'kroniiLover', 'mysterious_bug'
];

const botResponses = [
  "Whatever...", "I miss goobi (my cat)", "Allo!",
  "mmm matcha sounds so good rn.", "I want hotpot", "AAAAAAAAAAHHHHHHHHHHH",
  "I AM TRAPPED IN THIS CHATROOM HELP ME.", "GORB", "She splinggin on my dorf call her splinggindorf",
  "i dislike mangoe", "sometimes i wonder what other bugs are doing",
  "do you want to smoke weed and fill up our bellies with diet soda and play burnout revenge on the ps2?",
  "i have a sunburn", "sweet treat", "UNNAAAAAA",
  "If you're good at something, never do it for free!",
  "THEY DON'T WANT OUR LOVE TO EXIST!", "jam", "yam", "i love usagi",
  "*crawls up your arm*", "should i go get gas for my car tomorrow?"
];

export default function Chatroom() {
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState({});
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [loading, setLoading] = useState(true);

  const enterSfx = useRef(new Audio(enterSound));
  const sentSfx = useRef(new Audio(messageSent));
  const receivedSfx = useRef(new Audio(messageReceived));
  const notificationSfx = useRef(new Audio(notificationSound));
  const buttonClickSfx = useRef(new Audio(buttonClickSound));

  const chatEndRef = useRef(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username') || 'new_user';
    setUsername(savedUsername);

    const initialChats = {};
    chatUsernames.forEach(user => {
      initialChats[user] = [];
    });

    const savedQuiz = JSON.parse(localStorage.getItem('bugQuizProgress'));
    if (savedQuiz?.chats?.length > 0) {
      initialChats["mysterious_bug"] = savedQuiz.chats;
    }

    setChats(initialChats);

    const loadingTimer = setTimeout(() => setLoading(false), 1000);
    const inviteTimer = setTimeout(() => setShowInvite(true), 5000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(inviteTimer);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      enterSfx.current.volume = 0.5;
      enterSfx.current.play().catch(err => console.warn("Enter sound blocked:", err.message));
    }
  }, [loading]);

  useEffect(() => {
    if (showInvite) {
      notificationSfx.current.volume = 0.8;
      notificationSfx.current.play().catch(err => console.warn("Notification sound blocked:", err.message));
    }
  }, [showInvite]);

  useEffect(() => {
    if (currentChat && currentChat !== "mysterious_bug") {
      const timeout = setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [chats, currentChat]);

  const sendMessage = () => {
    if (!currentChat || !message.trim()) return;

    const newChats = { ...chats };
    newChats[currentChat].push({ text: message, sender: 'You' });
    setChats(newChats);
    setMessage('');
    sentSfx.current.play();

    if (currentChat !== "mysterious_bug") {
      setTimeout(() => {
        const response = botResponses[Math.floor(Math.random() * botResponses.length)];
        newChats[currentChat].push({ text: response, sender: 'Bot' });
        setChats({ ...newChats });
        receivedSfx.current.play();
      }, 600);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const openChat = (user) => {
    buttonClickSfx.current.play();

    if (currentChat === "mysterious_bug" && user !== "mysterious_bug") {
      localStorage.setItem("bugQuizProgress", JSON.stringify({
        chats: chats["mysterious_bug"]
      }));
    }

    if (user === "mysterious_bug" && currentChat !== "mysterious_bug") {
      localStorage.removeItem("bugQuizProgress");
    }

    setCurrentChat(user);
  };

  const handleInviteClick = () => {
    buttonClickSfx.current.play();
    openChat("mysterious_bug");
    setShowInvite(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <Link to="/" className="logo">🪲 [ The Terrarium ]</Link>
        <nav className="chatrooms">
          <p>Chatrooms</p>
          <ul>
            {chatUsernames.map(user => (
              <li
                key={user}
                className={`chatroom-item ${currentChat === user ? 'active' : ''}`}
                onClick={() => openChat(user)}
              >
                <img src={userIcon} alt={`${user} icon`} className="user-icon" />
                {user}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="chat-window">
        <div className="chat-header">
          <p id="chatroom-title">{currentChat || 'Chatroom'}</p>
          <Link
            to="/about"
            className="about-btn no-style-link"
            onClick={() => buttonClickSfx.current.play()}
          >
            about
          </Link>
        </div>

        <div id="chat-messages-container">
          {!currentChat ? (
            <div className="welcome-bubble">
              <p>🐞 <strong>Welcome, {username}!</strong><br />Please choose a chatroom!</p>
            </div>
          ) : currentChat === "mysterious_bug" ? (
            <QuizChatroom
              username={username}
              initialChats={chats["mysterious_bug"]}
              onChatUpdate={(newMessages) => {
                const updated = { ...chats };
                updated["mysterious_bug"] = newMessages;
                setChats(updated);
                localStorage.setItem("bugQuizProgress", JSON.stringify({ chats: newMessages }));
              }}
            />
          ) : (
            <div className="chat-messages">
              {chats[currentChat]?.map((msg, index) => (
                <div
                  key={index}
                  className={`message-wrapper ${msg.sender === 'You' ? 'right-wrapper' : 'left-wrapper'}`}
                >
                  <div className={`message ${msg.sender === 'You' ? 'right' : 'left'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {currentChat && currentChat !== "mysterious_bug" && (
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button className="send-btn" onClick={sendMessage}>Send</button>
          </div>
        )}
      </main>

      {showInvite && (
  <QuizNotification
    onClick={handleInviteClick}
    onIgnore={() => {
      setShowInvite(false);
      setTimeout(() => setShowInvite(true), 3000);
    }}
  />
)}

    </div>
  );
}
