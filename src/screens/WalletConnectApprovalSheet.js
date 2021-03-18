import { useRoute } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { InteractionManager } from 'react-native';
import styled from 'styled-components';
import { Alert } from '../components/alerts';
import { RequestVendorLogoIcon } from '../components/coin-icon';
import CoinCheckButton from '../components/coin-row/CoinCheckButton';
import { Centered, Row } from '../components/layout';
import {
  Sheet,
  SheetActionButton,
  SheetActionButtonRow,
} from '../components/sheet';
import { Text } from '../components/text';
import {
  getDappHostname,
  isDappAuthenticated,
} from '@rainbow-me/helpers/dappNameHandler';
import { useNavigation } from '@rainbow-me/navigation';
import { ethereumUtils } from '@rainbow-me/utils';

const DappLogo = styled(RequestVendorLogoIcon).attrs(
  ({ theme: { colors } }) => ({
    backgroundColor: colors.transparent,
    borderRadius: 18,
    showLargeShadow: true,
    size: 60,
  })
)`
  margin-bottom: 24;
`;

export default function WalletConnectApprovalSheet() {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const [scam, setScam] = useState(false);
  const handled = useRef(false);
  const meta = params?.meta || {};
  const { dappName, dappUrl, imageUrl } = meta;
  const callback = params?.callback;

  const checkIfScam = useCallback(
    async dappUrl => {
      const isScam = await ethereumUtils.checkIfUrlIsAScam(dappUrl);
      if (isScam) {
        Alert({
          buttons: [
            {
              text: 'Proceed Anyway',
            },
            {
              onPress: () => setScam(true),
              style: 'cancel',
              text: 'Ignore this request',
            },
          ],
          message:
            'We found this website in a list of malicious crypto scams.\n\n We recommend you to ignore this request and stop using this website immediately',
          title: ' 🚨 Heads up! 🚨',
        });
      }
    },
    [setScam]
  );

  const isAuthenticated = useMemo(() => {
    return isDappAuthenticated(dappUrl);
  }, [dappUrl]);

  const formattedDappUrl = useMemo(() => {
    return getDappHostname(dappUrl);
  }, [dappUrl]);

  const handleSuccess = useCallback(
    (success = false) => {
      if (callback) {
        setTimeout(() => callback(success), 300);
      }
    },
    [callback]
  );

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      analytics.track('Shown Walletconnect session request');
      checkIfScam(dappUrl);
    });
    // Reject if the modal is dismissed
    return () => {
      if (!handled.current) {
        handleSuccess(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnect = useCallback(() => {
    handled.current = true;
    goBack();
    handleSuccess(true);
  }, [handleSuccess, goBack]);

  const handleCancel = useCallback(() => {
    handled.current = true;
    goBack();
    handleSuccess(false);
  }, [handleSuccess, goBack]);

  useEffect(() => {
    if (scam) {
      handleCancel();
    }
  }, [handleCancel, scam]);

  return (
    <Sheet hideHandle>
      <Centered
        direction="column"
        paddingBottom={5}
        paddingHorizontal={19}
        paddingTop={17}
      >
        <DappLogo dappName={dappName || ''} imageUrl={imageUrl} />
        <Centered paddingHorizontal={24}>
          <Row>
            <Text
              align="center"
              color={colors.dark}
              lineHeight={29}
              size={20}
              weight={900}
            >
              <Text color={colors.coinburp} size={20} weight={900}>
                {dappName}
              </Text>{' '}
              wants to connect to your wallet
            </Text>
          </Row>
        </Centered>
        <Row marginBottom={30} marginTop={15}>
          {isAuthenticated && (
            <CoinCheckButton
              style={{
                left: -5,
                top: -10,
                width: 24,
              }}
              toggle
            />
          )}
          <Text color="coinburp" lineHeight={29} size={16} weight={900}>
            {formattedDappUrl}
          </Text>
        </Row>
      </Centered>
      <SheetActionButtonRow>
        <SheetActionButton
          color={colors.coinburp}
          label="Connect"
          onPress={handleConnect}
          size="larger"
          style={{ marginTop: -30 }}
          weight={900}
          width="100%"
        />
      </SheetActionButtonRow>
      <SheetActionButtonRow>
        <SheetActionButton
          color={colors.white}
          height={64}
          label="Cancel"
          onPress={handleCancel}
          size="larger"
          style={{ marginTop: -30 }}
          textColor={colors.red}
          weight={900}
        />
      </SheetActionButtonRow>
    </Sheet>
  );
}
