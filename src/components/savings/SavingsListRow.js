import analytics from '@segment/analytics-react-native';
import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InteractionManager } from 'react-native';
import { IS_TESTING } from 'react-native-dotenv';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import {
  SavingsSheetEmptyHeight,
  SavingsSheetHeight,
} from '../../screens/SavingsSheet';
import { ButtonPressAnimation } from '../animations';
import { CoinIcon } from '../coin-icon';
import DAIIcon from '../icons/svg/DAIIcon';
import SavingsIcon from '../icons/svg/SavingsIcon';
import { Centered, Column, Flex, Row } from '../layout';
import { GradientText, Text } from '../text';
import APYPill from './APYPill';
import SavingsListRowAnimatedNumber from './SavingsListRowAnimatedNumber';
import SavingsListRowEmptyState from './SavingsListRowEmptyState';
import {
  calculateAPY,
  calculateCompoundInterestInDays,
  formatSavingsAmount,
} from '@rainbow-me/helpers/savings';
import { useDimensions } from '@rainbow-me/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';
import { padding, position } from '@rainbow-me/styles';
import { magicMemo } from '@rainbow-me/utils';
import ShadowStack from 'react-native-shadow-stack';

const MS_IN_1_DAY = 1000 * 60 * 60 * 24;
const ANIMATE_NUMBER_INTERVAL = 60;

const NOOP = () => undefined;

const SavingsListRowGradient = magicMemo(
  ({ colors }) => (
    <LinearGradient
      angle={136}
      borderRadius={24}
      colors={colors.gradients.savingsHighlight}
      pointerEvents="none"
      style={position.coverAsObject}
      useAngle
    />
  ),
  'colors'
);

const SavingsListRowShadowStack = styled(ShadowStack).attrs(
  ({ deviceWidth, theme: { colors } }) => ({
    backgroundColor: colors.white,
    borderRadius: 24,
    height: 357,
    shadows: [
      [0, 10, 30, colors.shadow, 0.1],
      [0, 5, 15, colors.shadow, 0.04],
    ],
    width: deviceWidth - 38,
  })
)``;

const DaiText = styled(GradientText).attrs({
  angle: 318,
  colors: ['#ff2700', '#ffdb00'],
  size: 20,
  steps: [0, 0.42, 0.88, 1],
  weight: 900,
})`
  height: 27px;
`;

const ButtonText = styled(GradientText).attrs({
  angle: 277,
  colors: ['#ff2700', '#ffdb00'],
  size: 16,
  steps: [0, 0.99, 1],
  weight: 900,
})``;

const APYText = styled(Text).attrs({
  size: 20,
  weight: 900,
})`
  color: white;
`;

const Pill = styled(LinearGradient)`
  height: 32px;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  border-radius: 16px;
`;

const StakeButton = styled(Flex)`
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 24px;
  height: 52px;
  width: 100%;
`;

