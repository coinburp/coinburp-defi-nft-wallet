import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import { Row } from '../layout';
import { Text } from '../text';
import { padding } from '@rainbow-me/styles';

const Container = styled(Row).attrs({
  align: 'center',
  scaleTo: 0.97,
})`
  ${padding(0, 19)};
  height: 49;
`;

const WalletOption = ({ editMode, label, onPress, icon }) => {
  const { colors } = useTheme();
  return (
    <Container as={ButtonPressAnimation} disabled={editMode} onPress={onPress}>
      <Icon
        color={editMode ? colors.blueGrey : colors.coinburp}
        marginRight={12}
        name={icon}
      />
      <Text
        color={editMode ? colors.blueGrey : colors.coinburp}
        size="larger"
        weight="bold"
      >
        {label}
      </Text>
    </Container>
  );
};

export default React.memo(WalletOption);
