import React, { useEffect, useRef } from 'react';
import { Transition, Transitioning } from 'react-native-reanimated';
import { View } from 'react-primitives';
import styled from 'styled-components';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import { Text } from '../text';
import MiniButton from './MiniButton';
import { neverRerender } from '@rainbow-me/utils';

const duration = 200;
const transition = (
  <Transition.Sequence>
    <Transition.Together>
      <Transition.Out
        durationMs={duration * 0.666}
        interpolation="easeIn"
        type="fade"
      />
      <Transition.Out
        durationMs={duration * 0.42}
        interpolation="easeIn"
        type="slide-right"
      />
    </Transition.Together>
    <Transition.Change durationMs={duration} interpolation="easeInOut" />
    <Transition.Together>
      <Transition.In
        durationMs={duration}
        interpolation="easeOut"
        type="fade"
      />
      <Transition.In
        durationMs={duration * 0.5}
        interpolation="easeOut"
        type="slide-right"
      />
    </Transition.Together>
  </Transition.Sequence>
);

const PlusIcon = styled(Icon).attrs({
  name: 'plusCircled',
  size: '32px',
})``;

const AddButton = neverRerender(({ onPress }) => {
  return (
    <ButtonPressAnimation onPress={onPress} testID="add-contact-button">
      <PlusIcon onPress={onPress} />
    </ButtonPressAnimation>
  );
});

const EditButton = neverRerender(({ onPress }) => (
  <MiniButton
    onPress={onPress}
    shadowsDisabled
    testID="edit-contact-button"
    {...(android && { height: 30, overflowMargin: 15, width: 60 })}
  >
    <Text color="whiteLabel" size={16} weight="heavy">
      Edit
    </Text>
  </MiniButton>
));

const AddContactButton = ({ edit, onPress }) => {
  const addButtonRef = useRef();
  const editButtonRef = useRef();

  useEffect(() => {
    addButtonRef.current?.animateNextTransition();
    editButtonRef.current?.animateNextTransition();
  }, [edit]);

  return (
    <View>
      <Transitioning.View ref={addButtonRef} transition={transition}>
        {edit ? (
          <Transitioning.View ref={editButtonRef} transition={transition}>
            <EditButton onPress={onPress} />
          </Transitioning.View>
        ) : (
          <Transitioning.View ref={addButtonRef} transition={transition}>
            <AddButton onPress={onPress} />
          </Transitioning.View>
        )}
      </Transitioning.View>
    </View>
  );
};

export default React.memo(AddContactButton);
