import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const CaretIcon = ({ color, colors, size, ...props }) => (
  <Svg {...props} height={size || 32} viewBox="0 0 19 32" width="19">
    <G fill="none" fillRule="evenodd">
      <G fill={color || colors.coinburp}>
        <Path
          d="M23.573 14.354l-11.381 9.757c-.77.66-1.723.99-2.676.99-.952 0-1.904-.33-2.676-.99l-11.381-9.757c-1.741-1.492-1.954-4.125-.476-5.882C-3.537 6.715-.929 6.5.812 7.993l8.704 7.46 8.703-7.46c1.742-1.492 4.35-1.277 5.828.479 1.478 1.757 1.265 4.39-.474 5.882z"
          transform="translate(-340 -56) translate(16 56) translate(324) rotate(-90 9.515 16.05)"
        />
      </G>
    </G>
  </Svg>
);

export default React.forwardRef(CaretIcon);
