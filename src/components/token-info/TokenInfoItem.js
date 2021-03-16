import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { ColumnWithMargins } from '../layout';
import TokenInfoBalanceValue from './TokenInfoBalanceValue';
import TokenInfoHeading from './TokenInfoHeading';
import TokenInfoValue from './TokenInfoValue';

const Spacer = styled.View`
  height: 12;
`;

export default function TokenInfoItem({
  align = 'center',
  asset,
  children,
  size,
  title,
  weight,
  ...props
}) {
  return (
    <ColumnWithMargins
      flex={asset ? 1 : 0}
      justify={align}
      margin={0}
      {...props}
    >
      {title ? (
        <View>
          <TokenInfoHeading align={align}>{title}</TokenInfoHeading>
          <Spacer />
        </View>
      ) : null}
      {asset ? (
        <TokenInfoBalanceValue align={align} asset={asset} size={size} />
      ) : (
        <TokenInfoValue align={align} weight={weight}>
          {children}
        </TokenInfoValue>
      )}
    </ColumnWithMargins>
  );
}
