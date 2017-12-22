import React from "react";
import { Card, CodeBlock, FormGroup, TextArea, Input, Subheading } from "styled";
import { Select } from 'components';

const FormFields = () => (
  <Card mb={24} padded>
    <Subheading mb={24}>Form Fields</Subheading>

    <Subheading capitalize color micro mb={8}>Form Group</Subheading>
    <FormGroup stacked>
      <Input value="Echo Foxtrot" mb={16} readOnly />
      <TextArea value="Orange Pudding Queenie Robert Sugar Tommy Uncle Vinegar Willie Xerxes Yellow Zebra Nuts Orange Pudding. Charlie Duff Edward Freddy George Harry Ink Johnnie King London Monkey Nuts." readOnly height={77} />
    </FormGroup>

    <CodeBlock>
{`import { Input } from "styled";

const FormFields = () => (
  <FormGroup>
    {children}
  </FormGroup>
);

// Props
// readOnly     Turns field into read only
// stacked      Stack content vertically
`}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Text Area</Subheading>
    <TextArea placeholder="Enter text" />

    <CodeBlock>
{`import { TextArea } from "styled";

const FormFields = () => (
  <TextArea/>
)

// Props
// height={Number}            Displays with custom height
// icon={name}                Displays with icon
// mt={Number}                Margin top
// mr={Number}                Margin right
// mb={Number}                Margin bottom
// ml={Number}                Margin left
// placeholder={String}       Sets placeholder text
// value={String}             Stores value of the field
`}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Input</Subheading>
    <Input placeholder="Enter text" />

    <CodeBlock>
{`import { Input } from "styled";

const FormFields = () => (
  <Input/>
);

// Props
// icon={name}                Displays with icon
// subheading                 Displays with bigger font size
// mt={Number}                Margin top
// mr={Number}                Margin right
// mb={Number}                Margin bottom
// ml={Number}                Margin left
// placeholder={String}       Sets placeholder text
// value={String}             Stores value of the field
`}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Select</Subheading>
    <Select
      items={'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => `Item ${l}`)}
      onChange={selectedItem => console.log(selectedItem)}
    />
    <CodeBlock>
{`import { Select } from 'components';

const FormFields = () => (
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

export default FormFields;
