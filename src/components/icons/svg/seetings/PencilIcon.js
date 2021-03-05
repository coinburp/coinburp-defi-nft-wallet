import PropTypes from 'prop-types';
import React from 'react';
import { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../../Svg';

const PencilIcon = ({ color, colors, ...props }) => {
  return (
    <Svg
      height={40}
      viewBox="0 0 40 40"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <LinearGradient id="prefix__a" x1="100%" x2="0%" y1="50%" y2="50%">
          <Stop offset="0%" stopColor="#00C9FF" />
          <Stop offset="100%" stopColor="#92FE9D" />
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
          d="M23.232 13.232l3.536 3.536m-2.036-5.036a2.501 2.501 0 013.536 3.536L14.5 29.035H11v-3.57l13.732-13.733z"
          stroke={color || colors.whiteLabel}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
    </Svg>
  );
};

PencilIcon.propTypes = {
  color: PropTypes.string,
};

export { PencilIcon };
