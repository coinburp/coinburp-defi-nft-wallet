import styled from 'styled-components';
import { TruncatedText } from '../text';

const BottomRowText = styled(TruncatedText).attrs(
  ({ align = 'left', color, theme: { colors } }) => ({
    align,
    color: color ? color : colors.alpha(colors.blueGreyDark, 0.5),
    size: 14,
    weight: 'bold',
  })
)``;
export default BottomRowText;
