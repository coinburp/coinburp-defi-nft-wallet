import React from 'react';
import styled from 'styled-components';
import { removeFirstEmojiFromString } from '../../helpers/emojiHandler';
import { useDimensions } from '../../hooks';
import { abbreviations, magicMemo } from '../../utils';
import { ButtonPressAnimation } from '../animations';
import { Column, RowWithMargins } from '../layout';
import { TruncatedAddress, TruncatedText } from '../text';
import ContactAvatar from './ContactAvatar';
import { margin } from '@rainbow-me/styles';

const ContactAddress = styled(TruncatedAddress).attrs(
  ({ theme: { colors } }) => ({
    align: 'left',
    color: colors.black,
    firstSectionLength: abbreviations.defaultNumCharsPerSection,
    size: 'smedium',
    truncationLength: 4,
    weight: 'heavy',
  })
)`
  width: 100%;
`;

const ContactName = styled(TruncatedText).attrs(({ theme: { colors } }) => ({
  color: colors.coinburp,
  size: 'lmedium',
  weight: 'heavy',
}))`
  width: ${({ deviceWidth }) => deviceWidth - 500};
  height: 22;
`;

const ContactRow = ({ address, color, nickname, ...props }, ref) => {
  const { width: deviceWidth } = useDimensions();

  return (
    <ButtonPressAnimation
      exclusive
      isInteraction
      ref={ref}
      scaleTo={0.98}
      {...props}
    >
      <RowWithMargins css={margin(15, 15, 22)} height={40} margin={8}>
        <ContactAvatar
          color={color}
          disableBorder
          size="small"
          value={nickname}
        />
        <Column justify={ios ? 'space-between' : 'center'} marginTop={5}>
          <ContactName deviceWidth={deviceWidth}>
            {removeFirstEmojiFromString(nickname)}
          </ContactName>
          <ContactAddress address={address} />
        </Column>
      </RowWithMargins>
    </ButtonPressAnimation>
  );
};

export default magicMemo(React.forwardRef(ContactRow), [
  'address',
  'color',
  'nickname',
]);
