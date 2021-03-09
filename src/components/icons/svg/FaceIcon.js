import PropTypes from 'prop-types';
import React from 'react';
import { Path, G } from 'react-native-svg';
import Svg from '../Svg';

const FaceIcon = ({ color, colors, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
    <G fill="none" fill-rule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <G stroke="#FFF">
        <G>
          <G>
            <G>
              <Path strokeWidth="3" d="M24 5V2c0-1.105-.895-2-2-2h-3M5 0H2C.895 0 0 .895 0 2v3M19 24h3c1.105 0 2-.895 2-2v-3M0 19v3c0 1.105.895 2 2 2h3" transform="translate(-38 -408) translate(16 166) translate(0 224) translate(24 20)"/>
              <Path strokeWidth="2" d="M9 17c.703.5 1.724 1 3 1s2.297-.5 3-1M12 8v4c0 .552-.448 1-1 1M17.455 7.5L17.455 9.75M6.545 7.5L6.545 9.75" transform="translate(-38 -408) translate(16 166) translate(0 224) translate(24 20)"/>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

FaceIcon.propTypes = {
  color: PropTypes.string,
};

export default FaceIcon;


