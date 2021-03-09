import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const ChartIcon = () => (
  <Svg height="15" viewBox="0 0 15 15" width="15">
    <G fill="none" fillRule="evenodd">
      <G fill="#44107A">
        <Path
          d="M.938 0C.42 0 0 .448 0 1s.42 1 .938 1v8c0 1.105.839 2 1.875 2h2.424l-1.212 1.293c-.367.39-.367 1.024 0 1.414.366.39.96.39 1.325 0l2.15-2.293 2.15 2.293c.366.39.96.39 1.325 0 .367-.39.367-1.024 0-1.414L9.763 12h2.425c1.035 0 1.874-.895 1.874-2V2C14.58 2 15 1.552 15 1s-.42-1-.938-1H.938zm10.975 4.707c.366-.39.366-1.024 0-1.414-.366-.39-.96-.39-1.326 0L7.5 6.586 6.288 5.293c-.366-.39-.96-.39-1.326 0l-1.875 2c-.366.39-.366 1.024 0 1.414.366.39.96.39 1.326 0l1.212-1.293 1.212 1.293c.366.39.96.39 1.326 0l3.75-4z"
          transform="translate(-16 -737) translate(0 247) translate(16 489) translate(0 1)"
        />
      </G>
    </G>
  </Svg>
);

export default ChartIcon;
