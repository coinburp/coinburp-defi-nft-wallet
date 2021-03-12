import PropTypes from 'prop-types';
import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../Svg';

const CheckmarkCircledIcon = ({ color, colors, ...props }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" {...props}>
    <Path
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
      fill={color || colors.black}
      transform="translate(-287 -284) translate(16 112) translate(24 160) translate(247 12)"
    />
    <Path
      d="M17.56 10.436c.586-.586.586-1.536 0-2.122-.585-.585-1.535-.585-2.12 0l-4.94 4.94-1.94-1.94c-.585-.585-1.535-.585-2.12 0-.586.586-.586 1.536 0 2.122l3 3c.585.585 1.535.585 2.12 0l6-6z"
      fill={colors.whiteLabel}
      transform="translate(-287 -284) translate(16 112) translate(24 160) translate(247 12)"
    />
  </Svg>
);

CheckmarkCircledIcon.propTypes = {
  color: PropTypes.string,
};

export default CheckmarkCircledIcon;
