import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

const Heart = () => (
  <Svg height="20" viewßßBox="0 0 23 20" width="23">
    <G fill="none" fill-rule="evenodd">
      <G fill="#FD5194" fillRule="nonzero">
        <Path
          d="M19.445.82c-2.523-1.395-5.85-.971-7.941.976C9.403-.15 6.07-.569 3.555.821 1.364 2.023 0 4.327 0 6.828c0 .716.115 1.428.318 2.041C1.391 13.675 8.276 20 11.504 20c3.22 0 10.1-6.325 11.155-11.05.226-.695.341-1.405.341-2.122 0-2.501-1.362-4.805-3.555-6.007z"
          transform="translate(-16 -516) translate(-1 452) translate(0 62) translate(17) translate(0 2)"
        />
      </G>
    </G>
  </Svg>
);

export default Heart;
