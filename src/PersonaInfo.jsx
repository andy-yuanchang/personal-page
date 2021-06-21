import React from 'react';
import headShot from './head-shot.png';

function PersonaInfo() {
  return (
    <div className="personal-info">
      <div className="intro">
        <span className="text">Hi! I am a Full Stack Engineer.</span>
        <img src={headShot} className="head-shot" />
      </div>
      <div className="career-path" />
    </div>
  );
}

export default PersonaInfo;
