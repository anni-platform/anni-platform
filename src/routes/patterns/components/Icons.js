import React from "react";

import { Card, CodeBlock, OutlineIcon, SolidIcon, Grid, GridItem, Subheading } from "styled";

const items = [
  <OutlineIcon strokeWidth={3} name="add" />,
  <OutlineIcon strokeWidth={3} name="arrow-back" />,
  <OutlineIcon strokeWidth={3} name="audio" />,
  <OutlineIcon strokeWidth={3} name="cancel" />,
  <OutlineIcon strokeWidth={3} name="confirm" />,
  <OutlineIcon strokeWidth={3} name="delete" />,
  <OutlineIcon strokeWidth={3} name="more" />,
  <SolidIcon name="notification" />,
  <OutlineIcon strokeWidth={3} name="popout" />,
  <SolidIcon name="share" />,
  <OutlineIcon strokeWidth={3} name="video" />,
  <OutlineIcon strokeWidth={3} name="view" />
];
const Icons = () => (
  <Card padded mb={24}>
    <Subheading mb={24}>Icons</Subheading>
    <Grid small>
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
<SolidIcon name="String"/>
<OutlineIcon name="String"/>

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
