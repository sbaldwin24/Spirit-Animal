import React from "react";
import styled, { keyframes } from "styled-components";

/**
 * @see https://www.styled-components.com/docs/basics#animations
 */
const dash = keyframes`
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

const rotator = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(270deg);
	}
`;

const StyledSpinner = styled.svg`
  animation: ${rotator} 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    animation: ${dash} 1.4s ease-in-out infinite,
      colors 5.6s ease-in-out infinite;
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
  }

  @keyframes colors {
    0% {
      stroke: #e41062;
    }
    25% {
      stroke: #0d223c;
    }
    50% {
      stroke: #e7fd46;
    }
    75% {
      stroke: #5ab9cf;
    }
    100% {
      stroke: #fd9035;
    }
  }
`;

const Spinner = () => (
  <StyledSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="6"
    />
  </StyledSpinner>
);

export default Spinner;
