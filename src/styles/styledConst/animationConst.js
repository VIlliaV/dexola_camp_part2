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
