import styled from 'styled-components';
import { Text } from '../text';

const TokenInfoHeading = styled(Text).attrs(({ theme: { colors } }) => ({
  color: colors.skyBlue,
  letterSpacing: 'roundedMedium',
  size: 'lmedium',
  weight: 'bold',
}))``;

export default TokenInfoHeading;
