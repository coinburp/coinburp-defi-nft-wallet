import React from 'react';
import { BaseButton } from 'react-native-gesture-handler';
import RadialGradient from 'react-native-radial-gradient';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { CoinIconSize } from '../coin-icon';
import { Icon } from '../icons';
import { Centered } from '../layout';
import { Text } from '../text';
import { padding } from '@rainbow-me/styles';
import { magicMemo } from '@rainbow-me/utils';

const FavoriteButtonPadding = 19;

const FavoriteButton = styled(Centered)`
  ${padding(0, FavoriteButtonPadding)};
  bottom: 0;
  flex: 0;
  height: ${CoinIconSize};
  position: absolute;
  right: 0;
  top: 0;
  width: 68px;
`;

const StarIcon = styled(Icon).attrs(({ isFavorited, theme: { colors } }) => ({
  align: 'center',
  color: isFavorited ? colors.gold : colors.blueGrey,
  name: 'star',
  size: 24,
}))`
  height: 100%;
  line-height: 28px;
  width: 100%;
  opacity: ${({ isFavorited }) => (isFavorited ? 1 : 0.68)};
`;

const CoinRowFavoriteButton = ({ isFavorited, onPress }) => {
  return (
    <FavoriteButton as={BaseButton} onPress={onPress}>
      <StarIcon isFavorited={isFavorited} />
    </FavoriteButton>
  );
};

export default magicMemo(CoinRowFavoriteButton, 'isFavorited');
