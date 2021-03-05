import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const LinkIcon = ({ selected }) => (
  <Svg
    height="64"
    viewBox="0 0 64 64"
    width="64"
  >
    <G fill={selected ? '#FD5194' : 'none'} fill-rule="evenodd">
      <G stroke="#FD5194" strokeWidth="3">
        <Path
          d="M32 1.5c-8.422 0-16.047 3.414-21.567 8.933C4.913 15.953 1.5 23.578 1.5 32s3.414 16.047 8.933 21.567C15.953 59.087 23.578 62.5 32 62.5s16.047-3.414 21.567-8.933C59.087 48.047 62.5 40.422 62.5 32s-3.414-16.047-8.933-21.567C48.047 4.913 40.422 1.5 32 1.5z"
          transform="translate(-92 -464) translate(0 56) translate(79 408) translate(13)"
        />
        <Path
          d="M45.127 18.813c-4.168-2.234-9.666-1.555-13.12 1.561-3.472-3.114-8.979-3.785-13.133-1.561-3.62 1.925-5.874 5.61-5.874 9.612 0 1.146.19 2.285.526 3.265 1.772 7.69 13.148 17.81 18.48 17.81 5.32 0 16.688-10.12 18.43-17.68.373-1.112.564-2.247.564-3.396 0-4-2.251-7.688-5.873-9.611z"
          fill="#FFF"
          fill-rule="nonzero"
          transform="translate(-92 -464) translate(0 56) translate(79 408) translate(13)"
        />
      </G>
    </G>
  </Svg>
);

export default LinkIcon;
