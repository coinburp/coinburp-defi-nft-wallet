import PropTypes from 'prop-types';
import React from 'react';
import { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../../Svg';

const BackupIcon = ({ color, colors, ...props }) => {
  return (
    <Svg
      height={40}
      viewBox="0 0 40 40"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <LinearGradient id="prefix__a" x1="50%" x2="50%" y1="100%" y2="0%">
          <Stop offset="0%" stopColor="#FA71CD" />
          <Stop offset="100%" stopColor="#C471F5" />
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
          d="M27 17l-7 7m0 0l-7-7m7 7V10m-7 19h14"
          stroke={color || colors.whiteLabel}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
    </Svg>
  );
};

BackupIcon.propTypes = {
  color: PropTypes.string,
};

export { BackupIcon };
