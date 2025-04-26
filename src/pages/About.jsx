import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import '../styles/about.css';
import '../styles/buggrid.css';
import '../styles/bugcard.css';
import animalImage from '../assets/images/animal-list.png';
import tempBugImage from '../assets/images/tempbugs.webp';
import bugData from '../data/bugs';
import LoadingScreen from '../components/LoadingScreen';
import creatureBagSound from '../assets/sounds/creature-bag-open.wav';
import buttonClick from '../assets/sounds/button-click.wav';

export default function About() {
  const navigate = useNavigate();
  const [showCreatures, setShowCreatures] = useState(false);
  const [loading, setLoading] = useState(true);
  const bagSound = useRef(new Audio(creatureBagSound));
  const clickSound = useRef(new Audio(buttonClick));

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

  if (loading) return <LoadingScreen />;

  return (
    <div className="about-bg">
      <button className="back-btn" onClick={goBack}>Back!</button>

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
            <div className="bug-card" key={index}>
              <img className="bug-img" src={tempBugImage} alt={bug.name} />
              <h2>{bug.name}</h2>
              <p><strong>MBTI:</strong> {bug.mbti}</p>
              <p><strong>Title:</strong> {bug.title}</p>
              <p className="desc"><strong>Description:</strong> {bug.description}</p>
              <p><strong>Compatible:</strong> {bug.compatible.join(", ")}</p>
              <p><strong>Incompatible:</strong> {bug.incompatible.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
