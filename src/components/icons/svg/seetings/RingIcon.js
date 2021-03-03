import PropTypes from 'prop-types';
import React from 'react';
import { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../../Svg';

const RingIcon = ({ color, colors, ...props }) => {
  return (
    <Svg
      height={40}
      viewBox="0 0 40 40"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <LinearGradient id="prefix__a" x1="0%" x2="100%" y1="50%" y2="50%">
          <Stop offset="0%" stopColor="#FF4E50" />
          <Stop offset="100%" stopColor="#F9D423" />
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Circle
          cx={20}
          cy={20}
          fill={color ? color : 'url(#prefix__a)'}
          r={20}
        />
        <Path
          d="M27.778 12.222l-4.321 4.321m0 6.914l4.321 4.321M16.543 16.543l-4.321-4.321m4.321 11.235l-4.321 4.321M31 20c0 6.075-4.925 11-11 11S9 26.075 9 20 13.925 9 20 9s11 4.925 11 11zm-6.111 0a4.89 4.89 0 11-9.778 0 4.89 4.89 0 019.778 0z"
          stroke={color || colors.whiteLabel}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
    </Svg>
  );
};

RingIcon.propTypes = {
  color: PropTypes.string,
};

export { RingIcon };
