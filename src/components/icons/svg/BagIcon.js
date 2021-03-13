import PropTypes from 'prop-types';
import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

const BagIcon = ({ color, colors, ...props }) => (
  <Svg height="16" viewBox="0 0 16 16" width="16" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path
        d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
        fill={color || colors.neonGreen}
        transform="translate(-100 -1341) translate(16 502) translate(0 822) translate(84 17)"
      />
      <Path
        d="M7.995 3.5c1.657 0 3 1.343 3 3 0 .17-.014.338-.042.5h.703c.552 0 1 .448 1 1 0 .097-.014.194-.042.287l-.9 3c-.127.423-.516.713-.958.713H5.244c-.442 0-.83-.29-.958-.713l-.9-3c-.158-.529.142-1.086.67-1.245.094-.028.19-.042.288-.042h.693c-.028-.162-.042-.33-.042-.5 0-1.657 1.343-3 3-3zm0 1.5c-.828 0-1.5.672-1.5 1.5 0 .176.03.344.086.5h2.828c.056-.156.086-.324.086-.5 0-.828-.672-1.5-1.5-1.5z"
        fill="#FFF"
        transform="translate(-100 -1341) translate(16 502) translate(0 822) translate(84 17)"
      />
    </G>
  </Svg>
);

BagIcon.propTypes = {
  color: PropTypes.string,
};

export default BagIcon;
