import styled from 'styled-components';
import Text from './Text';

const H1 = styled(Text).attrs(
  ({ letterSpacing = 1, weight = 'bold', color, theme: { colors } }) => ({
    color: color || colors.dark,
    letterSpacing,
    size: 32,
    weight,
  })
)``;

export default H1;
