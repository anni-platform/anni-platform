import React, { Component } from "react";
import { Card, CodeBlock, Grid, GridItem, Subheading } from "styled";
import { ImageList } from "components/ImageList";

const references = [
  {
    url: require("./content/references/01.png"),
    name: "1",
    aspectRatio: ""
  },
  {
    url: require("./content/references/02.png"),
    name: "2",
    aspectRatio: ""
  },
  { url: require("./content/references/03.png"),
    name: "3",
    aspectRatio: "" },
  {
    url: require("./content/references/04.png"),
    name: "5",
    aspectRatio: ""
  }
];

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      list1: references,
    };
  }
  render() {
    const { list1 } = this.state;
    return (
      <Card mb={24} padded>
        <Subheading mb={24}>Layout</Subheading>
        <Subheading capitalize color micro mb={24}>Wrapper</Subheading>


        <Subheading capitalize color micro mb={24}>Section</Subheading>


        <Subheading capitalize color micro mb={24}>Content</Subheading>
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

        <Subheading micro color capitalize mb={24} mt={24}>Sortable Image Grid</Subheading>
        <ImageList
          content={list1}
          references
          onReorder={list1 => this.setState({ list1 })}
        />
        <Subheading mb={24} />
        <CodeBlock noMargin>
{`import { ImageList } from "components/ImageList";
import { ImageAspectRatio } from "utils";

const contentArray = [
  {
    url: require("path/to/image"),
    name: "name",
    aspectRatio: ImageAspectRatio.SIZE.name
  }
];

<ImageList
  content={contentArray}
  onReorder={listName => this.setState({ listName })}
/>

// Props
// center    Display centered within container
// fullPage  Display centered on full-screen
`}
        </CodeBlock>
      </Card>
    );
  }
}

export default Layout;
