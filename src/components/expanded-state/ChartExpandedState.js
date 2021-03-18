import { find } from 'lodash';
import React, { useRef } from 'react';
import { getSoftMenuBarHeight } from 'react-native-extra-dimensions-android';
import styled from 'styled-components';
import {
  useChartThrottledPoints,
  useDimensions,
  useUniswapAssetsInWallet,
  useWallets,
} from '../../hooks';
import {
  BuyActionButton,
  SendActionButton,
  SheetActionButtonRow,
  SheetDivider,
  SlackSheet,
  SwapActionButton,
} from '../sheet';
import { TokenInfoItem, TokenInfoRow, TokenInfoSection } from '../token-info';
import { Chart } from '../value-chart';
import { ChartPathProvider } from '@rainbow-me/animated-charts';
import AssetInputTypes from '@rainbow-me/helpers/assetInputTypes';

const baseHeight = 309 + (android && 150 - getSoftMenuBarHeight());
const heightWithoutChart = baseHeight + (android && 30);
const heightWithChart = baseHeight + 310;

export const initialChartExpandedStateSheetHeight = heightWithChart;

const Spacer = styled.View`
  height: 6;
`;

export default function ChartExpandedState({ asset }) {
  const { height: deviceHeight } = useDimensions();
  const { isReadOnlyWallet } = useWallets();

  const inlineBaseHeight =
    deviceHeight + (android && 20 - getSoftMenuBarHeight());
  const inlineBheightWithoutChart = inlineBaseHeight + (android && 30);
  const inlineBheightWithChart = inlineBaseHeight + 310;

  const {
    chart,
    chartData,
    chartType,
    color,
    fetchingCharts,
    initialChartDataLabels,
    showChart,
    throttledData,
  } = useChartThrottledPoints({
    asset: asset,
    heightWithChart: inlineBheightWithChart,
    heightWithoutChart: inlineBheightWithoutChart,
  });

  const { uniswapAssetsInWallet } = useUniswapAssetsInWallet();
  const showSwapButton = find(uniswapAssetsInWallet, [
    'uniqueId',
    asset.uniqueId,
  ]);

  const needsEth = asset.address === 'eth' && asset.balance.amount === '0';

  const duration = useRef(0);

  if (duration.current === 0) {
    duration.current = 300;
  }
  const ChartExpandedStateSheetHeight =
    ios || showChart ? heightWithChart : heightWithoutChart;

  const { colors } = useTheme();

  return (
    <SlackSheet
      additionalTopPadding={android}
      contentHeight={ChartExpandedStateSheetHeight}
      scrollEnabled={false}
    >
      <ChartPathProvider data={throttledData}>
        <Chart
          {...chartData}
          {...initialChartDataLabels}
          asset={asset}
          chart={chart}
          chartType={chartType}
          color={color}
          fetchingCharts={fetchingCharts}
          nativePoints={chart}
          showChart={showChart}
          throttledData={throttledData}
        />
      </ChartPathProvider>
      <SheetDivider />
      <TokenInfoSection>
        <TokenInfoRow>
          {asset?.native?.price.display && (
            <TokenInfoItem title="BALANCE" weight="heavy">
              {asset?.native?.balance.display}
            </TokenInfoItem>
          )}
          <Spacer />
          <TokenInfoItem asset={asset} size="smedium" />
        </TokenInfoRow>
      </TokenInfoSection>
      {!isReadOnlyWallet ? (
        <>
          {needsEth ? (
            <SheetActionButtonRow>
              <BuyActionButton color={colors.coinburp} fullWidth />
            </SheetActionButtonRow>
          ) : (
            <SheetActionButtonRow>
              {showSwapButton && (
                <SwapActionButton
                  color={colors.coinburp}
                  inputType={AssetInputTypes.in}
                />
              )}
              <SendActionButton
                color={colors.coinburp}
                fullWidth={!showSwapButton}
              />
            </SheetActionButtonRow>
          )}
        </>
      ) : null}
    </SlackSheet>
  );
}
