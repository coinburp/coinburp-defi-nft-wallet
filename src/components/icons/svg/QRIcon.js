import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const CopyIcon = () => (
  <Svg height="24" viewBox="0 0 24 24" width="24">
    <G fill="none" fill-rule="evenodd">
      <G fill="#00DC68">
        <Path
          d="M8 13c1.657 0 3 1.343 3 3v5c0 1.657-1.343 3-3 3H3c-1.657 0-3-1.343-3-3v-5c0-1.657 1.343-3 3-3h5zm10.5 4c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM8 0c1.657 0 3 1.343 3 3v5c0 1.657-1.343 3-3 3H3c-1.657 0-3-1.343-3-3V3c0-1.657 1.343-3 3-3h5zm13 0c1.657 0 3 1.343 3 3v5c0 1.657-1.343 3-3 3h-5c-1.657 0-3-1.343-3-3V3c0-1.657 1.343-3 3-3h5zM5.5 4C4.672 4 4 4.672 4 5.5S4.672 7 5.5 7 7 6.328 7 5.5 6.328 4 5.5 4z"
          transform="translate(-198 -382) translate(46 152) translate(152 230)"
        />
      </G>
    </G>
  </Svg>
);

export default CopyIcon;
