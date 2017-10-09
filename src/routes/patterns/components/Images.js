import React, { Component } from "react";
import { Card, CodeBlock, Subheading, Image } from "styled";
import { ImageList } from "components/ImageList";
import demoImage from 'media/04.png';

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
    url: require("./content/references/06.png"),
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
        <Subheading mb={24}>Images</Subheading>
        <Subheading capitalize color micro mb={24}>Image</Subheading>
        <Image src={demoImage} />
        <CodeBlock>
{`import { Image } from "styled";

<Image src={image} />

// Props
// center             Center content
// width={Number}     Define a custom max-width
// mt={Number}        Margin top
// mr={Number}        Margin right
// mb={Number}        Margin bottom
// ml={Number}        Margin left
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
// reference     Display as a resizeable grid with description field
// storyboard    Display with audio/video text fields
`}
        </CodeBlock>
      </Card>
    );
  }
}

export default Layout;
