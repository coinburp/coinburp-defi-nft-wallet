import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { removeFirstEmojiFromString } from '../../helpers/emojiHandler';
import { deviceUtils } from '../../utils';
import { ButtonPressAnimation } from '../animations';
import { BottomRowText } from '../coin-row';
import CoinCheckButton from '../coin-row/CoinCheckButton';
import { ContactAvatar } from '../contacts';
import ImageAvatar from '../contacts/ImageAvatar';
import { Icon } from '../icons';
import { Centered, Column, ColumnWithMargins, Row } from '../layout';
import { TruncatedAddress, TruncatedText } from '../text';
import { fonts, getFontSize } from '@rainbow-me/styles';

const maxAccountLabelWidth = deviceUtils.dimensions.width - 88;
const NOOP = () => undefined;

const sx = StyleSheet.create({
  accountLabel: {
    fontFamily: fonts.family.SFProRounded,
    fontSize: getFontSize(fonts.size.larger),
    fontWeight: fonts.weight.bold,
    letterSpacing: fonts.letterSpacing.roundedMedium,
    maxWidth: maxAccountLabelWidth,
  },
  accountRow: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 19,
  },
  bottomRowText: {
    fontSize: getFontSize(fonts.size.smedium),
    fontWeight: fonts.weight.bold,
    letterSpacing: fonts.letterSpacing.roundedMedium,
  },
  coinCheckIcon: {
    width: 68,
  },
  gradient: {
    alignSelf: 'center',
    borderRadius: 24,
    height: 20,
    marginLeft: 19,
    textAlign: 'center',
  },
  readOnlyText: {
    fontFamily: fonts.family.SFProRounded,
    fontWeight: fonts.weight.semibold,
    letterSpacing: fonts.letterSpacing.roundedTight,
    paddingHorizontal: 6.5,
    paddingVertical: 3,
    textAlign: 'center',
  },
  rightContent: {
    flex: 0,
    flexDirection: 'row',
    marginLeft: 48,
  },
});

const gradientProps = {
  pointerEvents: 'none',
  style: sx.gradient,
};

const OptionsIcon = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <ButtonPressAnimation onPress={onPress} scaleTo={0.9}>
      <Centered height={40} width={68}>
        {android ? (
          <Icon color={colors.coinburp} name="threeDots" />
        ) : (
          <Icon color={colors.coinburp} name="threeDots" />
        )}
      </Centered>
    </ButtonPressAnimation>
  );
};

export default function AddressRow({ data, editMode, onPress, onEditWallet }) {
  const {
    address,
    balance,
    color: accountColor,
    ens,
    image: accountImage,
    index,
    isSelected,
    isReadOnly,
    label,
    walletId,
  } = data;

  const { colors } = useTheme();

  let cleanedUpBalance = balance;
  if (balance === '0.00') {
    cleanedUpBalance = '0';
  }

  let cleanedUpLabel = null;
  if (label) {
    cleanedUpLabel = removeFirstEmojiFromString(label).join('');
  }

  const onOptionsPress = useCallback(() => {
    onEditWallet(walletId, address, cleanedUpLabel);
  }, [address, cleanedUpLabel, onEditWallet, walletId]);

  const linearGradientProps = useMemo(
    () => ({
      ...gradientProps,
      colors: [
        colors.alpha(colors.gradients.lightGrey[0], 0.6),
        colors.gradients.lightGrey[1],
      ],
      end: { x: 1, y: 1 },
      start: { x: 0, y: 0 },
    }),
    [colors]
  );

  return (
    <View style={sx.accountRow}>
      <ButtonPressAnimation
        enableHapticFeedback={!editMode}
        onLongPress={onOptionsPress}
        onPress={editMode ? onOptionsPress : onPress}
        scaleTo={editMode ? 1 : 0.98}
      >
        <Row align="center">
          <Row align="center" flex={1} height={59}>
            {accountImage ? (
              <ImageAvatar
                image={accountImage}
                marginRight={12}
                size="medium"
              />
            ) : (
              <ContactAvatar
                color={accountColor}
                marginRight={12}
                size="medium"
                value={label || ens || `${index + 1}`}
              />
            )}
            <ColumnWithMargins margin={6}>
              {cleanedUpLabel || ens ? (
                <TruncatedText color={colors.dark} style={sx.accountLabel}>
                  {cleanedUpLabel || ens}
                </TruncatedText>
              ) : (
                <TruncatedAddress
                  address={address}
                  color={colors.dark}
                  firstSectionLength={4}
                  style={sx.accountLabel}
                  truncationLength={4}
                />
              )}
              <BottomRowText color={colors.blueGrey} style={sx.bottomRowText}>
                {cleanedUpBalance || 0} ETH
              </BottomRowText>
            </ColumnWithMargins>
          </Row>
          <Column style={sx.rightContent}>
            {isReadOnly && (
              <LinearGradient
                {...linearGradientProps}
                marginRight={editMode || isSelected ? -9 : 19}
              >
                <Text
                  style={[
                    sx.readOnlyText,
                    {
                      color: colors.blueGrey,
                      fontSize: 12,
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  WATCHING
                </Text>
              </LinearGradient>
            )}
            {!editMode && isSelected && (
              <CoinCheckButton style={sx.coinCheckIcon} toggle={isSelected} />
            )}
            {editMode && <OptionsIcon onPress={NOOP} />}
          </Column>
        </Row>
      </ButtonPressAnimation>
    </View>
  );
}
