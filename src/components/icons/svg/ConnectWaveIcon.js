import PropTypes from 'prop-types';
import React from 'react';
import { Path, G } from 'react-native-svg';
import Svg from '../Svg';

const ConnectWaveIcon = ({ color, colors, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
    <G fill="none" fillRule="evenodd">
      <G fill="#FFF" fillRule="nonzero">
        <G>
          <Path d="M28 0C12.536 0 0 12.536 0 28s12.536 28 28 28 28-12.536 28-28S43.464 0 28 0zm0 3.784c13.374 0 24.216 10.842 24.216 24.216S41.374 52.216 28 52.216 3.784 41.374 3.784 28 14.626 3.784 28 3.784z" transform="translate(-245 -619) translate(245 619)"/>
          <Path d="M17.148 20.899c5.994-5.699 15.71-5.699 21.704 0l.72.686c.3.285.3.747 0 1.032l-2.467 2.346c-.15.142-.392.142-.542 0l-.993-.944c-4.18-3.976-10.96-3.976-15.14 0l-1.063 1.01c-.15.143-.393.143-.543 0l-2.467-2.345c-.3-.285-.3-.747 0-1.032l.791-.753zm26.806 4.852l2.196 2.088c.3.285.3.747 0 1.032l-9.901 9.415c-.3.285-.786.285-1.086 0l-7.027-6.682c-.075-.071-.197-.071-.272 0l-7.027 6.682c-.3.285-.786.285-1.085 0L9.85 28.871c-.3-.285-.3-.747 0-1.032l2.196-2.088c.3-.285.785-.285 1.085 0l7.028 6.682c.075.072.196.072.27 0l7.028-6.682c.3-.285.786-.285 1.085 0l7.028 6.682c.075.072.197.072.272 0l7.027-6.682c.3-.285.786-.285 1.085 0z" transform="translate(-245 -619) translate(245 619)"/>
        </G>
      </G>
    </G>
  </Svg>
);

ConnectWaveIcon.propTypes = {
  color: PropTypes.string,
};

export default ConnectWaveIcon;
