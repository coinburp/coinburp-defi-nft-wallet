import React from 'react';
import { Text } from '../text';
import styled from 'styled-components';
import { ColumnWithMargins, Row, Column } from '../layout';
import { UniqueTokenCard } from '../unique-token';
import {ButtonPressAnimation} from "../animations";
import {Icon} from "../icons";

const SendFormUniqueTokenCard = styled(UniqueTokenCard).attrs(
  ({ theme: { colors } }) => ({
    borderEnabled: false,
    enableHapticFeedback: false,
    height: 43,
    resizeMode: 'contain',
    scaleTo: 1,
    width: 58,
  })
)`
  opacity: 1;
`;

const ArrowSmall = styled(Icon).attrs({
  name: 'arrowSmall',
})`
  margin-top: 15;
  margin-left: 12;
`;

const Container = styled(ColumnWithMargins).attrs({ margin: 5 })`
  padding-top: 6;
  width: 100%;
  z-index: 1;
`;

const NativeFieldRow = styled(Row).attrs({
  align: 'center',
  justify: 'space-between',
})`
  height: 100px;
`;

export default function SendNftField({ item, colors, onPressSelectInputCurrency, ...props }) {
  const { name, asset_contract, id } = item;

  return (
    <Container>
      <NativeFieldRow>
        <Column>
          <Text size={16} weight="heavy">
            {name}
          </Text>
          <Text style={{ marginTop: android ? 0 : 6 }} color={colors.skyBlue} size={14} weight="heavy">
            {`${asset_contract.name} #${
              id?.length > 6 ? id.toString().substring(0, 6) + '...' : id
            }`}
          </Text>
        </Column>
        <Row>
          <ButtonPressAnimation
            contentContainerStyle={{}}
            onPress={onPressSelectInputCurrency}
          >
            <SendFormUniqueTokenCard {...props} item={item} />
          </ButtonPressAnimation>
          <ButtonPressAnimation
            contentContainerStyle={{}}
            onPress={onPressSelectInputCurrency}
          >
            <ArrowSmall />
          </ButtonPressAnimation>
        </Row>
      </NativeFieldRow>
    </Container>
  );
}
