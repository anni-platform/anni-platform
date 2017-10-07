import React, { Component } from "react";
import {
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
import Icons from "./components/Icons";
import Loaders from "./components/Loaders";
import Overlays from "./components/Overlays";
import Typography from "./components/Typography";

export default class PatternLibrary extends Component {
  render() {
    return (
      <Section>
        <NavBar scroll>
          <NavItem fit>
            <Button link>Layout</Button>
          </NavItem>
          <NavItem fit>
            <Button link>Typography</Button>
          </NavItem>
          <NavItem fit>
            <Button link>Buttons</Button>
          </NavItem>
          <NavItem fit>
            <Button link>Forms</Button>
          </NavItem>
          <NavItem fit>
            <Button link>Overlays</Button>
          </NavItem>
          <NavItem fit>
            <Button link>Icons</Button>
          </NavItem>
          <NavItem fit>
            <Button link>Loader</Button>
          </NavItem>
        </NavBar>

        <Content>
          <Heading mb={6}>Pattern Library</Heading>
          <Paragraph large mb={48}>
            These components are a collection of elements that can be reused across the Anni interface.
          </Paragraph>
          <Layout />
          <Typography />
          <Buttons />
          <Overlays />
          <Icons />
          <Loaders />
          {/* <FormFields /> */}
          {/* <Panels /> */}
        </Content>
      </Section>
    );
  }
}
