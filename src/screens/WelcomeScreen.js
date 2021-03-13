import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { IS_TESTING } from 'react-native-dotenv';
import Reanimated from 'react-native-reanimated';
import { useValue } from 'react-native-redash';
import styled from 'styled-components';
import { useMemoOne } from 'use-memo-one';
import Coin1 from '../assets/coins/coin1.png';
import Coin2 from '../assets/coins/coin2.png';
import Coin3 from '../assets/coins/coin3.png';
import Coin4 from '../assets/coins/coin4.png';
import Coin5 from '../assets/coins/coin5.png';
import Coin6 from '../assets/coins/coin6.png';
import Coin7 from '../assets/coins/coin7.png';
import { ButtonPressAnimation } from '../components/animations';
import CoinBurpText from '../components/icons/svg/CoinBurpText';
import { RowWithMargins } from '../components/layout';
import { Text } from '../components/text';

import {
  fetchUserDataFromCloud,
  isCloudBackupAvailable,
} from '../handlers/cloudBackup';
import { cloudPlatform } from '../utils/platform';

import { useDimensions, useHideSplashScreen } from '@rainbow-me/hooks';
import { ImgixImage } from '@rainbow-me/images';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';
import logger from 'logger';

const ButtonContainer = styled(Reanimated.View)`
  border-radius: ${({ height }) => height / 2.6667};
`;

const ButtonContent = styled(RowWithMargins).attrs({
  align: 'center',
  margin: 4,
})`
  align-self: center;
  height: 100%;
  padding-bottom: 4;
`;

const ButtonLabel = styled(Text).attrs(
  ({ textColor: color, theme: { colors } }) => ({
    align: 'center',
    color: color || colors.dark,
    size: 'larger',
    weight: 900,
  })
)``;

const RainbowButton = ({
  height,
  onPress,
  style,
  textColor,
  text,
  ...props
}) => {
  return (
    <ButtonPressAnimation
      onPress={onPress}
      radiusAndroid={height / 2}
      scaleTo={0.9}
      {...props}
    >
      <ButtonContainer height={height} style={style}>
        <ButtonContent>
          <ButtonLabel textColor={textColor}>{text}</ButtonLabel>
        </ButtonContent>
      </ButtonContainer>
    </ButtonPressAnimation>
  );
};

const Container = styled.View`
  ${StyleSheet.absoluteFillObject};
  align-items: center;
  background-color: ${({ theme: { colors } }) => colors.white};
  justify-content: center;
`;

const ContentWrapper = styled(Animated.View)`
  align-items: center;
  height: 278px;
  justify-content: space-between;
  margin-bottom: 20;
  z-index: 10;
`;

const ButtonWrapper = styled(Animated.View)`
  width: 100%;
`;

const INITIAL_SIZE = 375;

export const useAnimatedValue = initialValue => {
  const value = useRef();

  if (!value.current) {
    value.current = new Animated.Value(initialValue);
  }

  return value;
};

const rainbows = [
  {
    delay: 0,
    id: 'grey',
    rotate: '360deg',
    scale: 0.76,
    source: Coin1,
    x: -160,
    y: -420,
  },
  {
    delay: 20,
    id: 'neon',
    rotate: '360deg',
    scale: 0.282666667,
    source: Coin2,
    x: 190,
    y: -262,
  },
  {
    delay: 40,
    id: 'pixel',
    rotate: '360deg',
    scale: 0.130666667,
    source: Coin3,
    x: -190,
    y: -210,
  },
  {
    delay: 60,
    id: 'light',
    rotate: '360deg',
    scale: 0.426666667,
    source: Coin4,
    x: -230,
    y: 240,
  },
  {
    delay: 80,
    id: 'liquid',
    rotate: '360deg',
    scale: 0.162666667,
    source: Coin5,
    x: 190,
    y: 235,
  },
  {
    delay: 80,
    id: 'liquid',
    rotate: '360deg',
    scale: 0.096,
    source: Coin6,
    x: -70,
    y: 340,
  },
  {
    delay: 80,
    id: 'liquid',
    rotate: '360deg',
    scale: 0.76,
    source: Coin7,
    x: 150,
    y: 440,
  },
];

const traversedRainbows = rainbows.map(
  (
    {
      delay,
      initialRotate = '0deg',
      rotate = '0deg',
      scale = 1,
      source,
      x = 0,
      y = 0,
    },
    index
  ) => {
    const animatedValue = new Animated.Value(0);
    return {
      delay,
      id: index,
      source,
      style: {
        opacity: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [
          {
            translateX: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, x],
            }),
          },
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, y],
            }),
          },
          {
            rotate: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [initialRotate, rotate],
            }),
          },
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, scale],
            }),
          },
        ],
      },
      value: animatedValue,
    };
  }
);

