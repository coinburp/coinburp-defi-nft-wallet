import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const SwapCircleIcon = ({ color, colors }) => (
  <Svg height="16" viewBox="0 0 16 16" width="16">
    <G fill="none" fillRule="evenodd">
      <G fill={color || colors.neonGreen}>
        <Path
          d="M8 0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm2.586 9l-1.293 1.293c-.39.39-.39 1.024 0 1.414.39.39 1.024.39 1.414 0l3-3c.39-.39.39-1.024 0-1.414l-3-3c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414L10.586 7H5.414l1.293-1.293c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0l-3 3c-.39.39-.39 1.024 0 1.414l3 3c.39.39 1.024.39 1.414 0 .39-.39.39-1.024 0-1.414L5.414 9h5.172z"
          transform="translate(-100 -869) translate(16 502) translate(0 350) translate(84 17)"
        />
      </G>
    </G>
  </Svg>
);

export default SwapCircleIcon;
