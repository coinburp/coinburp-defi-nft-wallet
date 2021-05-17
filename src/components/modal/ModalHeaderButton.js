import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { Button } from '../buttons';
import { Icon } from '../icons';
import { Row } from '../layout';
import { Text as UnstyledText } from '../text';

const BackArrow = styled(Icon).attrs(({ theme: { colors } }) => ({
  color: colors.coinburp,
  direction: 'left',
  name: 'caretThick',
}))`
  height: 16;
  margin-top: ${android ? 6 : 0};
  margin-left: 16px;
`;

const Container = styled(Row).attrs(({ side }) => ({
  align: 'center',
  justify: side === 'left' ? 'start' : 'end',
}))`
  ${({ side }) => (side === 'left' ? 'left: 0;' : 'right: 0;')}
  background-color: ${({ theme: { colors } }) => colors.transparent};
  bottom: 0;
  padding-left: ${({ side }) => (side === 'left' ? 15 : 48)};
  padding-right: ${({ side }) => (side === 'left' ? 48 : 15)};
  z-index: 2;
  margin-top:-6px;
`;

const Text = styled(UnstyledText).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.coinburp,
  size: 'larger',
  weight: 'bold',
}))`
  margin-left: ${({ side }) => (side === 'left' ? 4 : 0)};
`;

const ModalHeaderButton = ({ label, onPress, side }) => (
  <Container as={BorderlessButton} onPress={onPress} side={side}>
    <Row>
      {side === 'left' && <BackArrow />}
      <Text side={side}>{label}</Text>
    </Row>
  </Container>
);

export default React.memo(ModalHeaderButton);
