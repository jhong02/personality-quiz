import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import '../styles/about.css';
import '../styles/buggrid.css';
import '../styles/bugcard.css';
import '../styles/bugmodal.css';
import animalImage from '../assets/images/animal-list.png';
import tempBugImage from '../assets/images/tempbugs.webp';
import usagiImage from '../assets/images/usagi.jpg';
import usagiSound from '../assets/sounds/usagisound.mp3';
import bugData from '../data/bugs';
import LoadingScreen from '../components/LoadingScreen';
import creatureBagSound from '../assets/sounds/creature-bag-open.wav';
import buttonClickSound from '../assets/sounds/button-click.wav';
import bugButtonSound from '../assets/sounds/bug-button.wav';

export default function About() {
  const navigate = useNavigate();
  const [showCreatures, setShowCreatures] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBug, setSelectedBug] = useState(null);
  const [showUsagi, setShowUsagi] = useState(false);

  const bagSound = useRef(new Audio(creatureBagSound));
  const clickSound = useRef(new Audio(buttonClickSound));
  const bugButtonSfx = useRef(new Audio(bugButtonSound));
  const usagiAudio = useRef(new Audio(usagiSound));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const goBack = () => {
    clickSound.current.currentTime = 0;
    clickSound.current.play();
    navigate('/');
  };

  const handleOpenBag = () => {
    bagSound.current.currentTime = 0;
    bagSound.current.play();
    setShowCreatures(true);
  };

  const handleUsagiClick = () => {
    usagiAudio.current.currentTime = 0;
    usagiAudio.current.play();
    setShowUsagi(true);
    setTimeout(() => {
      setShowUsagi(false);
    }, 1100);
  };
  
  if (loading) return <LoadingScreen />;

  return (
    <div className="about-bg">
      <button className="back-btn" onClick={goBack}>Back!</button>

      <div className="about-intro">
        <p>This is a personality quiz inspired by MBTI and <a href="https://iseej.github.io/LovePawsona/" target="_blank" rel="noopener noreferrer">Izon Falzo's Love Pawsona</a>. Please check it out too!</p>
        <p>I created this quiz for fun and as a little personal project for myself. Please share it around with friends!</p>
        <p>I would love feedback if you wanna provide it heheh.</p>
        <p>Art by my gorlfriend, code by: <a href="https://github.com/jhong02" target="_blank" rel="noopener noreferrer">github.com/jhong02</a></p>
      </div>

      {!showCreatures ? (
        <div className="creature-button-wrapper">
          <div className="imgtxt" onClick={handleOpenBag}>
            <img src={animalImage} alt="Animal List" />
            <span>CREATURES!</span>
          </div>
        </div>
      ) : (
        <div className="bug-grid">
          {bugData.map((bug, index) => (
            <div
              className="bug-mini-card"
              key={index}
              onClick={() => {
                bugButtonSfx.current.currentTime = 0;
                bugButtonSfx.current.play();
                setSelectedBug(bug);
              }}
            >
              <img
                className="bug-mini-img"
                src={bug.image ? `/assets/images/${bug.image}` : tempBugImage}
                alt={bug.name}
              />
              <h3 className="bug-mini-name">{bug.name}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedBug && (
        <div className="bug-modal-overlay" onClick={() => setSelectedBug(null)}>
          <div className="bug-modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="bug-name-title">{selectedBug.name} – <em>{selectedBug.title}</em></h2>
            <img className="bug-img" src={selectedBug.image ? `/assets/images/${selectedBug.image}` : tempBugImage} alt={selectedBug.name} />
            <p className="desc"><strong>Description:</strong> {selectedBug.description}</p>

            <div className="traits-flex">
              <div className="trait-box strengths-box">
                <p><strong>Strengths:</strong></p>
                <ul>{selectedBug.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
              <div className="trait-box weaknesses-box">
                <p><strong>Weaknesses:</strong></p>
                <ul>{selectedBug.weaknesses.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            </div>

            <div className="vibe-box">
              <p><strong>Vibes:</strong></p>
              <div className="vibe-lines">
                {selectedBug.taglines.map((line, i) => (
                  <div key={i} className="vibe-line"><em>{line}</em></div>
                ))}
              </div>
            </div>

            <div className="friend-grid">
              <p><strong>Besties:</strong></p>
              <div className="friend-icons">
                {selectedBug.besties.map(name => {
                  const bug = bugData.find(b => b.name === name);
                  return (
                    <div className="friend-item" key={name}>
                      <img src={bug?.image ? `/assets/images/${bug.image}` : tempBugImage} alt={name} className="friend-icon" />
                      <span>{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="friend-grid">
              <p><strong>Enemies:</strong></p>
              <div className="friend-icons">
                {selectedBug.enemies.map(name => {
                  const bug = bugData.find(b => b.name === name);
                  return (
                    <div className="friend-item" key={name}>
                      <img src={bug?.image ? `/assets/images/${bug.image}` : tempBugImage} alt={name} className="friend-icon" />
                      <span>{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="restart-btn"
              onClick={() => {
                clickSound.current.currentTime = 0;
                clickSound.current.play();
                setSelectedBug(null);
              }}
            >Close
          </button>
          </div>
        </div>
      )}

      {/* Usagi Modal */}
      {showUsagi && (
        <div className="usagi-modal" onClick={() => setShowUsagi(false)}>
          <div className="usagi-card" onClick={(e) => e.stopPropagation()}>
            <img src={usagiImage} alt="usagi" className="usagi-img" />
          </div>
        </div>
      )}

      {/* Button at page bottom */}
      <div className="secret-button-bottom-wrapper">
        <div className="secret-button-inner">
          <button className="secret-button" onClick={handleUsagiClick}></button>
        </div>
      </div>
    </div>
  );
}
