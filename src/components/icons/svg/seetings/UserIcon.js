import PropTypes from 'prop-types';
import React from 'react';
import { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../../Svg';

const UserIcon = ({ color, colors, ...props }) => {
  return (
    <Svg
      height={40}
      viewBox="0 0 40 40"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1="68.424%"
          x2="32.08%"
          y1="100%"
          y2="0%"
        >
          <Stop offset="0%" stopColor="#21D4FD" />
          <Stop offset="100%" stopColor="#B721FF" />
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
          d="M20 21.5a8 8 0 018 8h0-16a8 8 0 018-8zM20 9c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"
          stroke={color || colors.whiteLabel}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
    </Svg>
  );
};

UserIcon.propTypes = {
  color: PropTypes.string,
};

export { UserIcon };
