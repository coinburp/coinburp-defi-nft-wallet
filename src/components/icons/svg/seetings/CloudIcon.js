import PropTypes from 'prop-types';
import React from 'react';
import { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../../Svg';

const CloudIcon = ({ color, colors, ...props }) => {
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
          <Stop offset="0%" stopColor="#F9F047" />
          <Stop offset="100%" stopColor="#0FD850" />
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Circle cx={20} cy={20} fill={color ? color : 'url(#prefix__a)'} r={20} />
        <Path
          d="M9 22.429C9 24.953 11.189 27 13.889 27h11C28.264 27 31 24.442 31 21.286c0-3.156-2.736-5.715-6.111-5.715-.04 0-.082 0-.122.002C24.2 12.963 21.735 11 18.777 11c-3.374 0-6.11 2.558-6.11 5.714 0 .43.05.85.147 1.254C10.631 18.426 9 20.249 9 22.428z"
          stroke={color || colors.whiteLabel}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
    </Svg>
  );
};

CloudIcon.propTypes = {
  color: PropTypes.string,
};

export { CloudIcon };
