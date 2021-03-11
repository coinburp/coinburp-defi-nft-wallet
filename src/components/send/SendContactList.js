import { toLower } from 'lodash';
import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import SendContactRows from './SendContactRows';
import { useNavigation } from '@rainbow-me/navigation';
import Routes from '@rainbow-me/routes';
import { filterList } from '@rainbow-me/utils';
import { Row } from '../layout';

export default function SendContactList({
  contacts,
  currentInput,
  onPressContact,
  removeContact,
}) {
  const { navigate } = useNavigation();

  const contactRefs = useRef({});
  const touchedContact = useRef(undefined);

  const filteredContacts = useMemo(
    () => filterList(contacts, currentInput, ['nickname']),
    [contacts, currentInput]
  );

  const handleCloseAllDifferentContacts = useCallback(address => {
    // if (touchedContact.current && contactRefs.current[touchedContact.current]) {
      // contactRefs.current[touchedContact.current].close();
    // }
    touchedContact.current = toLower(address);
  }, []);

  const handleEditContact = useCallback(
    ({ address, color, nickname }) => {
      navigate(Routes.MODAL_SCREEN, {
        additionalPadding: true,
        address,
        color,
        contact: { address, color, nickname },
        type: 'contact_profile',
      });
    },
    [navigate]
  );

  const contactItems = filteredContacts.map(item => {
    return (
      <SendContactRows
        key={item.address}
        onPress={onPressContact}
        onSelectEdit={handleEditContact}
        onTouch={handleCloseAllDifferentContacts}
        ref={component => {
          contactRefs.current[toLower(item.address)] = component;
        }}
        removeContact={removeContact}
        {...item}
      />
    );
  });

  return <View style={{ flexDirection: 'row' }}>{contactItems}</View>;
}
