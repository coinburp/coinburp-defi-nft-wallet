import React, { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { isHexString } from '../../handlers/web3';
import { checkIsValidAddressOrDomain } from '../../helpers/validators';
import { Input } from '../inputs';
import { Row } from '../layout';
import { Label } from '../text';
import { useClipboard } from '@rainbow-me/hooks';
import { abbreviations, addressUtils } from '@rainbow-me/utils';
import {TextInput} from "react-native";
import {buildTextStyles, fonts} from "@rainbow-me/styles";

const AddressInput = styled(TextInput).attrs(({ theme: { colors } }) => ({
  align: 'left',
  color: colors.coinburp,
  fontFamily: fonts.family.SFProRounded,
  justify: 'left',
  size: 32,
}))`
  ${buildTextStyles};
  font-family: ${fonts.family.SFProRounded};
  font-weight: 900;
`;

const formatValue = value =>
  isHexString(value) && value.length === addressUtils.maxLength
    ? abbreviations.address(value, 4, 4)
    : value;

const AddressField = (
  { address, autoFocus, name, onChange, onFocus, testID, ...props },
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
