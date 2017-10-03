import React from 'react';

import { Button, ButtonGroup, Card } from 'styled';

const Buttons = () => (
  <Card className='Buttons'>
    <h4 className='legend'>Buttons</h4>
    <ButtonGroup>
      <Button>Default Button</Button>
      <Button primary>Primary Button</Button>
      <Button link>Link Button</Button>
    </ButtonGroup>

    <h4 className='legend'>Icon Buttons</h4>
    <ButtonGroup>
      <Button icon="add">Default Button</Button>
      <Button icon="add" primary>Primary Button</Button>
      <Button icon="arrow-back" link>Link Button</Button>
    </ButtonGroup>

    <h4 className='legend'>Icon only</h4>
    <ButtonGroup>
      <Button icon="add" />
      <Button icon="add" primary />
    </ButtonGroup>
  </Card>
);

export default Buttons;
