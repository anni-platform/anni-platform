import React from "react";

import { Card, CodeBlock, Loader, Subheading } from "styled";

const Loaders = () => (
  <Card padded mb={24}>
    <Subheading mb={24}>Loader</Subheading>
    <Loader center />
    <Subheading capitalize center micro mt={16} mb={16}></Subheading>

    <CodeBlock noMargin>
{`import { Loader } from "styled";
<Loader />

// Props
// center             Center horizontally
// fullPage  Display centered on full-screen
`}
    </CodeBlock>
  </Card>
);

export default Loaders;
