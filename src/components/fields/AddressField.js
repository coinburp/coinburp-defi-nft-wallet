import React, { useCallback, useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import { isHexString } from '../../handlers/web3';
import { checkIsValidAddressOrDomain } from '../../helpers/validators';
import { Row } from '../layout';
import { useClipboard } from '@rainbow-me/hooks';
import { buildTextStyles, fonts } from '@rainbow-me/styles';
import { abbreviations, addressUtils } from '@rainbow-me/utils';

const AddressInput = styled(TextInput).attrs(
  ({ theme: { colors }, isValidAddress }) => ({
    align: 'left',
    color: isValidAddress ? colors.coinburp : colors.bold,
    fontFamily: fonts.family.SFProRounded,
    justify: 'left',
    size: 32,
  })
)`
  ${buildTextStyles};
  font-family: ${fonts.family.SFProRounded};
  font-weight: 900;
`;

const formatValue = value =>
  isHexString(value) && value.length === addressUtils.maxLength
    ? abbreviations.address(value, 4, 4)
    : value;

const AddressField = (
  { address, autoFocus, name, onChange, onFocus, testID, isValidAddress, ...props },
  ref
) => {
  const { colors } = useTheme();
  const { clipboard, setClipboard } = useClipboard();
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const expandAbbreviatedClipboard = useCallback(() => {
    if (clipboard === abbreviations.formatAddressForDisplay(address)) {
      setClipboard(address);
    }
  }, [address, clipboard, setClipboard]);

  const validateAddress = useCallback(async address => {
    const newIsValid = await checkIsValidAddressOrDomain(address);
    return setIsValid(newIsValid);
  }, []);

  const handleChange = useCallback(
    ({ nativeEvent: { text } }) => {
      onChange(text);
      validateAddress(text);
      expandAbbreviatedClipboard();
    },
    [expandAbbreviatedClipboard, onChange, validateAddress]
  );

  useEffect(() => {
    if (address !== inputValue || name !== inputValue) {
      setInputValue(name || address);
      setIsValid(true);
    }
  }, [address, inputValue, name]);

  return (
    <Row flex={1}>
      <AddressInput
        {...props}
        autoFocus={autoFocus}
        color={isValid ? colors.skyBlue : colors.black}
        onBlur={expandAbbreviatedClipboard}
        onChange={handleChange}
        isValidAddress={isValidAddress}
        onChangeText={setInputValue}
        onFocus={onFocus}
        ref={ref}
        testID={testID}
        value={formatValue(inputValue)}
      />
    </Row>
  );
};

export default React.forwardRef(AddressField);
