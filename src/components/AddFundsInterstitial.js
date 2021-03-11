import { captureMessage } from '@sentry/react-native';
import { get } from 'lodash';
import React, { Fragment, useCallback } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import networkInfo from '../helpers/networkInfo';
import networkTypes from '../helpers/networkTypes';
import showWalletErrorAlert from '../helpers/support';
import { useAccountSettings, useDimensions, useWallets } from '../hooks';
import { useNavigation } from '../navigation/Navigation';
import { magicMemo } from '../utils';
import Divider from './Divider';
import { ButtonPressAnimation, ScaleButtonZoomableAndroid } from './animations';
import { Icon } from './icons';
import { Centered, Row } from './layout';
import { Text } from './text';
import Routes from '@rainbow-me/routes';
import { padding } from '@rainbow-me/styles';

const ButtonContainerHeight = 400;
const ButtonContainerWidth = 261;

const ButtonContainer = styled(Centered).attrs({ direction: 'column' })`
  width: ${ButtonContainerWidth};
`;

const InterstitialButton = styled(ButtonPressAnimation).attrs(
  ({ theme: { colors } }) => ({
    backgroundColor: colors.alpha(colors.blueGrey, 0.16),
    borderRadius: 23,
  })
)`
  ${padding(3, 15, 3)};
`;

const InterstitialButtonRow = styled(Row)`
  margin-bottom: ${({ isSmallPhone }) => (isSmallPhone ? 19 : 42)};
`;

const InterstitialDivider = styled(Divider).attrs(({ theme: { colors } }) => ({
  color: colors.alpha(colors.blueGrey, 0.16),
  inset: [-100, 0, 0, 0],
}))`
  border-radius: 1;
`;

const CopyAddressButton = styled(ButtonPressAnimation).attrs({
  borderRadius: 24,
})`
  ${padding(19, 15, 21)};
  width: ${({ width }) => width - 32};
`;

const AmountBPA = styled(ButtonPressAnimation).attrs(({ theme: { colors } }) =>
  ios
    ? {
        backgroundColor: colors.coinburp,
        borderRadius: 24,
        height: 61,
        justifyContent: 'center',
        paddingHorizontal: 12,
        zIndex: 10,
      }
    : {}
)`
  border-radius: 25px;
  overflow: visible;
`;

const Container = styled(Centered)`
  left: 50%;
  position: absolute;
  top: 50%;
`;

const Paragraph = styled(Text).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.alpha(colors.blueGreyDark, 0.4),
  letterSpacing: 'roundedMedium',
  lineHeight: 'paragraphSmall',
  size: 'lmedium',
  weight: 'semibold',
}))`
  margin-bottom: 24;
  margin-top: 19;
`;

const Title = styled(Text).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.dark,
  lineHeight: 32,
  size: 32,
  weight: 'bold',
}))``;

const Subtitle = styled(Title).attrs(({ theme: { colors } }) => ({
  color: colors.dark,
}))`
  margin-top: ${({ isSmallPhone }) => (isSmallPhone ? 19 : 42)};
`;

const AmountText = styled(Text).attrs(({ children }) => ({
  align: 'center',
  children: android ? `  ${children.join('')}  ` : children,
  letterSpacing: 1,
  size: 24,
  weight: 900,
}))`
  align-self: center;
  z-index: 1;
`;

const AmountButtonWrapper = styled(Row).attrs({
  justify: 'center',
  marginLeft: 6,
  marginRight: 6,
})``;

const buildInterstitialTransform = (isSmallPhone, offsetY) => ({
  transform: [
    { translateX: (ButtonContainerWidth / 2) * -1 },
    {
      translateY:
        (ButtonContainerHeight / 2) * -1 +
        offsetY -
        (android ? 66 : isSmallPhone ? 44 : 22),
    },
  ],
});

const onAddFromFaucet = network => {
  const faucetUrl = get(networkInfo[network], 'faucet_url');
  Linking.openURL(faucetUrl);
};

const InnerBPA = android ? ButtonPressAnimation : ({ children }) => children;

const Wrapper = android ? ScaleButtonZoomableAndroid : AmountBPA;

const AmountButton = ({ amount, backgroundColor, color, onPress }) => {
  const handlePress = useCallback(() => onPress?.(amount), [amount, onPress]);

  return (
    <AmountButtonWrapper>
      <Wrapper disabled={android} onPress={handlePress}>
        <InnerBPA onPress={handlePress} reanimatedButton style={{ flex: 1 }}>
          <Row backgroundColor={backgroundColor} borderRadius={24} height={61}>
            <AmountText color={color}>${amount}</AmountText>
          </Row>
        </InnerBPA>
      </Wrapper>
    </AmountButtonWrapper>
  );
};

