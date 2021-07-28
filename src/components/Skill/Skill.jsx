import { Grid, Typography } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import * as Fa from 'react-icons/fa';
import skillConfig from '../../assets/json/skill.config.json';

import './Skill.less';

const useStyles = makeStyles(() => ({
  star: {
    margin: '0.5rem',
    opacity: 0.2,
    color: yellow[100],
    '&.show': {
      animation: '$fadein 0s 0s forwards ease-out',
      color: yellow[500],
    },
    '&.hide': {
      animation: 'none',
    },
  },
  '@keyframes fadein': {
    '0%': {
    },
    '100%': {
      opacity: 1,
    },
  },
  imageContainer: {
    maxWidth: 200,
  },
  image: {
    width: '100%',
  },
}));

export default function Skill() {
  const classes = useStyles();
  const observerRef = useRef(null);
  const skillListRect = useRef(null);
  const [isIntersect, setIsIntersect] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entires) => {
      entires.forEach((entry) => {
        let isIntersecting = false;
        if (entry.isIntersecting) {
          isIntersecting = true;
        } else {
          isIntersecting = false;
        }
        setIsIntersect(isIntersecting);
      });
    });
    observerRef.current.observe(skillListRect.current);
  }, []);

  function renderIntensity(intensity, starCountsBefore) {
    const starArray = [];
    for (let i = 0; i < intensity; i += 1) {
      const totalStarCounts = (i + starCountsBefore);
      starArray.push((
        <Fa.FaStar
          className={`${classes.star} ${isIntersect ? 'show' : 'hide'}`}
          style={{
            'animation-delay': `${totalStarCounts * 0.3}s`,
          }}
        />
      ));
    }
    return (
      <>
        {starArray.map((star) => (star))}
      </>
    );
  }

  const handleError = async (e) => {
    try {
      await import('svg/page_not_found.svg');
      console.log('load success');
    } catch (e) {
      console.log(e);
    }
    e.target.src = 'assets/page_not_found.svg';
  };

  function renderSkillItem({
    name: skillName,
    intensity,
    src,
  }, starCountsBefore) {
    return (
      <div className="item">
        <div className="name-container">
          <h1 className="name">
            {skillName}
          </h1>
          <div className="image-container">
            {
              Array.isArray(src) ? (
                src.map(srcName => (
                  <img
                    onLoad={() => {
                      import(`svg/${srcName}`);
                    }}
                    onError={handleError}
                    src={`assets/${srcName}`}
                  />
                ))
              ) : (
                <img
                  onLoad={() => {
                    import(`svg/${src}`);
                  }}
                  onError={handleError}
                  src={`assets/${src}`}
                />
              )
            }
          </div>
        </div>
        <h1 className="intensity">
          {renderIntensity(intensity, starCountsBefore)}
        </h1>
      </div>
    );
  }

  function renderSkillList() {
    return (
      <>
        {
          skillConfig.list.map((skill, index) => {
            const starCountsBefore = skillConfig.list.slice(0, index).reduce((previous, current) => previous + current.intensity, 0);
            return renderSkillItem(skill, starCountsBefore);
          })
        }
      </>
    );
  }

  return (
    <div
      className="skill"
    >
      <h1 className="title">
        Tech Stack
      </h1>
      <div
        className="list"
        ref={skillListRect}
      >
        {renderSkillList()}
      </div>
    </div>
  );
}
