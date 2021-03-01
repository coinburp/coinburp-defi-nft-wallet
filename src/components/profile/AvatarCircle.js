import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useAccountProfile } from '../../hooks';
import { ButtonPressAnimation } from '../animations';
import ImageAvatar from '../contacts/ImageAvatar';
import { Flex, InnerBorder } from '../layout';
import { Text } from '../text';
import { position } from '@rainbow-me/styles';
import ShadowStack from 'react-native-shadow-stack';

const AvatarCircleSize = 116;

const AvatarCircleView = styled(Flex)`
  ${position.size(AvatarCircleSize)};
  border-radius: ${AvatarCircleSize};
  justify-content: ${ios ? 'flex-start' : 'center'};
  align-items: ${ios ? 'flex-start' : 'center'};
`;

const AvatarCircleBorder = styled(LinearGradient)`
  ${position.size(AvatarCircleSize + 12)};
  justify-content: ${ios ? 'flex-start' : 'center'};
  align-items: ${ios ? 'flex-start' : 'center'};
`;

const FirstLetter = styled(Text).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.whiteLabel,
  letterSpacing: 2,
  lineHeight: android ? 68 : 66,
  size: ios ? 38 : 30,
  weight: 'semibold',
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
      <ShadowStack
        {...position.sizeAsObject(AvatarCircleSize + 12)}
        backgroundColor={overlayStyles ? 'rgb(51, 54, 59)' : colors.white}
        borderRadius={AvatarCircleSize + 12}
        marginBottom={12}
        shadows={shadows[overlayStyles ? 'overlay' : 'default']}
        {...(android && {
          height: AvatarCircleSize + 12,
          width: AvatarCircleSize + 12,
        })}
      >
        {image ? (
          <ImageAvatar image={image} size="large" />
        ) : (
          <AvatarCircleBorder colors={['#fe5196', '#f77062']}>
            <AvatarCircleView
              backgroundColor={colors.avatarColor[accountColor]}
            >
              <FirstLetter>{accountSymbol}</FirstLetter>
              {!overlayStyles && <InnerBorder opacity={0.02} radius={65} />}
            </AvatarCircleView>
          </AvatarCircleBorder>
        )}
      </ShadowStack>
    </ButtonPressAnimation>
  );
}
