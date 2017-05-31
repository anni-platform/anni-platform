import React from 'react';

import { Card, Icon } from 'components/baseline';

const items = [
  <Icon name='logo' />,
  <Icon name='notification' />,
  <Icon name='more' />,
  <Icon name='confirm' />,
  <Icon name='cancel' />
]
const Icons = () => (
  <Card>
    <ul className='iconGrid'>
      {items.map(function(item, index) {
        return <li key={index}>{item}<h4>{item.props.name}</h4></li>
      })}
    </ul>
  </Card>
);

export default Icons;
