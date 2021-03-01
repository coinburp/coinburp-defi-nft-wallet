import React from 'react';
import { G, Path } from 'react-native-svg';
import Svg from '../Svg';

export default function CameraIcon() {
  return (
    <Svg
      height="40"
      viewBox="0 0 42 40"
      width="42"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G fill="none" fill-rule="evenodd">
        <G>
          <G>
            <G>
              <G>
                <Path
                  d="M0 13H42V17H0zM0 23H42V27H0z"
                  fill="#FFF"
                  transform="translate(-43 -1486) translate(16 1403) translate(0 62) translate(27 21)"
                />
                <Path
                  d="M21 2H7v36h14c3.866 0 7.366-1.567 9.9-4.1 2.533-2.534 4.1-6.034 4.1-9.9v-8c0-3.866-1.567-7.366-4.1-9.9C28.365 3.568 24.865 2 21 2z"
                  stroke="#FFF"
                  strokeWidth="4"
                  transform="translate(-43 -1486) translate(16 1403) translate(0 62) translate(27 21)"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}
