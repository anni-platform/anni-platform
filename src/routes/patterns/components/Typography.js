import React from 'react';
import { Card, Heading, Subheading, Paragraph, CodeBlock } from 'styled';

const Typography = () => (
  <Card mb={24} padded>
    <Subheading mb={24}>Typography</Subheading>

    <Subheading capitalize color micro mb={8}>
      Heading
    </Subheading>
    <Heading>Echo Easy Foxtrot Fox</Heading>
    <CodeBlock>
      {`import { Heading } from "styled";

const Typography = () => (
  <Heading>Echo Easy Foxtrot Fox</Heading>
);

// Props
// capitalize         Transform to uppercase
// center             Center horizontally
// color              Display with accent color
// width={Number}     Define a custom max-width
// mt={Number}        Margin top
// mr={Number}        Margin right
// mb={Number}        Margin bottom
// ml={Number}        Margin left
`}
    </CodeBlock>
    <Subheading capitalize color micro mb={8}>
      Subheading
    </Subheading>
    <Subheading mb={4}>Kilo King Lima Love</Subheading>
    <CodeBlock mb={24}>
      {`import { Subheading } from "styled";

const Typography = () => (
  <Subheading>Kilo King Lima Love</Subheading>
);

// Props
// capitalize         Transform to uppercase
// center             Center horizontally
// color              Display with accent color
// tiny               Smaller font-size
// micro              Smallest font-size
// width={Number}     Define a custom max-width
// mt={Number}        Margin top
// mr={Number}        Margin right
// mb={Number}        Margin bottom
// ml={Number}        Margin left
`}
    </CodeBlock>
    <Subheading capitalize color micro mb={8}>
      Paragraph
    </Subheading>
    <Paragraph width={400}>
      Apples Butter Charlie Duff Edward Freddy George Harry Ink Johnnie King
      London Monkey Nuts Orange Pudding Queenie Robert Sugar Tommy Uncle Vinegar
      Willie Xerxes Yellow Zebra Nuts Orange Pudding.
    </Paragraph>
    <CodeBlock mb={24} noMargin>
      {`import { Paragraph } from "styled";

const Typography = () => (
  <Paragraph>Apples Butter Charlie...</Paragraph>
);


// Props
// capitalize         Transform to uppercase
// center             Center horizontally
// color              Display with accent color
// tiny               Smaller font-size
// micro              Smallest font-size
// strong             Bold weight
// width={Number}     Define a custom max-width
// mt={Number}        Margin top
// mr={Number}        Margin right
// mb={Number}        Margin bottom
// ml={Number}        Margin left
`}
    </CodeBlock>
  </Card>
);

export default Typography;
