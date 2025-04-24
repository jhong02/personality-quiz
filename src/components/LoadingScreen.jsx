import React from 'react';
import '../styles/home.css'; // Or wherever your spinner CSS lives

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
