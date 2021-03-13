import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Centered, Flex, InnerBorder } from '../layout';
import { ImgixImage } from '@rainbow-me/images';
import { borders } from '@rainbow-me/styles';
import ShadowStack from 'react-native-shadow-stack';

const buildSmallShadows = (color, colors) => [
  [0, 3, 5, colors.shadow, 0.14],
  [0, 6, 10, colors.avatarColor[color] || color, 0.2],
];

const sizeConfigs = colors => ({
  large: {
    dimensions: 128,
    radius: 6,
    shadow: [
      [0, 6, 10, colors.shadow, 0.12],
      [0, 2, 5, colors.shadow, 0.08],
    ],
    textSize: 'bigger',
  },
  medium: {
    dimensions: 52,
    radius: 3,
    shadow: [
      [0, 4, 6, colors.shadow, 0.04],
      [0, 1, 3, colors.shadow, 0.08],
    ],
    textSize: 'larger',
  },
  small: {
    dimensions: 48,
    radius: 3,
    shadow: [
      [0, 4, 6, colors.shadow, 0.04],
      [0, 1, 3, colors.shadow, 0.08],
    ],
    textSize: 'larger',
  },
});

const Avatar = styled(ImgixImage)
  .withConfig({
    shouldForwardProp: prop => prop !== 'width',
  })
  .attrs({ pointerEvents: 'none' })`
  height: ${({ dimensions }) => dimensions};
  width: ${({ dimensions }) => dimensions};
`;

const ImageAvatar = ({ image, size = 'medium', ...props }) => {
  const { colors } = useTheme();
  const { dimensions, radius, shadow } = useMemo(
    () => sizeConfigs(colors)[size],
    [colors, size]
  );

  const shadows = useMemo(
    () =>
      size === 'small' ? buildSmallShadows(colors.shadow, colors) : shadow,
    [shadow, size, colors]
  );

  return (
    <ShadowStack
      {...props}
      {...borders.buildCircleAsObject(dimensions)}
      backgroundColor={colors.white}
      shadows={shadows}
    >
      <Centered flex={1}>
        <Flex
          {...borders.buildCircleAsObject(dimensions - 6)}
          align="center"
          justify="center"
        >
          <Avatar
            color={colors.gold}
            dimensions={dimensions}
            opacity={1}
            radius={dimensions}
            source={{
              uri: image,
            }}
            width={radius}
          />
        </Flex>
      </Centered>
    </ShadowStack>
  );
};

export default React.memo(ImageAvatar);
