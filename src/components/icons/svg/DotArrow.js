import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const DotArrow = () => (
  <Svg
    height="36"
    viewBox="0 0 24 36"
    width="24"
  >
    <G fill="none" fillRule="evenodd">
      <G fill="#C3D7EF" fillRule="nonzero">
        <Path
          d="M23.24 23.138c1.143 1.36.978 3.396-.367 4.55l-8.803 7.546c-.595.511-1.333.766-2.07.766-.736 0-1.472-.255-2.07-.766l-8.802-7.546c-1.346-1.154-1.51-3.19-.368-4.55 1.144-1.358 3.162-1.525 4.508-.37L12 28.538l6.732-5.77c1.347-1.154 3.364-.988 4.508.37zM12 16c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"
          transform="translate(-176 -342) translate(16 201) translate(160 141)"
        />
      </G>
    </G>
  </Svg>
);

export default DotArrow;