const SavingsListRow = ({
  cTokenBalance,
  lifetimeSupplyInterestAccrued,
  lifetimeSupplyInterestAccruedNative,
  underlyingBalanceNativeValue,
  supplyBalanceUnderlying,
  supplyRate,
  underlying,
  underlyingPrice,
}) => {
  const { width: deviceWidth } = useDimensions();
  const { navigate } = useNavigation();

  const initialValue = supplyBalanceUnderlying;
  const [value, setValue] = useState(initialValue);
  const [steps, setSteps] = useState(0);
  const apy = useMemo(() => calculateAPY(supplyRate), [supplyRate]);
  const apyTruncated = supplyBalanceUnderlying
    ? parseFloat(apy).toFixed(2)
    : Math.floor(apy * 10) / 10;

  const onButtonPress = useCallback(() => {
    navigate(Routes.SAVINGS_SHEET, {
      cTokenBalance,
      isEmpty: !supplyBalanceUnderlying,
      lifetimeSupplyInterestAccrued,
      lifetimeSupplyInterestAccruedNative,
      longFormHeight: supplyBalanceUnderlying
        ? SavingsSheetHeight
        : SavingsSheetEmptyHeight,
      supplyBalanceUnderlying,
      supplyRate,
      underlying,
      underlyingBalanceNativeValue,
      underlyingPrice,
    });

    analytics.track('Opened Savings Sheet', {
      category: 'savings',
      empty: !supplyBalanceUnderlying,
      label: underlying.symbol,
    });
  }, [
    cTokenBalance,
    lifetimeSupplyInterestAccrued,
    lifetimeSupplyInterestAccruedNative,
    underlyingBalanceNativeValue,
    navigate,
    supplyBalanceUnderlying,
    supplyRate,
    underlying,
    underlyingPrice,
  ]);

  useEffect(() => {
    if (!supplyBalanceUnderlying) return;

    const futureValue = calculateCompoundInterestInDays(
      initialValue,
      supplyRate,
      1
    );

    if (!BigNumber(futureValue).eq(value)) {
      setValue(futureValue);
      setSteps(MS_IN_1_DAY / ANIMATE_NUMBER_INTERVAL);
    }
  }, [
    apy,
    initialValue,
    supplyBalanceUnderlying,
    supplyRate,
    underlying,
    value,
  ]);

  useEffect(() => {
    if (underlying && underlying.symbol && supplyBalanceUnderlying)
      InteractionManager.runAfterInteractions(() => {
        analytics.track('User has savings', {
          category: 'savings',
          label: underlying.symbol,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayValue = formatSavingsAmount(value);

  const { isDarkMode, colors } = useTheme();

  const shadows = useMemo(
    () => [
      [0, 10, 30, colors.shadow, 0.2],
      [0, 5, 15, colors.shadow, isDarkMode ? 0 : 0.4],
    ],
    [isDarkMode, colors]
  );

  return !underlying || !underlying.address ? null : (
    <ButtonPressAnimation
      onPress={onButtonPress}
      overflowMargin={10}
      scaleTo={0.96}
    >
      <Centered direction="column" marginBottom={15}>
        <SavingsListRowShadowStack deviceWidth={deviceWidth}>
          <SavingsListRowGradient colors={colors} />
          <Row
            align="center"
            css={[
              padding(17, 24, 17, 27),
              { backgroundColor: 'rgba(255, 255, 255, 0.16)' },
            ]}
            justify="space-between"
            onPress={onButtonPress}
            scaleTo={0.96}
          >
            {/*{underlying.symbol && supplyBalanceUnderlying ? (*/}
            {/*  <Centered>*/}
            {/*    <CoinIcon*/}
            {/*      address={underlying.address}*/}
            {/*      size={26}*/}
            {/*      symbol={underlying.symbol}*/}
            {/*    />*/}
            {/*  </Centered>*/}
            {/*) : null}*/}
            {/*{supplyBalanceUnderlying &&*/}
            {/*!isNaN(displayValue) &&*/}
            {/*IS_TESTING !== 'true' ? (*/}
            {/*  <SavingsListRowAnimatedNumber*/}
            {/*    initialValue={initialValue}*/}
            {/*    interval={ANIMATE_NUMBER_INTERVAL}*/}
            {/*    steps={steps}*/}
            {/*    symbol={underlying.symbol}*/}
            {/*    value={displayValue}*/}
            {/*  />*/}
            {/*) : (*/}
            {/*  <SavingsListRowEmptyState onPress={NOOP} />*/}
            {/*)}*/}
            <Row align="center">
              <DAIIcon />
              <Column css={padding(0, 0, 0, 15)} justify="space-between">
                <Text color="#fff" lineHeight="normal" size={20} weight={900}>
                  Dai
                </Text>
                <Text color="#fff" lineHeight="normal" size={14} weight="bold">
                  DAI
                </Text>
              </Column>
            </Row>
            <Pill
              angle={277}
              colors={['#ff2700', '#ffdb00']}
              locations={[0.1, 0.99, 1]}
              useAngle
            >
              <APYText>{apyTruncated}% APY</APYText>
            </Pill>
          </Row>
          <Column align="center" css={padding(24)} justify="space-between">
            <SavingsIcon />
            <Row css={padding(16, 48, 24, 48)}>
              <Text align="center" color="#fff" size={20} weight={900}>
                Stake <DaiText>Dai</DaiText> today and earn {apyTruncated}% APY!
              </Text>
            </Row>
            <ShadowStack backgroundColor={colors.transparent} height={100} shadows={shadows} width={295}>
              <StakeButton>
                <ButtonText>Stake Dai</ButtonText>
              </StakeButton>
            </ShadowStack>
          </Column>
        </SavingsListRowShadowStack>
      </Centered>
    </ButtonPressAnimation>
  );
};

export default React.memo(SavingsListRow);
