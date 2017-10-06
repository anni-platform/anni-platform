import React from "react";
import { Card, Heading, Subheading, Paragraph, CodeBlock } from "styled";

const Typography = () => (
  <Card mb={24} padded>
    <Subheading mb={24}>Typography</Subheading>

    <Subheading capitalize color micro mb={8}>Heading</Subheading>
    <Heading>Echo Easy Foxtrot Fox</Heading>
    <CodeBlock>
{`import { Heading } from "styled";
<Heading>Text here</Heading>

// Props
// capitalize         Transform to uppercase
// center             Center horizontally
// color              Display with accent color
// maxWidth={Number}  Define a custom max-width
// mt={Number}        Margin top
// mr={Number}        Margin right
// mb={Number}        Margin bottom
// ml={Number}        Margin left
`}
    </CodeBlock>
    <Subheading capitalize color micro mb={8}>Subheading</Subheading>
    <Subheading mb={16}>Kilo King Lima Love</Subheading>
    <Subheading tiny mb={16}>India Item Juliet Jiggs</Subheading>
    <Subheading capitalize micro>Sierra Tango Tare</Subheading>
    <CodeBlock mb={24}>
{`import { Subheading } from "styled";
<Subheading />Text here</Subheading>

// Props
// capitalize         Transform to uppercase
// center             Center horizontally
// color              Display with accent color
// tiny               Smaller font-size
// micro              Smallest font-size
// maxWidth={Number}  Define a custom max-width
// mt={Number}        Margin top
// mr={Number}        Margin right
// mb={Number}        Margin bottom
// ml={Number}        Margin left
`}
    </CodeBlock>
    <Subheading capitalize color micro mb={8}>Paragraph</Subheading>
    <Paragraph maxWidth={400}>Apples Butter Charlie Duff Edward Freddy George Harry Ink Johnnie King London Monkey Nuts Orange Pudding Queenie Robert Sugar Tommy Uncle Vinegar Willie Xerxes Yellow Zebra Nuts Orange Pudding.</Paragraph>
    <CodeBlock mb={24} noMargin>
{`import { Paragraph } from "styled";
<Paragraph>Text here</Paragraph>


// Props
// capitalize         Transform to uppercase
// center             Center horizontally
// color              Display with accent color
// tiny               Smaller font-size
// micro              Smallest font-size
// strong             Bold weight
// maxWidth={Number}  Define a custom max-width
// mt={Number}        Margin top
// mr={Number}        Margin right
// mb={Number}        Margin bottom
// ml={Number}        Margin left
`}
    </CodeBlock>
  </Card>
);

export default Typography;
