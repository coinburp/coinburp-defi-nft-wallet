import React from 'react';
import RadialGradient from 'react-native-radial-gradient';
import styled from 'styled-components';
import { Icon } from '../icons';
import ContextMenu from './ContextMenu';
import { borders, position } from '@rainbow-me/styles';

const ContextIcon = styled(Icon).attrs(({ theme: { colors } }) => ({
  color: colors.coinburp,
  height: 40,
  name: 'threeDots',
  tightDots: true,
}))`
  height: 5;
`;

export default function ContextCircleButton(props) {
  return (
    <ContextMenu {...props} activeOpacity={1}>
      <ContextIcon />
    </ContextMenu>
  );
}
