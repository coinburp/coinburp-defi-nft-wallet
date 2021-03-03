import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const DepositIcon = () => (
  <Svg height="64" viewBox="0 0 64 64" width="64">
    <G fill="none" fillRule="evenodd">
      <Path
        d="M32 64c17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0 14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32z"
        fill="#00DC68"
        transform="translate(-52 -160) translate(50 160) translate(2)"
      />
      <Path
        d="M35 44c2.21 0 4 1.79 4 4s-1.79 4-4 4h-6c-2.21 0-4-1.79-4-4s1.79-4 4-4h6zm-3-32c2.21 0 4 1.79 4 4v10.343l3.172-3.171c1.562-1.562 4.094-1.562 5.656 0 1.562 1.562 1.562 4.094 0 5.656l-10 10c-1.562 1.563-4.094 1.563-5.656 0l-10-10c-1.563-1.562-1.563-4.094 0-5.656 1.562-1.562 4.094-1.562 5.656 0L28 26.343V16c0-2.21 1.79-4 4-4z"
        fill="#FFF"
        transform="translate(-52 -160) translate(50 160) translate(2)"
      />
    </G>
  </Svg>
);

export default DepositIcon;
