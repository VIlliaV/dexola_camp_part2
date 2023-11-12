import { keyframes } from 'styled-components';

export const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

export const movingRightLeft = keyframes`  

    from {
      transform: translateX(350px);
    }
    to {
      transform: translateX(0px);
    }
  `;

export const slideInAnimation = keyframes`
    0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const slideOutAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;
