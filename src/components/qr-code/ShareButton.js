import React, { useCallback, useMemo } from 'react';
import { Share } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { Centered, InnerBorder } from '../layout';
import { Text } from '../text';
import ShadowStack from 'react-native-shadow-stack';
import {useDimensions} from "@rainbow-me/hooks";

const Label = styled(Text).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.whiteLabel,
  size: 'larger',
  weight: 'bold',
}))`
  margin-bottom: 4;
`;

export default function ShareButton({ accountAddress, ...props }) {
  const handlePress = useCallback(() => {
    Share.share({
      message: accountAddress,
      title: 'My account address:',
    });
  }, [accountAddress]);

  const { isDarkMode, colors } = useTheme();
  const { width } = useDimensions();

  const shadows = useMemo(
    () => [
      [0, 10, 30, colors.shadow, 0.2],
      [0, 5, 15, colors.shadow, isDarkMode ? 0 : 0.4],
    ],
    [isDarkMode, colors]
  );

  return (
    <ButtonPressAnimation
      onPress={handlePress}
      overflowMargin={20}
      radiusAndroid={28}
      {...props}
    >
      <ShadowStack
        backgroundColor={colors.coinburp}
        borderRadius={24}
        height={64}
        shadows={shadows}
        width={width - 32}
      >
        <Centered cover>
          <Label>Share</Label>
        </Centered>
        <InnerBorder />
      </ShadowStack>
    </ButtonPressAnimation>
  );
}
