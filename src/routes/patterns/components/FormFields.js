import React from "react";
import { Card, CodeBlock, FormGroup, FieldGroup, TextArea, Input, Subheading } from "styled";

const FormFields = () => (
  <Card mb={24} padded>
    <Subheading mb={24}>Form Fields</Subheading>

    <Subheading capitalize color micro mb={8}>Form Group</Subheading>
    <FormGroup stacked>
      <Input placeholder="Enter text" />
      <TextArea placeholder="Enter text" />
    </FormGroup>

    <CodeBlock>
{`import { Input } from "styled";

<FormGroup>
  <Input/>
  <TextArea/>
</FormGroup>

// Props
// stacked      Stack content vertically
`}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Text Area</Subheading>
    <TextArea placeholder="Enter text" />

    <CodeBlock>
{`import { TextArea } from "styled";

<TextArea placeholder={placeholder} value={value}/>

// Props
// icon={name}  Display with icon
// mt={Number}  Margin top
// mr={Number}  Margin right
// mb={Number}  Margin bottom
// ml={Number}  Margin left`}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Input</Subheading>
    <Input icon="add" placeholder="Enter text" />

    <CodeBlock>
{`import { Input } from "styled";
<Input placeholder={placeholder} value={value} />

// Props
// icon={name}  Display with icon
// subheading   Display with bigger font size
// mt={Number}  Margin top
// mr={Number}  Margin right
// mb={Number}  Margin bottom
// ml={Number}  Margin left
`}
    </CodeBlock>
  </Card>
);

export default FormFields;
