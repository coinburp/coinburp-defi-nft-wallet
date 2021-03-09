import React, { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import DepositIcon from '../icons/svg/DepositIcon';
import SwapIcon from '../icons/svg/SwapArrowIcon';
import WithdrawIcon from '../icons/svg/WithdrawIcon';
import { Column } from '../layout';
import { Text } from '../text';
import { enableActionsOnReadOnlyWallet } from '@rainbow-me/config/debug';
import { useAccountProfile } from '@rainbow-me/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';

export default function WalletActionButton({ type, title, isReadOnlyWallet, onPress }) {
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const { accountAddress } = useAccountProfile();

  const icons = {
    add: <DepositIcon />,
    exchange: <SwapIcon />,
    send: <WithdrawIcon />,
    stake: <DepositIcon />,
    unstake: <WithdrawIcon />,
  };

  const handlePress = useCallback(() => {
    if (!isReadOnlyWallet || enableActionsOnReadOnlyWallet) {
      switch (type) {
        case 'add':
          if (ios) {
            navigate(Routes.ADD_CASH_FLOW, params => params);
          } else {
            navigate(Routes.WYRE_WEBVIEW_NAVIGATOR, {
              params: {
                address: accountAddress,
              },
              screen: Routes.WYRE_WEBVIEW,
            });
          }
          break;
        case 'send':
          navigate(Routes.SEND_FLOW);
          break;
        case 'exchange':
          navigate(Routes.EXCHANGE_MODAL);
          break;
        default:
          break;
      }
    } else {
      Alert.alert(`You need to import the wallet in order to do this`);
    }
  }, [navigate, isReadOnlyWallet]);

  return (
    <ButtonPressAnimation onPress={onPress || handlePress}>
      <Column align="center">
        {icons[type]}
        <Text align="center" color={colors.coinburp} weight={900}>
          {title}
        </Text>
      </Column>
    </ButtonPressAnimation>
  );
}
