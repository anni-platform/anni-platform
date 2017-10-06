import React, { Component } from "react";
import { Section, Content } from "styled";
import Typography from "./components/Typography";
import Buttons from './components/Buttons';
import Icons from './components/Icons';
import Loaders from "./components/Loaders";
// import ImageLists from './components/ImageLists'
// import FormFields from './components/FormFields';
// import Panels from './components/Panels';
// import Alerts from './components/Alerts';

export default class PatternLibrary extends Component {
  render() {
    return (
      <Section>
        <Content>
          <Typography />
          <Buttons />
          <Icons />
          {/* <ImageLists /> */}
          {/* <FormFields /> */}
          {/* <Panels /> */}
          {/* <Alerts /> */}
        </Content>
      </Section>
    );
  }
}
