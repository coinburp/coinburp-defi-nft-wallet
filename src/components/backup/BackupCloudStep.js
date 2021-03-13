import { useRoute } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import { captureMessage } from '@sentry/react-native';
import lang from 'i18n-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components';
import zxcvbn from 'zxcvbn';
import { isSamsungGalaxy } from '../../helpers/samsung';
import { saveBackupPassword } from '../../model/backup';
import { cloudPlatform } from '../../utils/platform';
import { DelayedAlert } from '../alerts';
import { PasswordField } from '../fields';
import { BackButton } from '../header';
import { Icon } from '../icons';
import { Centered, ColumnWithMargins, Row } from '../layout';
import { SheetTitle } from '../sheet';
import { GradientText, Text } from '../text';
import BackupSheetKeyboardLayout from './BackupSheetKeyboardLayout';
import {
  cloudBackupPasswordMinLength,
  isCloudBackupPasswordValid,
} from '@rainbow-me/handlers/cloudBackup';
import showWalletErrorAlert from '@rainbow-me/helpers/support';
import {
  useDimensions,
  useMagicAutofocus,
  useRouteExistsInNavigationState,
  useWalletCloudBackup,
  useWallets,
} from '@rainbow-me/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';
import { padding } from '@rainbow-me/styles';
import logger from 'logger';

const DescriptionText = styled(Text).attrs(
  ({ isTinyPhone, theme: { colors } }) => ({
    align: 'center',
    size: 16,
    weight: 'bold',
  })
)``;

const Masthead = styled(Centered).attrs({
  direction: 'column',
})`
  ${({ isTallPhone, isTinyPhone }) =>
    padding(isTinyPhone ? 0 : 9, isTinyPhone ? 10 : 50, isTallPhone ? 39 : 19)};
  flex-shrink: 0;
`;

const MastheadIcon = styled(GradientText).attrs(({ theme: { colors } }) => ({
  align: 'center',
  angle: false,
  colors: colors.gradients.rainbow,
  end: { x: 0, y: 0.5 },
  size: 43,
  start: { x: 1, y: 0.5 },
  steps: [0, 0.774321, 1],
  weight: 'medium',
}))``;

const Title = styled(Text).attrs({
  align: 'center',
  size: 32,
  weight: 900,
})`
  ${({ isTinyPhone }) => (isTinyPhone ? padding(0) : padding(15, 0, 12))};
`;

const samsungGalaxy = (android && isSamsungGalaxy()) || false;

