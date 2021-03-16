import React, { useEffect, useMemo } from 'react';
import { Keyboard } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import styled from 'styled-components';
import { useCallbackOne } from 'use-memo-one';
import { ButtonPressAnimation } from '../../animations';
import CoinIcon from '../../coin-icon/CoinIcon';
import { Icon } from '../../icons';
import { Column, ColumnWithMargins, Row, RowWithMargins } from '../../layout';
import ChartContextButton from './ChartContextButton';
import {
  ChartDateLabel,
  ChartHeaderSubtitle,
  ChartPercentChangeLabel,
  ChartPriceLabel,
} from './chart-data-labels';
import { convertAmountToNativeDisplay } from '@rainbow-me/helpers/utilities';
import {
  useAccountSettings,
  useBooleanState,
} from '@rainbow-me/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import { padding } from '@rainbow-me/styles';

const { call, cond, onChange, useCode } = Animated;

const noPriceData = 'No price data';

const Container = styled(ColumnWithMargins).attrs({
  margin: 12,
  marginTop: android ? -10 : 0,
})`
  ${({ showChart }) => padding(0, 19, showChart ? (android ? 15 : 30) : 0)};
`;

const CaretIcon = styled(Icon).attrs({
  name: 'caret',
})`
  margin-bottom: 5.25;
`;

function useTabularNumsWhileScrubbing(isScrubbing) {
  const [tabularNums, enable, disable] = useBooleanState();
  // Only enable tabularNums on the price label when the user is scrubbing
  // because we are obnoxiously into details
  useCode(
    useCallbackOne(
      () =>
        onChange(
          isScrubbing,
          cond(isScrubbing, call([], enable), call([], disable))
        ),
      [disable, enable, isScrubbing]
    )
  );
  return tabularNums;
}

export default function ChartExpandedStateHeader({
  asset,
  changeDirection,
  changeRef,
  color: givenColors,
  dateRef,
  isPool,
  isScrubbing,
  latestChange,
  latestPrice = noPriceData,
  priceRef,
  chartTimeSharedValue,
  showChart,
}) {
  const { colors } = useTheme();
  const color = givenColors || colors.dark;
  const tokens = useMemo(() => {
    return isPool ? asset.tokens : [asset];
  }, [asset, isPool]);
  const token = tokens[0];
  const { nativeCurrency } = useAccountSettings();
  const tabularNums = useTabularNumsWhileScrubbing(isScrubbing);

  const isNoPriceData = latestPrice === noPriceData;

  const price = useMemo(
    () => convertAmountToNativeDisplay(latestPrice, nativeCurrency),
    [latestPrice, nativeCurrency]
  );

  const priceSharedValue = useSharedValue('');

  useEffect(() => {
    if (!isNoPriceData) {
      priceSharedValue.value = price;
    } else {
      priceSharedValue.value = '';
    }
  }, [price, isNoPriceData, priceSharedValue]);

  const title = isPool ? `${asset.tokenNames} Pool` : asset?.name;

  const titleOrNoPriceData = isNoPriceData ? noPriceData : title;

  const showPriceChange = !isNoPriceData && showChart && !isNaN(latestChange);
  const { goBack } = useNavigation();

  return (
    <Container showChart={showChart}>
      <Row
        align="center"
        justify="space-between"
        testID="expanded-state-header"
      >
        <ButtonPressAnimation
          onPress={() => {
            goBack();
            android && Keyboard.dismiss();
          }}
        >
          <CaretIcon color={colors.coinburp} />
        </ButtonPressAnimation>
        <ChartContextButton asset={asset} color={color} />
      </Row>
      <Column>
        <RowWithMargins height={24} justify="space-between">
          <Row>
            <CoinIcon
              address={token?.address}
              size={48}
              symbol={token?.symbol}
            />
            <ChartPriceLabel
              color={color}
              defaultValue={isNoPriceData ? title : price}
              isNoPriceData={isNoPriceData}
              isPool={isPool}
              isScrubbing={isScrubbing}
              priceRef={priceRef}
              priceSharedValue={priceSharedValue}
              tabularNums={tabularNums}
            />
          </Row>
          {showPriceChange && (
            <ChartPercentChangeLabel
              changeDirection={changeDirection}
              changeRef={changeRef}
              color={
                isNoPriceData ? colors.alpha(colors.blueGreyDark, 0.8) : color
              }
              isScrubbing={isScrubbing}
              latestChange={latestChange}
              tabularNums={tabularNums}
            />
          )}
        </RowWithMargins>
        <RowWithMargins
          height={20}
          justify="space-between"
          marginHorizontal={android ? (isNoPriceData ? -7 : 0) : 0}
          marginLeft={60}
          marginTop={4}
        >
          <ChartHeaderSubtitle
            color={
              isNoPriceData ? colors.alpha(colors.blueGreyDark, 0.8) : color
            }
            weight="bold"
          >
            {titleOrNoPriceData}
          </ChartHeaderSubtitle>
          {showPriceChange && (
            <ChartDateLabel
              chartTimeSharedValue={chartTimeSharedValue}
              dateRef={dateRef}
            />
          )}
        </RowWithMargins>
      </Column>
    </Container>
  );
}
