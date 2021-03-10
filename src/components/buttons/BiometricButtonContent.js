import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../icons';
import { Row, RowWithMargins } from '../layout';
import { Text } from '../text';
import BiometryTypes from '@rainbow-me/helpers/biometryTypes';
import { useBiometryType } from '@rainbow-me/hooks';

const BiometryIcon = styled(Icon).attrs(({ biometryType, color }) => ({
  color,
  name: biometryType.toLowerCase(),
  size: biometryType === BiometryTypes.passcode ? 19 : 20,
}))`
  margin-bottom: ${({ biometryType }) =>
    biometryType === BiometryTypes.passcode ? 1.5 : 0};
`;

const Container = styled(Row).attrs({
  align: 'center',
  color: '00dc68',
  scaleTo: 0.97,
})`
  background-color: #00dc68;
  border-radius: 24px;
  justify-content: center;
  height: 64px;
  padding: 20px 0;
  width: 100%;
`;

const ButtonLabel = styled(Text).attrs(({ color }) => ({
  align: 'center',
  color,
  letterSpacing: 'rounded',
  size: 'larger',
  weight: 'heavy',
}))``;

const FaceIdIcon = styled(Icon).attrs({
  name: 'faceid',
})`
  position: absolute;
  left: 24px;
`;

export default function BiometricButtonContent({
  color,
  showIcon,
  text,
  testID,
  ...props
}) {
  const { colors } = useTheme();
  const biometryType = useBiometryType();
  const showBiometryIcon =
    showIcon &&
    (biometryType === BiometryTypes.passcode ||
      biometryType === BiometryTypes.TouchID ||
      biometryType === BiometryTypes.Fingerprint);
  const showFaceIDCharacter =
    showIcon &&
    (biometryType === BiometryTypes.FaceID ||
      biometryType === BiometryTypes.Face);

  return (
    <RowWithMargins centered margin={7} {...props}>
      {!android && showBiometryIcon && (
        <BiometryIcon biometryType={biometryType} color={color} />
      )}
      <Container>
        {showFaceIDCharacter && <FaceIdIcon color="white" />}
        <ButtonLabel color={color || colors.appleBlue} testID={testID}>
          {text}
        </ButtonLabel>
      </Container>
    </RowWithMargins>
  );
}
