import PropTypes from 'prop-types';
import React from 'react';
import {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  Use,
} from 'react-native-svg';
import Svg from '../../Svg';

const MoonIcon = ({ color, colors, ...props }) => {
  return (
    <Svg
      height={40}
      viewBox="0 0 40 40"
      width={40}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Defs>
        <RadialGradient
          cx="48.877%"
          cy="-59.339%"
          fx="48.877%"
          fy="-59.339%"
          id="prefix__c"
          r="129.947%"
        >
          <Stop offset="0%" stopColor="#FFF" stopOpacity={0.5} />
          <Stop offset="100%" stopOpacity={0.5} />
        </RadialGradient>
        <RadialGradient
          cx="50%"
          cy="0%"
          fx="50%"
          fy="0%"
          gradientTransform="matrix(-.02445 .9997 -1.5253 -.0373 .512 -.5)"
          id="prefix__d"
          r="142.876%"
        >
          <Stop offset="0%" stopColor="#FFF" stopOpacity={0.5} />
          <Stop offset="100%" stopOpacity={0.5} />
        </RadialGradient>
        <LinearGradient id="prefix__b" x1="50%" x2="50%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFF" stopOpacity={0.5} />
          <Stop offset="100%" stopOpacity={0.5} />
        </LinearGradient>
        <Circle cx={20} cy={20} id="prefix__a" r={20} />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <G>
          <Use fill="#989898" xlinkHref="#prefix__a" />
          <Use
            fill="url(#prefix__b)"
            fillOpacity={0.3}
            style={{
              mixBlendMode: 'multiply',
            }}
            xlinkHref="#prefix__a"
          />
          <Use
            fill="url(#prefix__c)"
            fillOpacity={0.8}
            style={{
              mixBlendMode: 'multiply',
            }}
            xlinkHref="#prefix__a"
          />
          <Use
            fill="url(#prefix__d)"
            fillOpacity={0.4}
            style={{
              mixBlendMode: 'multiply',
            }}
            xlinkHref="#prefix__a"
          />
        </G>
        <Path
          d="M30 22.819a9.827 9.827 0 01-3.672.707c-5.442 0-9.854-4.412-9.854-9.854 0-1.298.251-2.537.707-3.672A9.857 9.857 0 0011 19.146C11 24.588 15.412 29 20.854 29A9.857 9.857 0 0030 22.819z"
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
    </Svg>
  );
};

MoonIcon.propTypes = {
  color: PropTypes.string,
};

export { MoonIcon };
