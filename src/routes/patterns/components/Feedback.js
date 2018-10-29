import React from "react";
import { FeedbackItem, Card, CodeBlock, Subheading } from "styled";

const FeedbackArea = () => (
  <Card mb={24} padded>
    <Subheading mb={24}>Feedback Item</Subheading>

    <Subheading capitalize color micro mb={8}>Feedback Item</Subheading>
    <FeedbackItem
      author="Ivan Cruz"
      message="Apples Butter Charlie Duff Edward Harry Ink Johnnie King London Monkey."
      time="4 min ago"
    />
    <FeedbackItem
      author="Mika Cruz"
      message="Duff Edward Freddy George Harry Ink Johnnie King Apples Butter Charlie."
      time="8 min ago"
    />

    <Subheading capitalize color micro mt={24} mb={16}>Contextual Feedback Item</Subheading>
    <FeedbackItem
      direction="left"
      author="Jonathan Hudak"
      message="Apples Butter Charlie Duff Edward Freddy George Harry Ink Johnnie King London."
      time="4 min ago"
      contextual
    />

    <FeedbackItem
      direction="right"
      author="Jonathan Hudak"
      message="Apples Butter Charlie Duff Edward Freddy George Harry Ink Johnnie King London."
      time="4 min ago"
      contextual
    />

    <CodeBlock>
{`import {} from "styled";

const Buttons = () => (
  ...
);

// Props
`}
    </CodeBlock>
  </Card>
)
export default FeedbackArea;
