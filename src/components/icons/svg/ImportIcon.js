import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../Svg';

const ImportIcon = ({ color, colors, ...props }, ref) => (
  <Svg {...props} height={17} ref={ref} viewBox="0 0 17 17" width={17}>
    <Path
      d="M14.5 19c1.105 0 2 .895 2 2s-.895 2-2 2h-3c-1.105 0-2-.895-2-2s.895-2 2-2h3zM13 3c1.105 0 2 .895 2 2v5.172l1.586-1.586c.78-.781 2.047-.781 2.828 0 .781.78.781 2.047 0 2.828l-5 5c-.78.781-2.047.781-2.828 0l-5-5c-.781-.78-.781-2.047 0-2.828.78-.781 2.047-.781 2.828 0L11 10.172V5c0-1.105.895-2 2-2z"
      fill={color || colors.dark}
      fillRule="nonzero"
      transform="translate(-245 -752) translate(0 56) translate(232 688) translate(8 3) rotate(-45 13 13)"
    />
  </Svg>
);

export default React.forwardRef(ImportIcon);
