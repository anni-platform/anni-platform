import React from 'react';

import { Card, CodeBlock, Subheading, Grid, GridItem } from 'styled';

const Layout = () => (
  <Card padded mb={24}>
    <Subheading mb={24}>Layout</Subheading>
    <Subheading capitalize color micro>
      Wrapper
    </Subheading>
    <CodeBlock noMargin>
      {`import { Wrapper } from "styled";

const Layout = () => (
  <Wrapper>
    {children}
  </Wrapper>
);
`}
    </CodeBlock>
    <Subheading capitalize color micro>
      Section
    </Subheading>

    <CodeBlock noMargin>
      {`import { Section } from "styled";

const Layout = () => (
  <Section>
    {children}
  </Section>
);

// Props
// center       Center content
// project      Allows for space for the project navigation bar
// full         Displays section without padding
`}
    </CodeBlock>

    <Subheading capitalize color micro>
      Content
    </Subheading>

    <CodeBlock noMargin>
      {`import { Content } from "styled";

const Layout = () => (
  <Content>
    {children}
  </Content>
);

// Props
// center       Center content
// project      Allows for space for the project navigation bar
// full         Displays section without padding
`}
    </CodeBlock>

    <Subheading capitalize color micro>
      Anchor
    </Subheading>

    <CodeBlock noMargin>
      {`import { Anchor } from "styled";

const Layout = () => (
  <Anchor id="String"/>
);

// Props
// id           Id of the corresponding id to scroll towards
// offset       Pixel offset
`}
    </CodeBlock>

    <Subheading capitalize color micro mb={16}>
      Grid
    </Subheading>
    <Grid small>
      <GridItem full solid />
      <GridItem solid />
      <GridItem long solid />
      <GridItem tall solid />
      <GridItem solid />
      <GridItem solid />
      <GridItem solid />
    </Grid>
    <CodeBlock noMargin>
      {`import { Grid, GridItem } from "styled";

const Layout = () => (
  <Grid>
    <GridItem>content</GridItem>
  </Grid>
);

// Grid Props
// small        Set width to smaller size
// name         Name of desired icon
// size         Icon dimensions

// GridItem Props
// center       Center content
// stacked      Stack content vertically
// long         Expand item two grid-units horizontally
// tall         Expand item two grid-units vertically
// full         Expand item two grid-units horizontally and vertically

`}
    </CodeBlock>
  </Card>
);

export default Layout;
