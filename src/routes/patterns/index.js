import React, { Component } from "react";
import {
  Anchor,
  Button,
  Content,
  Heading,
  NavBar,
  NavItem,
  Section,
  Paragraph
} from "styled";

import Buttons from "./components/Buttons";
import Layout from "./components/Layout";
import FormFields from "./components/FormFields";
import Icons from "./components/Icons";
import Images from "./components/Images";
import Loaders from "./components/Loaders";
import Overlays from "./components/Overlays";
import Typography from "./components/Typography";
import VideoPlayer from "./components/VideoPlayer";
import Feedback from "./components/Feedback";

export default class PatternLibrary extends Component {
  render() {
    return (
      <Section>
        <NavBar scroll>
          <NavItem>
            <Button to="/dashboard" icon="arrow-back" pt={6} stacked />
          </NavItem>
          <NavItem fit>
            <Button href="#typography" link>Typography</Button>
          </NavItem>
          <NavItem fit>
            <Button href="#buttons" link>Buttons</Button>
          </NavItem>
          <NavItem  fit>
            <Button href="#forms" link>Forms</Button>
          </NavItem>
          <NavItem fit>
            <Button href="#layout" link>Layout</Button>
          </NavItem>
          <NavItem fit>
            <Button href="#images" link>Images</Button>
          </NavItem>
          <NavItem fit>
            <Button href="#icons" link>Icons</Button>
          </NavItem>
          <NavItem fit>
            <Button href="#overlays" link>Overlays</Button>
          </NavItem>
          <NavItem fit>
            <Button href="#loader" link>Loader</Button>
          </NavItem>
          <NavItem fit>
            <Button href="#video-player" link>Video Player</Button>
          </NavItem>
        </NavBar>

        <Content>
          <Heading mb={6}>Pattern Library</Heading>
          <Paragraph large mb={48}>
            These components are a collection of elements that can be reused across the Anni interface.
          </Paragraph>
          <Anchor id="typography" />
          <Typography />
          <Anchor id="buttons" />
          <Buttons />
          <Anchor id="forms" />
          <FormFields />
          <Anchor id="layout" />
          <Layout />
          <Anchor id="images" />
          <Images />
          <Anchor id="icons" />
          <Icons />
          <Anchor id="overlays" />
          <Overlays />
          <Anchor id="loader" />
          <Loaders />
          <Anchor id="video-player" />
          <VideoPlayer />
          <Anchor id="feedback" />
          <Feedback />
        </Content>
      </Section>
    );
  }
}
