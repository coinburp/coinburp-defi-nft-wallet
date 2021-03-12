import styled from 'styled-components';
import { TruncatedText } from '../text';

const TokenInfoValue = styled(TruncatedText).attrs(
  ({ color, theme: { colors }, weight = 'bold' }) => ({
    color: color || colors.dark,
    letterSpacing: 'roundedTight',
    size: 'larger',
    weight,
  })
)``;

export default TokenInfoValue;
