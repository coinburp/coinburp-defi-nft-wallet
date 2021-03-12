import PropTypes from 'prop-types';
import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const KeyIcon = ({ color, colors, ...props }) => (
  <Svg height="16" viewBox="0 0 16 16" width="16" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M16 6c0 3.314-2.686 6-6 6-.606 0-1.191-.09-1.743-.257L8 12l-1 1-1 1H4v2H0v-4l4.257-4.257C4.09 7.19 4 6.606 4 6c0-3.314 2.686-6 6-6s6 2.686 6 6zm-6-4c-.552 0-1 .448-1 1s.448 1 1 1c1.105 0 2 .895 2 2 0 .552.448 1 1 1s1-.448 1-1c0-2.21-1.79-4-4-4z"
        fill={color || colors.coinburp}
        fillRule="nonzero"
        transform="translate(-104 -526) translate(16 112) translate(64 398) translate(24 16)"
      />
    </G>
  </Svg>
);

KeyIcon.propTypes = {
  color: PropTypes.string,
};

export default KeyIcon;
