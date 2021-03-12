import React from 'react';
import { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../Svg';

const PinkCloudIcon = ({ ...props }) => (
  <Svg height="27" viewBox="0 0 24 27" width="24" {...props}>
    <Defs>
      <LinearGradient id="ah52mmimka" x1="50%" x2="50%" y1="100%" y2="0%">
        <Stop offset="0%" stopColor="#FA71CD" />
        <Stop offset="100%" stopColor="#C471F5" />
      </LinearGradient>
    </Defs>
    <G fill="none" fill-rule="evenodd">
      <G fill="url(#ah52mmimka)" transform="translate(-76 -481)">
        <Path
          d="M13.5 18v7.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V18h3zm-3-18c2.818 0 5.183 1.943 5.827 4.563.302-.042.61-.063.923-.063 3.728 0 6.75 3.022 6.75 6.75S20.978 18 17.25 18H13.5v-5.379l1.94 1.94c.585.585 1.535.585 2.12 0 .586-.586.586-1.536 0-2.122l-4.5-4.5c-.585-.585-1.535-.585-2.12 0l-4.5 4.5c-.586.586-.586 1.536 0 2.122.585.585 1.535.585 2.12 0l1.94-1.94V18H5.25C2.35 18 0 15.65 0 12.75c0-2.713 2.057-4.945 4.697-5.221C4.568 7.04 4.5 6.529 4.5 6c0-3.314 2.686-6 6-6z"
          transform="translate(16 112) translate(60 369)"
        />
      </G>
    </G>
  </Svg>
);

export default PinkCloudIcon;
