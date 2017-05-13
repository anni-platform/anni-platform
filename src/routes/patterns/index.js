import React, { Component } from 'react';

import Typography from './components/Typography';
import Buttons from './components/Buttons';
import Icons from './components/Icons';
// import FormFields from './components/FormFields';
// import Panels from './components/Panels';
// import Alerts from './components/Alerts';

export default class PatternLibrary extends Component {
  render() {
    return (
      <div>
        <div className='PatternLibrary'>

          <Typography />

          <Buttons />

          <Icons />
{/*
          <FormFields />

          <Panels />

          <Alerts /> */}

        </div>
      </div>
    );
  }
}
