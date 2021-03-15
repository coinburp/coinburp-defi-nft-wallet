import React, { useCallback } from 'react';
import styled from 'styled-components';
import Icon from '../icons/Icon';
import { ListItem } from '../list';

const CheckmarkIcon = styled(Icon).attrs(({ theme: { colors } }) => ({
  color: colors.coinburp,
  name: 'checkmarkCircled',
}))`
  margin-bottom: 1px;
  position: absolute;
  right: 0;
`;

const RadioListItem = ({ disabled, selected, ...props }) => {
  const onPress = useCallback(() => {
    if (props.onPress && !props.disabled) {
      props.onPress(props.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, props.onPress, disabled]);
  return (
    <ListItem onPress={onPress} opacity={disabled ? 0.42 : 1} {...props}>
      {selected && <CheckmarkIcon />}
    </ListItem>
  );
};

export default RadioListItem;
