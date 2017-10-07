import React from "react";

import { Card, CodeBlock, OutlineIcon, SolidIcon, Grid, GridItem, Subheading } from "styled";

const items = [
  <OutlineIcon name="add" />,
  <OutlineIcon name="arrow-back" />,
  <OutlineIcon name="audio" />,
  <OutlineIcon name="cancel" />,
  <OutlineIcon name="confirm" />,
  <OutlineIcon name="delete" />,
  <OutlineIcon name="logo" />,
  <OutlineIcon name="more" />,
  <OutlineIcon name="popout" />,
  <OutlineIcon name="video" />,
  <OutlineIcon name="view" />,
  <SolidIcon name="notification" />,
  <SolidIcon name="share" />
];
const Icons = () => (
  <Card padded mb={24}>
    <Subheading mb={24}>Icons</Subheading>
    <Grid>
      {items.map(function(item, index) {
        return (
          <GridItem stacked center key={index}>
            {item}
            <Subheading capitalize micro mt={32}>{item.props.name}</Subheading>
          </GridItem>
        );
      })}
    </Grid>
    <CodeBlock noMargin>
{`import { Button, ButtonGroup } from "styled";
<SolidIcon name="String" />
<OutlineIcon name="String" />

// Props
// color                 Display with accent color
// name                  Name of desired icon
// size                  Icon dimensions
// strokeWidth={Number}  Stroke width
`}
    </CodeBlock>
  </Card>
);

export default Icons;
