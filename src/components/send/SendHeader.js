import React, { Fragment } from 'react';
import { useSafeArea } from 'react-native-safe-area-context';
import { Column } from '../layout';
import { SheetHandle, SheetTitle } from '../sheet';
import { useDimensions } from '@rainbow-me/hooks';

export default function SendHeader() {
  const insets = useSafeArea();
  const { isNarrowPhone } = useDimensions();

  return (
    <Fragment>
      <Column
        align="center"
        paddingBottom={isNarrowPhone ? 15 : insets.bottom + 11}
      >
        <Column align="center" paddingVertical={6}>
          <SheetHandle color="white" />
        </Column>
        <Column align="center" paddingVertical={6}>
          <SheetTitle color="white" size={32}>
            Withdraw
          </SheetTitle>
        </Column>
      </Column>
    </Fragment>
  );
}
