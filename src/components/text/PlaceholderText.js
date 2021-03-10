import React, { useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import Text from './Text';

const Placeholder = styled(Text).attrs(({ theme: { colors } }) => ({
  align: 'center',
  color: colors.skyBlue,
  size: '32px',
  weight: 'heavy',
}))`
  margin-bottom: ${android ? -58 : -37};
  width: 100%;
`;

const PlaceholderText = (props, ref) => {
  const [value, updateValue] = useState(' ');
  useImperativeHandle(ref, () => ({ updateValue }));
  return <Placeholder ref={ref}>{value}</Placeholder>;
};

export default React.forwardRef(PlaceholderText);
