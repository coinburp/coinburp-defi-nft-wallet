import PropTypes from 'prop-types';
import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const SearchIcon = ({ color, colors, ...props }) => (
  <Svg height="32" viewBox="0 0 32 32" width="32" {...props}>
    <G fill="none" fillRule="evenodd">
      <G fill={color || colors.black}>
        <Path
          d="M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM0 12C0 5.373 5.373 0 12 0s12 5.373 12 12c0 2.592-.822 4.991-2.219 6.953l9.633 9.633c.781.78.781 2.047 0 2.828-.78.781-2.047.781-2.828 0l-9.633-9.633C16.991 23.178 14.592 24 12 24 5.373 24 0 18.627 0 12z"
          transform="translate(-24 -650) translate(0 436) translate(24 214)"
        />
      </G>
    </G>
  </Svg>
);

SearchIcon.propTypes = {
  color: PropTypes.string,
};

export default SearchIcon;
