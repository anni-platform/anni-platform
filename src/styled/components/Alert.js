import styled from 'styled-components';
import { CARMINE, CHARCOAL, FLINT, PAPER, EASE_OUT_EXPO } from './Variables';

export const Alert = styled.div`
  animation: slideDown 400ms ${EASE_OUT_EXPO};
  background: ${props => (props.danger ? `${CARMINE}` : `${PAPER}`)};
  border-bottom: 1px solid ${FLINT};
  align-items: center;
  display: flex;
  left: 0;
  position: fixed;
  top: 73px;
  width: 100%;
  z-index: 2;

  p,
  h1,
  h2 {
    color: ${props => (props.danger ? `${PAPER}` : `${CHARCOAL}`)};
  }

  @keyframes slideDown {
    0% {
      transform: translateY(-200px);
    }

    100% {
      transform: translateY(0);
    }
  }
`;

export const AlertMessage = styled.div`
  height: 100%;
  flex-grow: 1;
  padding: 24px;
`;

export const AlertControls = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 0 16px;
`;
