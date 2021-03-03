import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const DepositIcon = () => (
  <Svg height="64" viewBox="0 0 64 64" width="64">
    <G fill="none" fill-rule="evenodd">
      <Path
        d="M32 64c17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32z"
        fill="#00DC68"
        transform="translate(-260 -160) translate(260 160)"
      />
      <Path
        d="M23.657 36l3.171 3.172c1.562 1.562 1.562 4.094 0 5.656-1.562 1.562-4.095 1.562-5.656 0l-10-10c-1.563-1.562-1.563-4.094 0-5.656l10-10c1.561-1.563 4.094-1.563 5.656 0 1.562 1.562 1.562 4.094 0 5.656L23.657 28h16.686l-3.171-3.172c-1.563-1.562-1.563-4.094 0-5.656 1.562-1.563 4.094-1.563 5.656 0l10 10c1.562 1.562 1.562 4.094 0 5.656l-10 10c-1.562 1.562-4.094 1.562-5.656 0-1.563-1.562-1.563-4.094 0-5.656L40.343 36H23.657z"
        fill="#FFF"
        transform="translate(-260 -160) translate(260 160)"
      />
    </G>
  </Svg>
);

export default DepositIcon;
