import React from "react";

import { Card, CodeBlock, Subheading } from "styled";

const Layout = () => (
  <Card padded mb={24}>
    <Subheading mb={24}>Layout</Subheading>
    <Subheading capitalize color micro>Wrapper</Subheading>
    <CodeBlock noMargin>
{`import { Wrapper } from "styled";

<Wrapper>
{children}
</Wrapper>
`}
    </CodeBlock>
    <Subheading capitalize color micro>Section</Subheading>

    <CodeBlock noMargin>
{`import { Section } from "styled";

<Section>
{children}
</Section>

// Props
// center       Center content
// project      Allows for space for the project navigation bar
// full         Displays section without padding
`}
    </CodeBlock>

    <Subheading capitalize color micro>Content</Subheading>

    <CodeBlock noMargin>
{`import { Content } from "styled";

<Content>
{children}
</Content>

// Props
// center       Center content
// project      Allows for space for the project navigation bar
// full         Displays section without padding
`}
    </CodeBlock>

    <Subheading capitalize color micro>Anchor</Subheading>

    <CodeBlock noMargin>
{`import { Anchor } from "styled";

<Anchor id="String"/>

// Props
// id           Id of the corresponding id to scroll towards
// offset       Pixel offset
`}
    </CodeBlock>
  </Card>
);

export default Layout;
