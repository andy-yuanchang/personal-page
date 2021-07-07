import React from 'react';
import avatar from 'images/avatar.png';

import './PersonalInfo.less'

function PersonaInfo() {
  return (
    <div className="personal-info">
      <div className="intro">
        <span className="text name">Hi! I am Andy! </span> 
        <span className="text job">A Full Stack Engineer.</span>
        <img src={avatar} className="avatar" />
      </div>
      <div className="career-path" />
    </div>
  );
}

export default PersonaInfo;
