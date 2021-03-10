import React from 'react';
import styled from 'styled-components';
import { magicMemo } from '../../utils';
import { ButtonPressAnimation, OpacityToggler } from '../animations';
import { CoinIconSize } from '../coin-icon';
import { Icon } from '../icons';
import { Row } from '../layout';
import { borders, padding, position, shadow } from '@rainbow-me/styles';

const Container = styled.View`
  ${position.size(CoinIconSize)};
  position: ${({ isAbsolute }) => (isAbsolute ? 'absolute' : 'relative')};
  top: 0;
`;

const Content = styled(Row).attrs(({ isAbsolute }) => ({
  align: 'center',
  justify: isAbsolute ? 'end' : 'center',
}))`
  ${position.size('100%')};
`;

const CircleOutline = styled.View`
  ${borders.buildCircle(32)}
  border-color: ${({ theme: { colors } }) =>
    colors.alpha(colors.blueGrey, 1)};
  border-width: 3;
  background-color: white;
  position: absolute;
  right: 7;
`;

const CheckmarkBackground = styled.View`
  ${borders.buildCircle(32)}
  ${padding(9.5)}
  ${({ theme: { isDarkMode, colors } }) =>
    shadow.build(0, 4, 12, isDarkMode ? colors.shadow : colors.coinburp, 0.4)}
  background-color: ${({ theme: { colors } }) => colors.coinburp};
  right: 7;
`;

const CoinCheckButton = ({ isAbsolute, onPress, toggle, ...props }) => {
  return (
    <Container {...props} isAbsolute={isAbsolute}>
      <Content
        as={ButtonPressAnimation}
        isAbsolute={isAbsolute}
        onPress={onPress}
        opacityTouchable
      >
        <CircleOutline />
        <OpacityToggler friction={20} isVisible={!toggle} tension={1000}>
          <CheckmarkBackground>
            <Icon color="white" name="checkmark" />
          </CheckmarkBackground>
        </OpacityToggler>
      </Content>
    </Container>
  );
};

export default magicMemo(CoinCheckButton, 'toggle');
