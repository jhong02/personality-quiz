// src/components/BugDetail.jsx
import bugImages from '../data/bugImageMap';

const BugDetail = ({ bug, onClose }) => {
  return (
    <div className="bug-detail">
      <button onClick={onClose}>← Back</button>
      <h2>{bug.name}</h2>
      <img src={bugImages[bug.image]} alt={bug.name} />
      <p>{bug.description}</p>
      <ul>
        {bug.funFacts.map((fact, i) => <li key={i}>{fact}</li>)}
      </ul>
      <h4>Possible Matches</h4>
      <p>{bug.matches.join(', ')}</p>
    </div>
  );
};

export default BugDetail;
