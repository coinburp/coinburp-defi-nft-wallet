import { get, isEmpty, isNumber, toLower } from 'lodash';
import React, { Fragment, useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '../../navigation/Navigation';
import { AddContactButton, PasteAddressButton } from '../buttons';
import { AddressField } from '../fields';
import { Column, ColumnWithMargins, Row } from '../layout';
import { Text } from '../text';
import { useClipboard, useDimensions } from '@rainbow-me/hooks';
import Routes from '@rainbow-me/routes';
import { showActionSheetWithOptions } from '@rainbow-me/utils';

const DefaultContactItem = {
  address: '',
  color: '#afd2ff',
  nickname: '',
};

const footerMargin = 31;
const FooterContainer = styled(ColumnWithMargins).attrs(({ deviceHeight }) => ({
  alignltemes: 'stretch',
  alignSelf: 'stretch',
  justify: 'center',
  margin: deviceHeight > 812 ? footerMargin : footerMargin / 2,
}))``;

export default function SendInput({
  contacts,
  isValidAddress,
  onChangeAddressInput,
  onFocus,
  onPressPaste,
  onRefocusInput,
  recipient,
  recipientFieldRef,
  removeContact,
  showAssetList,
  sendContactList,
  deviceHeight,
  showEmptyState,
  buttonRenderer,
  txSpeedRenderer,
                                    filteredContacts,
}) {
  const { setClipboard } = useClipboard();
  const { navigate } = useNavigation();
  const { width } = useDimensions();
  const { colors } = useTheme();
  const getRandomColor = () =>
    Math.floor(Math.random() * colors.avatarColor.length);

  const contact = useMemo(() => {
    return get(contacts, `${[toLower(recipient)]}`, DefaultContactItem);
  }, [contacts, recipient]);

  const handleNavigateToContact = useCallback(() => {
    let color = get(contact, 'color');
    if (!isNumber(color)) {
      color = getRandomColor();
    }

    navigate(Routes.MODAL_SCREEN, {
      additionalPadding: false,
      address: recipient,
      color,
      contact: isEmpty(contact.address) ? false : contact,
      onRefocusInput,
      type: 'contact_profile',
    });
  }, [colors, contact, navigate, onRefocusInput, recipient]);

  const handleOpenContactActionSheet = useCallback(async () => {
    return showActionSheetWithOptions(
      {
        cancelButtonIndex: 3,
        destructiveButtonIndex: 0,
        options: [
          'Delete Contact', // <-- destructiveButtonIndex
          'Edit Contact',
          'Copy Address',
          'Cancel', // <-- cancelButtonIndex
        ],
      },
      async buttonIndex => {
        if (buttonIndex === 0) {
          showActionSheetWithOptions(
            {
              cancelButtonIndex: 1,
              destructiveButtonIndex: 0,
              options: ['Delete Contact', 'Cancel'],
            },
            async buttonIndex => {
              if (buttonIndex === 0) {
                removeContact(recipient);
              }
            }
          );
        } else if (buttonIndex === 1) {
          handleNavigateToContact();
        } else if (buttonIndex === 2) {
          setClipboard(recipient);
        }

        onRefocusInput();
      }
    );
  }, [
    handleNavigateToContact,
    onRefocusInput,
    recipient,
    removeContact,
    setClipboard,
  ]);

  const defaultRadius = 24;
  const borderRadiusTop = defaultRadius;
  const borderRadiusBottom = showEmptyState && filteredContacts.length ? 0 : defaultRadius;

  const isPreExistingContact = (contact?.nickname?.length || 0) > 0;

  return (
    <Fragment>
      <Column align="center">
        <Column
          backgroundColor="white"
          borderBottomLeftRadius={borderRadiusBottom}
          borderBottomRightRadius={borderRadiusBottom}
          borderTopLeftRadius={borderRadiusTop}
          borderTopRightRadius={borderRadiusTop}
          justify="center"
          marginTop={16}
          paddingLeft={24}
          paddingRight={24}
          width={width - 32}
        >
          <Row align="center" height={51} justify="space-between">
            <Text color={colors.black} size={16} weight="bold">
              ADDRESS
            </Text>
          </Row>
          <Row align="center" height={(android && showEmptyState && filteredContacts.length)
            ? 55 : 75} justify="space-between">
            <AddressField
              address={recipient}
              autoFocus={!showAssetList}
              name={contact.nickname}
              onChange={onChangeAddressInput}
              onFocus={onFocus}
              placeholder="0x..."
              placeholderTextColor={colors.skyBlue}
              ref={recipientFieldRef}
              isValidAddress={isValidAddress}
              testID="send-asset-form-field"
            />
            {isValidAddress ? (
              <AddContactButton
                edit={isPreExistingContact}
                onPress={
                  isPreExistingContact
                    ? handleOpenContactActionSheet
                    : handleNavigateToContact
                }
              />
            ) : (
              <PasteAddressButton onPress={onPressPaste} />
            )}
          </Row>
        </Column>
        <Column
          backgroundColor={colors.background}
          borderBottomLeftRadius={defaultRadius}
          borderBottomRightRadius={defaultRadius}
          justify="center"
          marginBottom={24}
          paddingLeft={5}
          paddingRight={24}
          width={width - 32}
        >
          {showEmptyState && filteredContacts.length ? (
            <Row height={android ? 55 : 75}>
              <FooterContainer deviceHeight={deviceHeight}>
                <ScrollView horizontal>{sendContactList}</ScrollView>
              </FooterContainer>
            </Row>
          ) : null}
        </Column>
        <FooterContainer deviceHeight={deviceHeight}>
          {buttonRenderer ? buttonRenderer : null}
          {txSpeedRenderer ? txSpeedRenderer : null}
        </FooterContainer>
      </Column>
    </Fragment>
  );
}
