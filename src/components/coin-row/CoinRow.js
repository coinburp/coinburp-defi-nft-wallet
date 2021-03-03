import React, { createElement } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { CoinIcon, CoinIconGroup, CoinIconSize } from '../coin-icon';
import { Column, Row } from '../layout';
import { useAccountSettings, useDimensions } from '@rainbow-me/hooks';
import { padding, margin } from '@rainbow-me/styles';

const CoinRowPaddingTop = 16;
const CoinRowPaddingBottom = 16;
const CoinRowMarginBottom = 12;
export const CoinRowHeight =
  CoinIconSize + CoinRowPaddingTop + CoinRowPaddingBottom + CoinRowMarginBottom;

const Container = styled(Row).attrs({
  align: 'center',
  grow: 0,
  shrink: 1,
})`
  ${padding(CoinRowPaddingTop, 24, CoinRowPaddingBottom)};
  ${margin(0, 16, CoinRowMarginBottom)};
  width: ${({ width }) => width - 32};
`;

const Content = styled(Column).attrs({ justify: 'space-between' })`
  flex: 1;
  height: ${CoinIconSize};
  margin-left: 10;
  opacity: ${({ isHidden }) => (isHidden ? 0.4 : 1)};
`;

export default function CoinRow({
  address,
  bottomRowRender,
  children,
  coinIconRender = CoinIcon,
  containerStyles,
  contentStyles,
  editing,
  isHidden,
  isPinned,
  isPool,
  name,
  symbol,
  testID,
  topRowRender,
  tokens,
  ...props
}) {
  const accountSettings = useAccountSettings();
  const { width } = useDimensions();
  const { colors } = useTheme();

  return (
    <Container
      backgroundColor={colors.white}
      borderRadius={24}
      css={containerStyles}
      width={editing ? width - 42 : width}
    >
      {isPool ? (
        <CoinIconGroup tokens={tokens} />
      ) : (
        createElement(coinIconRender, {
          address,
          isHidden,
          isPinned,
          symbol,
          ...accountSettings,
          ...props,
        })
      )}
      <Content isHidden={isHidden} justify="center" style={contentStyles}>
        <Row align="center" testID={`${testID}-${symbol || ''}`}>
          {topRowRender({ name, symbol, ...accountSettings, ...props })}
        </Row>
        <Row align="center" marginBottom={0.5}>
          {bottomRowRender({ symbol, ...accountSettings, ...props })}
        </Row>
      </Content>
      {typeof children === 'function'
        ? children({ symbol, ...props })
        : children}
    </Container>
  );
}
