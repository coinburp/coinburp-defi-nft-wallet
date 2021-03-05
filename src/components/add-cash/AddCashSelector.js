import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { CoinIcon } from '../coin-icon';
import { JellySelector, JellySelectorShadowIndicator } from '../jelly-selector';
import JellySelectorRow from '../jelly-selector/JellySelectorRow';
import { Flex, RowWithMargins } from '../layout';
import { Text } from '../text';
import { ETH_ADDRESS } from '@rainbow-me/references';
import { getTokenMetadata } from '@rainbow-me/utils';

const CurrencyItemHeight = 40;

const CurrencyItemLabel = styled(Text).attrs(
  ({ isSelected, theme: { colors } }) => ({
    color: isSelected ? colors.coinburp : colors.blueGrey,
    letterSpacing: 'roundedMedium',
    size: 32,
    weight: 900,
  })
)`
  padding-bottom: 1.5px;
`;

const Dot = styled(Flex).attrs({
  position: 'absolute',
})`
  height: 8px;
  width: 8px;
  border-radius: 8px;
  background-color: ${({ theme: { colors } }) => colors.coinburp};
  position: absolute;
  left: 50%;
  bottom: -19px;
`;

// eslint-disable-next-line react/display-name
const CurrencyItem = isWalletEthZero => ({ item: address, isSelected }) => {
  const metadata = getTokenMetadata(address);

  return (
    <RowWithMargins
      align="center"
      height={CurrencyItemHeight}
      margin={6}
      marginRight={isSelected ? 0 : 6}
      opacity={isWalletEthZero && address !== ETH_ADDRESS ? 0.5 : 1}
      paddingLeft={7}
      paddingRight={11}
    >
      <CoinIcon address={address} size={32} symbol={metadata?.symbol} />
      <CurrencyItemLabel isSelected={isSelected}>
        {metadata?.symbol}
      </CurrencyItemLabel>
      {isSelected ? <Dot /> : null}
    </RowWithMargins>
  );
};

const CurrencyItemRow = props => (
  <RowWithMargins justify="center" margin={8} maxWidth={300} {...props} />
);

const AddCashSelector = ({
  currencies,
  initialCurrencyIndex,
  isWalletEthZero,
  onSelect,
}) => {
  const { isDarkMode, colors } = useTheme();
  return (
    <JellySelector
      justify="space-between"
      backgroundColor={isDarkMode ? colors.darkModeDark : colors.white}
      defaultIndex={initialCurrencyIndex}
      disableSelection={isWalletEthZero}
      height={CurrencyItemHeight}
      items={currencies}
      onSelect={onSelect}
      renderIndicator={JellySelectorShadowIndicator}
      renderItem={CurrencyItem(isWalletEthZero)}
      renderRow={CurrencyItemRow}
    />
  );
};

const neverRerender = () => true;
export default React.memo(AddCashSelector, neverRerender);
