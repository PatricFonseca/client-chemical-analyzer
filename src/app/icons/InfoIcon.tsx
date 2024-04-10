import * as React from "react";
const InfoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 48 48",
    }}
    viewBox="0 0 48 48"
    {...props}
  >
    <linearGradient
      id="a"
      x1={9.899}
      x2={38.183}
      y1={9.98}
      y2={38.264}
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset={0}
        style={{
          stopColor: "#33bef0",
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: "#0a85d9",
        }}
      />
    </linearGradient>
    <path
      d="M44.041 24.122c0 11.045-8.955 20-20 20s-20-8.955-20-20 8.955-20 20-20 20 8.955 20 20z"
      style={{
        fill: "url(#a)",
      }}
    />
    <path
      d="M22 36h4a1 1 0 0 0 1-1V20a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1z"
      style={{
        opacity: 0.05,
      }}
    />
    <path
      d="M22.227 35.5h3.547a.727.727 0 0 0 .727-.727V20.227a.727.727 0 0 0-.727-.727h-3.547a.727.727 0 0 0-.727.727v14.547c0 .401.325.726.727.726z"
      style={{
        opacity: 0.07,
      }}
    />
    <radialGradient
      id="b"
      cx={24}
      cy={16}
      r={5.108}
      gradientTransform="matrix(.7808 0 0 .7066 5.26 4.096)"
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset={0.516}
        style={{
          stopColor: "#000",
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: "#000",
          stopOpacity: 0,
        }}
      />
    </radialGradient>
    <ellipse
      cx={24}
      cy={15.402}
      rx={3.988}
      ry={3.609}
      style={{
        opacity: 0.15,
        fill: "url(#b)",
      }}
    />
    <path
      d="M24 17.732c1.7 0 2.65-1.068 2.65-2.388C26.65 14.024 25.647 13 24 13s-2.65 1.024-2.65 2.344c0 1.32.95 2.388 2.65 2.388zM22 20h4v15h-4z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
);
export default InfoIcon;
