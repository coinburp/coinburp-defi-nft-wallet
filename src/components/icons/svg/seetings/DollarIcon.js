import PropTypes from 'prop-types';
import React from 'react';
import { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../../Svg';

const DollarIcon = ({ color, colors, ...props }) => {
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
          x1="100%"
          x2="0%"
          y1="75.18%"
          y2="24.907%"
        >
          <Stop offset="0%" stopColor="#3D3393" />
          <Stop offset="32.733%" stopColor="#2B76B9" />
          <Stop offset="65.905%" stopColor="#2CACD1" />
          <Stop offset="100%" stopColor="#35EB93" />
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Circle cx={20} cy={20} fill={color ? color : 'url(#prefix__a)'} r={20} />
        <Path
          d="M20 12c-3.314 0-6 1.79-6 4s2.686 4 6 4 6 1.79 6 4-2.686 4-6 4m0-16c2.22 0 4.16.804 5.197 2M20 12v-2m0 2v16m0 0v2m0-2c-2.22 0-4.16-.804-5.197-2"
          stroke={color || colors.whiteLabel}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
    </Svg>
  );
};

DollarIcon.propTypes = {
  color: PropTypes.string,
};

export { DollarIcon };
