import React, { useCallback, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useAccountSettings, useContacts } from '../../hooks';
import { useNavigation } from '../../navigation/Navigation';
import { abbreviations, magicMemo } from '../../utils';
import { ButtonPressAnimation } from '../animations';
import { Button } from '../buttons';
import { showDeleteContactActionSheet } from '../contacts';
import CopyTooltip from '../copy-tooltip';
import { Icon } from '../icons';
import { Centered, ColumnWithMargins } from '../layout';
import { SheetTitle } from '../sheet';
import { Text, TruncatedAddress } from '../text';
import { ProfileAvatarButton, ProfileModal, ProfileNameInput } from './profile';
import { margin, padding } from '@rainbow-me/styles';

const ArrowSmall = styled(Icon).attrs({
  height: '34px',
  name: 'arrowSmall',
  rotateLeft: 'true',
  width: '24px',
})``;

const AddressAbbreviation = styled(TruncatedAddress).attrs(
  ({ theme: { colors } }) => ({
    align: 'center',
    color: colors.shadowBlack,
    firstSectionLength: abbreviations.defaultNumCharsPerSection,
    size: '16px',
    truncationLength: 4,
    weight: 'heavy',
  })
)`
  ${margin(9, 0, 5)};
  opacity: 0.6;
  width: 100%;
`;

const Spacer = styled.View`
  height: 48;
`;

const SubmitButton = styled(Button).attrs(({ theme: { colors }, value }) => ({
  backgroundColor: colors.coinburp,
  disabled: !value.length > 0,
  showShadow: false,
  size: 'small',
}))`
  height: 64;
  width: 340;
  border-radius: 24px;
`;

const SubmitButtonLabel = styled(Text).attrs(({ value }) => ({
  color: value.length > 0 ? 'whiteLabel' : 'white',
  size: '24px',
  weight: 'heavy',
}))`
  margin-bottom: 1.5;
`;

const ContactProfileState = ({ address, color: colorProp, contact }) => {
  const { goBack } = useNavigation();
  const { onAddOrUpdateContacts, onRemoveContact } = useContacts();

  const [color, setColor] = useState(colorProp || 0);
  const [value, setValue] = useState(contact?.nickname || '');
  const inputRef = useRef(null);
  const { network } = useAccountSettings();

  const handleAddContact = useCallback(() => {
    if (value.length > 0 || color !== colorProp) {
      onAddOrUpdateContacts(address, value, color, network);
      goBack();
    }
    android && Keyboard.dismiss();
  }, [
    address,
    color,
    colorProp,
    goBack,
    network,
    onAddOrUpdateContacts,
    value,
  ]);

  const handleDeleteContact = useCallback(() => {
    showDeleteContactActionSheet({
      address,
      nickname: value,
      onDelete: goBack,
      removeContact: onRemoveContact,
    });
    android && Keyboard.dismiss();
  }, [address, goBack, onRemoveContact, value]);

  const handleTriggerFocusInput = useCallback(() => inputRef.current?.focus(), [
    inputRef,
  ]);

  const { isDarkMode, colors } = useTheme();

  return (
    <ProfileModal onPressBackdrop={handleAddContact}>
      <Centered css={padding(16, 24, 25, 25)} direction="column">
        <ButtonPressAnimation
          style={{ left: 33, position: 'absolute', top: 7 }}
          onPress={
            () => {
              goBack();
              android && Keyboard.dismiss();
            }
          }
        >
          <ArrowSmall />
        </ButtonPressAnimation>
        <SheetTitle color="black" size={20} weight="heavy">
          Add to Contact
        </SheetTitle>
        <Spacer />
        <ProfileAvatarButton
          color={color}
          marginBottom={16}
          radiusAndroid={64}
          setColor={setColor}
          testID="contact-profile-avatar-button"
          value={value}
        />
        <ProfileNameInput
          onChange={setValue}
          onSubmitEditing={handleAddContact}
          placeholder="Contact name"
          ref={inputRef}
          selectionColor={colors.avatarColor[color]}
          testID="contact-profile-name-input"
          value={value}
        />
        <CopyTooltip
          onHide={handleTriggerFocusInput}
          textToCopy={address}
          tooltipText="Copy Address"
        >
          <AddressAbbreviation address={address} />
        </CopyTooltip>
        <Centered paddingVertical={19} width={48} />
        <SubmitButton
          isDarkMode={isDarkMode}
          onPress={handleAddContact}
          testID="contact-profile-add-button"
          value={value}
        >
          <SubmitButtonLabel value={value}>
            {contact ? 'Done' : 'Add'}
          </SubmitButtonLabel>
        </SubmitButton>
        <ButtonPressAnimation
          marginTop={11}
          onPress={
            contact
              ? handleDeleteContact
              : () => {
                  goBack();
                  android && Keyboard.dismiss();
                }
          }
        >
          <Centered
            backgroundColor={colors.white}
            css={padding(15, 8, 48, 9)}
            testID="contact-profile-cancel-button"
          >
            <Text color={colors.neonRed} size="20px" weight="heavy">
              Delete
            </Text>
          </Centered>
        </ButtonPressAnimation>
      </Centered>
    </ProfileModal>
  );
};

export default magicMemo(ContactProfileState, ['address', 'color', 'contact']);
