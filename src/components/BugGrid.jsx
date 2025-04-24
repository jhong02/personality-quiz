import React from 'react';
import bugs from '../data/bugs';
import BugCard from './BugCard';
import '../styles/buggrid.css';

const BugGrid = ({ onSelect }) => {
  return (
    <div className="bug-grid">
      {bugs.map((bug, index) => (
        <BugCard key={index} bug={bug} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default BugGrid;
