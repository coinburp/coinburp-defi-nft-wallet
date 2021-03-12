import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { RowWithMargins } from '../layout';
import { Text } from '../text';
import { Icon } from '../icons';
import colors from '../../styles/colors';

const ArrowIcon = styled(Icon).attrs({
  height: '34px',
  name: 'arrowSmall',
  direction: 'up',
  width: '24px',
  color: colors.black
})`margin-left: 5px`;

const ListItemArrowGroup = ({ children }) => {
  const { colors } = useTheme();
  return (
    <RowWithMargins align="center" flex={1} justify="end" margin={7}>
      {typeof children === 'string' ? (
        <Text
          color={colors.alpha(colors.skyBlue, 0.6)}
          size="large"
          weight="bold"
        >
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
