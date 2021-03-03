import styled from 'styled-components';
import { TruncatedText } from '../text';

const CoinName = styled(TruncatedText).attrs(
  ({ color, theme: { colors } }) => ({
    color: color || colors.dark,
    letterSpacing: 1,
    size: 20,
    weight: 'bold',
  })
)`
  padding-right: ${({ paddingRight = 19 }) => paddingRight};
  top: -4px;
`;

export default CoinName;
