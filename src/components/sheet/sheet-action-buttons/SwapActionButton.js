import React, { useCallback } from 'react';
import { useExpandedStateNavigation } from '../../../hooks';
import SheetActionButton from './SheetActionButton';
import Routes from '@rainbow-me/routes';
import {padding} from "@rainbow-me/styles";
import WalletActionButton from "../../buttons/WalletActionButton";
import {Row} from "../../layout";

export default function SwapActionButton({
  color: givenColor,
  inputType,
  ...props
}) {
  const { colors } = useTheme();
  const color = givenColor || colors.swapPurple;
  const navigate = useExpandedStateNavigation(inputType);
  const handlePress = useCallback(
    () =>
      navigate(Routes.EXCHANGE_MODAL, params => ({
        params: {
          params,
          screen: Routes.MAIN_EXCHANGE_SCREEN,
        },
        screen: Routes.MAIN_EXCHANGE_NAVIGATOR,
      })),
    [navigate]
  );

  return (
    <WalletActionButton
      color={color}
      isReadOnlyWallet={false}
      onPress={handlePress}
      title="Swap"
      type="exchange"
    />
  );
}
