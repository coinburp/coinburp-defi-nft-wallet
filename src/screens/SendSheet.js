import { useRoute } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import { captureEvent, captureException } from '@sentry/react-native';
import { get, isEmpty, isString, toLower } from 'lodash';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  InteractionManager,
  Keyboard,
  StatusBar,
  Text,
  TextInput,
} from 'react-native';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
// import { AddressField } from '../components/fields';
import { KeyboardArea } from 'react-native-keyboard-area';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { dismissingScreenListener } from '../../shim';
import { AddContactButton, PasteAddressButton } from '../components/buttons';
import { AddressField } from '../components/fields';
import { GasSpeedButton } from '../components/gas';
import DotArrow from '../components/icons/svg/DotArrow';
import { Column, Row } from '../components/layout';
import {
  SendAssetForm,
  SendAssetList,
  SendButton,
  SendContactList,
  SendHeader,
  SendInput,
  SendSetAssetList,
  SendTransactionSpeed,
} from '../components/send';
import {
  SheetHandle,
  SheetSubtitleCycler,
  SheetTitle,
} from '../components/sheet';
import { Label } from '../components/text';
import { useTheme } from '../context/ThemeContext';
import { createSignableTransaction, estimateGasLimit } from '../handlers/web3';
import AssetTypes from '../helpers/assetTypes';
import isNativeStackAvailable from '../helpers/isNativeStackAvailable';
import {
  convertAmountAndPriceToNativeDisplay,
  convertAmountFromNativeValue,
  formatInputDecimals,
} from '../helpers/utilities';
import { checkIsValidAddressOrDomain } from '../helpers/validators';
import { delayNext } from '../hooks/useMagicAutofocus';
import { sendTransaction } from '../model/wallet';
import { useNavigation } from '../navigation/Navigation';
import CurrencySelectionTypes from '@rainbow-me/helpers/currencySelectionTypes';
import {
  useAccountAssets,
  useAccountSettings,
  useCoinListEditOptions,
  useContacts,
  useDimensions,
  useGas,
  useMagicAutofocus,
  useMaxInputBalance,
  usePrevious,
  useRefreshAccountData,
  useSendableUniqueTokens,
  useSendSavingsAccount,
  useTransactionConfirmation,
  useUpdateAssetOnchainBalance,
} from '@rainbow-me/hooks';
import { ETH_ADDRESS } from '@rainbow-me/references';
import Routes from '@rainbow-me/routes';
import { borders, buildTextStyles, fonts, padding } from '@rainbow-me/styles';
import { deviceUtils, gasUtils } from '@rainbow-me/utils';
import logger from 'logger';

const sheetHeight = deviceUtils.dimensions.height - (android ? 30 : 10);
const statusBarHeight = getStatusBarHeight(true);

const Container = styled.View`
  background-color: ${({ theme: { colors } }) => colors.transparent};
  flex: 1;
  padding-top: ${isNativeStackAvailable ? 0 : statusBarHeight};
  width: 100%;
`;

const AddressFieldLabel = styled(Label)`
  color: ${({ theme: { colors } }) => colors.dark};
  margin-right: 6;
  opacity: 0.45;
`;

const AddressInputContainer = styled(Row).attrs({ align: 'center' })`
  ${({ isSmallPhone }) =>
    isSmallPhone
      ? padding(12, 15)
      : android
      ? padding(5, 15)
      : padding(19, 15)};
  background-color: ${({ theme: { colors } }) => colors.white};
  overflow: hidden;
  width: 100%;
`;

const GasSpeedButtonContainer = styled(Column)`
  justify-content: flex-start;
  margin-bottom: 19px;
`;

const SheetContainer = styled(Column).attrs({
  align: 'center',
  flex: 1,
})`
  ${borders.buildRadius('top', isNativeStackAvailable ? 0 : 16)};
  background-color: ${({ theme: { colors } }) => colors.black};
  height: ${isNativeStackAvailable || android ? sheetHeight : '100%'};
  width: 100%;
`;

const KeyboardSizeView = styled(KeyboardArea)`
  width: 100%;
  background-color: ${({ showAssetForm, theme: { colors } }) =>
    showAssetForm ? colors.lighterGrey : colors.white};
`;

