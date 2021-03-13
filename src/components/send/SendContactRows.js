import React, { useCallback, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import ContactOnly from '../contacts/ContactOnly';

const SendContactRows = (
  { address, color, nickname, onPress, onTouch, onSelectEdit },
  Ref
) => {
  const swipeableRef = useRef();

  const handleLongPress = useCallback(() => {
    onSelectEdit({ address, color, nickname });
  }, [address, onPress, color, nickname]);

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