const RainbowImage = styled(ImgixImage).attrs({ resizeMode: 'contain' })`
  height: ${INITIAL_SIZE};
  position: absolute;
  width: ${INITIAL_SIZE};
`;

const springConfig = {
  bounciness: 7.30332,
  speed: 0.6021408,
  toValue: 1,
  useNativeDriver: true,
};

export default function WelcomeScreen() {
  const { colors } = useTheme();
  const { replace, navigate } = useNavigation();
  const contentAnimation = useAnimatedValue(1);
  const hideSplashScreen = useHideSplashScreen();
  const createWalletButtonAnimation = useAnimatedValue(1);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        logger.log(`downloading ${cloudPlatform} backup info...`);
        const isAvailable = await isCloudBackupAvailable();
        if (isAvailable && ios) {
          const data = await fetchUserDataFromCloud();
          setUserData(data);
          logger.log(`Downloaded ${cloudPlatform} backup info`);
        }
      } catch (e) {
        logger.log('error getting userData', e);
      } finally {
        hideSplashScreen();
        Animated.parallel([
          ...traversedRainbows.map(({ value, delay = 0 }) =>
            Animated.spring(value, { ...springConfig, delay })
          ),
          Animated.sequence([
            Animated.timing(contentAnimation.current, {
              duration: 120,
              easing: Easing.bezier(0.165, 0.84, 0.44, 1),
              toValue: 1.2,
            }),
            Animated.spring(contentAnimation.current, {
              friction: 8,
              tension: 100,
              toValue: 1,
            }),
          ]),
          // We need to disable looping animations
          // There's no way to disable sync yet
          // See https://stackoverflow.com/questions/47391019/animated-button-block-the-detox
          IS_TESTING !== 'true' &&
            Animated.loop(
              Animated.sequence([
                Animated.timing(createWalletButtonAnimation.current, {
                  duration: 1000,
                  toValue: 1.02,
                  useNativeDriver: true,
                }),
                Animated.timing(createWalletButtonAnimation.current, {
                  duration: 1000,
                  toValue: 0.98,
                  useNativeDriver: true,
                }),
              ])
            ),
        ]).start();
        if (IS_TESTING === 'true') {
          logger.log(
            'Disabled loop animations in WelcomeScreen due to .env var IS_TESTING === "true"'
          );
        }
      }
    };
    initialize();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      createWalletButtonAnimation.current.setValue(1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      contentAnimation.current.setValue(1);
    };
  }, [contentAnimation, hideSplashScreen, createWalletButtonAnimation]);

  const buttonStyle = useMemoOne(
    () => ({
      marginTop: 64,
      transform: [{ scale: createWalletButtonAnimation.current }],
      zIndex: 10,
    }),
    [createWalletButtonAnimation]
  );

  const contentStyle = useMemoOne(
    () => ({
      transform: [
        {
          scale: contentAnimation.current,
        },
      ],
    }),
    [createWalletButtonAnimation]
  );

  const { width } = useDimensions();

  const rValue = useValue(0);

  const onCreateWallet = useCallback(async () => {
    replace(Routes.SWIPE_LAYOUT, {
      params: { emptyWallet: true },
      screen: Routes.WALLET_SCREEN,
    });
  }, [replace]);

  const createWalletButtonProps = useMemoOne(() => {
    return {
      height: 64,
      shadowStyle: {
        opacity: 0,
      },
      style: {
        backgroundColor: colors.dark,
        width: width - 32,
      },
      text: 'Create a new wallet',
      textColor: colors.white,
    };
  }, [rValue]);

  const showRestoreSheet = useCallback(() => {
    navigate(Routes.RESTORE_SHEET, {
      userData,
    });
  }, [navigate, userData]);

  const existingWalletButtonProps = useMemoOne(() => {
    return {
      darkShadowStyle: {
        opacity: 0,
      },
      height: 64,
      shadowStyle: {
        opacity: 0,
      },
      style: {
        width: width - 32,
      },
      text: 'I already have one',
      textColor: colors.coinburp,
    };
  }, [rValue]);

  return (
    <Container testID="welcome-screen">
      {traversedRainbows.map(({ source, style, id }) => (
        <RainbowImage
          Component={Animated.Image}
          key={`rainbow${id}`}
          source={source}
          style={style}
        />
      ))}
      <ContentWrapper style={contentStyle}>
        <CoinBurpText />
        <ButtonWrapper style={buttonStyle}>
          <RainbowButton
            onPress={onCreateWallet}
            testID="new-wallet-button"
            {...createWalletButtonProps}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <RainbowButton
            onPress={showRestoreSheet}
            {...existingWalletButtonProps}
            testID="already-have-wallet-button"
          />
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  );
}
