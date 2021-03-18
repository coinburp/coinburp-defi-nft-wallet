import React from 'react';
import NetworkTypes from '../../helpers/networkTypes';
import { Row } from '../layout';
import WalletConnectExplainerItem from './WalletConnectExplainerItem';
import WalletConnectLearnMoreButton from './WalletConnectLearnMoreButton';
import { useAccountSettings } from '@rainbow-me/hooks';

export default function WalletConnectExplainer() {
  const { network } = useAccountSettings();

  const additionalMargin = network !== NetworkTypes.mainnet ? 32 : 0;

  return (
    <Row
      justify="space-evenly"
      paddingBottom={ios ? 44 + additionalMargin : additionalMargin}
    >
      <WalletConnectExplainerItem
        content="Withdraw funds to an external wallet."
        isWithdraw
        title="Withdraw"
      />
      <WalletConnectExplainerItem
        content="Connect wallet with WalletConnect."
        title="Connect"
      >
        <WalletConnectLearnMoreButton />
      </WalletConnectExplainerItem>
    </Row>
  );
}
