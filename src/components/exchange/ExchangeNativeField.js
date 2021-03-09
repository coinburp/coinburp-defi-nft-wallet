import React, { useCallback, useMemo, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import { Row } from '../layout';
import { Text } from '../text';
import ExchangeInput from './ExchangeInput';
import { useColorForAsset } from '@rainbow-me/hooks';
import { supportedNativeCurrencies } from '@rainbow-me/references';
import { fonts } from '@rainbow-me/styles';

const CurrencySymbol = styled(Text).attrs(({ height, color }) => ({
  color: color,
  letterSpacing: 1,
  lineHeight: height,
  size: 16,
  weight: 900,
}))`
  ${android ? 'margin-bottom: 1.5;' : ''};
`;

const NativeInput = styled(ExchangeInput).attrs({
  letterSpacing: 1,
  size: 16,
  weight: 900
})`
  height: ${({ height }) => height};
`;

const ExchangeNativeField = (
  {
    address,
    editable,
    height,
    nativeAmount,
    nativeCurrency,
    onFocus,
    setNativeAmount,
    testID,
  },
  ref
) => {
  const colorForAsset = useColorForAsset({ address });
  const [isFocused, setIsFocused] = useState(false);
  const { mask, placeholder, symbol } = supportedNativeCurrencies[
    nativeCurrency
  ];

  const handleFocusNativeField = useCallback(() => ref?.current?.focus(), [
    ref,
  ]);

  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleFocus = useCallback(
    event => {
      setIsFocused(true);
      if (onFocus) onFocus(event);
    },
    [onFocus]
  );
  const { colors } = useTheme();

  const nativeAmountColor = useMemo(() => {
    const nativeAmountExists =
      typeof nativeAmount === 'string' && nativeAmount.length > 0;

    const color = isFocused || nativeAmountExists ? colors.dark : colors.blueGrey;

    return colors.alpha(color, 1);
  }, [colors, isFocused, nativeAmount]);

  return (
    <TouchableWithoutFeedback onPress={handleFocusNativeField}>
      <Row align="center" flex={1} height={height}>
        <CurrencySymbol color={nativeAmountColor} height={height}>
          {symbol}
        </CurrencySymbol>
        <NativeInput
          color={nativeAmountColor}
          editable={editable}
          height={android ? height : 58}
          mask={mask}
          onBlur={handleBlur}
          onChangeText={setNativeAmount}
          onFocus={handleFocus}
          placeholder={placeholder}
          ref={ref}
          selectionColor={colorForAsset}
          testID={nativeAmount ? `${testID}-${nativeAmount}` : testID}
          value={nativeAmount}
        />
      </Row>
    </TouchableWithoutFeedback>
  );
};

export default React.forwardRef(ExchangeNativeField);
