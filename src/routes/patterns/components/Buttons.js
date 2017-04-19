import React from 'react';

import { Button, Card } from 'components/baseline';

const Buttons = () => (
  <Card>
    <h4 className='legend'>Buttons</h4>
    <div className="ButtonToolbar">
      <Button>Default Button</Button>
      <Button primary>Primary Button</Button>
      <Button link>Link Button</Button>
    </div>

    <h4 className='legend'>Icon Buttons</h4>
    <div className="ButtonToolbar">
      <Button icon="plus">Default Button</Button>
      <Button icon="plus" primary>Primary Button</Button>
      <Button icon="arrow-back" link>Link Button</Button>
    </div>

    <h4 className='legend'>Icon only</h4>
    <div className="ButtonToolbar">
      <Button icon="plus" />
      <Button icon="plus" primary />
      <Button icon="arrow-back" link />
    </div>
  </Card>
);

export default Buttons;
