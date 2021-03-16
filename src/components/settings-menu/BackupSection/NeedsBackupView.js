import { useRoute } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import React, { Fragment, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { cloudPlatform } from '../../../utils/platform';
import { ButtonPressAnimation } from '../../animations';
import { RainbowButton } from '../../buttons';
import { Icon } from '../../icons';
import { Centered, Column, Flex, Row } from '../../layout';
import { SheetActionButton } from '../../sheet';
import { GradientText, Text } from '../../text';
import BackupIcon from '@rainbow-me/assets/backupIcon.png';
import BackupIconDark from '@rainbow-me/assets/backupIconDark.png';
import WalletBackupStepTypes from '@rainbow-me/helpers/walletBackupStepTypes';
import { useWallets } from '@rainbow-me/hooks';
import { ImgixImage } from '@rainbow-me/images';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';
import { fonts, padding } from '@rainbow-me/styles';

const BackupButton = styled(RainbowButton).attrs({
  type: 'small',
  width: ios ? 221 : 270,
})`
  margin-bottom: 19;
`;

const Content = styled(Column).attrs({
  align: 'center',
  justify: 'space-between',
})`
  ${padding(0, 19, 42)};
  flex: 1;
`;

const DescriptionText = styled(Text).attrs({
  align: 'center',
  lineHeight: 24,
  size: 16,
  weight: 'bold',
})`
  margin-bottom: 33px;
  padding-horizontal: 18px;
`;

const Subtitle = styled(Text).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.orangeLight,
  size: fonts.size.smedium,
  weight: fonts.weight.medium,
}))`
  margin-top: -10;
`;

const Title = styled(Text).attrs({
  align: 'center',
  size: 24,
  weight: 900,
})`
  margin-bottom: 8;
  padding-horizontal: 11;
`;

const TopIcon = styled(ImgixImage).attrs({
  resizeMode: ImgixImage.resizeMode.contain,
})`
  height: 74;
  width: 75;
`;

export default function NeedsBackupView() {
  const { navigate, setParams } = useNavigation();
  const { params } = useRoute();
  const { wallets, selectedWallet } = useWallets();
  const walletId = params?.walletId || selectedWallet.id;

  useEffect(() => {
    if (wallets[walletId]?.backedUp) {
      setParams({ type: 'AlreadyBackedUpView' });
    }
  }, [setParams, walletId, wallets]);

  useEffect(() => {
    analytics.track('Needs Backup View', {
      category: 'settings backup',
    });
  }, []);

  const onIcloudBackup = useCallback(() => {
    analytics.track(`Back up to ${cloudPlatform} pressed`, {
      category: 'settings backup',
    });
    navigate(ios ? Routes.BACKUP_SHEET : Routes.BACKUP_SCREEN, {
      nativeScreen: true,
      step: WalletBackupStepTypes.cloud,
      walletId,
    });
  }, [navigate, walletId]);

  const onManualBackup = useCallback(() => {
    analytics.track('Manual Backup pressed', {
      category: 'settings backup',
    });
    navigate(ios ? Routes.BACKUP_SHEET : Routes.BACKUP_SCREEN, {
      nativeScreen: true,
      step: WalletBackupStepTypes.manual,
      walletId,
    });
  }, [navigate, walletId]);

  const { colors } = useTheme();

  return (
    <Fragment>
      <Subtitle>Not backed up</Subtitle>
      <Content>
        <Column />
        <Column>
          <Column align="center">
            <Icon
              color={colors.gold}
              height={68}
              marginBottom={32}
              name="warning"
              width={70}
            />
            <Title>Back up your wallet </Title>
            <DescriptionText>
              Don&apos;t risk your money! Back up your wallet so you can recover
              it if you lose this device.
            </DescriptionText>
          </Column>
          {/*<Column align="center">*/}
          {/*  <ButtonPressAnimation onPress={onIcloudBackup} scaleTo={0.9}>*/}
          {/*    <Row align="center">*/}
          {/*      <Icon marginRight={12} name="pinkCloud" />*/}
          {/*      <GradientText*/}
          {/*        angle={360}*/}
          {/*        colors={['#fa71cd', '#c471f5']}*/}
          {/*        size={20}*/}
          {/*        steps={[0, 0.9]}*/}
          {/*        weight={900}*/}
          {/*      >*/}
          {/*        {`Back up to ${cloudPlatform}`}*/}
          {/*      </GradientText>*/}
          {/*    </Row>*/}
          {/*  </ButtonPressAnimation>*/}
          {/*</Column>*/}
        </Column>
        <SheetActionButton
          androidWidth={220}
          color={colors.white}
          label="Back up manually"
          onPress={onManualBackup}
          size={20}
          textColor={colors.coinburp}
          weight={900}
        />
      </Content>
    </Fragment>
  );
}