const ToArrow = styled(DotArrow)`
  margin: 16px 0;
`;
const AddressInput = styled(TextInput).attrs(({ theme: { colors } }) => ({
  align: 'left',
  color: colors.coinburp,
  fontFamily: fonts.family.SFProRounded,
  justify: 'left',
  size: 48,
}))`
  ${buildTextStyles};
  font-family: ${fonts.family.SFProRounded};
  font-weight: 900;
`;

export default function SendSheet(props) {
  const dispatch = useDispatch();
  const {
    isTinyPhone,
    isNarrowPhone,
    width,
    height: deviceHeight,
  } = useDimensions();
  const { colors } = useTheme();
  const insets = useSafeArea();
  const { navigate, addListener } = useNavigation();
  const { dataAddNewTransaction } = useTransactionConfirmation();
  const updateAssetOnchainBalanceIfNeeded = useUpdateAssetOnchainBalance();
  const { allAssets } = useAccountAssets();
  const {
    gasLimit,
    gasPrices,
    isSufficientGas,
    selectedGasPrice,
    startPollingGasPrices,
    stopPollingGasPrices,
    txFees,
    updateDefaultGasLimit,
    updateGasPriceOption,
    updateTxFee,
  } = useGas();
  const isDismissing = useRef(false);

  const recipientFieldRef = useRef();

  useEffect(() => {
    if (ios) {
      return;
    }
    dismissingScreenListener.current = () => {
      Keyboard.dismiss();
      isDismissing.current = true;
    };
    const unsubscribe = addListener(
      'transitionEnd',
      ({ data: { closing } }) => {
        if (!closing && isDismissing.current) {
          isDismissing.current = false;
          recipientFieldRef?.current?.focus();
        }
      }
    );
    return () => {
      unsubscribe();
      dismissingScreenListener.current = undefined;
    };
  }, [addListener]);
  const { contacts, onRemoveContact, filteredContacts } = useContacts();
  const { sendableUniqueTokens } = useSendableUniqueTokens();
  const {
    accountAddress,
    nativeCurrency,
    nativeCurrencySymbol,
    network,
  } = useAccountSettings();

  const savings = useSendSavingsAccount();
  const fetchData = useRefreshAccountData();
  const { hiddenCoins, pinnedCoins } = useCoinListEditOptions();

  const [amountDetails, setAmountDetails] = useState({
    assetAmount: '',
    isSufficientBalance: false,
    nativeAmount: '',
  });
  const [currentInput, setCurrentInput] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [selected, setSelected] = useState({});
  const { maxInputBalance, updateMaxInputBalance } = useMaxInputBalance();

  const showEmptyState = !isValidAddress;
  const showAssetList = !isValidAddress || isEmpty(selected);
  const showAssetForm = isValidAddress && !isEmpty(selected);
  const prevSelectedGasPrice = usePrevious(selectedGasPrice);
  const { setParams } = useNavigation();

  const { handleFocus, triggerFocus } = useMagicAutofocus(
    recipientFieldRef,
    useCallback(
      lastFocusedRef => (showAssetList ? null : lastFocusedRef.current),
      [showAssetList]
    )
  );

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => startPollingGasPrices());
    return () => {
      InteractionManager.runAfterInteractions(() => stopPollingGasPrices());
    };
  }, [startPollingGasPrices, stopPollingGasPrices]);

  // Recalculate balance when gas price changes
  useEffect(() => {
    if (
      selected?.address === ETH_ADDRESS &&
      get(prevSelectedGasPrice, 'txFee.value.amount', 0) !==
        get(selectedGasPrice, 'txFee.value.amount', 0)
    ) {
      updateMaxInputBalance(selected);
    }
  }, [prevSelectedGasPrice, selected, selectedGasPrice, updateMaxInputBalance]);

  const sendUpdateAssetAmount = useCallback(
    newAssetAmount => {
      const _assetAmount = newAssetAmount.replace(/[^0-9.]/g, '');
      let _nativeAmount = '';
      if (_assetAmount.length) {
        const priceUnit = get(selected, 'price.value', 0);
        const {
          amount: convertedNativeAmount,
        } = convertAmountAndPriceToNativeDisplay(
          _assetAmount,
          priceUnit,
          nativeCurrency
        );
        _nativeAmount = formatInputDecimals(
          convertedNativeAmount,
          _assetAmount
        );
      }
      const _isSufficientBalance =
        Number(_assetAmount) <= Number(maxInputBalance);
      setAmountDetails({
        assetAmount: _assetAmount,
        isSufficientBalance: _isSufficientBalance,
        nativeAmount: _nativeAmount,
      });
    },
    [maxInputBalance, nativeCurrency, selected]
  );

  const sendUpdateSelected = useCallback(
    newSelected => {
      updateMaxInputBalance(newSelected);
      if (get(newSelected, 'type') === AssetTypes.nft) {
        setAmountDetails({
          assetAmount: '1',
          isSufficientBalance: true,
          nativeAmount: '0',
        });
        setSelected({
          ...newSelected,
          symbol: get(newSelected, 'asset_contract.name'),
        });
      } else {
        setSelected(newSelected);
        sendUpdateAssetAmount('');
        // Since we don't trust the balance from zerion,
        // let's hit the blockchain and update it
        updateAssetOnchainBalanceIfNeeded(
          newSelected,
          accountAddress,
          updatedAsset => {
            // set selected asset with new balance
            setSelected(updatedAsset);
            // Update selected to recalculate the maxInputAmount
            sendUpdateSelected(updatedAsset);
          }
        );
      }
      navigate(Routes.SEND_SHEET);
    },
    [
      accountAddress,
      sendUpdateAssetAmount,
      updateAssetOnchainBalanceIfNeeded,
      updateMaxInputBalance,
    ]
  );

  const onChangeNativeAmount = useCallback(
    newNativeAmount => {
      if (!isString(newNativeAmount)) return;
      const _nativeAmount = newNativeAmount.replace(/[^0-9.]/g, '');
      let _assetAmount = '';
      if (_nativeAmount.length) {
        const priceUnit = get(selected, 'price.value', 0);
        const convertedAssetAmount = convertAmountFromNativeValue(
          _nativeAmount,
          priceUnit,
          selected.decimalssendMaxBalance
        );
        _assetAmount = formatInputDecimals(convertedAssetAmount, _nativeAmount);
      }

      const _isSufficientBalance =
        Number(_assetAmount) <= Number(maxInputBalance);

      setAmountDetails({
        assetAmount: _assetAmount,
        isSufficientBalance: _isSufficientBalance,
        nativeAmount: _nativeAmount,
      });
      analytics.track('Changed native currency input in Send flow');
    },
    [maxInputBalance, selected]
  );

  const sendMaxBalance = useCallback(async () => {
    const newBalanceAmount = await updateMaxInputBalance(selected);
    sendUpdateAssetAmount(newBalanceAmount);
  }, [selected, sendUpdateAssetAmount, updateMaxInputBalance]);

  const onChangeAssetAmount = useCallback(
    newAssetAmount => {
      if (isString(newAssetAmount)) {
        sendUpdateAssetAmount(newAssetAmount);
        analytics.track('Changed token input in Send flow');
      }
    },
    [sendUpdateAssetAmount]
  );

  const onSubmit = useCallback(async () => {
    const validTransaction =
      isValidAddress && amountDetails.isSufficientBalance && isSufficientGas;
    if (!selectedGasPrice.txFee || !validTransaction || isAuthorizing) {
      logger.sentry('preventing tx submit for one of the following reasons:');
      logger.sentry('selectedGasPrice.txFee ? ', selectedGasPrice?.txFee);
      logger.sentry('validTransaction ? ', validTransaction);
      logger.sentry('isAuthorizing ? ', isAuthorizing);
      captureEvent('Preventing tx submit');
      return false;
    }

    let submitSuccess = false;
    let updatedGasLimit = null;
    // Attempt to update gas limit before sending ERC20 / ERC721
    if (selected?.address !== ETH_ADDRESS) {
      try {
        // Estimate the tx with gas limit padding before sending
        updatedGasLimit = await estimateGasLimit(
          {
            address: accountAddress,
            amount: amountDetails.assetAmount,
            asset: selected,
            recipient,
          },
          true
        );
        logger.log('gasLimit updated before sending', {
          after: updatedGasLimit,
          before: gasLimit,
        });
        updateTxFee(updatedGasLimit);
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    const txDetails = {
      amount: amountDetails.assetAmount,
      asset: selected,
      from: accountAddress,
      gasLimit: updatedGasLimit || gasLimit,
      gasPrice: get(selectedGasPrice, 'value.amount'),
      nonce: null,
      to: recipient,
    };
    try {
      const signableTransaction = await createSignableTransaction(txDetails);
      const txResult = await sendTransaction({
        transaction: signableTransaction,
      });
      const { hash, nonce } = txResult;
      if (!isEmpty(hash)) {
        submitSuccess = true;
        txDetails.hash = hash;
        txDetails.nonce = nonce;
        await dispatch(dataAddNewTransaction(txDetails));
      }
    } catch (error) {
      logger.sentry('TX Details', txDetails);
      logger.sentry('SendSheet onSubmit error');
      captureException(error);
      submitSuccess = false;
    } finally {
      setIsAuthorizing(false);
    }
    return submitSuccess;
  }, [
    accountAddress,
    amountDetails.assetAmount,
    amountDetails.isSufficientBalance,
    dataAddNewTransaction,
    dispatch,
    gasLimit,
    isAuthorizing,
    isSufficientGas,
    isValidAddress,
    recipient,
    selected,
    selectedGasPrice,
    updateTxFee,
  ]);

  const submitTransaction = useCallback(async () => {
    setIsAuthorizing(true);
    if (Number(amountDetails.assetAmount) <= 0) {
      logger.sentry('amountDetails.assetAmount ? ', amountDetails?.assetAmount);
      captureEvent('Preventing tx submit due to amount <= 0');
      return false;
    }

    try {
      const submitSuccessful = await onSubmit();
      analytics.track('Sent transaction', {
        assetName: selected?.name || '',
        assetType: selected?.type || '',
        isRecepientENS: toLower(recipient.slice(-4)) === '.eth',
      });
      if (submitSuccessful) {
        navigate(Routes.PROFILE_SCREEN);
      }
    } catch (error) {
      setIsAuthorizing(false);
    }
  }, [amountDetails.assetAmount, navigate, onSubmit, recipient, selected]);

  const onPressTransactionSpeed = useCallback(
    onSuccess => {
      const hideCustom = true;
      gasUtils.showTransactionSpeedOptions(
        gasPrices,
        txFees,
        gasPriceOption => updateGasPriceOption(gasPriceOption),
        onSuccess,
        hideCustom
      );
    },
    [txFees, gasPrices, updateGasPriceOption]
  );

  const onLongPressSend = useCallback(() => {
    if (isIphoneX()) {
      submitTransaction();
    } else {
      onPressTransactionSpeed(submitTransaction);
    }
  }, [onPressTransactionSpeed, submitTransaction]);

  const onResetAssetSelection = useCallback(() => {
    analytics.track('Reset asset selection in Send flow');
    sendUpdateSelected({});
  }, [sendUpdateSelected]);

  const onChangeInput = useCallback(event => {
    setCurrentInput(event);
    setRecipient(event);
  }, []);

  useEffect(() => {
    updateDefaultGasLimit();
  }, [updateDefaultGasLimit]);

  useEffect(() => {
    if (
      (isValidAddress && showAssetList) ||
      (isValidAddress && showAssetForm && selected?.type === AssetTypes.nft)
    ) {
      Keyboard.dismiss();
    }
  }, [isValidAddress, selected, showAssetForm, showAssetList]);

  const { params } = useRoute();
  const assetOverride = params?.asset;
  const prevAssetOverride = usePrevious(assetOverride);

  useEffect(() => {
    if (assetOverride && assetOverride !== prevAssetOverride) {
      sendUpdateSelected(assetOverride);
    }
  }, [assetOverride, prevAssetOverride, sendUpdateSelected]);

  const recipientOverride = params?.address;

  const handleCustomGasBlur = useCallback(() => {});

  useEffect(() => {
    if (recipientOverride && !recipient) {
      setRecipient(recipientOverride);
    }
  }, [recipient, recipientOverride]);

  const checkAddress = useCallback(async () => {
    const validAddress = await checkIsValidAddressOrDomain(recipient);
    setIsValidAddress(validAddress);
  }, [recipient]);

  useEffect(() => {
    checkAddress();
  }, [checkAddress]);

  useEffect(() => {
    if (isValidAddress) {
      estimateGasLimit({
        address: accountAddress,
        amount: amountDetails.assetAmount,
        asset: selected,
        recipient,
      })
        .then(gasLimit => updateTxFee(gasLimit))
        .catch(() => updateTxFee(null));
    }
  }, [
    accountAddress,
    amountDetails.assetAmount,
    dispatch,
    isValidAddress,
    recipient,
    selected,
    updateTxFee,
  ]);

  const navigateToSelectOutputCurrency = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      setParams({ focused: false });
      delayNext();
      navigate(Routes.MODAL_SCREEN, {
        additionalPadding: false,
        headerTitle: 'Withdraw',
        restoreFocusOnSwapModal: () => setParams({ focused: true }),
        onSelectCurrency: sendUpdateSelected,
        type: CurrencySelectionTypes.withdraw,
        fetchData: fetchData,
        hiddenCoins: hiddenCoins,
        nativeCurrency: nativeCurrency,
        network: network,
        selected: selected,
        sendUpdateSelected: sendUpdateSelected,
        pinnedCoins: pinnedCoins,
        savings: savings,
        sendableUniqueTokens: sendableUniqueTokens,
      });
    });
  }, [
    navigate,
    setParams,
    sendUpdateSelected,
    fetchData,
    hiddenCoins,
    nativeCurrency,
    network,
    sendUpdateSelected,
    savings,
    sendableUniqueTokens,
  ]);

  return (
    <Container>
      {ios && <StatusBar barStyle="light-content" />}
      <SheetContainer>
        <Column
          align="center"
          paddingBottom={isNarrowPhone ? 15 : insets.bottom + 11}
        >
          <SendHeader />
          <Column align="center" flex={1}>
            <SendInput
              contacts={contacts}
              deviceHeight={deviceHeight}
              isValidAddress={isValidAddress}
              onChangeAddressInput={onChangeInput}
              onFocus={handleFocus}
              onPressPaste={setRecipient}
              onRefocusInput={triggerFocus}
              recipient={recipient}
              recipientFieldRef={recipientFieldRef}
              removeContact={onRemoveContact}
              sendContactList={
                <SendContactList
                  contacts={filteredContacts}
                  currentInput={currentInput}
                  onPressContact={setRecipient}
                  removeContact={onRemoveContact}
                />
              }
              showAssetList={showAssetList}
              showEmptyState={showEmptyState}
            />
            <Column justify="center" style={{ marginBottom: 0, marginTop: 18 }}>
              <ToArrow />
            </Column>
            <Column justify="center" style={{ marginTop: 0 }}>
              {showAssetList && (
                <SendSetAssetList
                  colors={colors}
                  deviceHeight={deviceHeight}
                  navigateToSelectOutputCurrency={
                    navigateToSelectOutputCurrency
                  }
                  selected={selected}
                  txSpeedRenderer={
                    <GasSpeedButtonContainer>
                      <GasSpeedButton
                        onCustomGasBlur={handleCustomGasBlur}
                        onCustomGasFocus={handleCustomGasBlur}
                        type="transaction"
                      />
                    </GasSpeedButtonContainer>
                  }
                  width={width}
                />
              )}
              {showAssetForm && (
                <SendAssetForm
                  {...props}
                  allAssets={allAssets}
                  assetAmount={amountDetails.assetAmount}
                  buttonRenderer={
                    <SendButton
                      {...props}
                      assetAmount={amountDetails.assetAmount}
                      isAuthorizing={isAuthorizing}
                      isSufficientBalance={amountDetails.isSufficientBalance}
                      isSufficientGas={isSufficientGas}
                      onLongPress={onLongPressSend}
                      smallButton={isTinyPhone}
                      testID="send-sheet-confirm"
                    />
                  }
                  maxInputBalance={maxInputBalance}
                  nativeAmount={amountDetails.nativeAmount}
                  nativeCurrency={nativeCurrency}
                  nativeCurrencySymbol={nativeCurrencySymbol}
                  onChangeAssetAmount={onChangeAssetAmount}
                  onChangeNativeAmount={onChangeNativeAmount}
                  onFocus={handleFocus}
                  navigateToSelectOutputCurrency={
                    navigateToSelectOutputCurrency
                  }
                  onResetAssetSelection={onResetAssetSelection}
                  selected={selected}
                  sendMaxBalance={sendMaxBalance}
                  txSpeedRenderer={
                    <GasSpeedButtonContainer>
                      <GasSpeedButton
                        onCustomGasBlur={handleCustomGasBlur}
                        onCustomGasFocus={handleCustomGasBlur}
                        type="transaction"
                      />
                    </GasSpeedButtonContainer>
                  }
                />
              )}
            </Column>
          </Column>
        </Column>
        {android && showAssetForm ? (
          <KeyboardSizeView showAssetForm={showAssetForm} />
        ) : null}
      </SheetContainer>
    </Container>
  );
}
