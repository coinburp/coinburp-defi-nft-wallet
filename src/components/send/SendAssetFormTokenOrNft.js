import React, { Fragment, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { ExchangeInputField } from '../exchange';
import { FloatingPanel } from '../floating-panels';
import { Column, ColumnWithMargins, Row } from '../layout';
import { Text } from '../text';
import SendNftField from './SendNftField';
import { useDimensions } from '@rainbow-me/hooks';

const PanelTitle = styled(Text).attrs({
  size: 16,
  uppercase: true,
  weight: 'heavy',
})``;

const footerMargin = 31;
const FooterContainer = styled(ColumnWithMargins).attrs(({ deviceHeight }) => ({
  alignltemes: 'stretch',
  alignSelf: 'stretch',
  justify: 'center',
  margin: deviceHeight > 812 ? footerMargin : footerMargin / 2,
}))`
  // width: 100%;
  z-index: 3;
`;

const FormContainer = styled(Column)``;

export default function SendAssetFormTokenOrNft({
  assetAmount,
  buttonRenderer,
  nativeAmount,
  nativeCurrency,
  navigateToSelectOutputCurrency,
  onChangeAssetAmount,
  onChangeNativeAmount,
  onFocus,
  selected,
  sendMaxBalance,
  maxInputBalance,
  txSpeedRenderer,
  isNft,
  ...props
}) {
  const { isSmallPhone, height: deviceHeight, width } = useDimensions();
  const { colors } = useTheme();
  const isWithdrawal = false;

  // const {
  //   mask: nativeMask,
  //   placeholder: nativePlaceholder,
  // } = supportedNativeCurrencies[nativeCurrency];

  return (
    <Fragment>
      <FormContainer isSmallPhone={isSmallPhone} {...props}>
        <FloatingPanel
          justify="center"
          marginBottom={34}
          overflow="visible"
          paddingLeft={0}
          paddingRight={0}
          radius={24}
          testID="send-asset-form-token"
          width={width - 32}
        >
          <Row
            justify="space-between"
            marginTop={16}
            paddingLeft={24}
            paddingRight={30}
          >
            <PanelTitle>ASSET</PanelTitle>
            {!isNft && selected.symbol ? (
              <Text color={colors.skyBlue} size={16} weight="heavy">{`Bal: ${
                maxInputBalance.toString().substring(0, 6) || '0'
              }... ${selected.symbol}`}</Text>
            ) : null}
          </Row>
          {isNft ? (
            <Row paddingLeft={24} paddingRight={24}>
              <SendNftField
                {...props}
                colors={colors}
                item={selected}
                onPressSelectInputCurrency={navigateToSelectOutputCurrency}
              />
            </Row>
          ) : (
            <ExchangeInputField
              disableInputCurrencySelection={isWithdrawal}
              inputAmount={assetAmount}
              inputCurrencyAddress={selected.address}
              inputCurrencySymbol={selected.symbol}
              nativeAmount={nativeAmount}
              nativeCurrency={nativeCurrency}
              onFocus={onFocus}
              onPressMaxBalance={sendMaxBalance}
              onPressSelectInputCurrency={navigateToSelectOutputCurrency}
              setInputAmount={onChangeAssetAmount}
              setNativeAmount={onChangeNativeAmount}
              testID="selected-asset-quantity-field"
            />
          )}
        </FloatingPanel>
        <FooterContainer deviceHeight={deviceHeight}>
          {buttonRenderer}
          {txSpeedRenderer}
        </FooterContainer>
      </FormContainer>
    </Fragment>
  );
}
