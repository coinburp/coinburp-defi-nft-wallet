import { includes } from 'lodash';
import React from 'react';
import Spinner from '../Spinner';
import { Icon } from '../icons';
import { Row } from '../layout';
import { Text } from '../text';
import TransactionStatusTypes from '@rainbow-me/helpers/transactionStatusTypes';
import TransactionTypes from '@rainbow-me/helpers/transactionTypes';
import { position } from '@rainbow-me/styles';
import { magicMemo } from '@rainbow-me/utils';

const StatusProps = {
  [TransactionStatusTypes.approved]: {
    marginRight: 2,
    name: 'checkmark',
  },
  [TransactionStatusTypes.cancelled]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.cancelling]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.deposited]: {
    name: 'depositIconSmall',
    style: { fontSize: 11, left: -1.3, marginBottom: 1.5, marginRight: 1 },
  },
  [TransactionStatusTypes.depositing]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.approving]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.swapping]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.speeding_up]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.failed]: {
    marginRight: 2,
    name: 'closeCircled',
    style: position.maxSizeAsObject(16),
  },
  [TransactionStatusTypes.purchased]: {
    marginRight: 2,
    name: 'bag',
  },
  [TransactionStatusTypes.purchasing]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.received]: {
    marginRight: 6,
    name: 'depositIconSmall',
  },
  [TransactionStatusTypes.self]: {
    marginRight: 2,
    name: 'userCircle',
  },
  [TransactionStatusTypes.sending]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.sent]: {
    marginRight: 6,
    name: 'withdrawIconSmall',
  },
  [TransactionStatusTypes.swapped]: {
    marginRight: 6,
    name: 'swapCircle',
  },
  [TransactionStatusTypes.swapping]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.withdrawing]: {
    marginRight: 4,
  },
  [TransactionStatusTypes.withdrew]: {
    name: 'withdrawIconSmall',
    style: { fontSize: 11, left: -1.3, marginBottom: 1.5, marginRight: 1 },
  },
};

const TransactionStatusBadge = ({ pending, status, style, title, type }) => {
  const { colors } = useTheme();
  const isSwapping = status === TransactionStatusTypes.swapping;

  let statusColor = colors.coldGrey;
  if (
    status === TransactionStatusTypes.swapped ||
    status === TransactionStatusTypes.sent ||
    status === TransactionStatusTypes.withdrew
  ) {
    statusColor = colors.neonRed;
  } else if (
      status === TransactionStatusTypes.received ||
      status === TransactionStatusTypes.deposited ||
      status === TransactionStatusTypes.approved ||
      status === TransactionStatusTypes.purchased
  ) {
    statusColor = colors.neonGreen;
  }

  const isSwapReceived =
    status === TransactionStatusTypes.received &&
    type === TransactionTypes.trade;

  if (status !== TransactionStatusTypes.failed) {
    if (type === TransactionTypes.receive) title = 'Deposit';
    if (type === TransactionTypes.send) title = 'Withdrawal';
    if (type === TransactionTypes.trade) title = 'Swapped Out';
    if (status === TransactionStatusTypes.deposited) title = 'Staked';
    if (status === TransactionStatusTypes.withdrew) title = 'Unstaked';

    if (isSwapReceived) title = 'Swapped In';
  }

  return (
    <Row align="center" style={style}>
      {pending && (
        <Spinner
          color={isSwapping ? colors.swapPurple : colors.appleBlue}
          size={12}
        />
      )}
      {status && includes(Object.keys(StatusProps), status) && (
        <Icon
          color={statusColor}
          height={16}
          width={16}
          {...StatusProps[
            isSwapReceived ? TransactionStatusTypes.swapped : status
          ]}
        />
      )}
      <Text color={statusColor} size={14} weight="bold">
        {' '}
        {title}
      </Text>
    </Row>
  );
};

export default magicMemo(TransactionStatusBadge, [
  'pending',
  'status',
  'title',
]);
