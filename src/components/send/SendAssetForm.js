import React, { Fragment } from 'react';
import { KeyboardArea } from 'react-native-keyboard-area';
import styled from 'styled-components';
import AssetTypes from '../../helpers/assetTypes';
import { useAsset, useDimensions } from '../../hooks';
import { Column, Row } from '../layout';
import SendAssetFormTokenOrNft from './SendAssetFormTokenOrNft';
import { padding, position } from '@rainbow-me/styles';

const FormContainer = styled(Column).attrs({
  align: 'center',
  height: 200,
})`
  background-color: ${({ theme: { colors } }) => colors.black};
  margin-bottom: ${android ? -25 : ({ isTinyPhone }) => (isTinyPhone ? -19 : -50)};
  width: 100%;
`;

const KeyboardSizeView = styled(KeyboardArea)`
  background-color: ${({ theme: { colors } }) => colors.lighterGrey};
`;

export default function SendAssetForm({
  assetAmount,
  buttonRenderer,
  nativeAmount,
  nativeCurrency,
  onChangeAssetAmount,
  onChangeNativeAmount,
  onFocus,
  onResetAssetSelection,
  selected,
  sendMaxBalance,
  txSpeedRenderer,
  navigateToSelectOutputCurrency,
  ...props
}) {
  const { isTinyPhone } = useDimensions();

  const selectedAsset = useAsset(selected);
  const isNft = selectedAsset.type === AssetTypes.nft;
  return (
    <FormContainer align="center" isTinyPhone={isTinyPhone}>
      <Fragment>
        <SendAssetFormTokenOrNft
          {...props}
          assetAmount={assetAmount}
          buttonRenderer={buttonRenderer}
          nativeAmount={nativeAmount}
          nativeCurrency={nativeCurrency}
          navigateToSelectOutputCurrency={navigateToSelectOutputCurrency}
          isNft={isNft}
          onChangeAssetAmount={onChangeAssetAmount}
          onChangeNativeAmount={onChangeNativeAmount}
          onFocus={onFocus}
          onResetAssetSelection={onResetAssetSelection}
          selected={selectedAsset}
          sendMaxBalance={sendMaxBalance}
          txSpeedRenderer={txSpeedRenderer}
        />
        {ios ? <KeyboardSizeView isOpen /> : null}
      </Fragment>
    </FormContainer>
  );
}
