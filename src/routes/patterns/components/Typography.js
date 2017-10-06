import React from "react";
import { Card, Heading, Subheading, Paragraph, CodeBlock } from "styled";

const Typography = () => (
  <Card mb={24} padded>
    <Subheading capitalize color micro mb={8}>Heading</Subheading>
    <Heading>Echo Easy Foxtrot Fox</Heading>
    <CodeBlock>
{
`import { Heading } from "styled";
<Heading>Text here</Heading>`
}
    </CodeBlock>
    <Subheading capitalize color micro mb={8}>Subheading</Subheading>
    <Subheading>Kilo King Lima Love</Subheading>
    <CodeBlock mb={24}>
{
`import { Subheading } from "styled"
<Subheading>Text here</Subheading>

/* Props
   capitalize  Transform to uppercase
   center      Center horizontally
   color       Display with accent color
   tiny        Smaller font-size
   micro       Smallest font-size
 */
`
}
    </CodeBlock>
    <Subheading capitalize color micro mb={8}>Paragraph</Subheading>
    <Paragraph>Apples Butter Charlie Duff Edward Freddy George Harry Ink Johnnie King London Monkey Nuts Orange Pudding Queenie Robert Sugar Tommy Uncle Vinegar Willie Xerxes Yellow Zebra Nuts Orange Pudding.</Paragraph>
    <CodeBlock mb={24}>
{
`import { Paragraph } from "styled";
<Paragraph>Text here</Paragraph>`
}
    </CodeBlock>
  </Card>
);

export default Typography;
