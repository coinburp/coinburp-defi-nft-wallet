import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { ButtonPressAnimation } from '../animations';
import { InnerBorder, Row, RowWithMargins } from '../layout';
import { Text } from '../text';
import { padding } from '@rainbow-me/styles';

const Content = styled(RowWithMargins).attrs({
  align: 'center',
  margin: 5,
})`
  ${padding(3, 6)};
  border-radius: 8px;
  height: 25px;
  z-index: 1;
`;

export default function MiniButton({
  borderRadius = 8,
  children,
  disabled,
  hasLeadingIcon,
  onPress,
  scaleTo = 0.82,
  height,
  ...props
}) {
  const { isDarkMode, colors } = useTheme();

  return (
    <ButtonPressAnimation
      disabled={disabled}
      onPress={onPress}
      opacity={isDarkMode && disabled ? 0.6 : 1}
      radiusAndroid={borderRadius}
      scaleTo={scaleTo}
      {...props}
    >
      <Row
        backgroundColor={disabled ? colors.skyBlue : colors.coinburp}
        height={height}
        style={{ borderRadius, alignItems:'center' }}
      >
        <Content hasLeadingIcon={hasLeadingIcon}>
          {typeof children === 'string' ? (
            <Text align="center" color="whiteLabel" weight="bold">
              {children}
            </Text>
          ) : (
            children
          )}
        </Content>
        <InnerBorder radius={borderRadius} />
      </Row>
    </ButtonPressAnimation>
  );
}
