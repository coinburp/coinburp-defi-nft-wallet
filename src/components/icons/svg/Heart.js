import React from 'react';
import { Defs, G, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

const Heart = () => (
  <Svg
    height="21"
    viewBox="0 0 24 21"
    width="24"
  >
    <Defs>
      <LinearGradient id="qjj8o7vnla" x1="50%" x2="50%" y1="100%" y2=".092%">
        <Stop offset="0%" stopColor="#FE5196" />
        <Stop offset="99.908%" stopColor="#F77062" />
      </LinearGradient>
    </Defs>
    <G fill="none" fill-rule="evenodd">
      <G fill="url(#qjj8o7vnla)" transform="translate(-16 -677)">
        <Path
          d="M1.757 1.757c2.344-2.343 6.142-2.343 8.486 0L12 3.515l1.757-1.758c2.344-2.343 6.142-2.343 8.486 0 2.343 2.344 2.343 6.142 0 8.486L12 20.485 1.757 10.243c-2.343-2.344-2.343-6.142 0-8.486z"
          transform="translate(-1 613) translate(0 62) translate(17) translate(0 2)"
        />
      </G>
    </G>
  </Svg>
);

export default Heart;
