import analytics from '@segment/analytics-react-native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Centered } from '../../layout';
import { ModalHeaderHeight } from '../../modal';
import SecretDisplaySection from '../../secret-display/SecretDisplaySection';
import { padding } from '@rainbow-me/styles';

const Content = styled(Centered).attrs({
  direction: 'column',
})`
  ${padding(0, 19, 42)};
  flex: 1;
`;

export default function ShowSecretView() {
  useEffect(() => {
    analytics.track('Show Secret View', {
      category: 'settings backup',
    });
  }, []);

  return (
    <Centered flex={1} paddingBottom={ModalHeaderHeight}>
      <Content>
        <SecretDisplaySection />
      </Content>
    </Centered>
  );
}
