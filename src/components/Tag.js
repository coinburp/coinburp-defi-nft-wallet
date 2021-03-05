import { upperCase, upperFirst } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { magicMemo } from '../utils';
import { Centered, Column } from './layout';
import { Text as TextElement } from './text';
import { padding } from '@rainbow-me/styles';

const TagBorderRadius = 12;

const Container = styled(Column)`
  ${padding(8, 10)};
  background-color: ${({ theme: { colors } }) => colors.white};
  border-radius: ${TagBorderRadius};
  text-align: left;
  z-index: 1;
`;

const OuterBorder = styled(Centered)`
  border-color: ${({ theme: { colors } }) =>
          colors.blueGrey};
  border-radius: ${TagBorderRadius};
  border-width: 2px;
  flex: none;
  overflow: hidden;
  z-index: 2;
`;

const Text = styled(TextElement).attrs(({ theme: { colors } }) => ({
  color: colors.blueGrey,
  letterSpacing: 'roundedMedium',
  size: 24,
  weight: 900,
}))`
  line-height: 24;
`;

const Title = styled(TextElement).attrs(({ theme: { colors } }) => ({
  color: colors.blueGrey,
  letterSpacing: 'roundedMedium',
  size: 10,
  weight: 'bold',
}))`
  line-height: 13;
  margin-bottom: 1;
`;

const Tag = ({ text, title, ...props }) => (
  <OuterBorder {...props}>
    <Container>
      <Title>{upperCase(title)}</Title>
      <Text>{upperFirst(text)}</Text>
    </Container>
  </OuterBorder>
);

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default magicMemo(Tag, ['text', 'title']);
