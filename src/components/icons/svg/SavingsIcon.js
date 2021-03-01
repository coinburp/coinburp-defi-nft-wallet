import React from 'react';
import { Defs, Ellipse, G, LinearGradient, Path, Stop } from 'react-native-svg';
import Svg from '../Svg';

export default function CameraIcon() {
  return (
    <Svg
      height="86"
      viewBox="0 0 57 86"
      width="57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Defs>
        <LinearGradient
          id="uhehmukbca"
          x1="72.776%"
          x2="50%"
          y1="90.949%"
          y2="31.456%"
        >
          <Stop offset="0%" stopColor="#FF2700" />
          <Stop offset="100%" stopColor="#FFDB00" />
        </LinearGradient>
      </Defs>
      <G fill="none" fill-rule="evenodd">
        <G>
          <G>
            <G>
              <G transform="translate(-159 -1569) translate(16 1403) translate(0 62) translate(143 104)">
                <Path
                  d="M28.5 21C44.864 21 57 35.393 57 51c0 18.152-16.03 21-28.5 21h-.375C15.71 71.941 0 68.97 0 51c0-15.607 12.136-30 28.5-30zM29.992.012c5.018.081 9.915.573 13.479 1.475 1.264.318 1.892 1.557 1.31 2.585l-.075.122-6.02 12.79C35.555 15.708 32.131 15 28.5 15c-3.632 0-7.056.709-10.184 1.983l-6.022-12.79c-.707-1.048-.08-2.375 1.235-2.706C15.682.942 18.322.547 21.18.3L25.5 7.5 29.992.012z"
                  fill="url(#uhehmukbca)"
                />
                <Ellipse
                  cx="28.5"
                  cy="83.25"
                  fill="#000"
                  fill-opacity=".24"
                  rx="13.5"
                  ry="2.25"
                />
                <G>
                  <Path
                    d="M0 7.5H27V10.5H0zM0 13.5H27V16.5H0z"
                    fill="#FFF"
                    transform="translate(16.5 34.5)"
                  />
                  <Path
                    d="M12 1.5H4.5v21H12c2.9 0 5.524-1.175 7.425-3.075 1.9-1.9 3.075-4.526 3.075-7.425 0-2.9-1.175-5.524-3.075-7.425C17.525 2.675 14.899 1.5 12 1.5z"
                    stroke="#FFF"
                    strokeWidth="3"
                    transform="translate(16.5 34.5)"
                  />
                </G>
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
}
