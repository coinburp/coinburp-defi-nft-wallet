import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { deviceUtils } from '../../utils';
import { Centered, Column } from '../layout';
import { Text } from '../text';

const verticalOffset = (deviceUtils.dimensions.height - 420) / 3;

const Container = styled(Column)`
  align-self: center;
  margin-top: ${verticalOffset};
  width: 200;
`;

const ActivityListEmptyState = ({ children, label }) => {
  const { colors } = useTheme();

  return (
    <View>
      {children}
      <Container>
        <Centered>
          <Text
            align="center"
            color={colors.blueGrey}
            letterSpacing={1}
            size={20}
            weight="bold"
          >
            {label}
          </Text>
        </Centered>
      </Container>
    </View>
  );
};

ActivityListEmptyState.propTypes = {
  emoji: PropTypes.string,
  label: PropTypes.string,
};

ActivityListEmptyState.defaultProps = {
  emoji: '🏝',
  label: 'No transactions yet',
};

export default ActivityListEmptyState;
