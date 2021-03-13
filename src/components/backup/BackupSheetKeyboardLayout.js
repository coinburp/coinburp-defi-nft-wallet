import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { KeyboardArea } from 'react-native-keyboard-area';
import styled from 'styled-components';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import { Centered, Column } from '../layout';
import { SheetHandleFixedToTopHeight } from '../sheet';
import { Text } from '../text';
import KeyboardTypes from '@rainbow-me/helpers/keyboardTypes';
import { useDimensions, useKeyboardHeight } from '@rainbow-me/hooks';
import { sharedCoolModalTopOffset } from '@rainbow-me/navigation/config';
import { padding } from '@rainbow-me/styles';

const Footer = styled(Column)`
  ${({ isTallPhone }) => padding(0, 15, isTallPhone ? 30 : 15)};
  flex-shrink: 0;
  width: 100%;
`;

const FooterButton = styled(ButtonPressAnimation).attrs({
  scaleTo: 0.9,
})``;

const FooterButtonContainer = styled(Centered).attrs(
  ({ theme: { colors }, disabled }) => ({
    backgroundColor: disabled ? colors.blueGrey : colors.coinburp,
    borderRadius: 24,
    height: 64,
  })
)``;

const ButtonIcon = styled(Icon)`
  left: 24px;
  position: absolute;
`;

const FooterButtonText = styled(Text).attrs(({ theme: { colors } }) => ({
  color: colors.white,
  size: 20,
  weight: 900,
}))``;

const KeyboardSizeView = styled(KeyboardArea)`
  background-color: ${({ theme: { colors } }) => colors.transparent};
`;

export default function BackupSheetKeyboardLayout({
  children,
  footerButtonDisabled,
  footerButtonLabel,
  footerIcon,
  onSubmit,
  type,
}) {
  const { params: { nativeScreen } = {} } = useRoute();
  const { height: deviceHeight, isTallPhone } = useDimensions();
  const keyboardHeight = useKeyboardHeight({
    keyboardType: KeyboardTypes.password,
  });

  const platformKeyboardHeight = android
    ? type === 'restore'
      ? -10
      : -30
    : keyboardHeight;

  const sheetRegionAboveKeyboardHeight =
    deviceHeight -
    platformKeyboardHeight -
    sharedCoolModalTopOffset -
    SheetHandleFixedToTopHeight;

  return (
    <Column height={nativeScreen ? undefined : sheetRegionAboveKeyboardHeight}>
      <StatusBar barStyle="light-content" />
      {children}
      <Footer isTallPhone={isTallPhone}>
        <FooterButton disabled={footerButtonDisabled} onPress={onSubmit}>
          <FooterButtonContainer disabled={footerButtonDisabled}>
            {footerIcon ? <ButtonIcon name={footerIcon} /> : null}
            <FooterButtonText>{footerButtonLabel}</FooterButtonText>
          </FooterButtonContainer>
        </FooterButton>
      </Footer>
      {android ? <KeyboardSizeView /> : null}
    </Column>
  );
}
