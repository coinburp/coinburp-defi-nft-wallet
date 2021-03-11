import React from 'react';
import styled from 'styled-components';
import { magicMemo } from '../../utils';
import { ButtonPressAnimation } from '../animations';
import { CoinIconSize } from '../coin-icon';
import { Icon } from '../icons';
import { Row } from '../layout';
import { position } from '@rainbow-me/styles';

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

const CheckmarkIcon = styled(Icon).attrs({
  name: 'checkmark',
})`
  right: 7;
`;

const CoinCheckButton = ({ isAbsolute, onPress, ...props }) => {
  return (
    <Container {...props} isAbsolute={isAbsolute}>
      <Content
        as={ButtonPressAnimation}
        isAbsolute={isAbsolute}
        onPress={onPress}
        opacityTouchable
      >
        <CheckmarkIcon name="checkmark" />
      </Content>
    </Container>
  );
};

export default magicMemo(CoinCheckButton, 'toggle');
