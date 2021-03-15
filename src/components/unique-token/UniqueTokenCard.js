import React, { useCallback } from 'react';
import styled from 'styled-components';
import { magicMemo } from '../../utils';
import { ButtonPressAnimation } from '../animations';
import { InnerBorder } from '../layout';
import UniqueTokenImage from './UniqueTokenImage';

const UniqueTokenCardBorderRadius = 0;

const Container = styled.View``;

const Content = styled.View`
  border-radius: ${UniqueTokenCardBorderRadius};
  height: ${({ height }) => height};
  overflow: hidden;
  width: ${({ width }) => width};
`;

const UniqueTokenCard = ({
  borderEnabled = true,
  disabled,
  enableHapticFeedback = true,
  height,
  isShowcase,
  item: { background, image_preview_url, ...item },
  onPress,
  resizeMode,
  scaleTo = 0.96,
  style,
  width,
  ...props
}) => {
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(item);
    }
  }, [item, onPress]);

  const { colors } = useTheme();

  return (
    <Container
      as={ButtonPressAnimation}
      disabled={disabled}
      enableHapticFeedback={enableHapticFeedback}
      onPress={handlePress}
      scaleTo={scaleTo}
    >
      <Content {...props} height={height} style={style} width={width}>
        <UniqueTokenImage
          backgroundColor={background || colors.white}
          imageUrl={image_preview_url}
          item={item}
          resizeMode={resizeMode}
        />
        {borderEnabled && (
          <InnerBorder
            opacity={0.04}
            radius={UniqueTokenCardBorderRadius}
            width={0.5}
          />
        )}
        {isShowcase && (
          <InnerBorder
            color={colors.red}
            ignoreDarkMode
            opacity={1}
            radius={UniqueTokenCardBorderRadius}
            width={4}
          />
        )}
      </Content>
    </Container>
  );
};

export default magicMemo(UniqueTokenCard, [
  'height',
  'item.uniqueId',
  'style',
  'width',
]);
