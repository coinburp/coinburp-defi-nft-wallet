

import PropTypes from 'prop-types';
import React from 'react';
import { Path, G } from 'react-native-svg';
import Svg from '../Svg';

const CheckmarkCoinburpIcon = ({ color, colors, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" style={{left: -2}} width="16" height="13" viewBox="0 0 16 13">
    <G fill="none" fill-rule="evenodd">
      <G fill="#FFF">
        <G>
          <G>
            <G>
              <Path d="M23.414 13.914c.781-.78.781-2.047 0-2.828-.78-.781-2.047-.781-2.828 0L14 17.672l-2.586-2.586c-.78-.781-2.047-.781-2.828 0-.781.78-.781 2.047 0 2.828l4 4c.78.781 2.047.781 2.828 0l8-8z" transform="translate(-24 -460) translate(16 315) translate(0 111) translate(0 24)"/>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

CheckmarkCoinburpIcon.propTypes = {
  color: PropTypes.string,
};

export default CheckmarkCoinburpIcon;
