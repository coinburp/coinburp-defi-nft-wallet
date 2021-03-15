import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const WithdrawIconSmall = ({ ...props }) => (
  <Svg height="16" viewBox="0 0 16 16" width="16" {...props}>
    <G fill="none" fillRule="evenodd">
      <G fill="#FF0C00">
        <Path
          d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm3.707-8.707l-3-3c-.39-.39-1.024-.39-1.414 0l-3 3c-.39.39-.39 1.024 0 1.414.39.39 1.024.39 1.414 0L7 7.414V11c0 .552.448 1 1 1s1-.448 1-1V7.414l1.293 1.293c.39.39 1.024.39 1.414 0 .39-.39.39-1.024 0-1.414z"
          transform="translate(-100 -673) translate(16 502) translate(0 154) translate(84 17)"
        />
      </G>
    </G>
  </Svg>
);

export default WithdrawIconSmall;
