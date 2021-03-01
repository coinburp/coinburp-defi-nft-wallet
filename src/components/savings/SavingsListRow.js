import analytics from '@segment/analytics-react-native';
import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { InteractionManager } from 'react-native';
import { IS_TESTING } from 'react-native-dotenv';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import {
  SavingsSheetEmptyHeight,
  SavingsSheetHeight,
} from '../../screens/SavingsSheet';
import { ButtonPressAnimation } from '../animations';
import { CoinIcon } from '../coin-icon';
import DAIIcon from '../icons/svg/DAIIcon';
import SavingsIcon from '../icons/svg/SavingsIcon';
import { Centered, Column, Flex, Row } from '../layout';
import { Text, GradientText } from '../text';
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
      borderRadius={49}
      colors={colors.gradients.savingsHighlight}
      end={{ x: 1, y: 1 }}
      pointerEvents="none"
      start={{ x: 0, y: 0 }}
      style={position.coverAsObject}
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
  angle: -90,
  colors: ['#ff2700', '#ffdb00'],
  end: { x: 1, y: 0.5 },
  size: 20,
  start: { x: 0, y: 0.5 },
  steps: [0, 0.8, 1],
  weight: 'bold',
})``;

const APYText = styled(Text)`
  color: white;
  font-weight: bold;
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

  const { colors } = useTheme();

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
                <Text color="white" lineHeight="normal" size={20} weight="bold">
                  Dai
                </Text>
                <Text color="white" lineHeight="normal" size={14}>
                  DAI
                </Text>
              </Column>
            </Row>
            <Pill
              colors={['#ff2700', '#ffdb00']}
              end={{ x: 0, y: 0.5 }}
              start={{ x: 1, y: 0.5 }}
            >
              <APYText>{apyTruncated}% APY</APYText>
            </Pill>
          </Row>
          <Column align="center" justify="space-around">
            <SavingsIcon />
            <Row>
              <Text color="white" size={20} weight="bold">
                Stake{' '}
              </Text>
              <DaiText>
                Dai
              </DaiText>
              <Text color="white" size={20} weight="bold">
                {' '}
                today and
              </Text>
            </Row>
            <Text color="white" size={20} weight="bold">
              earn {apyTruncated}% APY!
            </Text>
            <StakeButton>
              <Text>Stake Dai</Text>
            </StakeButton>
          </Column>
        </SavingsListRowShadowStack>
      </Centered>
    </ButtonPressAnimation>
  );
};

export default React.memo(SavingsListRow);
