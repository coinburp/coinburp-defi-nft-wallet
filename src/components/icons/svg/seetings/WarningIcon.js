import PropTypes from 'prop-types';
import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../../Svg';

const WarningIcon = ({ color, colors, ...props }) => {
  return (
    <Svg
      height={22}
      viewBox="0 0 24 22"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.356 2.038c1.16-2.05 4.128-2.05 5.288 0l8.462 14.966c1.137 2.01-.324 4.496-2.643 4.496H3.537c-2.32 0-3.78-2.485-2.643-4.496L9.356 2.038zM13.5 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 5.5c-.828 0-1.5.761-1.5 1.7v5.1c0 .939.672 1.7 1.5 1.7.829 0 1.5-.761 1.5-1.7V7.2c0-.939-.671-1.7-1.5-1.7z"
        fill={color || colors.orange}
        fillRule="evenodd"
      />
    </Svg>
  );
};

WarningIcon.propTypes = {
  color: PropTypes.string,
};

export { WarningIcon };
