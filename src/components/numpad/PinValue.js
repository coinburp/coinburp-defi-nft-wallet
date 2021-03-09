import React from 'react';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { Column, Flex } from '../../components/layout';

const FilledValue = styled(Column)`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  margin-left: 16px;
  margin-right: 16px;
`;

const EmptyValue = styled(Column)`
  border-width: 3px;
  width: 28px;
  height: 28px;
  border-color: ${({ theme: { colors } }) => colors.white};
  border-radius: 28px;
  margin-left: 16px;
  margin-right: 16px;
`;

const PinValue = ({ translateX, value, ...props }) => {
  const { colors } = useTheme();
  return (
    <Flex {...props}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX }],
        }}
      >
        {value && value.length ? (
          <FilledValue backgroundColor={colors.white} />
        ) : (
          <EmptyValue />
        )}
        {value && value.length > 1 ? (
          <FilledValue backgroundColor={colors.white} />
        ) : (
          <EmptyValue />
        )}
        {value && value.length > 2 ? (
          <FilledValue backgroundColor={colors.white} />
        ) : (
          <EmptyValue />
        )}
        {value && value.length > 3 ? (
          <FilledValue backgroundColor={colors.white} />
        ) : (
          <EmptyValue />
        )}
      </Animated.View>
    </Flex>
  );
};

export default React.memo(PinValue);
