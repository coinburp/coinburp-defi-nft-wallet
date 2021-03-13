import PropTypes from 'prop-types';
import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const UserIcon = ({ color, colors, ...props }) => (
  <Svg height="16" viewBox="0 0 16 16" width="16" {...props}>
    <G fill="none" fillRule="evenodd">
      <G fill={color || colors.coldGrey}>
        <Path
          d="M16 8c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-6-2.5c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zM8 9c-2.018 0-3.756 1.195-4.546 2.916C4.554 13.192 6.183 14 8 14c1.817 0 3.446-.808 4.546-2.084C11.756 10.195 10.018 9 8 9z"
          transform="translate(-100 -1433) translate(16 502) translate(0 914) translate(84 17)"
        />
      </G>
    </G>
  </Svg>
);

UserIcon.propTypes = {
  color: PropTypes.string,
};

export default UserIcon;
