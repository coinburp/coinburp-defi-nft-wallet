import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { Icon } from '../icons';
import { RowWithMargins } from '../layout';
import { Text } from '../text';

const ArrowIcon = styled(Icon).attrs({
  height: '28px',
  name: 'arrowSmall',
  direction: 'up',
  width: '20px',
  color: colors.black
})`margin-left: 5px`;

const ListItemArrowGroup = ({ children }) => {
  const { colors } = useTheme();
  return (
    <RowWithMargins align="center" flex={1} justify="end" margin={7}>
      {typeof children === 'string' ? (
        <Text color={colors.skyBlue} size="large" weight="bold">
          {children}
        </Text>
      ) : (
        children
      )}
      <ArrowIcon />
    </RowWithMargins>
  );
};

ListItemArrowGroup.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ListItemArrowGroup);
