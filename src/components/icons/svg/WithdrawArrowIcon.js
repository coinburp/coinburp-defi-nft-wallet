import PropTypes from 'prop-types';
import React from 'react';
import { Path, G } from 'react-native-svg';
import Svg from '../Svg';

const WithdrawArrowIcon = ({ color, colors, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
    <G fill="none" fillRule="evenodd">
      <G fill="#FFF">
        <G>
          <Path fillRule="nonzero" d="M28 0C12.536 0 0 12.536 0 28s12.536 28 28 28 28-12.536 28-28S43.464 0 28 0zm0 3.784c13.374 0 24.216 10.842 24.216 24.216S41.374 52.216 28 52.216 3.784 41.374 3.784 28 14.626 3.784 28 3.784z" transform="translate(-75 -619) translate(75 619)"/>
          <Path d="M30 36c1.657 0 3 1.343 3 3s-1.343 3-3 3h-4c-1.657 0-3-1.343-3-3s1.343-3 3-3h4zm-2-22c1.578 0 3 1.422 3 3v7l2.123-2.02c1.115-1.116 2.924-1.116 4.04 0 1.116 1.115 1.116 2.925 0 4.04l-7.143 7.143c-1.115 1.116-2.924 1.116-4.04 0l-7.143-7.143c-1.116-1.115-1.116-2.925 0-4.04 1.116-1.116 2.925-1.116 4.04 0L25 24v-7c0-1.578 1.422-3 3-3z" transform="translate(-75 -619) translate(75 619) matrix(1 0 0 -1 0 56)"/>
        </G>
      </G>
    </G>
  </Svg>

);

WithdrawArrowIcon.propTypes = {
  color: PropTypes.string,
};

export default WithdrawArrowIcon;
