import React from 'react';
import { View } from 'react-native';
import { useIsEmulator } from 'react-native-device-info';
import styled from 'styled-components';
import { Icon } from '../icons';
import { Centered } from '../layout';
import { Text } from '../text';
import { useDimensions } from '@rainbow-me/hooks';
import { position, fonts } from '@rainbow-me/styles';
import { ImgixImage } from '@rainbow-me/images';
import findACodeToScan from '../../assets/findACodeToScan.png';

const CrossHairAspectRatio = 259 / 375;

const Container = styled(Centered)`
  ${({ size }) => position.size(size)};
  margin-bottom: 1;
  z-index: 1;
`;

const Crosshair = styled(Icon).attrs({
  name: 'guide',
})`
  ${position.cover};
`;

export default function QRCodeScannerCrosshair() {
  const { width: deviceWidth } = useDimensions();
  //const { result: isEmulator } = useIsEmulator();

  const { colors } = useTheme();
  return (
    <Container size={deviceWidth * CrossHairAspectRatio}>
      <Crosshair color={colors.whiteLabel} />
      
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <ImgixImage
          source={findACodeToScan}
          style={{
            width: 200,
            height: 40,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
            fontFamily: fonts.family.SFProRounded,
            fontWeight: '900',
          }}
        />
      </View>
    </Container>
  );
}
