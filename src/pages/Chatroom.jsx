import { useEffect, useState } from 'react';
import '../styles/chatroom.css';
import userIcon from '../assets/images/user1.png';
import { Link } from 'react-router-dom';
import NotificationButton from '../components/NotificationButton';
import QuizChatroom from './QuizChatroom';
import QuizNotification from './QuizNotification';
import LoadingScreen from '../components/LoadingScreen';

const chatUsernames = [
  'fungai_5252', 'goobi', 'smider55', 'green_bone4',
  'greetur_', 'yerba985', 'Jake235', 'wagagaga',
  'kroniiLover', 'mysterious_bug'
];

const botResponses = [
  "Whatever...", "I miss goobi (my cat)", "Allo!",
  "mmm matcha sounds so good rn.", "I want hotpot", "AAAAAAAAAAHHHHHHHHHHH",
  "I AM TRAPPED IN THIS CHATROOM HELP ME.", "GORB", "She splinggin on my dorf call her splinggindorf", "i dislike mangoe"
];

export default function Chatroom() {
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState({});
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsername(localStorage.getItem('username') || 'new_user');
  
    const initialChats = {};
    chatUsernames.forEach(user => initialChats[user] = []);
    initialChats["mysterious_bug"].push({
      text: "👋 Hey there! I'm going to ask you a few fun questions to find your inner bug...",
      sender: "Bot"
    });
    setChats(initialChats);
  
    const loadingTimer = setTimeout(() => setLoading(false), 1000);
    const inviteTimer = setTimeout(() => setShowInvite(true), 3000);
  
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(inviteTimer);
    };
  }, []);

  const sendMessage = () => {
    if (!currentChat || !message.trim()) return;

    const newChats = { ...chats };
    newChats[currentChat].push({ text: message, sender: 'You' });
    setChats(newChats);
    setMessage('');

    if (currentChat !== "mysterious_bug") {
      setTimeout(() => {
        const response = botResponses[Math.floor(Math.random() * botResponses.length)];
        newChats[currentChat].push({ text: response, sender: 'Bot' });
        setChats({ ...newChats });
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const openChat = (user) => setCurrentChat(user);
  const handleInviteClick = () => {
    setCurrentChat("mysterious_bug");
    setShowInvite(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <Link to="/" className="logo">🪲 [ The Terrarium ]</Link>
        <NotificationButton count={1} onClick={() => alert("New message functionality coming soon!")}/>
        <nav className="chatrooms">
          <p>Chatrooms</p>
          <ul>
            {chatUsernames.map((user) => (
              <li key={user} className={`chatroom-item ${currentChat === user ? 'active' : ''}`} onClick={() => openChat(user)}>
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
          <button className="about-btn" onClick={() => alert("Welcome to The Terrarium!")}>about</button>
        </div>

        <div id="chat-messages-container">
          {!currentChat ? (
            <div className="welcome-bubble">
              <p>🐞 <strong>Welcome, {username}!</strong><br />Please choose a chatroom!</p>
            </div>
          ) : currentChat === "mysterious_bug" ? (
            <QuizChatroom chats={chats} setChats={setChats} username={username} />
          ) : (
            <div className="chat-messages">
              {chats[currentChat].map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.sender === 'You' ? 'right-wrapper' : 'left-wrapper'}`}>
                  <div className={`message ${msg.sender === 'You' ? 'right' : 'left'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {currentChat && currentChat !== "mysterious_bug" && (
          <div className="chat-input">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." />
            <button className="send-btn" onClick={sendMessage}>Send</button>
          </div>
        )}
      </main>

      {showInvite && <QuizNotification onClick={handleInviteClick} />}
    </div>
  );
}
