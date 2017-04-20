import React from 'react';

import Card from 'components/Card';
import Icon from 'components/Icon';

const Icons = () => (
  <Card>
    <ul className='iconGrid'>
      <li>
        <Icon name='logo' />
        <h4>logo</h4>
      </li>
      <li>
        <Icon name='notification' />
        <h4>notification</h4>
      </li>
      <li>
        <Icon name='more' />
        <h4>more</h4>
      </li>
    </ul>
  </Card>
);

export default Icons;
