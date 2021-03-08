import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const CopyIcon = () => (
  <Svg height="24" viewBox="0 0 24 24" width="24">
    <G fill="none" fillRule="evenodd">
      <G fill="#00DC68">
        <Path
          d="M12 8c2.21 0 4 1.79 4 4v8c0 2.21-1.79 4-4 4H4c-2.21 0-4-1.79-4-4v-8c0-2.21 1.79-4 4-4h8zm8-8c2.21 0 4 1.79 4 4v8c0 2.21-1.79 4-4 4h-1V9c0-2.142-1.684-3.891-3.8-3.995L15 5H8V4c0-2.21 1.79-4 4-4h8z"
          transform="translate(-58 -382) translate(46 152) translate(12 230)"
        />
      </G>
    </G>
  </Svg>
);

export default CopyIcon;
