import PropTypes from 'prop-types';
import React from 'react';
import { Path, Rect } from 'react-native-svg';
import Svg from '../Svg';

const PlusCircledIcon = ({ color, colors, ...props }) => (
  <Svg height="32" viewBox="0 0 32 32" width="32" {...props}>
    <Rect fill={color || colors.grey} height="32" rx="16" width="32" />
    <Path
      d="M16 8c1.105 0 2 .895 2 2l-.001 3.999L22 14c1.105 0 2 .895 2 2s-.895 2-2 2l-4.001-.001L18 22c0 1.105-.895 2-2 2s-2-.895-2-2l-.001-4H10c-1.105 0-2-.895-2-2s.895-2 2-2l3.999-.001L14 10c0-1.105.895-2 2-2z"
      fill={colors.white}
      fillRule="nonzero"
    />
  </Svg>
);

PlusCircledIcon.propTypes = {
  color: PropTypes.string,
};

export default React.memo(PlusCircledIcon);
