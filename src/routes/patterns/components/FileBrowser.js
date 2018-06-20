import React from 'react';
import { Card, CodeBlock, Subheading } from 'styled';
import { FileBrowser } from 'components';

const FileBrowserSection = () => (
  <Card mb={24} padded>
    <Subheading mb={24}>FileBrowser</Subheading>

    <FileBrowser />

    <CodeBlock>
      {`import { Select } from "styled";

const FileBrowser = () => (
  <Select
    items={['apple', 'orange', 'carrot']}
    onChange={selectedItem => console.log(selectedItem)}
  />
);

// Props
// items     Array of string values
// onChange  Callback function to execute when the value changes
// placeholder (optional) Override default placeholder text
`}
    </CodeBlock>
  </Card>
);

export default FileBrowserSection;
