import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../Spinner/Spinner';

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 345,
    maxHeight: 300,
    whiteSpace: 'break-spaces',
    'box-shadow': 'rgba(0, 0, 0, 0.75) 0px 3px 10px',
  },
  image: {
    inset: '0',
    width: '100%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  content: {

  },
  title: {

  },
  description: {

  }
}));

function MediaCard(props) {
  const classes = useStyles();
  const cardRef = useRef(null);

  const {
    imageSrc = '',
    imageTitle = '',
    title = '',
    description = '',
    onClick,
    style,
    ...otherProps
  } = props;

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const handleLoadImageError = (e) => {
    e.target.src = 'images/image_not-found.png';
  };

  function renderMedia() {
    return (
      <img
        className={classes.image}
        src={imageSrc}
        alt={imageTitle}
      />
    )
  }

  function renderContent() {
    return (
      <div 
        className={classes.content}
      >
        <div className={classes.title}>
          {title}
        </div>
        <div className={classes.description}>
          {description}
        </div>
      </div>
    )
  }

  return (
    <div
      className={classes.card}
      onClick={onClick}
      style={style}
      style={{
        top: style.top,
        left: style.left
      }}
      {...otherProps}
    >
      {renderMedia()}
      {renderContent()}
    </div>
  );
  {/* <Card
      className={`${classes.card}`}
      ref={cardRef}
      {...otherProps}
    >
      <CardActionArea onClick={onClick}>
        {
          isLoadingImage ? (
            <Spinner />
          ) : (
            <CardMedia
              className={classes.media}
              image={`${imageSrc}`}
              title={imageTitle}
              onError={handleLoadImageError}
            />
          )
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card> */}
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
