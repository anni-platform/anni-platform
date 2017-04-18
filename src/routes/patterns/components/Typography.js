import React from 'react';
import { Card } from 'components/UI';

const Typography = () => (
  <div>
    <h4 className='section'>Typography</h4>
    <Card>
      <ul className='typography'>
        <li>
          <h4 className='legend'>h1</h4><h1>Headline 1</h1>
        </li>
        <li>
          <h4 className='legend'>h2</h4><h2>Headline 2</h2>
        </li>
        <li>
          <h4 className='legend'>h3</h4><h3>Headline 3</h3>
        </li>
        <li>
          <h4 className='legend'>h4</h4><h4>Headline 4</h4>
        </li>
        <li>
          <h4 className='legend'>p.large</h4>
          <p className='large'>
            Name your configuration and provide an optional description.
          </p>
        </li>
        <li>
          <h4 className='legend'>p</h4>
          <p>
            Select this option if you plan to upload files from your browser or tell us where to get them (via SFTP/S3). Any files you submit will be processed with this config. You can only provide one file at a time with this method.
          </p>
        </li>
      </ul>
    </Card>
  </div>
);

export default Typography;
