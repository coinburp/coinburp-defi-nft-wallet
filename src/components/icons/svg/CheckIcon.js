import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const CheckIcon = ({ color, ...props }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" {...props}>
    <G fill="none" fillRule="evenodd">
      <G fill={color || '#FC00FF'}>
        <Path
          d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.56-13.94c.586-.585.586-1.535 0-2.12-.585-.586-1.535-.586-2.12 0l-4.94 4.939-1.94-1.94c-.585-.585-1.535-.585-2.12 0-.586.586-.586 1.536 0 2.122l3 3c.585.585 1.535.585 2.12 0l6-6z"
          transform="translate(-40 -392) translate(16 56) translate(24 336)"
        />
      </G>
    </G>
  </Svg>
);

export default CheckIcon;
