// src/components/BugCard.jsx
import bugImages from '../data/bugImageMap';
import tempBugImage from '../assets/images/tempbugs.webp';

const BugCard = ({ bug, onSelect }) => {
  const imgSrc = bug.image ? bugImages[bug.image] || tempBugImage : tempBugImage;

  return (
    <div className="bug-card" onClick={() => onSelect(bug)}>
      <img src={imgSrc} alt={bug.name} />
      <h3>{bug.name}</h3>
    </div>
  );
};

export default BugCard;
