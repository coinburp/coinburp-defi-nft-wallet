import { values } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { FloatingEmojisTapper } from '../floating-emojis';
import { AssetPanel, FloatingPanels } from '../floating-panels';
import { Centered, Column, Row } from '../layout';
import { Emoji, Text } from '../text';
import isNativeStackAvailable from '@rainbow-me/helpers/isNativeStackAvailable';
import { useDimensions } from '@rainbow-me/hooks';
import { supportedCountries } from '@rainbow-me/references/wyre';
import { padding } from '@rainbow-me/styles';
import { neverRerender } from '@rainbow-me/utils';

const Panel = styled(Column)`
  margin-bottom: ${({ deviceDimensions: { isTallPhone } }) =>
    (isTallPhone ? 90 : 45) + (isNativeStackAvailable ? 10 : 0)};
  max-width: ${({ deviceDimensions: { width } }) => width - 32};
`;

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
  margin-bottom: 32px;
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

  const countriesList = countries.map(country => (
    <Row paddingVertical={1}>
      <Emoji name={country.emojiName} size={14} />
      <CountryText>{country.name}</CountryText>
    </Row>
  ));

  return (
    <Panel deviceDimensions={deviceDimensions}>
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
        <AssetPanel>
          <Column css={padding(19, 30, 24)}>
            <TitleText>Supported Countries</TitleText>
            {countriesList}
            <FooterText>More coming soon...</FooterText>
          </Column>
        </AssetPanel>
      </FloatingEmojisTapper>
    </Panel>
  );
};

export default neverRerender(SupportCountriesExpandedState);
