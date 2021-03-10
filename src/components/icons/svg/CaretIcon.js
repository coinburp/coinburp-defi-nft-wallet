import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../Svg';

const CaretIcon = ({ color, colors, size, ...props }, ref) => (
  <Svg
    {...props}
    height={size ? (size * 21) / 9 : '24'}
    ref={ref}
    viewBox={`0 0 ${ios ? 14 : 10} 24`}
    width={size || ios ? 14 : 10}
  >
    <Path
      d="M22.873 5.688l-8.803 7.546c-.595.511-1.333.766-2.07.766-.736 0-1.472-.255-2.07-.766L1.129 5.688C-.218 4.534-.382 2.498.76 1.138 1.904-.22 3.922-.387 5.268.768L12 6.538l6.732-5.77c1.347-1.154 3.364-.988 4.508.37 1.143 1.36.978 3.396-.367 4.55z"
      fill={color || colors.dark}
      fillRule="nonzero"
      transform="translate(-40 -183) translate(16 167) rotate(90 11 27)"
    />
  </Svg>
);

export default React.forwardRef(CaretIcon);
