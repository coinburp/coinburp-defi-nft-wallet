import { VibrancyView } from '@react-native-community/blur';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

export const HandleHeight = 8;

const defaultColor = colors => colors.alpha(colors.blueGreyDark, 0.3);

const Handle = styled.View.attrs({
  blurAmount: 20,
  blurType: 'light',
})`
  background-color: ${({ color, theme: { colors } }) =>
    color || defaultColor(colors)};
  border-radius: 4px;
  height: ${HandleHeight};
  overflow: hidden;
  width: 40px;
  z-index: 9;
`;

export default function SheetHandle({ showBlur, ...props }) {
  return (
    <Handle
      {...props}
      as={showBlur && ios ? VibrancyView : View}
      showBlur={showBlur}
    />
  );
}
