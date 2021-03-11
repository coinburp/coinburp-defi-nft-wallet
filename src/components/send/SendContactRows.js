import React, { useCallback, useImperativeHandle, useRef } from 'react';
import ContactOnly from '../contacts/ContactOnly';
import { View } from 'react-native';

const SendContactRows = (
  { address, color, nickname, onPress, onTouch },
  Ref
) => {
  const swipeableRef = useRef();

  const handleLongPress = useCallback(
    () => swipeableRef.current?.click?.(),
    []
  );

  useImperativeHandle(Ref, () => ({
    close: swipeableRef.current?.close,
  }));

  const handlePress = useCallback(() => onPress(address), [address, onPress]);

  const handlePressStart = useCallback(() => onTouch(address), [
    address,
    onTouch,
  ]);

  return (
    <View ref={Ref}>
      <ContactOnly
        address={address}
        color={color}
        nickname={nickname}
        onLongPress={handleLongPress}
        onPress={handlePress}
        onPressStart={handlePressStart}
      />
    </View>
  );
};

export default React.forwardRef(SendContactRows);
