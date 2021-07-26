import { Grid, Typography } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import * as Fa from 'react-icons/fa';
import skillConfig from '../../assets/json/skill.config.json';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Luckiest Guy',
  },
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
      <Grid
        item
        xs={12}
        container
        justify="space-between"
        alignItems="center"
      >
        <Grid
          item
          xs={6}
        >
          <Typography variant="h6" color="textPrimary" className={classes.imageContainer}>
            <img
              onLoad={() => {
                import(`svg/${src}`);
              }}
              onError={handleError}
              src={`assets/${src}`}
              className={classes.image}
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Typography
            variant="h4"
          >
            {renderIntensity(intensity, starCountsBefore)}
          </Typography>
        </Grid>
      </Grid>
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
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      className={classes.root}
    >
      <Grid
        item
        xs={12}
        md={6}
      >
        <Typography variant="h2" color="textPrimary">
          Technical Skills
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Grid
          container
          spacing={4}
          ref={skillListRect}
        >
          {renderSkillList()}
        </Grid>
      </Grid>
    </Grid>
  );
}