export default function BackupCloudStep() {
  const { isTallPhone, isTinyPhone } = useDimensions();
  const currentlyFocusedInput = useRef();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const walletCloudBackup = useWalletCloudBackup();
  const { width } = useDimensions();
  const { selectedWallet, setIsWalletLoading, isDamaged } = useWallets();
  const [validPassword, setValidPassword] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const keyboardDidShow = () => {
      setIsKeyboardOpen(true);
    };

    const keyboardDidHide = () => {
      setIsKeyboardOpen(false);
    };
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    if (isDamaged) {
      showWalletErrorAlert();
      captureMessage('Damaged wallet preventing cloud backup');
      goBack();
    }
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, [goBack, isDamaged]);

  const isSettingsRoute = useRouteExistsInNavigationState(
    Routes.SETTINGS_MODAL
  );

  const walletId = params?.walletId || selectedWallet.id;

  const [label, setLabel] = useState(
    !validPassword ? `􀙶 Add to ${cloudPlatform} Backup` : '􀎽 Confirm Backup'
  );
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      passwordRef.current?.focus();
    }, 1);
    analytics.track('Choose Password Step', {
      category: 'backup',
      label: cloudPlatform,
    });
  }, []);

  const { handleFocus } = useMagicAutofocus(passwordRef);

  const onPasswordFocus = useCallback(
    target => {
      handleFocus(target);
      setPasswordFocused(true);
      currentlyFocusedInput.current = passwordRef.current;
    },
    [handleFocus]
  );

  const onConfirmPasswordFocus = useCallback(
    target => {
      handleFocus(target);
      currentlyFocusedInput.current = confirmPasswordRef.current;
    },
    [handleFocus]
  );

  const onPasswordBlur = useCallback(() => {
    setPasswordFocused(false);
  }, []);

  const onPasswordSubmit = useCallback(() => {
    confirmPasswordRef.current?.focus();
  }, []);

  useEffect(() => {
    let passwordIsValid = false;
    if (password === confirmPassword && isCloudBackupPasswordValid(password)) {
      passwordIsValid = true;
    }

    let newLabel = '';
    if (passwordIsValid) {
      newLabel = 'Confirm';
    } else if (password.length < cloudBackupPasswordMinLength) {
      newLabel = `Minimum ${cloudBackupPasswordMinLength} characters`;
    } else if (
      password !== '' &&
      password.length < cloudBackupPasswordMinLength &&
      !passwordRef.current?.isFocused()
    ) {
      newLabel = 'Use a longer password';
    } else if (
      isCloudBackupPasswordValid(password) &&
      isCloudBackupPasswordValid(confirmPassword) &&
      confirmPassword.length >= password.length &&
      password !== confirmPassword
    ) {
      newLabel = `Passwords don't match`;
    } else if (
      password.length >= cloudBackupPasswordMinLength &&
      !passwordFocused
    ) {
      newLabel = 'Confirm password';
    } else if (
      password.length >= cloudBackupPasswordMinLength &&
      passwordFocused
    ) {
      const passInfo = zxcvbn(password);
      switch (passInfo.score) {
        case 0:
        case 1:
          newLabel = 'Password is Weak';
          break;
        case 2:
          newLabel = 'Password is Good';
          break;
        case 3:
          newLabel = 'Password is Great';
          break;
        case 4:
          newLabel = 'Password is Strong';
          break;
        default:
      }
    }

    setValidPassword(passwordIsValid);
    setLabel(newLabel);
  }, [confirmPassword, password, passwordFocused]);

  const onPasswordChange = useCallback(
    ({ nativeEvent: { text: inputText } }) => {
      setPassword(inputText);
    },
    []
  );

  const onConfirmPasswordChange = useCallback(
    ({ nativeEvent: { text: inputText } }) => {
      setConfirmPassword(inputText);
    },
    []
  );

  const onError = useCallback(
    msg => {
      setTimeout(onPasswordSubmit, 1000);
      setIsWalletLoading(null);
      DelayedAlert({ title: msg }, 500);
    },
    [onPasswordSubmit, setIsWalletLoading]
  );

  const onSuccess = useCallback(async () => {
    logger.log('BackupCloudStep:: saving backup password');
    await saveBackupPassword(password);
    if (!isSettingsRoute) {
      DelayedAlert({ title: lang.t('cloud.backup_success') }, 1000);
    }
    // This means the user set a new password
    // and it was the first wallet backed up
    analytics.track('Backup Complete', {
      category: 'backup',
      label: cloudPlatform,
    });
    goBack();
  }, [goBack, isSettingsRoute, password]);

  const onConfirmBackup = useCallback(async () => {
    await walletCloudBackup({
      onError,
      onSuccess,
      password,
      walletId,
    });
  }, [onError, onSuccess, password, walletCloudBackup, walletId]);

  const onConfirmPasswordSubmit = useCallback(() => {
    validPassword && onConfirmBackup();
  }, [onConfirmBackup, validPassword]);

  return (
    <BackupSheetKeyboardLayout
      footerButtonDisabled={!validPassword}
      footerButtonLabel={label}
      footerIcon={ios && validPassword ? 'faceid' : null}
      onSubmit={onConfirmBackup}
    >
      <Masthead isTallPhone={isTallPhone} isTinyPhone={isTinyPhone}>
        <Row
          align="center"
          justify="space-between"
          marginBottom={48}
          width={width}
        >
          <BackButton size={24} />
          <SheetTitle css={{ left: -12 }} weight={900}>
            Back up to {cloudPlatform}
          </SheetTitle>
          <Row />
        </Row>
        {(isTinyPhone || samsungGalaxy) && isKeyboardOpen ? null : (
          <Icon height={72} name="pinkCloud" width={64} />
        )}
        <Title isTinyPhone={isTinyPhone}>Choose a password</Title>
        <DescriptionText isTinyPhone={isTinyPhone}>
          Please use a password you&apos;ll remember.&nbsp;It can&apos;t be
          recovered!
        </DescriptionText>
      </Masthead>
      <ColumnWithMargins align="center" flex={1} margin={android ? 0 : 0}>
        <PasswordField
          isInvalid={
            password !== '' &&
            password.length < cloudBackupPasswordMinLength &&
            !passwordRef.current.isFocused()
          }
          isValid={isCloudBackupPasswordValid(password)}
          onBlur={onPasswordBlur}
          onChange={onPasswordChange}
          onFocus={onPasswordFocus}
          onSubmitEditing={onPasswordSubmit}
          password={password}
          placeholder="Backup Password"
          ref={passwordRef}
          returnKeyType="next"
          textContentType="newPassword"
        />
        <PasswordField
          editable={isCloudBackupPasswordValid(password)}
          isInvalid={
            isCloudBackupPasswordValid(confirmPassword) &&
            confirmPassword.length >= password.length &&
            confirmPassword !== password
          }
          isValid={validPassword}
          onChange={onConfirmPasswordChange}
          onFocus={onConfirmPasswordFocus}
          onSubmitEditing={onConfirmPasswordSubmit}
          password={confirmPassword}
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
        />
      </ColumnWithMargins>
    </BackupSheetKeyboardLayout>
  );
}
