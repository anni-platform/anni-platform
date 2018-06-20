import styled from 'styled-components';

const ListItem = styled.li`
  cursor: pointer;
  list-style: none;
  padding-left: 4px;
  background: ${({ selected }) => (selected ? 'limegreen' : '')};
`;

export default ListItem;
