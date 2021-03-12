import { useRoute } from '@react-navigation/native';
import { filter } from 'lodash';
import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useAccountAssets, useDimensions } from '../../hooks';
import { useNavigation } from '../../navigation/Navigation';
import { magicMemo } from '../../utils';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import { Centered, Row } from '../layout';
import { SendAssetList } from '../send';
import { SheetTitle } from '../sheet';
import { ProfileModal } from './profile';
import { padding } from '@rainbow-me/styles';

const ArrowSmall = styled(Icon).attrs({
  direction: 'left',
  height: '34px',
  name: 'caretThick',
  width: '24px',
})``;

const Spacer = styled.View`
  height: 24px;
`;

const CurrencySelectState = () => {
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
  const [savingsFilter, setFilterSavings] = useState(savings);
  const [uniquesFilter, setFilterUniques] = useState(sendableUniqueTokens);

  const handleUpdateState = async value => {
    clearTimeout(delayTimer);
    delayTimer = await setTimeout(() => {
      let data;
      let savingsData;
      let uniquesData;
      if (!value) {
        setFilterAssets(allAssets);
        data = allAssets;
        setFilterSavings(savings);
        savingsData = savings;
        setFilterUniques(sendableUniqueTokens);
        uniquesData = sendableUniqueTokens;
      } else {
        data = filter(allAssets, ob => {
          if (ob.assets) {
            ob.assets.map(asset => {
              if (!asset.name) {
                return false;
              }

              const s =
                asset.name
                  .toString()
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) !== -1;
              if (!s) {
                ob.assets.pop();
              }
            });

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
        savingsData = filter(savings, ob => {
          if (ob.name) {
            return (
              ob.name.toString().toLowerCase().indexOf(value.toLowerCase()) !==
              -1
            );
          }

          return false;
        });

        uniquesData = sendableUniqueTokens
          .map(family => {
            const filteredFamilyData = filter(family.data, ob => {
              if (ob.name) {
                return (
                  ob.name
                    .toString()
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) !== -1
                );
              }

              return false;
            });

            if (filteredFamilyData.length) return family;
          })
          .filter(i => i);
      }

      setFilterAssets([]);
      setFilterSavings([]);
      setFilterUniques([]);
      setFilterAssets(data || []);
      setFilterSavings(savingsData || []);
      setFilterUniques(uniquesData || []);
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
          handleUpdateStateSearch={handleUpdateState}
          hiddenCoins={hiddenCoins}
          nativeCurrency={nativeCurrency}
          network={network}
          onSelectAsset={sendUpdateSelected}
          pinnedCoins={pinnedCoins}
          savings={savingsFilter}
          selected={selected}
          uniqueTokens={uniquesFilter}
          width={width}
        />
      </Centered>
    </ProfileModal>
  );
};

export default magicMemo(CurrencySelectState, ['address', 'color', 'contact']);
