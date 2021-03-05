import React from 'react';
import styled from 'styled-components';
import { ColumnWithMargins } from '../layout';
import { Text } from '../text';
import { padding } from '@rainbow-me/styles';

const Container = styled(ColumnWithMargins).attrs({
  margin: 12,
})`
  ${padding(android ? 10 : 19, 19, android ? 12 : 24)};
`;

export default function ExpandedStateSection({ children, title, ...props }) {
  const { colors } = useTheme();
  return (
    <Container {...props}>
      <Text
        color={colors.dark}
        letterSpacing="roundedTight"
        size="larger"
        weight="bold"
      >
        {title}
      </Text>
      {typeof children === 'string' ? (
        <Text color={colors.blueGrey} lineHeight={24} size={16} weight="bold">
          {children}
        </Text>
      ) : (
        children
      )}
    </Container>
  );
}
