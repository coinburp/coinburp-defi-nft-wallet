import React from 'react';
import styled from 'styled-components';
import { ButtonPressAnimation } from '../animations';
import { Row } from '../layout';
import { Text } from '../text';
import { useColorForAsset } from '@rainbow-me/hooks';
import { padding } from '@rainbow-me/styles';

const Container = styled(ButtonPressAnimation)`
  margin-right: 24px;
`;

const MaxButtonContent = styled(Row).attrs(({theme: {colors}}) => ({
  align: 'center',
  backgroundColor: colors.coinburp,
  borderRadius: 8,
}))`
  ${padding(0, 6, 3)};
  height: 25px;
`;

const MaxButtonLabel = styled(Text).attrs({
  align: 'center',
  color: 'white',
  size: 16,
  weight: 900,
})`
  margin-top: 3px;
`;

export default function ExchangeMaxButton({
  address,
  disabled,
  onPress,
  testID,
}) {
  const colorForAsset = useColorForAsset({ address });
  const { colors } = useTheme();
  return (
    <Container disabled={disabled} onPress={onPress} testID={testID}>
      <MaxButtonContent>
        <MaxButtonLabel color={colorForAsset || colors.appleBlue}>
          Max
        </MaxButtonLabel>
      </MaxButtonContent>
    </Container>
  );
}
