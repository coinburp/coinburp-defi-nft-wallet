import PropTypes from 'prop-types';
import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const SearchIcon = ({ color, colors, ...props }) => (
  <Svg height="32" viewBox="0 0 28 32" width="28" {...props}>
    <G fill="none" fill-rule="evenodd">
      <G fill={color || colors.coinburp}>
        <Path
          d="M2 0c1.105 0 2 .895 2 2v4.202C6.54 3.61 10.081 2 14 2c6.099 0 11.282 3.899 13.203 9.334.368 1.04-.178 2.184-1.22 2.552-1.04.368-2.183-.178-2.552-1.22C22.058 8.78 18.351 6 14 6c-3.27 0-6.176 1.57-8.001 4H12c1.105 0 2 .895 2 2s-.895 2-2 2H2c-1.105 0-2-.895-2-2V2C0 .895.895 0 2 0zm.016 18.114c1.042-.368 2.184.178 2.553 1.22C5.942 23.22 9.649 26 14 26c3.27 0 6.176-1.57 8.001-4H16c-1.105 0-2-.895-2-2s.895-2 2-2h10c.53 0 1.04.21 1.414.586.375.375.586.884.586 1.414v10c0 1.105-.895 2-2 2s-2-.895-2-2v-4.203C21.46 28.39 17.919 30 14 30 7.901 30 2.718 26.101.797 20.666c-.368-1.041.178-2.184 1.22-2.552z"
          transform="translate(-24 -476) translate(0 436) translate(24 40)"
        />
      </G>
    </G>
  </Svg>
);

SearchIcon.propTypes = {
  color: PropTypes.string,
};

export default SearchIcon;
