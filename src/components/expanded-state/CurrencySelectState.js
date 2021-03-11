import { useRoute } from '@react-navigation/native';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import styled from 'styled-components';
import { Modal } from '../../components/modal';
import { useTheme } from '../../context/ThemeContext';
import { AssetPanel, FloatingPanels } from '../../floating-panels';
import { useAccountSettings, useContacts } from '../../hooks';
import { useNavigation } from '../../navigation/Navigation';
import { abbreviations, magicMemo } from '../../utils';
import TouchableBackdrop from '../TouchableBackdrop';
import { ButtonPressAnimation, interpolate } from '../animations';
import { Button } from '../buttons';
import { showDeleteContactActionSheet } from '../contacts';
import CopyTooltip from '../copy-tooltip';
import { Icon } from '../icons';
import {
  Centered, Column,
  ColumnWithMargins,
  KeyboardFixedOpenLayout,
} from '../layout';
import { SheetTitle } from '../sheet';
import { Text, TruncatedAddress } from '../text';
import { ProfileModal } from './profile';
import { margin, padding, position } from '@rainbow-me/styles';

const Wrapper = ios ? KeyboardFixedOpenLayout : Fragment;

const TabTransitionAnimation = styled(Animated.View)`
  ${position.size('100%')};
`;

const ArrowSmall = styled(Icon).attrs({
  height: '34px',
  name: 'arrowSmall',
  rotateLeft: 'true',
  width: '24px',
})``;

const CurrencySelectState = params => {
  const { goBack } = useNavigation();
  const { isDarkMode, colors } = useTheme();
  const {
    params: { tabTransitionPosition },
  } = useRoute();

  return (
    <ProfileModal
      containerPadding={0}
      fullScreenOnAndroid
      height="100%"
      overflow="hidden"
      radius={30}
    >
      <Centered css={padding(16, 24, 25, 25)} direction="column">
        <ButtonPressAnimation
          onPress={() => {
            goBack();
            android && Keyboard.dismiss();
          }}
          style={{ left: 33, position: 'absolute', top: 7 }}
        >
          <ArrowSmall />
        </ButtonPressAnimation>
        <SheetTitle color="black" size={20} weight="heavy">
          Withdraw
        </SheetTitle>
      </Centered>
    </ProfileModal>
  );
};

export default magicMemo(CurrencySelectState, ['address', 'color', 'contact']);
