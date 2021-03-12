import { useRoute } from '@react-navigation/native';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import styled from 'styled-components';
import { Modal } from '../../components/modal';
import { useTheme } from '../../context/ThemeContext';
import { AssetPanel, FloatingPanels } from '../../floating-panels';
import {
  useAccountAssets,
  useAccountSettings,
  useContacts,
  useDimensions,
} from '../../hooks';
import { useNavigation } from '../../navigation/Navigation';
import { abbreviations, magicMemo } from '../../utils';
import TouchableBackdrop from '../TouchableBackdrop';
import { ButtonPressAnimation, interpolate } from '../animations';
import { Button } from '../buttons';
import { showDeleteContactActionSheet } from '../contacts';
import CopyTooltip from '../copy-tooltip';
import { ExchangeSearch } from '../exchange';
import { GasSpeedButton } from '../gas';
import { Icon } from '../icons';
import {
  Centered,
  Column,
  ColumnWithMargins,
  KeyboardFixedOpenLayout,
  Row,
} from '../layout';
import { SendAssetList } from '../send';
import { SheetTitle } from '../sheet';
import { Text, TruncatedAddress } from '../text';
import { ProfileModal } from './profile';
import { margin, padding, position } from '@rainbow-me/styles';
import {filter} from "lodash";

const Wrapper = ios ? KeyboardFixedOpenLayout : Fragment;

const TabTransitionAnimation = styled(Animated.View)`
  ${position.size('100%')};
`;

const ArrowSmall = styled(Icon).attrs({
  height: '34px',
  name: 'caretThick',
  direction: 'left',
  width: '24px',
})``;

const Spacer = styled.View`
  height: 24;
`;

const CurrencySelectState = params => {
  const { goBack } = useNavigation();
  const { colors } = useTheme();
  let delayTimer;
  const {
    params: {
      fetchData,
      hiddenCoins,
      nativeCurrency,
      network,
      selected,
      sendUpdateSelected,
      pinnedCoins,
      savings,
      sendableUniqueTokens,
    },
  } = useRoute();
  const { allAssets } = useAccountAssets();
  const { width, height: deviceHeight } = useDimensions();
  const [assetsFilter, setFilterAssets] = useState(allAssets);

  const handleUpdateState = async value => {
    clearTimeout(delayTimer);
    delayTimer = await setTimeout(() => {
      let data;
      if (!value) {
        setFilterAssets(allAssets);
        data = allAssets;
      } else {
        data = filter(allAssets, ob => {
          if (ob.assets) {
            ob.assets.map((asset, index) => {
              if(!asset.name) {
                return false;
              }

              const s = asset.name.toString().toLowerCase().indexOf(value.toLowerCase()) !==
              -1;
              if(!s) {
                ob.assets.pop();
              }
            })

            return ob.assets;
          }

          if (ob.isCoin || ob.name) {
            return (
              ob.name.toString().toLowerCase().indexOf(value.toLowerCase()) !==
              -1
            );
          }

          return false;
        });
      }

      setFilterAssets( []);
      setFilterAssets(data || []);
    }, 100);
  };

  return (
    <ProfileModal
      containerPadding={0}
      height="100%"
      overflow="hidden"
      radius={30}
    >
      <Centered css={padding(16, 24, 25, 25)} direction="column">
        <Row align="center" justify="space-between" width="100%">
          <ButtonPressAnimation
            onPress={() => {
              goBack();
              android && Keyboard.dismiss();
            }}
          >
            <ArrowSmall />
          </ButtonPressAnimation>

          <SheetTitle
            color="black"
            css={{ left: -12 }}
            size={20}
            weight="heavy"
          >
            Withdraw
          </SheetTitle>
          <View />
        </Row>
        <Spacer />
        <SendAssetList
          allAssets={assetsFilter}
          colors={colors}
          deviceHeight={deviceHeight}
          fetchData={fetchData}
          hiddenCoins={hiddenCoins}
          nativeCurrency={nativeCurrency}
          network={network}
          onSelectAsset={sendUpdateSelected}
          pinnedCoins={pinnedCoins}
          savings={savings}
          selected={selected}
          uniqueTokens={sendableUniqueTokens}
          handleUpdateStateSearch={handleUpdateState}
          width={width}
        />
      </Centered>
    </ProfileModal>
  );
};

export default magicMemo(CurrencySelectState, ['address', 'color', 'contact']);
