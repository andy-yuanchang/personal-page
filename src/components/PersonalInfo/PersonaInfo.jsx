import React from 'react';
import { GrLinkedin, GrMedium, GrGithub } from 'react-icons/gr';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import avatar from '../../assets/images/avatar.png';

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
      <>
        <Typography variant="h4" color="textPrimary">
          Hi, I am Andy! A Full stack developer.
        </Typography>
        <Typography variant="h4" color="textPrimary">
          Dedicated to develop delightful websites.
        </Typography>
        <Typography variant="h4" color="textPrimary" />
      </>
    );
  }

  function renderAvatar() {
    return (
      <Grid
        item
        xs={10}
        sm={6}
        container
        justify="center"
      >
        <Avatar
          alt="avatar"
          src={avatar}
          className={classes.avatar}
        />
      </Grid>
    );
  }

  function openPage(url) {
    window.open(url, '_blank');
  }

  function renderIcons() {
    return (
      <Grid
        container
        spacing={3}
        justify="flex-end"
        className={classes.iconGroup}
      >
        <Grid item>
          <Typography variant="h4" className={classes.icon}>
            <GrLinkedin
              onClick={() => {
                openPage('https://www.linkedin.com/in/yu-an-chang-71b198132/');
              }}
            />
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.icon} variant="h4">
            <GrMedium
              onClick={() => {
                openPage('https://andytacochang.medium.com/');
              }}
            />
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4" className={classes.icon}>
            <GrGithub
              onClick={() => {
                openPage('https://github.com/andy-yuanchang');
              }}
            />
          </Typography>
        </Grid>

      </Grid>
    );
  }

  function renderIntroduction() {
    return (
      <Grid
        item
        xs={10}
        sm={6}
        container
        justify="center"
      >
        <Grid
          container
          justify="center"
          alignContent="space-around"
          className={classes.introduction}
        >
          <Grid
            item
            xs={10}
          >
            {renderText()}
          </Grid>
          <Grid
            item
            xs={10}
          >
            {renderIcons()}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      {renderAvatar()}
      {renderIntroduction()}
    </Grid>
  );
}

export default PersonaInfo;
