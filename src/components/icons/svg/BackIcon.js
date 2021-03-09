import PropTypes from 'prop-types';
import React from 'react';
import { Path, Defs, G, Use } from 'react-native-svg';
import Svg from '../Svg';

const BackIcon = ({ color, colors, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="37" height="50" viewBox="0 0 37 50">
    <Defs>
      <Path id="1zdgs65bmb" d="M23.573 14.354l-11.381 9.757c-.77.66-1.723.99-2.676.99-.952 0-1.904-.33-2.676-.99l-11.381-9.757c-1.741-1.492-1.954-4.125-.476-5.882C-3.537 6.715-.929 6.5.812 7.993l8.704 7.46 8.703-7.46c1.742-1.492 4.35-1.277 5.828.479 1.478 1.757 1.265 4.39-.474 5.882z"/>
    </Defs>
    <G fill="none" fill-rule="evenodd">
      <G>
        <G>
          <G transform="translate(-7 -52) matrix(-1 0 0 1 35 56) rotate(-90 9.515 16.05)">
            <Use fill="#000" filter="url(#yw68o47kqa)" xlinkHref="#1zdgs65bmb"/>
            <Use fill="#FFF" xlinkHref="#1zdgs65bmb"/>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

BackIcon.propTypes = {
  color: PropTypes.string,
};

export default BackIcon;