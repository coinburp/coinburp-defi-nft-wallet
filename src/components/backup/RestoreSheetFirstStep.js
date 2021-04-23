import { forEach } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { IS_TESTING } from 'react-native-dotenv';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { cloudPlatform } from '../../utils/platform';
import Divider from '../Divider';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import { Column, Row, RowWithMargins } from '../layout';
import { GradientText, Text } from '../text';
import WalletBackupTypes from '@rainbow-me/helpers/walletBackupTypes';
import { useNavigation } from '@rainbow-me/navigation';
import { deviceUtils } from '@rainbow-me/utils';

const deviceWidth = deviceUtils.dimensions.width;

const Container = styled(Column)``;

const CaretIcon = styled(Icon).attrs({
  name: 'caretThick',
  size: 24,
})`
  margin-bottom: 5.25;
`;

const SheetRow = styled(Row).attrs({
  scaleTo: 0.975,
})`
  padding-horizontal: 30;
  padding-top: 11;
  width: 100%;
`;

const TitleRow = styled(RowWithMargins)`
  align-items: center;
  justify-content: space-between;
  width: ${deviceWidth - 60};
`;

const RainbowText = Text;

const TextIcon = styled(Icon)`
  margin-bottom: 7;
  margin-top: 8;
`;

const Title = styled(Text).attrs({
  letterSpacing: 'roundedMedium',
  lineHeight: 27,
  size: 20,
  weight: 900,
})`
  margin-bottom: 8;
  max-width: 276;
`;

const DescriptionText = styled(Text).attrs(({ theme: { colors } }) => ({
  align: 'left',
  lineHeight: 22,
  size: 14,
  weight: 'bold',
}))`
  max-width: 276;
  padding-bottom: 24;
`;

export default function RestoreSheetFirstStep({
  onCloudRestore,
  onManualRestore,
  onWatchAddress,
  userData,
}) {
  const { setParams } = useNavigation();
  const { colors } = useTheme();

  const walletsBackedUp = useMemo(() => {
    let count = 0;
    forEach(userData?.wallets, wallet => {
      if (wallet.backedUp && wallet.backupType === WalletBackupTypes.cloud) {
        count++;
      }
    });
    return count;
  }, [userData]);

  const enableCloudRestore = android || walletsBackedUp > 0;
  useEffect(() => {
    setParams({ enableCloudRestore });
  }, [enableCloudRestore, setParams]);

  return (
    <Container>
      {enableCloudRestore && (
        <React.Fragment>
          <SheetRow as={ButtonPressAnimation} onPress={onCloudRestore}>
            <Column>
              <TextIcon
                color={colors.coinburp}
                height={32}
                name="pinkCloud"
                width={32}
              />
              <TitleRow>
                <RainbowText colors={colors}>
                  <Title>Restore from {cloudPlatform}</Title>
                </RainbowText>
                <CaretIcon />
              </TitleRow>
              <DescriptionText>
                {ios
                  ? `You have ${walletsBackedUp} ${
                      walletsBackedUp > 1 ? 'wallets' : 'wallet'
                    } backed up`
                  : `If you previously backed up your wallet on ${cloudPlatform} tap here to restore it.`}
              </DescriptionText>
            </Column>
          </SheetRow>
          <Divider color={colors.rowDividerExtraLight} inset={[0, 30]} />
        </React.Fragment>
      )}
      <SheetRow
        as={ButtonPressAnimation}
        onPress={onManualRestore}
        scaleTo={0.9}
        testID="restore-with-key-button"
      >
        <Column>
          <TextIcon color={colors.coinburp} name="refresh" />
          <TitleRow justify="space-between" width="100%">
            <Title>Restore with a recovery phrase or private key</Title>
            <CaretIcon />
          </TitleRow>
          <DescriptionText>
            Use your recovery phrase from CoinBurp or another crypto wallet
          </DescriptionText>
        </Column>
      </SheetRow>
      <Divider color={colors.rowDividerExtraLight} inset={[0, 30]} />

      <SheetRow
        as={ButtonPressAnimation}
        onPress={onWatchAddress}
        scaleTo={0.9}
        testID="watch-address-button"
      >
        <Column>
          <TextIcon color={colors.coinburp} name="search" />
          <TitleRow justify="space-between" width="100%">
            <Title>Watch an Ethereum address </Title>
            <CaretIcon />
          </TitleRow>
          <DescriptionText>Watch a public address or ENS name</DescriptionText>
        </Column>
      </SheetRow>
    </Container>
  );
}
