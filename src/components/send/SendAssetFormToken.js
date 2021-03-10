import React, { Fragment } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { Column, ColumnWithMargins, Row } from '../layout';
import SendAssetFormField from './SendAssetFormField';
import { SendAssetList } from './index';
import { useDimensions } from '@rainbow-me/hooks';
import { supportedNativeCurrencies } from '@rainbow-me/references';
import { removeLeadingZeros } from '@rainbow-me/utils';

const footerMargin = 31;
const FooterContainer = styled(ColumnWithMargins).attrs(({ deviceHeight }) => ({
  justify: 'center',
  alignltemes: 'stretch',
  alignSelf: 'stretch',
  margin: deviceHeight > 812 ? footerMargin : footerMargin / 2,
}))`
  // width: 100%;
  z-index: 3;
`;

const FormContainer = styled(Column)`
  // flex: ${({ isSmallPhone }) => (android ? 1.8 : isSmallPhone ? 1.75 : 1)};
  // width: 100%;
`;

export default function SendAssetFormToken({
  assetAmount,
  buttonRenderer,
  nativeAmount,
  nativeCurrency,
  onChangeAssetAmount,
  onChangeNativeAmount,
  onFocus,
  selected,
  sendMaxBalance,
  txSpeedRenderer,
  ...props
}) {
  const { isSmallPhone, height: deviceHeight } = useDimensions();

  const {
    mask: nativeMask,
    placeholder: nativePlaceholder,
  } = supportedNativeCurrencies[nativeCurrency];

  return (
    <Fragment>
      <FormContainer isSmallPhone={isSmallPhone} {...props}>
        <SendAssetFormField
          buttonRenderer={buttonRenderer}
          deviceHeight={deviceHeight}
          format={removeLeadingZeros}
          label={selected.symbol}
          onChange={onChangeAssetAmount}
          onFocus={onFocus}
          onPressButton={sendMaxBalance}
          placeholder="0"
          testID="selected-asset-field"
          txSpeedRenderer={txSpeedRenderer}
          value={assetAmount}
        />

        {/*<SendAssetFormField*/}
        {/*  autoFocus*/}
        {/*  label={nativeCurrency}*/}
        {/*  mask={nativeMask}*/}
        {/*  onChange={onChangeNativeAmount}*/}
        {/*  onFocus={onFocus}*/}
        {/*  onPressButton={sendMaxBalance}*/}
        {/*  placeholder={nativePlaceholder}*/}
        {/*  testID="selected-asset-quantity-field"*/}
        {/*  value={nativeAmount}*/}
        {/*/>*/}
        <FooterContainer deviceHeight={deviceHeight}>
          {txSpeedRenderer}
          {/*{buttonRenderer}*/}
        </FooterContainer>
      </FormContainer>
    </Fragment>
  );
}
