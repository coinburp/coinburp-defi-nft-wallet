import React, { createElement } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { safeAreaInsetValues } from '../../utils';
import { FlexItem, RowWithMargins } from '../layout';
import ExchangeFab from './ExchangeFab';
import SendFab from './SendFab';
import { position } from '@rainbow-me/styles';

export const FabWrapperBottomPosition = 12 + safeAreaInsetValues.bottom;
export const FabWrapperTopPadding = 48;

const FabWrapperRow = styled(RowWithMargins).attrs({ margin: 0 })`
  bottom: ${({ isEditMode }) => (isEditMode ? -240 : 0)};
  justify-content: space-evenly;
  padding-bottom: ${FabWrapperBottomPosition};
  padding-top: ${FabWrapperTopPadding};
  position: absolute;
  right: 0;
  width: 100%;
  z-index: 2;
`;

export default function FabWrapper({
  children,
  disabled,
  fabs = [ExchangeFab, SendFab],
  isCoinListEdited,
  isReadOnlyWallet,
  ...props
}) {
  const { colors } = useTheme();

  return (
    <FlexItem>
      {children}
      {!disabled && (
        <FabWrapperRow isEditMode={isCoinListEdited}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', colors.background]}
            end={{ x: 0.5, y: ios ? 0.2 : 0.3 }}
            start={{ x: 0.5, y: 0 }}
            style={position.coverAsObject}
          />
          {fabs.map((fab, id) =>
            createElement(fab, {
              isReadOnlyWallet,
              key: `fab-${id}`,
              ...props,
            })
          )}
        </FabWrapperRow>
      )}
    </FlexItem>
  );
}
