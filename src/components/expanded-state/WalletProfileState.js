import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { getRandomColor } from '../../styles/colors';
import Divider from '../Divider';
import { ButtonPressAnimation } from '../animations';
import { BiometricButtonContent } from '../buttons';
import ImageAvatar from '../contacts/ImageAvatar';
import CopyTooltip from '../copy-tooltip';
import { Centered, Column, ColumnWithDividers, Row } from '../layout';
import ModalHeaderButton from '../modal/ModalHeaderButton';
import { SheetTitle } from '../sheet';
import { Text, TruncatedAddress } from '../text';
import { ProfileAvatarButton, ProfileModal, ProfileNameInput } from './profile';
import {
  removeFirstEmojiFromString,
  returnStringFirstEmoji,
} from '@rainbow-me/helpers/emojiHandler';

import { useAccountProfile } from '@rainbow-me/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';
import { margin, padding, position } from '@rainbow-me/styles';
import { abbreviations } from '@rainbow-me/utils';

const WalletProfileAddressText = styled(TruncatedAddress).attrs(
  ({ theme: { colors } }) => ({
    align: 'center',
    color: colors.alpha(colors.blueGreyDark, 0.6),
    firstSectionLength: abbreviations.defaultNumCharsPerSection,
    size: 'lmedium',
    truncationLength: 4,
    weight: 'medium',
  })
)`
  ${margin(9, 0, 5)};
  width: 100%;
`;

const Spacer = styled.View`
  height: 19;
`;

const WalletProfileButton = styled(ButtonPressAnimation)`
  ${padding(15, 0, 19)};
  ${position.centered};
  flex-direction: row;
  height: 64;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  width: 100%;
`;

const WalletProfileButtonText = styled(Text).attrs({
  align: 'center',
  size: 'larger',
})``;

const ProfileImage = styled(ImageAvatar)`
  margin-bottom: 16;
`;

const WalletProfileDivider = styled(Divider).attrs(({ theme: { colors } }) => ({
  borderRadius: 1,
  color: colors.rowDividerLight,
  inset: false,
}))``;
const WalletProfileModal = styled(ProfileModal).attrs({
  dividerRenderer: WalletProfileDivider,
})`
  ${padding(24, 19, 0)};
  width: 100%;
`;

export default function WalletProfileState({
  actionType,
  address,
  isNewProfile,
  onCloseModal,
  profile,
}) {
  const nameEmoji = returnStringFirstEmoji(profile?.name);
  const { goBack, navigate } = useNavigation();
  const { accountImage } = useAccountProfile();

  const { colors } = useTheme();
  const [color, setColor] = useState(
    (profile.color !== null && profile.color) || getRandomColor()
  );

  const [value, setValue] = useState(
    profile?.name ? removeFirstEmojiFromString(profile.name).join('') : ''
  );
  const inputRef = useRef(null);

  const handleCancel = useCallback(() => {
    goBack();
    if (actionType === 'Create') {
      navigate(Routes.CHANGE_WALLET_SHEET);
    }
  }, [actionType, goBack, navigate]);

  const handleSubmit = useCallback(() => {
    onCloseModal({ color, name: nameEmoji ? `${nameEmoji} ${value}` : value });
    goBack();
    if (actionType === 'Create' && isNewProfile) {
      navigate(Routes.CHANGE_WALLET_SHEET);
    }
  }, [
    actionType,
    color,
    goBack,
    isNewProfile,
    nameEmoji,
    navigate,
    onCloseModal,
    value,
  ]);

  const handleTriggerFocusInput = useCallback(() => inputRef.current?.focus(), [
    inputRef,
  ]);

  return (
    <WalletProfileModal>
      <Row>
        <Column align="flex-end" flex="1" height={24} justify="space-between">
          <ModalHeaderButton onPress={goBack} side="left" />
        </Column>
        <Column align="center" flex="6" height={52} justify="space-between">
          <SheetTitle weight="heavy">Create Wallet</SheetTitle>
        </Column>
        <Column align="flex-end" flex="1" height={24} />
      </Row>
      <Centered
        direction="column"
        paddingBottom={30}
        paddingTop={16}
        testID="wallet-info-modal"
        width="100%"
      >
        {accountImage ? (
          <ProfileImage image={accountImage} size="large" />
        ) : (
          <>
            <ProfileAvatarButton
              color={color}
              marginBottom={0}
              radiusAndroid={32}
              setColor={setColor}
              value={nameEmoji || value}
            />
            <Spacer />
          </>
        )}
        <ProfileNameInput
          onChange={setValue}
          onSubmitEditing={handleSubmit}
          placeholder="Wallet name"
          ref={inputRef}
          selectionColor={colors.avatarColor[color]}
          testID="wallet-info-input"
          value={value}
        />
        {address && (
          <CopyTooltip
            onHide={handleTriggerFocusInput}
            textToCopy={address}
            tooltipText="Copy Address"
          >
            <WalletProfileAddressText address={address} />
          </CopyTooltip>
        )}
      </Centered>
      <ColumnWithDividers dividerRenderer={WalletProfileDivider} width="100%">
        <WalletProfileButton marginBottom={0} onPress={handleSubmit}>
          <BiometricButtonContent
            color="white"
            showIcon={actionType === 'Create'}
            testID="wallet-info-submit-button"
            text={isNewProfile ? actionType : 'Done'}
          />
        </WalletProfileButton>
        <WalletProfileButton marginBottom={24} onPress={handleCancel}>
          <WalletProfileButtonText
            color={colors.neonRed}
            letterSpacing="roundedMedium"
            weight="heavy"
          >
            Cancel
          </WalletProfileButtonText>
        </WalletProfileButton>
      </ColumnWithDividers>
    </WalletProfileModal>
  );
}
