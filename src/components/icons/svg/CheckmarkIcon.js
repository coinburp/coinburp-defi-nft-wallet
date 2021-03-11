import PropTypes from 'prop-types';
import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const CheckmarkIcon = ({ color, colors, ...props }) => (
  <Svg height="32" viewBox="0 0 32 32" width="32" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z"
        fill={color || colors.coinburp}
        fillRule="nonzero"
        transform="translate(-319 -520) translate(0 424) translate(24 88) translate(295 8)"
      />
      <Path
        d="M23.414 13.914c.781-.78.781-2.047 0-2.828-.78-.781-2.047-.781-2.828 0L14 17.672l-2.586-2.586c-.78-.781-2.047-.781-2.828 0-.781.78-.781 2.047 0 2.828l4 4c.78.781 2.047.781 2.828 0l8-8z"
        fill="#FFF"
        transform="translate(-319 -520) translate(0 424) translate(24 88) translate(295 8)"
      />
    </G>
  </Svg>
);

CheckmarkIcon.propTypes = {
  color: PropTypes.string,
};

export default CheckmarkIcon;
