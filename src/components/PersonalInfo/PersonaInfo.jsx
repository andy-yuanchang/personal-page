import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import webDevelopmentSVG from 'svg/web_development.svg';
import avatar from '../../assets/images/avatar.png';

import './personalInfo.less';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  'avatar-container': {
    padding: '1rem',
  },
  avatar: {
    width: 300,
    height: 300,
  },
  introduction: {
    maxWidth: 640,
    height: 400,
    [theme.breakpoints.down('md')]: {
      height: 300,
    },
    fontFamily: 'Archivo Black',
    wordSpacing: 5,
    letterSpacing: 1,
  },
  text: {
    [theme.breakpoints.down('sm')]: {
      variant: 'h6',
    },
  },
  iconGroup: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  icon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

function PersonaInfo() {
  const classes = useStyles();

  function renderText() {
    return (
      <h1>
        Hello, My name is Andy! A Full stack developer. Dedicated to develop delightful websites.
      </h1>
    );
  }

  function renderAvatar() {
    return (
      <div className="avatar">
        <Avatar
          alt="avatar"
          src={avatar}
          className={classes.avatar}
        />
      </div>
    );
  }

  function renderIntroduction() {
    return (
      <div className="introduction">
        {renderText()}
      </div>
    );
  }

  return (
    <div className="personal-info">
      {renderAvatar()}
      <img src={webDevelopmentSVG} />
      {renderIntroduction()}
    </div>
  );
}

export default PersonaInfo;
