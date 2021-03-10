import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../Svg';

const ArrowCircledIcon = ({ color, colors, ...props }, ref) => {
  return (
    <Svg height="32" ref={ref} viewBox="0 0 32 32" width="32" {...props}>
      <Path
        d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z"
        fill={color || colors.grey}
        transform="translate(-24 -720) translate(0 424) translate(24 296)"
      />
      <Path
        d="M17.5 22c1.105 0 2 .895 2 2s-.895 2-2 2h-3c-1.105 0-2-.895-2-2s.895-2 2-2h3zM16 6c1.105 0 2 .895 2 2v5.172l1.586-1.586c.78-.781 2.047-.781 2.828 0 .781.78.781 2.047 0 2.828l-5 5c-.78.781-2.047.781-2.828 0l-5-5c-.781-.78-.781-2.047 0-2.828.78-.781 2.047-.781 2.828 0L14 13.172V8c0-1.105.895-2 2-2z"
        fill={colors.white}
        transform="translate(-24 -720) translate(0 424) translate(24 296) rotate(-45 16 16)"
      />
    </Svg>
  );
};

export default React.forwardRef(ArrowCircledIcon);
