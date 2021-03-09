import React from 'react';
import { StyleSheet } from 'react-native';
import { IS_TESTING } from 'react-native-dotenv';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import { lightModeThemeColors } from '../../styles/colors';
import { Centered } from '../layout';

import { GradientText, Text } from '../text';
import { position } from '@rainbow-me/styles';

const sx = StyleSheet.create({
  container: {
    height: 30,
    paddingBottom: 1,
    paddingHorizontal: 10,
  },
  containerSmall: {
    height: 21,
    paddingHorizontal: 6,
    transform: [{ translateX: -6 }],
  },
  gradient: {
    ...position.coverAsObject,
    overflow: 'hidden',
  },
});

const gradientColors = ['#2CCC00', '#FEBE44'];
const gradientProps = {
  pointerEvents: 'none',
  style: sx.gradient,
};

const linearGradientProps = {
  ...gradientProps,
  end: { x: 1, y: 1 },
  start: { x: 0, y: 0 },
};

const radialGradientProps = {
  ...gradientProps,
  center: [0, 1],
  colors: [
    lightModeThemeColors.alpha(gradientColors[0], 0.1),
    lightModeThemeColors.alpha(gradientColors[1], 0.08),
  ],
};

const textProps = {
  color: lightModeThemeColors.blueGrey,
  end: { x: 1, y: 1 },
  start: { x: 0, y: 0 },
  steps: [0, 1],
};

function APYPill({ small, value }) {
  return (
    <Centered style={small ? sx.containerSmall : sx.container}>
      <Text
        {...textProps}
        align="center"
        angle={false}
        letterSpacing="roundedTight"
        size={14}
        weight="bold"
      >
        {value}% APY
      </Text>
    </Centered>
  );
}

export default React.memo(APYPill);
