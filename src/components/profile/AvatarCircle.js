import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useAccountProfile } from '../../hooks';
import { ButtonPressAnimation } from '../animations';
import ImageAvatar from '../contacts/ImageAvatar';
import { Flex, InnerBorder } from '../layout';
import { Text } from '../text';
import { borders, position } from '@rainbow-me/styles';

const AvatarCircleSize = 128;

const AvatarCircleView = styled(Flex)`
  ${position.size(AvatarCircleSize)};
  border-radius: ${AvatarCircleSize};
  justify-content: center;
  align-items: center;
`;

const FirstLetter = styled(Text).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.whiteLabel,
  letterSpacing: 2,
  lineHeight: android ? 68 : 66,
  size: ios ? 38 : 30,
  weight: 900,
}))`
  width: ${android ? 66 : 67};
`;

export default function AvatarCircle({
  isAvatarPickerAvailable,
  onPress,
  overlayStyles,
  image,
}) {
  const { colors, isDarkMode } = useTheme();
  const { accountColor, accountSymbol } = useAccountProfile();
  const shadows = useMemo(
    () => ({
      default: [
        [0, 2, 5, isDarkMode ? colors.trueBlack : colors.dark, 0.2],
        [
          0,
          6,
          10,
          isDarkMode
            ? colors.trueBlack
            : colors.alpha(colors.avatarColor[accountColor || 0], 0.6),
        ],
      ],
      overlay: [
        [0, 6, 10, isDarkMode ? colors.trueBlack : colors.shadowBlack, 0.08],
        [0, 2, 5, isDarkMode ? colors.trueBlack : colors.shadowBlack, 0.12],
      ],
    }),
    [accountColor, colors, isDarkMode]
  );

  return (
    <ButtonPressAnimation
      disabled={!isAvatarPickerAvailable}
      enableHapticFeedback={isAvatarPickerAvailable}
      marginTop={2}
      onPress={onPress}
      pressOutDuration={200}
      scaleTo={isAvatarPickerAvailable ? 0.9 : 1}
    >
      <Flex
        {...borders.buildCircleAsObject(AvatarCircleSize)}
        backgroundColor={overlayStyles ? 'rgb(51, 54, 59)' : colors.white}
        borderRadius={AvatarCircleSize}
        marginBottom={12}
        shadows={shadows[overlayStyles ? 'overlay' : 'default']}
        {...(android && {
          height: AvatarCircleSize,
          overflow: 'hidden',
          width: AvatarCircleSize,
        })}
      >
        {image ? (
          <ImageAvatar image={image} size="large" />
        ) : (
          <AvatarCircleView
            backgroundColor={colors.avatarColor[accountColor]}
            borderRadius={AvatarCircleSize}
          >
            <FirstLetter>{accountSymbol}</FirstLetter>
          </AvatarCircleView>
        )}
      </Flex>
    </ButtonPressAnimation>
  );
}
