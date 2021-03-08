import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const WithdrawIconSmall = () => (
  <Svg height="16" viewBox="0 0 16 16" width="16">
    <G fill="none" fillRule="evenodd">
      <G fill="#57DC2B">
        <Path
          d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM9 5c0-.552-.448-1-1-1s-1 .448-1 1v3.586L5.707 7.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l3 3c.39.39 1.024.39 1.414 0l3-3c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0L9 8.586V5z"
          transform="translate(-100 -581) translate(16 502) translate(0 62) translate(84 17)"
        />
      </G>
    </G>
  </Svg>
);

export default WithdrawIconSmall;
