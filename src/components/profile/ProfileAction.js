import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
  height: 52;
  padding-bottom: 2;
`;

const ButtonGradient = styled(LinearGradient)`
  border-radius: 24px;
  padding: 0 5px;
`;

const ProfileActionIcon = styled(Icon).attrs(({ theme: { colors } }) => ({
  color: colors.white,
}))`
  ${({ iconSize }) => position.size(iconSize)};
  margin-top: 0.5;
`;

const ProfileAction = ({ icon, iconSize = 16, onPress, text, ...props }) => (
  <ButtonPressAnimation
    onPress={onPress}
    overflowMargin={5}
    radiusAndroid={24}
    {...props}
  >
    <ButtonGradient colors={['#f77062', '#fe5196']}>
      <Container>
        <ProfileActionIcon iconSize={iconSize} name={icon} />
        <Text
          color="white"
          letterSpacing="roundedMedium"
          lineHeight={19}
          size="lmedium"
          weight="semibold"
        >
          {text}
        </Text>
      </Container>
    </ButtonGradient>
  </ButtonPressAnimation>
);

export default React.memo(ProfileAction);
