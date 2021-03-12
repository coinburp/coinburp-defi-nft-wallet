import analytics from '@segment/analytics-react-native';
import React, { useCallback } from 'react';

import SheetActionButton from './SheetActionButton';
import showWalletErrorAlert from '@rainbow-me/helpers/support';
import { useExpandedStateNavigation, useWallets } from '@rainbow-me/hooks';

import Routes from '@rainbow-me/routes';
import WalletActionButton from "../../buttons/WalletActionButton";

export default function BuyActionButton({ color: givenColor, ...props }) {
  const { colors } = useTheme();
  const color = givenColor || colors.paleBlue;
  const navigate = useExpandedStateNavigation();
  const { isDamaged } = useWallets();

  const handlePress = useCallback(() => {
    if (isDamaged) {
      showWalletErrorAlert();
      return;
    }

    if (ios) {
      navigate(Routes.ADD_CASH_FLOW, params => params);
    } else {
      navigate(Routes.WYRE_WEBVIEW, params => params);
    }

    analytics.track('Tapped Buy more ETH', {
      category: 'add cash',
    });
  }, [navigate, isDamaged]);

  return (
    <WalletActionButton
      color={color}
      isReadOnlyWallet={false}
      onPress={handlePress}
      title="Deposit"
      type="add"
    />
  );
}
