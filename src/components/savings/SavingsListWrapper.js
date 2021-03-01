import { map } from 'lodash';
import React from 'react';
import SavingsListRow from './SavingsListRow';

const renderSavingsListRow = item =>
  item?.underlying ? (
    <SavingsListRow key={item?.underlying.symbol} {...item} />
  ) : null;

export default function SavingsListWrapper({ assets }) {
  return map(assets, renderSavingsListRow);
}
