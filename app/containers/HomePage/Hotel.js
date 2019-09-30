import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Slider from 'react-slick';
import './styles.css';

const theme = theme => ({
  progress: {
    color: '#2196F3',
  },
});
const Hotel = ({ hotel }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '-20px',
  };
  return (
    <Paper className="item-wrapper">
      <Grid container direction="row" alignItems="center" justify="flex-start">
        <Grid className="item-wrapper-slide-image" spacing={0} xs={6}>
          <Slider {...settings}>
            {hotel.images &&
              hotel.images.map(image => (
                <img
                  src={image.thumbnailUrl}
                  className="item-wrapper-slide-image-thumbnail center-cropped"
                  alt={image.caption}
                />
              ))}
          </Slider>
        </Grid>
        <Grid
          container
          className="item-wrapper-basic-info"
          direction="row"
          alignItems="center"
          justify="flex-start"
          xs={6}
        >
          <div className="info-wrapper">
            <Typography
              className="hotel-name"
              align="left"
              variant="h12"
              color="#000"
            >
              {hotel.name}
            </Typography>
            <Typography
              className="hotel-addressLines"
              align="left"
              variant="h6"
              color="#000"
            >
              {hotel.addressLines}
            </Typography>
            <Typography
              className="hotel-star"
              align="left"
              variant="h6"
              color="#000"
            >
              Stars: {hotel.stars}
            </Typography>
            <Typography
              className="hotel-score"
              align="left"
              variant="h6"
              color="#000"
            >
              Score: {hotel.trustYouScore}
            </Typography>
            <div className="star">{hotel.star}</div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

Hotel.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  hotel: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChangeUsername: PropTypes.func,
  name: PropTypes.string,
  images: PropTypes.array,
};

export default withStyles(theme)(Hotel);
