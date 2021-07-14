import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as Fa from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  star: {
    margin: '0.5rem',
    opacity: 0.2,
    color: [theme.palette.text.secondary],
    '&.show': {
      animation: '$fadein 0s 0s forwards ease-out',
      color: [theme.palette.text.primary],
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
}));

const skillList = [
  {
    name: 'JavaScript',
    intensity: 4,
  },
  {
    name: 'CSS',
    intensity: 4,
  },
  {
    name: 'Webpack',
    intensity: 4,
  },
  {
    name: 'Material UI',
    intensity: 3,
  },
  {
    name: 'Node.js',
    intensity: 4,
  },
];

export default function Skill() {
  const classes = useStyles();
  const observerRef = useRef(null);
  const skillListRect = useRef(null);
  const [isIntersect, setIsIntersect] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entires) => {
      entires.map((entry) => {
        let isIntersecting = false;
        console.log(entry.intersectionRatio);
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

  function renderSkillList() {
    return (
      <>
        {
          skillList.map((skill, index) => {
            const starCountsBefore = skillList.slice(0, index).reduce((previous, current) => previous + current.intensity, 0);
            return renderSkillItem(skill, starCountsBefore);
          })
        }
      </>
    );
  }

  function renderSkillItem({
    name: skillName, intensity,
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
          <Typography variant="h4" color="textPrimary">
            {skillName}
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

  function renderIntensity(intensity, starCountsBefore) {
    const starArray = [];
    for (let i = 0; i < intensity; i++) {
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

  return (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      spacing={4}
      className={classes.root}
    >
      <Grid
        item
        xs={12}
      >
        <Typography variant="h1" color="textPrimary">
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
