import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Spinner from 'components/Spinner/Spinner';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '100%',
    // flexBasis: '100%'
  },
  media: {
    height: 150,
  },
  smaller: {
    maxWidth: '70%',
    maxHeight: '70%',
    // flexBasis: '50%'
  },
});

function MediaCard(props) {
  const classes = useStyles();

  const {
    imageSrc = '',
    imageTitle = '',
    title = '',
    description = '',
    isSelected = false,
    onClick,
  } = props;

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const handleLoadImageError = (e) => {
    e.target.src = 'images/image_not-found.png';
  };

  useEffect(() => {
    import(`images/${imageSrc}`).finally((res) => {
      setIsLoadingImage(false);
    });
  }, []);

  return (
    <Card className={`${isSelected ? classes.root : classes.smaller}`}>
      <CardActionArea onClick={onClick}>
        {
          isLoadingImage ? (
            <Spinner />
          ) : (
            <CardMedia
              className={classes.media}
              image={`images/${imageSrc}`}
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
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  imageSrc: PropTypes.string,
  imageTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

MediaCard.defaultProps = {
  onClick: () => {},
};

export default MediaCard;
