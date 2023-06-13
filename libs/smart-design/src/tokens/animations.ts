import { keyframes } from 'styled-components';

export const slideUpAndFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;

export const slideRightAndFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateX(-5px);
}
to {
  opacity: 1;
  transform: translateY(0);
}`;
export const slideLeftAndFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateX(5px);
}
to {
  opacity: 1;
  transform: translateY(0);
}`;

export const slideDownAndFadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }
  to {
    opacity: 0;
    transform: translateY(5px);
  }`;

export const fadeIn = keyframes`
    from {

        opacity: 0;
    }
    to {
        opacity: 1;
    }`;
