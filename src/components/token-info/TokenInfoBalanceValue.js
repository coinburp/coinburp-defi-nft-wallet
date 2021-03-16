import React from 'react';
import { useTheme } from 'styled-components';
import { RowWithMargins } from '../layout';
import TokenInfoValue from './TokenInfoValue';
import { magicMemo } from '@rainbow-me/utils';

const TokenInfoBalanceValue = ({ align, asset, size, ...props }) => {
  const { balance, value } = asset;
  const { colors } = useTheme();

  return (
    <RowWithMargins
      {...props}
      align="center"
      direction={align === 'left' ? 'row' : 'row-reverse'}
      margin={0}
      marginKey={align === 'left' ? 'marginRight' : 'marginLeft'}
    >
      <TokenInfoValue color={colors.dark} size={size}>
        {balance?.display || value}
      </TokenInfoValue>
    </RowWithMargins>
  );
};

export default magicMemo(TokenInfoBalanceValue, 'asset');
