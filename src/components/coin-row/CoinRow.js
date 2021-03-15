import React, { createElement } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { CoinIcon, CoinIconGroup, CoinIconSize } from '../coin-icon';
import { Column, Row } from '../layout';
import { useAccountSettings, useDimensions } from '@rainbow-me/hooks';
import { margin, padding } from '@rainbow-me/styles';

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
  ${({ thin, wide }) =>
    padding(
      thin ? 0 : CoinRowPaddingTop,
      wide ? 10 : 24,
      thin ? 0 : CoinRowPaddingBottom
    )};
  ${({ thin, superThin, spacingTop, spacingBottom }) => {
    const thinSize = superThin ? 10 : 16;
    return margin(
      spacingTop ? 12 : 0,
      16,
      thin
        ? thinSize
        : spacingBottom
        ? CoinRowMarginBottom * 2
        : CoinRowMarginBottom
    );
  }};
  width: ${({ width }) => width - 32};
`;

const Content = styled(Column).attrs({ justify: 'space-between' })`
  flex: 1;
  height: ${CoinIconSize};
  margin-left: 12;
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
  spacingBottom,
  spacingTop,
  superThin,
  symbol,
  testID,
  thin,
  topRowRender,
  tokens,
  wide,
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
      spacingBottom={spacingBottom}
      spacingTop={spacingTop}
      superThin={superThin}
      thin={thin}
      wide={wide}
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
        <Row
          align="center"
          marginBottom={android ? 0 : 6}
          testID={`${testID}-${symbol || ''}`}
        >
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
