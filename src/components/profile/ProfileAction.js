import React from 'react';
import styled from 'styled-components';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import { RowWithMargins } from '../layout';
import { Text } from '../text';
import { position } from '@rainbow-me/styles';

const Container = styled(RowWithMargins).attrs({
  align: 'center',
  justify: 'start',
  margin: 6,
})`
  background-color: ${({ theme: { colors } }) => colors.transparent};
  border-radius: 24px;
  height: 52px;
  padding: 0 5px 2px;
`;

const ProfileActionIcon = styled(Icon).attrs(({ theme: { colors } }) => ({
  color: colors.coinburp,
}))`
  ${({ iconSize }) => position.size(iconSize)};
  margin-top: 0.5;
`;

const ProfileAction = ({ icon, iconSize = 24, onPress, text, ...props }) => (
  <ButtonPressAnimation
    onPress={onPress}
    overflowMargin={5}
    radiusAndroid={24}
    {...props}
  >
    <Container>
      <ProfileActionIcon iconSize={iconSize} name={icon} />
      <Text
        color="coinburp"
        letterSpacing="roundedMedium"
        lineHeight={19}
        size={20}
        weight={900}
      >
        {text}
      </Text>
    </Container>
  </ButtonPressAnimation>
);

export default React.memo(ProfileAction);
