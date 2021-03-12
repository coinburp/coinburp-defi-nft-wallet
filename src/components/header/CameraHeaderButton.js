import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigation } from '../../navigation/Navigation';
import Icon from '../icons/Icon';
import {Centered, Flex} from '../layout';
import HeaderButton from './HeaderButton';
import Routes from '@rainbow-me/routes';
import { borders } from '@rainbow-me/styles';
import ShadowStack from 'react-native-shadow-stack';

const CameraHeaderButtonShadows = colors => [
  [0, 3, 5, colors.shadow, 0.2],
  [0, 6, 10, colors.shadow, 0.14],
];

const CameraIcon = styled(Icon).attrs(({ theme: { colors } }) => ({
  color: colors.coinburp,
  name: 'scan',
}))`
  margin-bottom: 1px;
  max-width: 32px;
`;

export default function CameraHeaderButton() {
  const { navigate } = useNavigation();

  const onPress = useCallback(() => navigate(Routes.QR_SCANNER_SCREEN), [
    navigate,
  ]);

  const { colors } = useTheme();

  const shadows = useMemo(() => CameraHeaderButtonShadows(colors), [colors]);

  return (
    <HeaderButton onPress={onPress} testID="goToCamera" transformOrigin="right">
      <Flex
        {...borders.buildCircleAsObject(34)}
      >
        <Centered cover style={{paddingBottom: 18}}>
          <CameraIcon />
        </Centered>
      </Flex>
    </HeaderButton>
  );
}
