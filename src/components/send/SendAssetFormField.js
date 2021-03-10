import analytics from '@segment/analytics-react-native';
import React, { useCallback } from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { UnderlineField } from '../fields';
import { Icon } from '../icons';
import { Column, ColumnWithMargins, Row, RowWithMargins } from '../layout';

import { Text } from '../text';
import { useDimensions } from '@rainbow-me/hooks';
import { buildTextStyles, fonts } from '@rainbow-me/styles';

const ArrowSmall = styled(Icon).attrs({
  name: 'arrowSmall',
})`
  margin-top: 12;
  margin-left: 12;
`;

const FooterContainer = styled(ColumnWithMargins).attrs(({ deviceHeight }) => ({
  justify: 'end',
}))`
  flex: 1;
  width: 100%;
  z-index: 3;
`;

const AddressInput = styled(TextInput).attrs(({ theme: { colors } }) => ({
  align: 'left',
  color: colors.black,
  fontFamily: fonts.family.SFProRounded,
  justify: 'left',
  size: 48,
}))`
  ${buildTextStyles};
  font-family: ${fonts.family.SFProRounded};
  font-weight: 900;
`;

export default function SendAssetFormField({
  autoFocus,
  format,
  label,
  labelMaxLength = 6,
  mask,
  onChange,
  onFocus,
  onPressButton,
  placeholder,
  value,
  testID,
  txSpeedRenderer,
  buttonRenderer,
  ...props
}) {
  const { isTinyPhone, width } = useDimensions();
  const { colors } = useTheme();
  const handlePressButton = useCallback(
    event => {
      analytics.track('Clicked "Max" in Send flow input');
      onPressButton?.(event);
    },
    [onPressButton]
  );

  return (
    <Column
      backgroundColor="white"
      borderRadius={24}
      justify="center"
      marginBottom={34}
      paddingLeft={24}
      paddingRight={24}
      width={width - 32}
    >
      <Row align="center" height={51} justify="space-between">
        <Text color={colors.black} size={16} weight="bold">
          AMOUNT
        </Text>
      </Row>
      <Row align="center" height={74} justify="space-between">
        <AddressInput
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={colors.skyBlue}
        />
        {/*<SendAssetList*/}
        {/*  allAssets={allAssets}*/}
        {/*  fetchData={fetchData}*/}
        {/*  hiddenCoins={hiddenCoins}*/}
        {/*  nativeCurrency={nativeCurrency}*/}
        {/*  network={network}*/}
        {/*  onSelectAsset={sendUpdateSelected}*/}
        {/*  pinnedCoins={pinnedCoins}*/}
        {/*  savings={savings}*/}
        {/*  uniqueTokens={sendableUniqueTokens}*/}
        {/*/>*/}
      </Row>
    </Column>

    // <RowWithMargins
    //   align="center"
    //   flex={1}
    //   justify="space-between"
    //   margin={23}
    //   {...props}
    // >
    //   <UnderlineField
    //     autoFocus={autoFocus}
    //     buttonText="Max"
    //     format={format}
    //     keyboardType="decimal-pad"
    //     mask={mask}
    //     onChange={onChange}
    //     onFocus={onFocus}
    //     onPressButton={handlePressButton}
    //     placeholder={placeholder}
    //     testID={testID}
    //     value={value}
    //   />
    //   <Text
    //     align="right"
    //     color={colors.dark}
    //     size={isTinyPhone || android ? 'bigger' : 'h3'}
    //   >
    //     {label.length > labelMaxLength
    //       ? label.substring(0, labelMaxLength)
    //       : label}
    //   </Text>
    // </RowWithMargins>
  );
}
