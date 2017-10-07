import React from "react";

import { Card, CodeBlock, Grid, GridItem, Subheading } from "styled";


const Grids = () => (
  <Card padded mb={24}>
    <Subheading mb={24}>Grid</Subheading>
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
<Grid>
  <GridItem>content</GridItem>
</Grid>

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

export default Grids;
