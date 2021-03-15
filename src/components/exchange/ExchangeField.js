import React, { useCallback, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import { TokenSelectionButton } from '../buttons';
import { Row, RowWithMargins } from '../layout';
import ExchangeInput from './ExchangeInput';

const ExchangeFieldHeight = android ? 64 : 38;
const ExchangeFieldPadding = android ? 21 : 24;

const Container = styled(Row).attrs({
  align: 'center',
  justify: 'flex-end',
})`
  width: 100%;
  padding-right: ${ExchangeFieldPadding};
`;

const FieldRow = styled(RowWithMargins).attrs({
  align: 'center',
  margin: 10,
})`
  flex: 1;
  padding-left: ${ExchangeFieldPadding};
  padding-right: ${({ disableCurrencySelection }) =>
    disableCurrencySelection ? ExchangeFieldPadding : 0};
`;

const Input = styled(ExchangeInput).attrs({
  letterSpacing: 'roundedTightest',
  size: 32,
})`
  margin-vertical: -10;
  height: ${ExchangeFieldHeight + (android ? 20 : 0)};
`;

const ExchangeField = (
  {
    address,
    amount,
    disableCurrencySelection,
    onBlur,
    onFocus,
    onPressSelectCurrency,
    setAmount,
    symbol,
    testID,
    autoFocus,
    useCustomAndroidMask = false,
    ...props
  },
  ref
) => {
  // const colorForAsset = useColorForAsset({ address });
  const handleFocusField = useCallback(() => ref?.current?.focus(), [ref]);
  const { colors } = useTheme();
  useEffect(() => {
    autoFocus && handleFocusField();
  }, [autoFocus, handleFocusField]);
  return (
    <Container {...props}>
      <TouchableWithoutFeedback onPress={handleFocusField}>
        <FieldRow disableCurrencySelection={disableCurrencySelection}>
          {/*{symbol ? (*/}
          {/*  <CoinIcon address={address} symbol={symbol} />*/}
          {/*) : (*/}
          {/*  <CoinIconSkeleton />*/}
          {/*)}*/}
          <Input
            color={colors.black}
            editable={!!symbol}
            onBlur={onBlur}
            onChangeText={setAmount}
            onFocus={onFocus}
            placeholder="0"
            placeholderTextColor={colors.blueGrey}
            ref={ref}
            testID={amount ? `${testID}-${amount}` : testID}
            useCustomAndroidMask={useCustomAndroidMask}
            value={amount}
            weight={amount ? 900 : 'bold'}
          />
        </FieldRow>
      </TouchableWithoutFeedback>
      {!disableCurrencySelection && (
        <TokenSelectionButton
          address={address}
          onPress={onPressSelectCurrency}
          symbol={symbol}
          testID={testID + '-selection-button'}
        />
      )}
    </Container>
  );
};

export default React.forwardRef(ExchangeField);
