import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { KeyboardArea } from 'react-native-keyboard-area';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { BiometricButtonContent } from '../buttons';
import { Column } from '../layout';
import { SheetHandleFixedToTopHeight } from '../sheet';
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
})`
  margin-top: 12px;
  padding: 0 8px;
`;

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
    : keyboardHeight - 108;

  const sheetRegionAboveKeyboardHeight =
    deviceHeight -
    platformKeyboardHeight -
    sharedCoolModalTopOffset -
    SheetHandleFixedToTopHeight;

  const { colors } = useTheme();

  return (
    <Column height={nativeScreen ? undefined : sheetRegionAboveKeyboardHeight}>
      <StatusBar barStyle="light-content" />
      {children}
      <Footer isTallPhone={isTallPhone}>
        <FooterButton disabled={footerButtonDisabled} onPress={onSubmit}>
          <BiometricButtonContent
            buttonColor={
              footerButtonDisabled ? colors.blueGrey : colors.coinburp
            }
            color="white"
            showIcon={footerIcon}
            testID="wallet-info-submit-button"
            text={footerButtonLabel}
          />
        </FooterButton>
      </Footer>
      {android ? <KeyboardSizeView /> : null}
    </Column>
  );
}
