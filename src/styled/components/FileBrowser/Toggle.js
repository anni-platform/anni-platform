import styled from 'styled-components';
import { SolidIcon } from 'styled';

const Toggle = styled(SolidIcon)`
  padding: 4px;
  position: relative;
  transform: rotate(${props => (props.active ? '180deg' : '0deg')});
  display: inline-block;
  vertical-align: middle;
`;

export default Toggle;
