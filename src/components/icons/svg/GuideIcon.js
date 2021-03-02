import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
// import { Path, G, Defs, Use } from 'react-native-svg';
// import Svg from '../Svg';
import { ImgixImage } from '@rainbow-me/images';
import Guides from '../../../assets/guides.png';
import { position } from '@rainbow-me/styles';

const GuideIcon = ({ color, colors, ...props }) => (
    <ImgixImage
      source={Guides}
      style={position.sizeAsObject(300)}
    />
)
GuideIcon.propTypes = {
  color: PropTypes.string,
};

export default GuideIcon;



