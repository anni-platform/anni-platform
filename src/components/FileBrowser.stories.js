import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FileBrowser from '../components/FileBrowser';

storiesOf('FileBrowser', module)
  .add('default', () => (
    <FileBrowser />
  ));