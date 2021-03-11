import React from 'react';
import { View } from 'react-primitives';
import styled from 'styled-components';
import { ButtonPressAnimation } from '../animations';
import { TokenSelectionButton } from '../buttons';
import { Icon } from '../icons';
import { Column, ColumnWithMargins, Row } from '../layout';
import { Text } from '../text';

const footerMargin = 31;
const FooterContainer = styled(ColumnWithMargins).attrs(({ deviceHeight }) => ({
  justify: 'center',
  alignltemes: 'stretch',
  alignSelf: 'stretch',
  margin: deviceHeight > 812 ? footerMargin : footerMargin / 2,
}))`
  z-index: 3;
`;

const ArrowSmall = styled(Icon).attrs({
  name: 'arrowSmall',
})`
  margin-top: 12;
  margin-left: 12;
`;

export default class SendSetAssetList extends React.Component {
  render() {
    const {
      width,
      txSpeedRenderer,
      deviceHeight,
      colors,
      selected,
      navigateToSelectOutputCurrency,
    } = this.props;

    return (
      <Column align="center">
        <Column
          backgroundColor="white"
          borderRadius={24}
          justify="center"
          marginBottom={34}
          marginTop={16}
          paddingLeft={0}
          paddingRight={24}
          width={width - 32}
        >
          <Row align="center" height={51} paddingLeft={24}>
            <Text color={colors.black} size={16} weight="bold">
              ASSET
            </Text>
          </Row>
          <ButtonPressAnimation
            contentContainerStyle={{}}
            onPress={navigateToSelectOutputCurrency}
          >
            <Row align="center" height={74} paddingLeft={5}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  <TokenSelectionButton
                    address={selected?.address}
                    customPadding={0}
                    hideIcon
                    onPress={navigateToSelectOutputCurrency}
                    symbol={selected?.symbol}
                    testID="send-selection-button"
                  />
                </View>
                <View>
                  <ArrowSmall />
                </View>
              </View>
            </Row>
          </ButtonPressAnimation>
        </Column>
        <FooterContainer deviceHeight={deviceHeight}>
          {txSpeedRenderer}
        </FooterContainer>
      </Column>
    );
  }
}
