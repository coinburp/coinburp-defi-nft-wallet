import PropTypes from 'prop-types';
import React from 'react';
import { Path } from 'react-native-svg';
import Svg from '../Svg';

const ArrowSmall = ({ color, ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 14}
      viewBox="0 0 24 14"
      {...props}
    >
      <Path
        d="M22.873 5.688l-8.803 7.546a3.179 3.179 0 01-4.14 0L1.129 5.688a3.25 3.25 0 01-.369-4.55 3.178 3.178 0 014.508-.37L12 6.538l6.732-5.77a3.179 3.179 0 014.508.37 3.25 3.25 0 01-.367 4.55z"
        fill={color || '#00DC68'}
        fillRule="nonzero"
        transform={
          props.rotateLeft
            ? 'translate(-40 -166) translate(16 150) rotate(90 11 27)'
            : ''
        }
      />
    </Svg>
  );
};

ArrowSmall.propTypes = {
  color: PropTypes.string,
};

export { ArrowSmall };