const AddFundsInterstitial = ({ network, offsetY = 0 }) => {
  const { isSmallPhone, width } = useDimensions();
  const { navigate } = useNavigation();
  const { isDamaged } = useWallets();
  const { accountAddress } = useAccountSettings();
  const { colors } = useTheme();

  const handlePressAmount = useCallback(
    amount => {
      if (isDamaged) {
        showWalletErrorAlert();
        captureMessage('Damaged wallet preventing add cash');
        return;
      }
      if (ios) {
        navigate(Routes.ADD_CASH_FLOW, {
          params: !isNaN(amount) ? { amount } : null,
          screen: Routes.ADD_CASH_SCREEN_NAVIGATOR,
        });
      } else {
        navigate(Routes.WYRE_WEBVIEW_NAVIGATOR, {
          params: {
            address: accountAddress,
            amount: !isNaN(amount) ? amount : null,
          },
          screen: Routes.WYRE_WEBVIEW,
        });
      }
    },
    [isDamaged, navigate, accountAddress]
  );

  const handlePressCopyAddress = useCallback(() => {
    if (isDamaged) {
      showWalletErrorAlert();
      return;
    }
    navigate(Routes.RECEIVE_MODAL);
  }, [navigate, isDamaged]);

  return (
    <Container style={buildInterstitialTransform(isSmallPhone, offsetY)}>
      <ButtonContainer>
        {network === networkTypes.mainnet ? (
          <Fragment>
            <Title>Buy some ETH</Title>
            {ios ? (
              <Row align="center">
                <Title>with </Title>
                <Icon color={colors.black} name="applePay" />
              </Row>
            ) : null}
            <Row justify="space-between" marginVertical={30}>
              <AmountButton
                amount={50}
                backgroundColor={colors.coinburp}
                color={colors.white}
                onPress={handlePressAmount}
              />
              <AmountButton
                amount={100}
                backgroundColor={colors.coinburp}
                color={colors.white}
                onPress={handlePressAmount}
              />
              <AmountButton
                amount={250}
                backgroundColor={colors.coinburp}
                color={colors.white}
                onPress={handlePressAmount}
              />
            </Row>
            <InterstitialButtonRow>
              <InterstitialButton
                onPress={handlePressAmount}
                radiusAndroid={23}
              >
                <Text
                  align="center"
                  color={colors.blueGrey}
                  lineHeight="loose"
                  size={16}
                  weight={900}
                >
                  Other amount
                </Text>
              </InterstitialButton>
            </InterstitialButtonRow>
            {!isSmallPhone && <InterstitialDivider />}
            <Subtitle isSmallPhone={isSmallPhone}>
              Or deposit ETH to this wallet
            </Subtitle>
          </Fragment>
        ) : (
          <Fragment>
            <Title>
              Request test ETH through the {get(networkInfo[network], 'name')}{' '}
              faucet
            </Title>
            <Row marginTop={30}>
              <InterstitialButton onPress={() => onAddFromFaucet(network)}>
                <Text
                  align="center"
                  color={colors.alpha(colors.blueGreyDark, 0.6)}
                  lineHeight="loose"
                  size="large"
                  weight="bold"
                >
                  􀎬 Add from faucet
                </Text>
              </InterstitialButton>
            </Row>
            {!isSmallPhone && <InterstitialDivider />}
            <Subtitle isSmallPhone={isSmallPhone}>
              or send test ETH to your wallet
            </Subtitle>

            <Paragraph>
              Send test ETH from another {get(networkInfo[network], 'name')}{' '}
              wallet—or ask a friend!
            </Paragraph>
          </Fragment>
        )}
        <Row justify="center" marginVertical={32} width={width}>
          <CopyAddressButton
            onPress={handlePressCopyAddress}
            radiusAndroid={24}
            testID="copy-address-button"
            width={width}
          >
            <Row
              align="center"
              backgroundColor={colors.coinburp}
              borderRadius={24}
              height={61}
              justify="center"
            >
              <Icon
                color={colors.white}
                marginTop={0.5}
                name="copySolid"
                size={24}
              />
              <Text
                align="center"
                color={colors.white}
                lineHeight="loose"
                size={20}
                weight={900}
              >
                {'  '}Copy Address
              </Text>
            </Row>
          </CopyAddressButton>
        </Row>
      </ButtonContainer>
    </Container>
  );
};

export default magicMemo(AddFundsInterstitial, ['network', 'offsetY']);
