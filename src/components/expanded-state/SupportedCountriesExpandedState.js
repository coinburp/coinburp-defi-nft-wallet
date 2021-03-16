import { values } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { ButtonPressAnimation } from '../animations';
import { FloatingEmojisTapper } from '../floating-emojis';
import { AssetPanel, FloatingPanels } from '../floating-panels';
import { Icon } from '../icons';
import { Centered, Column, Row } from '../layout';
import { Emoji, Text } from '../text';
import isNativeStackAvailable from '@rainbow-me/helpers/isNativeStackAvailable';
import { useDimensions } from '@rainbow-me/hooks';
import { useNavigation } from '@rainbow-me/navigation';
import { supportedCountries } from '@rainbow-me/references/wyre';
import { padding } from '@rainbow-me/styles';
import { neverRerender } from '@rainbow-me/utils';

const Panel = styled(Column)`
  margin-bottom: ${({ deviceDimensions: { isTallPhone } }) =>
    (isTallPhone ? 90 : 45) + (isNativeStackAvailable ? 10 : 0)};
  max-width: ${({ deviceDimensions: { width } }) => width - 32};
`;

const BackButton = styled(Icon).attrs({
  direction: 'left',
  name: 'caretThick',
  size: 24,
})``;

const FooterText = styled(Text).attrs({
  size: 16,
  weight: 900,
})`
  margin-top: 16px;
  margin-left: 24px;
`;

const CountryText = styled(Text).attrs({
  lineHeight: 19,
  size: 14,
  weight: 'bold',
})``;

const TitleText = styled(Text).attrs({
  align: 'center',
  size: 20,
  weight: 900,
})`
  left: -8;
  margin-bottom: 28px;
`;

const countries = values(supportedCountries).map(c => ({
  emojiName: c.emojiName,
  name:
    c.name === 'United States'
      ? 'United\xa0States (except CT, HI, NC, NH, NY, VA, VT)'
      : c.name.replace(/ /g, '\xa0'),
}));
// const countriesList = `${countries.join(', ')}`;
const emojiArray = values(supportedCountries).map(c => c.emojiName);

const SupportCountriesExpandedState = () => {
  const deviceDimensions = useDimensions();

  const { colors } = useTheme();
  const { goBack } = useNavigation();

  const countriesList = countries.map(country => (
    <Row paddingVertical={1}>
      <Emoji name={country.emojiName} size={14} />
      <CountryText>{country.name}</CountryText>
    </Row>
  ));

  return (
    <Panel deviceDimensions={deviceDimensions}>
      <AssetPanel>
        <Column css={padding(16, 30, 24)}>
          <Row justify="space-between">
            <ButtonPressAnimation onPress={goBack}>
              <BackButton />
            </ButtonPressAnimation>
            <TitleText>Supported Countries</TitleText>
            <Row />
          </Row>
          <FloatingEmojisTapper
            disableRainbow
            distance={600}
            duration={600}
            emojis={emojiArray}
            opacityThreshold={0.75}
            scaleTo={0.5}
            size={40}
            wiggleFactor={0}
          >
            {countriesList}
            <FooterText>More coming soon...</FooterText>
          </FloatingEmojisTapper>
        </Column>
      </AssetPanel>
    </Panel>
  );
};

export default neverRerender(SupportCountriesExpandedState);
