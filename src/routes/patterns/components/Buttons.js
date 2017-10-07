import React from "react";
import { Button, ButtonGroup, Card, CodeBlock, Subheading } from "styled";

const Buttons = () => (
  <Card mb={24} padded>
    <Subheading mb={24}>Buttons</Subheading>

    <Subheading capitalize color micro mb={8}>Button</Subheading>
    <ButtonGroup>
      <Button primary mb={8}>Primary</Button>
      <Button mb={8}>Default</Button>
      <Button link>Link</Button>
    </ButtonGroup>

    <Subheading capitalize color micro mb={8} mt={16}>Icon Button</Subheading>
    <ButtonGroup>
      <Button icon="arrow-back" primary mb={8}>Primary</Button>
      <Button icon="arrow-back" mb={8}>Default</Button>
      <Button icon="arrow-back" link>Link</Button>
    </ButtonGroup>

    <Subheading capitalize color micro mb={8} mt={16}>Stacked Button</Subheading>
    <ButtonGroup>
      <Button icon="add" color stacked>Stacked</Button>
    </ButtonGroup>

    <CodeBlock>
{`import { Button } from "styled";
<Button>label</Button>

// Props
// primary      Primary styles
// link         Link styles
// icon         Include icon
// stacked      Stack children
// mt={Number}  Margin top
// mr={Number}  Margin right
// mb={Number}  Margin bottom
// ml={Number}  Margin left
`}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Button Group</Subheading>
    <ButtonGroup>
      <Button>Foxtrot</Button>
      <Button>Echo</Button>
      <Button>Charlie</Button>
    </ButtonGroup>
    <CodeBlock noMargin>
{`import { Button, ButtonGroup } from "styled";
<ButtonGroup>
  <Button>label</Button>
</ButtonGroup>

// Props
// mt={Number}  Margin top
// mr={Number}  Margin right
// mb={Number}  Margin bottom
// ml={Number}  Margin left
`}
    </CodeBlock>
  </Card>
);

export default Buttons;
