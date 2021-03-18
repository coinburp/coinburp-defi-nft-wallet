import { omit } from 'lodash';
import React, { Fragment, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import { Centered } from '../layout';
import { padding } from '@rainbow-me/styles';
import { showActionSheetWithOptions } from '@rainbow-me/utils';

const ActionSheetProps = [
  'cancelButtonIndex',
  'destructiveButtonIndex',
  'message',
  'onPress',
  'options',
  'tintColor',
  'title',
];

const ContextButton = ({ color, ...props }) => (
  <Centered css={padding(12, 8)} {...props}>
    <Icon color={color} name="threeDots" />
  </Centered>
);

export default function ContextMenu({
  activeOpacity = 0.2,
  cancelButtonIndex,
  children,
  dynamicOptions,
  onPressActionSheet,
  options = [],
  ...props
}) {
  const { colors } = useTheme();

  const handlePressActionSheet = useCallback(
    buttonIndex => {
      if (onPressActionSheet) {
        onPressActionSheet(buttonIndex);
      }
    },
    [onPressActionSheet]
  );

  const handleShowActionSheet = useCallback(() => {
    showActionSheetWithOptions(
      {
        ...(Number.isInteger(cancelButtonIndex) ? { cancelButtonIndex } : {}),
        options: dynamicOptions ? dynamicOptions() : options,
      },
      handlePressActionSheet
    );
  }, [cancelButtonIndex, dynamicOptions, handlePressActionSheet, options]);

  return (
    <Fragment>
      {onPressActionSheet && (
        <ButtonPressAnimation
          activeOpacity={activeOpacity}
          onPress={handleShowActionSheet}
          radiusAndroid={20}
        >
          {children || (
            <ContextButton
              color={colors.coinburp}
              {...omit(props, ActionSheetProps)}
            />
          )}
        </ButtonPressAnimation>
      )}
    </Fragment>
  );
}
