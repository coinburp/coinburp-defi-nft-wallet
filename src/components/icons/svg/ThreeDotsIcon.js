import PropTypes from 'prop-types';
import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../Svg';

const ThreeDotsIcon = ({ color, colors, ...props }) => (
  <Svg height="6" viewBox="0 0 28 6" width="28" {...props}>
    <Path
      d="M3 0c1.657 0 3 1.343 3 3S4.657 6 3 6 0 4.657 0 3s1.343-3 3-3zm11 0c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm11 0c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
      fill={color || colors.grey}
      fillRule="nonzero"
      transform="translate(-321 -533) translate(0 424) translate(24 88) translate(297 21)"
    />
  </Svg>
);

ThreeDotsIcon.propTypes = {
  color: PropTypes.string,
  tightDots: PropTypes.bool,
};

export default ThreeDotsIcon;
