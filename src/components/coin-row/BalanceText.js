import styled from 'styled-components';
import { Text } from '../text';

const BalanceText = styled(Text).attrs(({ color, theme: { colors } }) => ({
  align: 'right',
  color: color || colors.dark,
  size: 20,
  weight: 900,
}))``;

export default BalanceText;
