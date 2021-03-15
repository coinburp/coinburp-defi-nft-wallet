import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import {
  ButtonPressAnimation,
  OpacityToggler,
  RotationArrow,
  RoundButtonCapSize,
  RoundButtonSizeToggler,
} from '../animations';
import Caret from '../../assets/arrow.png';
import { Row } from '../layout';
import CoinDividerButtonLabel from './CoinDividerButtonLabel';
import { padding } from '@rainbow-me/styles';
import { magicMemo } from '@rainbow-me/utils';
import {ImgixImage} from "@rainbow-me/images";

const closedWidth = 62;

const CaretContainer = styled.View`
  padding-bottom: 1;
`;


const CaretIcon = styled(ImgixImage).attrs(({ theme: { colors } }) => ({
  source: Caret,
  tintColor: colors.skyBlue,
}))`
  transform: rotate(90deg);
  height: 11;
  width: 18;
`;

const ContainerButton = styled(ButtonPressAnimation).attrs(
  ({ isSmallBalancesOpen, isSendSheet }) => ({
    scaleTo: 0.9,
    wrapperStyle: {
      marginLeft: isSendSheet && android ? 16 : 0,
      width: isSmallBalancesOpen ? 80 - (android ? 4 : 0) : closedWidth - 4,
    },
  })
)`
  width: ${({ isSmallBalancesOpen }) =>
    isSmallBalancesOpen ? 80 : closedWidth};
`;

const Content = styled(Row).attrs({
  align: 'center',
  justify: 'space-between',
})`
  ${padding(0, 10)};
  border-radius: ${RoundButtonCapSize / 2};
  height: ${({ height }) => height};
  width: ${closedWidth};
`;

const CoinDividerOpenButton = ({
  coinDividerHeight,
  isSmallBalancesOpen,
  isVisible,
  onPress,
  isSendSheet,
  ...props
}) => {
  const { colors, isDarkMode } = useTheme();
  return (
    <ContainerButton
      {...props}
      isSendSheet={isSendSheet}
      isSmallBalancesOpen={isSmallBalancesOpen}
      onPress={onPress}
      radiusAndroid={RoundButtonCapSize / 2}
    >
      <OpacityToggler isVisible={isVisible}>
        <Content height={coinDividerHeight}>
          <RoundButtonSizeToggler
            color="#E9F2FD"
            endingWidth={28}
            isDarkMode={isDarkMode}
            isOpen={isSmallBalancesOpen}
            startingWidth={10}
          />
          <View>
            <CoinDividerButtonLabel
              isVisible={isSmallBalancesOpen}
              label="All"
            />
            <CoinDividerButtonLabel
              isVisible={!isSmallBalancesOpen}
              label="Less"
            />
          </View>
          <CaretContainer>
            <RotationArrow
              endingOffset={20}
              endingPosition={-90}
              isOpen={isSmallBalancesOpen}
            >
              <CaretIcon />
            </RotationArrow>
          </CaretContainer>
        </Content>
      </OpacityToggler>
    </ContainerButton>
  );
};

export default magicMemo(CoinDividerOpenButton, [
  'isSmallBalancesOpen',
  'isVisible',
]);
