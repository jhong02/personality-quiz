const BugCard = ({ bug, onSelect }) => {
  const imgSrc = bug.image ? `/assets/images/${bug.image}` : '/assets/images/tempbugs.webp';

  return (
    <div className="bug-card" onClick={() => onSelect(bug)}>
      <img src={imgSrc} alt={bug.name} />
      <h3>{bug.name}</h3>
    </div>
  );
};

export default BugCard;
