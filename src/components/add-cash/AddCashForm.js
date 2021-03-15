import { useRoute } from '@react-navigation/core';
import analytics from '@segment/analytics-react-native';
import { isEmpty } from 'lodash';
import React, { Fragment, useCallback, useState } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useDimensions, useIsWalletEthZero } from '../../hooks';
import { Alert } from '../alerts';
import DotArrow from '../icons/svg/DotArrow';
import { Column, ColumnWithMargins, Row } from '../layout';
import { Text } from '../text';
import AddCashFooter from './AddCashFooter';
import AddCashSelector from './AddCashSelector';
import { DAI_ADDRESS, ETH_ADDRESS } from '@rainbow-me/references';
import { buildTextStyles, fonts, margin, padding } from '@rainbow-me/styles';

const currencies = [ETH_ADDRESS, DAI_ADDRESS];
const minimumPurchaseAmountUSD = 1;

const DepositAmountInput = styled(TextInput).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.coinburp,
  fontFamily: fonts.family.SFProRounded,
  justify: 'center',
  size: 48,
  top: -5,
}))`
  ${buildTextStyles};
  font-family: ${fonts.family.SFProRounded};
  font-weight: 900;
`;

const CurrencySymbol = styled(Text).attrs(({ theme: { colors } }) => ({
  color: colors.coinburp,
  lineHeight: 48,
  size: 48,
  weight: 900,
}))``;

const ToArrow = styled(DotArrow)`
  margin: 16px 0;
`;

const AddCashForm = ({
  limitWeekly,
  onClearError,
  onLimitExceeded,
  onPurchase,
  onShake,
}) => {
  const { width } = useDimensions();
  const { colors } = useTheme();

  const isWalletEthZero = useIsWalletEthZero();
  const { params } = useRoute();
  const [paymentSheetVisible, setPaymentSheetVisible] = useState(false);

  const initialCurrencyIndex = 0;
  const [currency, setCurrency] = useState(currencies[initialCurrencyIndex]);
  const [value, setValue] = useState(
    params?.amount ? params?.amount?.toString() : ''
  );

  const handlePurchase = useCallback(async () => {
    if (paymentSheetVisible) return;
    try {
      analytics.track('Submitted Purchase', {
        category: 'add cash',
        label: currency,
        value: Number(value),
      });
      setPaymentSheetVisible(true);
      await onPurchase({ address: currency, value });
      // eslint-disable-next-line no-empty
    } catch (e) {
    } finally {
      setPaymentSheetVisible(false);
    }
  }, [currency, onPurchase, paymentSheetVisible, value]);

  const handleNumpadPress = useCallback(
    e => {
      e.preventDefault();
      setValue(prevValue => {
        const t = e.nativeEvent?.text || '';
        const newValue = t.length < prevValue.length ? 'back' : t[t.length - 1];

        const isExceedingWeeklyLimit =
          parseFloat(prevValue + parseFloat(newValue)) > limitWeekly;

        const isInvalidFirstEntry =
          !prevValue &&
          (newValue === '0' || newValue === '.' || newValue === 'back');

        if (!prevValue && !isInvalidFirstEntry) {
          return newValue;
        }

        const isMaxDecimalCount =
          prevValue && prevValue.includes('.') && newValue === '.';

        const isMaxDecimalLength =
          prevValue &&
          prevValue.charAt(prevValue.length - 3) === '.' &&
          newValue !== 'back';

        if (
          isExceedingWeeklyLimit ||
          isInvalidFirstEntry ||
          isMaxDecimalCount ||
          isMaxDecimalLength
        ) {
          if (isExceedingWeeklyLimit) onLimitExceeded('weekly');
          onShake();
          return prevValue;
        }

        let nextValue = prevValue;
        if (nextValue === null) {
          nextValue = newValue;
        } else if (newValue === 'back') {
          nextValue = prevValue.slice(0, -1);
        } else {
          nextValue += newValue;
        }

        onClearError();

        return nextValue;
      });

      analytics.track('Updated cash amount', {
        category: 'add cash',
      });
    },
    [limitWeekly, onClearError, onLimitExceeded, onShake]
  );

  const onCurrencyChange = useCallback(
    val => {
      if (isWalletEthZero) {
        Alert({
          buttons: [{ text: 'Okay' }],
          message:
            'Before you can purchase DAI you must have some ETH in your wallet!',
          title: `You don't have any ETH!`,
        });
        analytics.track('Tried to purchase DAI but doesnt own any ETH', {
          category: 'add cash',
          label: val,
        });
      } else {
        setCurrency(val);
        analytics.track('Switched currency to purchase', {
          category: 'add cash',
          label: val,
        });
      }
    },
    [isWalletEthZero]
  );

  return (
    <Fragment>
      <Column align="center" flex={1}>
        <Column
          align="center"
          backgroundColor="white"
          borderRadius={24}
          justify="center"
          width={width - 32}
        >
          <Row align="center" height={51} justify="space-between">
            <Text size={16} weight="bold">
              AMOUNT
            </Text>
          </Row>
          <Row align="center" height={74} justify="space-between">
            <CurrencySymbol>$</CurrencySymbol>
            <DepositAmountInput
              keyboardType="numeric"
              onChange={handleNumpadPress}
              placeholder="0"
              placeholderTextColor={colors.coinburp}
              value={value}
            />
          </Row>
        </Column>
        <Column height={68} justify="center">
          <ToArrow />
        </Column>
        <ColumnWithMargins
          align="center"
          backgroundColor="white"
          borderRadius={24}
          css={padding(16, 30, 43)}
          justify="center"
          margin={0}
          width={width - 32}
        >
          <Text css={margin(0, 0, 16)} size={16} weight="bold">
            ASSET
          </Text>
          <Row justify="space-between">
            <AddCashSelector
              currencies={currencies}
              initialCurrencyIndex={initialCurrencyIndex}
              isWalletEthZero={isWalletEthZero}
              onSelect={onCurrencyChange}
            />
          </Row>
        </ColumnWithMargins>
        <AddCashFooter
          disabled={
            isEmpty(value) || parseFloat(value) < minimumPurchaseAmountUSD
          }
          onDisabledPress={onShake}
          onSubmit={handlePurchase}
        />
      </Column>
    </Fragment>
  );
};

export default React.memo(AddCashForm);
