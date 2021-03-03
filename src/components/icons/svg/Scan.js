import PropTypes from 'prop-types';
import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

const ScannerIcon = ({ color, colors, ...props }) => (
  <Svg
    height="32"
    viewBox="0 0 32 32"
    width="32"
  >
    <G fill="none" fill-rule="evenodd">
      <G fill={color || '#00DC68'}>
        <Path
          d="M28 12c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H16c-2.21 0-4-1.79-4-4s1.79-4 4-4h8v-8c0-2.21 1.79-4 4-4zM16 0c2.21 0 4 1.79 4 4s-1.79 4-4 4H8v8c0 2.21-1.79 4-4 4s-4-1.79-4-4V4c0-2.21 1.79-4 4-4h12zm0 13c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
          transform="translate(-327 -56) translate(16 48) translate(311 8)"
        />
      </G>
    </G>
  </Svg>
);

ScannerIcon.propTypes = {
  color: PropTypes.string,
};

export default ScannerIcon;
