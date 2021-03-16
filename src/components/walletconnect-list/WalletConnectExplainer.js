import React from 'react';
import { Row } from '../layout';
import WalletConnectExplainerItem from './WalletConnectExplainerItem';
import WalletConnectLearnMoreButton from './WalletConnectLearnMoreButton';

export default function WalletConnectExplainer() {
  return (
    <Row justify="space-evenly" paddingBottom={ios ? 44 : 0}>
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
