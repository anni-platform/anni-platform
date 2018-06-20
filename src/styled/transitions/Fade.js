import transition from 'styled-transition-group';

export default transition.div`
  &:enter {
    opacity: 0.01;
  }
  &:enter-active {
    opacity: 1;
    transition: opacity 1000ms ease-in;
  }
  &:exit {
    opacity: 1;
  }
  &:exit-active {
    opacity: 0.01;
    transition: opacity 800ms ease-in;
  }
`;
