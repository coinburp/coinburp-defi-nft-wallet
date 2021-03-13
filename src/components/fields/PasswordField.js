import React, { useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../icons';
import { Input } from '../inputs';
import { Flex, Row } from '../layout';
import { cloudBackupPasswordMinLength } from '@rainbow-me/handlers/cloudBackup';
import { useDimensions } from '@rainbow-me/hooks';
import { fonts, padding, position } from '@rainbow-me/styles';

const FieldAccessoryBadgeSize = 22;
const FieldAccessoryBadgeWrapper = styled(Flex).attrs({
  ...position.sizeAsObject(FieldAccessoryBadgeSize),
  borderRadius: FieldAccessoryBadgeSize,
})`
  position: absolute;
  right: 16;
  top: 16;
`;

const StyledTouchable = styled(TouchableWithoutFeedback)`
  margin-bottom: 12;
`;

const PasswordInput = styled(Input).attrs(({ theme: { colors } }) => ({
  autoCompleteType: 'password',
  blurOnSubmit: false,
  fontFamily: fonts.family.SFProRounded,
  passwordRules: `minlength: ${cloudBackupPasswordMinLength};`,
  placeholderTextColor: colors.blueGrey,
  secureTextEntry: true,
  selectTextOnFocus: true,
  size: 16,
  type: 'password',
  weight: 'bold',
}))`
  ${padding(0, 40, 2.5, 24)};
  height: 100%;
  width: 95%;
`;

const ShadowContainer = styled(Row).attrs(
  ({ deviceWidth, theme: { colors } }) => ({
    backgroundColor: colors.alpha(colors.blueGrey, 0.16),
    borderRadius: 24,
    height: 56,
    width: deviceWidth - 48,
  })
)``;

function FieldAccessoryBadge({ color, name }) {
  return (
    <FieldAccessoryBadgeWrapper color={color}>
      <Icon
        color={color}
        height={FieldAccessoryBadgeSize}
        name={name}
        width={FieldAccessoryBadgeSize}
      />
    </FieldAccessoryBadgeWrapper>
  );
}

const PasswordField = (
  {
    isInvalid,
    isValid,
    password,
    returnKeyType = 'done',
    style,
    textContentType = 'password',
    ...props
  },
  ref
) => {
  const { width: deviceWidth } = useDimensions();
  const handleFocus = useCallback(() => ref?.current?.focus?.(), [ref]);
  const { isDarkMode, colors } = useTheme();

  return (
    <StyledTouchable onPress={handleFocus}>
      <ShadowContainer
        deviceWidth={deviceWidth}
        isDarkMode={isDarkMode}
        style={style}
      >
        <PasswordInput
          ref={ref}
          returnKeyType={returnKeyType}
          textContentType={textContentType}
          value={password}
          {...props}
        />
        {isValid && (
          <FieldAccessoryBadge color={colors.coinburp} name="checkmark" />
        )}
        {isInvalid && (
          <FieldAccessoryBadge color={colors.gold} name="warning" />
        )}
      </ShadowContainer>
    </StyledTouchable>
  );
};

export default React.forwardRef(PasswordField);
