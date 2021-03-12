import PropTypes from 'prop-types';
import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../Svg';

const CheckmarkLargeIcon = ({ color, colors, ...props }) => (
  <Svg height="64" viewBox="0 0 64 64" width="64" {...props}>
    <Path
      d="M32 64c17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32z"
      fill={color || colors.black}
      transform="translate(-156 -236) translate(16 112) translate(140 124)"
    />
    <Path
      d="M46.828 27.828c1.562-1.562 1.562-4.094 0-5.656-1.562-1.563-4.094-1.563-5.656 0L28 35.343l-5.172-5.171c-1.562-1.563-4.094-1.563-5.656 0-1.563 1.562-1.563 4.094 0 5.656l8 8c1.562 1.562 4.094 1.562 5.656 0l16-16z"
      fill={colors.whiteLabel}
      transform="translate(-156 -236) translate(16 112) translate(140 124)"
    />
  </Svg>
);

CheckmarkLargeIcon.propTypes = {
  color: PropTypes.string,
};

export default CheckmarkLargeIcon;
