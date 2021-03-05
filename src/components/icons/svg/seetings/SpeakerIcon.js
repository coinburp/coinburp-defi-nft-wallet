import PropTypes from 'prop-types';
import React from 'react';
import { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../../Svg';

const SpeakerIcon = ({ color, colors, ...props }) => {
  return (
    <Svg
      height={40}
      viewBox="0 0 40 40"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <LinearGradient id="prefix__a" x1="100%" x2="0%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#F06" />
          <Stop offset="48.29%" stopColor="#D41872" />
          <Stop offset="100%" stopColor="#A445B2" />
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
          d="M19.5 13.158v14.881c0 1.083-.85 1.961-1.898 1.961-.802 0-1.517-.52-1.787-1.301L13 22m14-2c.757 0 2-.553 2-2s-1.243-2-2-2m-13.901 6.048c-1.528-.686-2.599-2.288-2.599-4.153 0-2.492 1.91-4.512 4.267-4.512h1.954c4.374 0 8.133-1.391 9.779-3.383v15.79c-1.646-1.992-5.405-3.384-9.78-3.384h-1.953a4.043 4.043 0 01-1.668-.358z"
          stroke={color || colors.whiteLabel}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
    </Svg>
  );
};

SpeakerIcon.propTypes = {
  color: PropTypes.string,
};

export { SpeakerIcon };
