import { compact, get, toLower } from 'lodash';
import React, { useCallback } from 'react';
import { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { getRandomColor } from '../../styles/colors';
import { ButtonPressAnimation } from '../animations';
import { CoinIconSize } from '../coin-icon';
import { FlexItem, Row, RowWithMargins } from '../layout';
import BalanceText from './BalanceText';
import BottomRowText from './BottomRowText';
import CoinName from './CoinName';
import CoinRow from './CoinRow';
import TransactionStatusBadge from './TransactionStatusBadge';
import TransactionActions from '@rainbow-me/helpers/transactionActions';
import TransactionStatusTypes from '@rainbow-me/helpers/transactionStatusTypes';
import TransactionTypes from '@rainbow-me/helpers/transactionTypes';
import {
  getHumanReadableDate,
  hasAddableContact,
} from '@rainbow-me/helpers/transactions';
import {
  isENSAddressFormat,
  isUnstoppableAddressFormat,
} from '@rainbow-me/helpers/validators';
import { useAccountSettings } from '@rainbow-me/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';
import {
  abbreviations,
  ethereumUtils,
  showActionSheetWithOptions,
} from '@rainbow-me/utils';

const containerStyles = css`
  padding-left: 24;
  padding-right: 24;
`;

const BottomRow = ({ description, native, status, type }) => {
  const { colors } = useTheme();
  const isFailed = status === TransactionStatusTypes.failed;
  const isReceived =
    status === TransactionStatusTypes.received ||
    status === TransactionStatusTypes.purchased;
  const isSent = status === TransactionStatusTypes.sent;

  const isOutgoingSwap = status === TransactionStatusTypes.swapped;

  let prefix = null;
  if (isSent || isOutgoingSwap) prefix = '-';
  if (isReceived) prefix = '+';

  const nativeDisplay = get(native, 'display');
  const balanceText = nativeDisplay
    ? compact([prefix, nativeDisplay]).join(' ')
    : '';

  return (
    <Row align="center" justify="space-between">
      <FlexItem flex={1}>
        <CoinName color={colors.dark} style={{ top: 0 }}>
          {description}
        </CoinName>
      </FlexItem>
      <BalanceText color={colors.dark} weight={isReceived ? 'medium' : null}>
        {balanceText}
      </BalanceText>
    </Row>
  );
};

const TopRow = ({ balance, pending, status, title, type }) => {
  const { colors } = useTheme();

  return (
    <RowWithMargins align="center" justify="space-between" margin={19}>
      <TransactionStatusBadge
        pending={pending}
        status={status}
        title={title}
        type={type}
      />
      <Row align="center" flex={1} justify="end">
        <BottomRowText align="right" color={colors.blueGrey}>
          {get(balance, 'display', '')}
        </BottomRowText>
      </Row>
    </RowWithMargins>
  );
};

export default function TransactionCoinRow({ item, isFirst, index, ...props }) {
  const { contact } = item;
  const { accountAddress } = useAccountSettings();
  const { navigate } = useNavigation();

  const onPressTransaction = useCallback(async () => {
    const { hash, from, minedAt, pending, to, status, type } = item;

    const date = getHumanReadableDate(minedAt);
    const isSent =
      status === TransactionStatusTypes.sending ||
      status === TransactionStatusTypes.sent;
    const showContactInfo = hasAddableContact(status, type);

    const isOutgoing = toLower(from) === toLower(accountAddress);
    const canBeResubmitted = isOutgoing && !minedAt;
    const canBeCancelled =
      canBeResubmitted && status !== TransactionStatusTypes.cancelling;

    const headerInfo = {
      address: '',
      divider: isSent ? 'to' : 'from',
      type: status.charAt(0).toUpperCase() + status.slice(1),
    };

    const contactAddress = isSent ? to : from;
    let contactColor = 0;

    if (contact) {
      headerInfo.address = contact.nickname;
      contactColor = contact.color;
    } else {
      headerInfo.address =
        isENSAddressFormat(contactAddress) ||
        isUnstoppableAddressFormat(contactAddress)
          ? contactAddress
          : abbreviations.address(contactAddress, 4, 10);
      contactColor = getRandomColor();
    }

    if (hash) {
      let buttons = [
        ...(canBeResubmitted ? [TransactionActions.speedUp] : []),
        ...(canBeCancelled ? [TransactionActions.cancel] : []),
        TransactionActions.viewOnEtherscan,
        ...(ios ? [TransactionActions.close] : []),
      ];
      if (showContactInfo) {
        buttons.unshift(
          contact
            ? TransactionActions.viewContact
            : TransactionActions.addToContacts
        );
      }

      showActionSheetWithOptions(
        {
          cancelButtonIndex: buttons.length - 1,
          options: buttons,
          title: pending
            ? `${headerInfo.type}${
                showContactInfo
                  ? ' ' + headerInfo.divider + ' ' + headerInfo.address
                  : ''
              }`
            : showContactInfo
            ? `${headerInfo.type} ${date} ${headerInfo.divider} ${headerInfo.address}`
            : `${headerInfo.type} ${date}`,
        },
        buttonIndex => {
          const action = buttons[buttonIndex];
          switch (action) {
            case TransactionActions.viewContact:
            case TransactionActions.addToContacts:
              navigate(Routes.MODAL_SCREEN, {
                address: contactAddress,
                asset: item,
                color: contactColor,
                contact,
                type: 'contact_profile',
              });
              break;
            case TransactionActions.speedUp:
              navigate(Routes.SPEED_UP_AND_CANCEL_SHEET, {
                tx: item,
                type: 'speed_up',
              });
              break;
            case TransactionActions.cancel:
              navigate(Routes.SPEED_UP_AND_CANCEL_SHEET, {
                tx: item,
                type: 'cancel',
              });
              break;
            case TransactionActions.viewOnEtherscan: {
              ethereumUtils.openTransactionEtherscanURL(hash);
              break;
            }
            default:
          }
        }
      );
    }
  }, [accountAddress, contact, item, navigate]);

  const isIncomingSwap =
    item.status === TransactionStatusTypes.received &&
    item.type === TransactionTypes.trade;
  const isOutgoingSwap = item?.status === TransactionStatusTypes.swapped;

  const first = ios ? isFirst : index === 0;

  return (
    <ButtonPressAnimation onPress={onPressTransaction} scaleTo={0.96}>
      <CoinRow
        {...item}
        {...props}
        bottomRowRender={BottomRow}
        containerStyles={containerStyles}
        spacingBottom={isOutgoingSwap}
        spacingTop={!first && isIncomingSwap}
        {...(android
          ? {
              contentStyles: {
                height: CoinIconSize + 14,
              },
            }
          : {})}
        topRowRender={TopRow}
      />
    </ButtonPressAnimation>
  );
}
