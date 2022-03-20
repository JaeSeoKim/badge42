import React from "react";

export type HeaderProps = {
  color: string;
  login: string;
  campus: string;
  cursus: string;
  logo_url: string;
};

const Header = ({ color, login, campus, cursus, logo_url }: HeaderProps) => {
  return (
    <>
      <g id="logo" className="fadeIn">
        <path d="M14 49.5455V5H50V49.5455L32 61L14 49.5455Z" fill={color} />
        <image
          x="16"
          y="17"
          width="32"
          height="32"
          rx="10"
          xlinkHref={logo_url}
        />
      </g>
      <g
        id="title"
        className="fadeIn"
        style={{
          animationDelay: "0.25s",
        }}
      >
        <text
          fill="white"
          xmlSpace="preserve"
          style={{
            whiteSpace: "nowrap",
          }}
          fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
          fontSize="18"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="66" y="31.7095">
            {login}&apos;s {campus} Stats
          </tspan>
        </text>
      </g>
      <g
        id="cursus"
        className="fadeIn"
        style={{
          animationDelay: "0.5s",
        }}
      >
        <text
          fill="white"
          xmlSpace="preserve"
          style={{
            whiteSpace: "nowrap",
          }}
          fontFamily="'Noto Sans', Arial, Helvetica, 'Sans serif', Ubuntu"
          fontSize="14"
          fontWeight="bold"
          letterSpacing="0em"
        >
          <tspan x="66" y="48.8296">
            {cursus}
          </tspan>
        </text>
      </g>
      <g
        className="fadeIn"
        style={{
          animationDelay: "0.75s",
        }}
      >
        <path
          d="M442 38.7359H457.473V46.4891H465.194V32.4781H449.748L465.194 17H457.473L442 32.4781V38.7359Z"
          fill="white"
        />
        <path d="M468.527 24.7484L476.252 17H468.527V24.7484Z" fill="white" />
        <path
          d="M476.252 24.7484L468.527 32.4781V40.2031H476.252V32.4781L484 24.7484V17H476.252V24.7484Z"
          fill="white"
        />
        <path d="M484 32.4781L476.252 40.2031H484V32.4781Z" fill="white" />
      </g>
    </>
  );
};

export default Header;
