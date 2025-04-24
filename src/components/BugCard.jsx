const BugCard = ({ bug, onSelect }) => {
    return (
      <div className="bug-card" onClick={() => onSelect(bug)}>
        <img src={`/assets/images/${bug.image}`} alt={bug.name} />
        <h3>{bug.name}</h3>
      </div>
    );
  };
  
  export default BugCard;
  