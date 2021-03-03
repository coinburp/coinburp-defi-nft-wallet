import React from 'react';
import styled from 'styled-components';
import { Icon } from '../icons';

const HeartEmoji = styled(Icon).attrs({
  align: 'center',
  name: 'heart',
  size: 'medium',
})`
  height: 20px;
  margin-right: 4.5px;
  text-align-vertical: center;
  top: -3px;
`;

const TokenFamilyHeaderIcon = ({ familyName }) => {
  return familyName === 'Showcase' ? <HeartEmoji /> : null;
};

export default React.memo(TokenFamilyHeaderIcon);
