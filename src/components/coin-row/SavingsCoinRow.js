import React, { Fragment } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { calculateAPY } from '../../helpers/savings';
import { convertAmountToBalanceDisplay } from '../../helpers/utilities';
import { ButtonPressAnimation } from '../animations';
import { Column, FlexItem, Row, RowWithMargins } from '../layout';
import { APYPill } from '../savings';
import { Text } from '../text';
import BalanceText from './BalanceText';
import CoinName from './CoinName';
import CoinRow from './CoinRow';

export const SavingsCoinRowHeight = 64;

const BottomRow = ({ lifetimeSupplyInterestAccrued, supplyRate, symbol }) => {
  const apy = calculateAPY(supplyRate);
  const apyTruncated = parseFloat(apy).toFixed(2);
  const { colors } = useTheme();

  return (
    <Row>
      <APYPill small value={apyTruncated} />
      <RowWithMargins flex={1} margin={4}>
        <Column flex={1}>
          <Text
            align="right"
            color={colors.green}
            flex={1}
            size={14}
            weight="bold"
          >
            {'+$'}
            {convertAmountToBalanceDisplay(lifetimeSupplyInterestAccrued, 1)}
          </Text>
        </Column>
      </RowWithMargins>
    </Row>
  );
};

const TopRow = ({ name, supplyBalanceUnderlying, symbol }) => (
  <Row
    align="center"
    justify="space-between"
    marginBottom={-6}
    width="100%"
  >
    <CoinName letterSpacing={1} style={{ top: 0 }} weight="bold">
      {name}
    </CoinName>
    <BalanceText>
      {convertAmountToBalanceDisplay(supplyBalanceUnderlying, { symbol })}
    </BalanceText>
  </Row>
);

const SavingsCoinRow = ({ item, onPress, ...props }) => (
  <ButtonPressAnimation disabled onPress={onPress} scaleTo={1.02}>
    <CoinRow
      {...item}
      {...props}
      bottomRowRender={BottomRow}
      {...(android && { contentStyles: { height: 50 } })}
      onPress={onPress}
      topRowRender={TopRow}
    />
  </ButtonPressAnimation>
);

export default SavingsCoinRow;
