import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const SLIDE_POPUP_DURATION = 0.3;
const SLIDE_POPUP_ANIMATION_DELAY = 0.5;

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 400,
    maxHeight: 300,
    whiteSpace: 'break-spaces',
    'box-shadow': 'rgba(0, 0, 0, 0.75) 0px 3px 10px',
    'transform-origin': 'center',
    'z-index': 3,
    animation: `$popup ${SLIDE_POPUP_DURATION}s ${SLIDE_POPUP_ANIMATION_DELAY}s forwards`,
    position: 'absolute',
    color: '#fff',
    '&.close': {
      transform: 'scale(0)',
    },
    inset: 0,
    opacity: 0,
    fontFamily: 'PT Sans',
  },
  '@keyframes popup': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1.2)',
      opacity: 1,
    },
  },
  image: {
    inset: '0',
    height: 'auto',
    width: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  content: {
    height: 100,
    overflow: 'hidden',
  },
  title: {

  },
  description: {

  },
}));

function MediaCard(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  const {
    imageSrc = '',
    imageTitle = '',
    title = '',
    description = '',
    onClick,
    style,
    ...otherProps
  } = props;

  useEffect(async () => {
    try {
      await import(`images/${imageSrc}`);
      console.log('import image success', imageSrc);
    } catch (e) {
      console.log(`import ${imageSrc} error`, e);
    }
    setIsLoading(false);
  }, []);

  function renderMedia() {
    return !isLoading && (
      <img
        className={classes.image}
        src={`images/${imageSrc}`}
        alt={imageTitle}
      />
    );
  }

  function renderContent() {
    return (
      <div
        className={classes.content}
      >
        <h3 className={classes.title}>
          {title}
        </h3>
        <p className={classes.description}>
          {description}
        </p>
      </div>
    );
  }

  return (
    <div
      className={classes.card}
      onClick={onClick}
      style={style}
      style={{
        top: style.top,
        left: style.left,
      }}
      {...otherProps}
    >
      {renderMedia()}
      {renderContent()}
    </div>
  );
}

MediaCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

MediaCard.defaultProps = {
  onClick: () => { },
};

export default MediaCard;
