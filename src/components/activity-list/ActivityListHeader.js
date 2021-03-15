import React from 'react';
import styled from 'styled-components';
import { magicMemo } from '../../utils';
import { ListHeader } from '../list';
import { Text } from '../text';

const ActivityListHeaderTitle = styled(Text).attrs({
  lineHeight: 32,
  size: 32,
  weight: 'bold',
})`
  margin-bottom: 24px;
`;

const ActivityListHeader = props => (
  <ListHeader
    {...props}
    isSticky
    showDivider={false}
    titleRenderer={ActivityListHeaderTitle}
  />
);

export default magicMemo(ActivityListHeader, 'title');
