import React, { Component } from "react";
import { Button } from "styled";
import { ImageList } from "components/ImageList";
import { ImageAspectRatio } from "utils";

const references = [
  {
    url: require("./content/references/01.jpg"),
    name: "1",
    aspectRatio: ImageAspectRatio.long.name
  },
  {
    url: require("./content/references/02.png"),
    name: "2",
    aspectRatio: ImageAspectRatio.tall.name
  },
  { url: require("./content/references/03.jpg"), name: "3", aspectRatio: "" },
  {
    url: require("./content/references/05.jpg"),
    name: "5",
    aspectRatio: ImageAspectRatio.full.name
  },
  { url: require("./content/references/06.jpg"), name: "6", aspectRatio: "" },
  { url: require("./content/references/04.jpg"), name: "4", aspectRatio: "" }
];

const storyboards = [
  { url: require("./content/storyboards/01.jpg"), name: "1" },
  { url: require("./content/storyboards/02.jpg"), name: "2" },
  { url: require("./content/storyboards/03.jpg"), name: "3" },
  { url: require("./content/storyboards/04.jpg"), name: "4" }
];

class ImageLists extends Component {
  constructor() {
    super();
    this.state = {
      list1: references,
      list2: storyboards
    };
  }
  render() {
    const { list1, list2 } = this.state;
    return (
      <div>
        <h4 className="legend">Images</h4>
        <h4 className="legend">References</h4>
        <div>
          <ImageList
            content={list1}
            references
            onReorder={list1 => this.setState({ list1 })}
          >
            <Button icon="resize" noPadding />
          </ImageList>
        </div>
        <h4 className="legend">Storyboards</h4>
        <div>
          <ImageList
            content={list2}
            storyboards
            onReorder={list1 => this.setState({ list2 })}
          />
        </div>
      </div>
    );
  }
}

export default ImageLists;
