import React from "react";
import { Card, Heading, Subheading, Paragraph, CodeBlock } from "styled";

const Typography = () => (
  <Card mb={24} padded>
    <Subheading capitalize color micro mb={8}>Heading</Subheading>
    <Heading>Echo Easy Foxtrot Fox</Heading>
    <CodeBlock>
{`import { Heading } from "styled";
<Heading>Text here</Heading>`
}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Subheading</Subheading>
    <Subheading>Kilo King Lima Love</Subheading>
    <CodeBlock mb={24}>{`<Subheading>Text here</Subheading>`}</CodeBlock>

    <Subheading capitalize color micro mb={8}>Tiny</Subheading>
    <Subheading tiny>India Item Juliet Jig</Subheading>
    <CodeBlock mb={24}>
{`import { Heading } from "styled";
<Subheading tiny>Text here</Subheading>`
}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Micro</Subheading>
    <Subheading capitalize micro>Sierra Sugar Tanto Tare</Subheading>
    <CodeBlock mb={24}>
{`import { Heading } from "styled";
<Subheading micro>Text here</Subheading>`
}
    </CodeBlock>

    <Subheading capitalize color micro mb={8}>Paragraph</Subheading>
    <Paragraph>Apples Butter Charlie Duff Edward Freddy George Harry Ink Johnnie King London Monkey Nuts Orange Pudding Queenie Robert Sugar Tommy Uncle Vinegar Willie Xerxes Yellow Zebra Nuts Orange Pudding.</Paragraph>
    <CodeBlock mb={24}>
{`import { Heading } from "styled";
<Paragraph>Text here</Paragraph>`
}
    </CodeBlock>
  </Card>
);

export default Typography;
