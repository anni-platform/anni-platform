import React from 'react';

import { Card, Icon } from 'components/baseline';

const buttons = () => (
  <Card>
    <h4 className='legend'>Regular buttons</h4>
    <div>
      <button className='primary'>Primary</button>
      <button className='default'>Default</button>
      <button className='info'>Info</button>
      <button className='link'>Link</button>
    </div>

    <h4>Icon buttons</h4>
    <div>
      <button className='primary'>
        <Icon name='plus' />Primary
      </button>
      <button className='default'>
        <Icon name='plus' />Default
      </button>
      <button className='info'>
        <Icon name='plus' />Info
      </button>
      <button className='link'>
        <Icon name='arrow-back' />Link
      </button>
    </div>
  </Card>
);

export default buttons;
