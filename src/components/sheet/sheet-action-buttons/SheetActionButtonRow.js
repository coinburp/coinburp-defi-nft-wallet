import React, { Children } from 'react';
import styled from 'styled-components';
import { Column, Row } from '../../layout';
import { padding } from '@rainbow-me/styles';

const Container = styled(Row).attrs({
  justify: 'center',
})`
  ${({ ignorePaddingBottom, ignorePaddingTop, paddingBottom }) =>
    padding(
      ignorePaddingTop ? 0 : 32,
      0,
      ignorePaddingBottom ? 0 : paddingBottom || 24
    )};
  width: 100%
  z-index: 2;
`;

const Item = styled(Column)`
  padding-left: 16px;
  padding-right: 16px;
`;

function renderButton(child) {
  return <Item>{child}</Item>;
}

export default function SheetActionButtonRow({
  children,
  ignorePaddingBottom,
  ignorePaddingTop,
  paddingBottom,
}) {
  return (
    <Container
      ignorePaddingBottom={ignorePaddingBottom}
      ignorePaddingTop={ignorePaddingTop}
      paddingBottom={paddingBottom}
    >
      {Children.map(children, renderButton)}
    </Container>
  );
}
