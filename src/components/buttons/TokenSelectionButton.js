import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { CoinIcon } from '../coin-icon';
import { Icon } from '../icons';
import { InnerBorder, RowWithMargins } from '../layout';
import { Text } from '../text';
import CaretImageSource from '@rainbow-me/assets/family-dropdown-arrow.png';
import { useColorForAsset } from '@rainbow-me/hooks';
import { ImgixImage } from '@rainbow-me/images';
import { padding, position } from '@rainbow-me/styles';
import ShadowStack from 'react-native-shadow-stack';

const TokenSelectionButtonHeight = 46;
const TokenSelectionButtonElevation = ios ? 0 : 8;

const Content = styled(RowWithMargins).attrs({
  align: 'center',
  margin: 7,
})`
  ${padding(11, 14, 14, 16)};
  height: ${TokenSelectionButtonHeight};
  z-index: 1;
`;

const CaretIcon = styled(ImgixImage).attrs(({ theme: { colors } }) => ({
  resizeMode: ImgixImage.resizeMode.contain,
  source: CaretImageSource,
  tintColor: colors.whiteLabel,
}))`
  height: 18;
  top: 0.5;
  width: 8;
`;

export default function TokenSelectionButton({
  address,
  borderRadius = 30,
  onPress,
  symbol,
  testID,
}) {
  const { isDarkMode, colors } = useTheme();

  const colorForAsset = useColorForAsset(
    { address },
    address ? undefined : colors.appleBlue
  );

  const shadowsForAsset = useMemo(
    () => [
      [0, 10, 30, colors.shadow, 0.2],
      [0, 5, 15, colorForAsset, isDarkMode ? 0 : 0.4],
    ],
    [colorForAsset, colors.shadow, isDarkMode]
  );

  return (
    <ButtonPressAnimation
      borderRadius={borderRadius}
      contentContainerStyle={{}}
      onPress={onPress}
      radiusAndroid={borderRadius}
      testID={testID}
    >
      <ShadowStack
        {...position.coverAsObject}
        backgroundColor={colorForAsset}
        borderRadius={borderRadius}
        elevation={TokenSelectionButtonElevation}
        shadows={shadowsForAsset}
      />
      <Content>
        {symbol ? (
          <CoinIcon address={address} size={32} symbol={symbol} />
        ) : null}
        <Text
          align="center"
          color={symbol ? colors.black : colors.coinburp}
          size={32}
          testID={testID + '-text'}
          weight={900}
        >
          {symbol || 'Choose'}
        </Text>
        <Icon direction="down" marginLeft={12} name="caretThick" size={24} />
      </Content>
      <InnerBorder radius={borderRadius} />
    </ButtonPressAnimation>
  );
}
