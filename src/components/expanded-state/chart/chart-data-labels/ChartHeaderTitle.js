import styled from 'styled-components';
import { TruncatedText } from '../../../text';

const ChartHeaderTitle = styled(TruncatedText).attrs({
  letterSpacing: 'roundedTight',
  size: 'big',
  weight: 'bold',
})`
  margin-left: 12;
`;

export default ChartHeaderTitle;
