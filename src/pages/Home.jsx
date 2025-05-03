import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import logo2 from '../assets/images/logo2.png';
import topTitle from '../assets/images/toptitle.png';
import bottomTitle from '../assets/images/bottletitle.png';
import LoadingScreen from '../components/LoadingScreen';
import buttonClickSound from '../assets/sounds/button-click.wav';

export default function Home() {
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const buttonClick = useRef(new Audio(buttonClickSound));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const storeUsername = () => {
    const input = document.getElementById("usernameInput").value.trim();
    if (!input) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return;
    }

    buttonClick.current.currentTime = 0;
    buttonClick.current.play(); // 🔊 play sound
    localStorage.setItem("username", input);
    navigate('/chatroom'); // ➡️ navigate right away
  };

  const goToAbout = () => {
    buttonClick.current.play();
    navigate('/about');
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="home-bg">
      <div className="landing-container">
        <img src={topTitle} alt="Top Title" className="title-image" />
        <img src={logo2} alt="Terrarium Scene" className="logo2-image" />
        <img src={bottomTitle} alt="Bottom Title" className="title-image" />
      </div>

      <div className="landing-footer">
        <p>A fun little critter quiz!</p>
        <input
          id="usernameInput"
          maxLength="25"
          placeholder="Enter your name..."
          className="name-input"
        />
        <button className="enter-btn" onClick={storeUsername}>Enter!</button>
        <div className="help-btn-wrapper">
          <button className="about-btn landing-help" onClick={goToAbout}>?</button>
        </div>
        <div className={`name-warning ${showWarning ? 'visible' : ''}`}>
          Please enter your name! AAuuUGH!!
        </div>
      </div>
    </div>
  );
}
