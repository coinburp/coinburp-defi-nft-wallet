import { get, isEmpty, isNumber, toLower } from 'lodash';
import React, { Fragment, useCallback, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '../../navigation/Navigation';
import { AddContactButton, PasteAddressButton } from '../buttons';
import { AddressField } from '../fields';
import { Column, Row } from '../layout';
import { Text } from '../text';
import { useClipboard, useDimensions } from '@rainbow-me/hooks';
import Routes from '@rainbow-me/routes';
import { showActionSheetWithOptions } from '@rainbow-me/utils';

const DefaultContactItem = {
  address: '',
  color: '#afd2ff',
  nickname: '',
};

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

  const isPreExistingContact = (contact?.nickname?.length || 0) > 0;

  return (
    <Fragment>
      <Column align="center">
        <Column
          backgroundColor="white"
          borderRadius={24}
          justify="center"
          paddingLeft={24}
          paddingRight={24}
          width={width - 32}
        >
          <Row align="center" height={51} justify="space-between">
            <Text color={colors.black} size={16} weight="bold">
              ADDRESS
            </Text>
          </Row>
          <Row align="center" height={74} justify="space-between">
            <AddressField
              address={recipient}
              autoFocus={!showAssetList}
              name={contact.nickname}
              onChange={onChangeAddressInput}
              onFocus={onFocus}
              placeholder="0x..."
              placeholderTextColor={colors.skyBlue}
              ref={recipientFieldRef}
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
          backgroundColor="white"
          borderRadius={24}
          justify="center"
          paddingLeft={24}
          paddingRight={24}
          width={width - 32}
        >
          {/*<Row height={50}>*/}
          {/*  <FooterContainer deviceHeight={deviceHeight}>*/}
          {/*    {sendContactList}*/}
          {/*  </FooterContainer>*/}
          {/*</Row>*/}
        </Column>
      </Column>
    </Fragment>
  );
}
