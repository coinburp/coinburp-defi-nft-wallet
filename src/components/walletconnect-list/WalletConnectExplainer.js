import React from 'react';
// import Divider from '../Divider';
import { Row } from '../layout';
import WalletConnectExplainerItem from './WalletConnectExplainerItem';
import WalletConnectLearnMoreButton from './WalletConnectLearnMoreButton';
import { margin, padding } from '@rainbow-me/styles';

export default function WalletConnectExplainer() {
  return (
    <Row css={padding(21, 0, 26, 19)}>
      <WalletConnectExplainerItem
        content="Withdraw funds to an external wallet."
        title="Withdraw"
        isWithdraw
      />
      <WalletConnectExplainerItem
        content="Connect wallet with WalletConnect."
        title="Connect"
        isWithdraw={false}
      >
        <WalletConnectLearnMoreButton />
      </WalletConnectExplainerItem>
    </Row>
  );
}
