import React, { Component } from "react";
import { init } from "ityped";

export default class Typed extends Component {
  componentDidMount() {
    init(this.text, {
      strings: ["animators", "storytellers", "motion designers"],
      typeSpeed: 120,
      backSpeed: 90,
      startDelay: 400,
      backDelay: 8000,
      loop: true,
      showCursor: true,
      cursorChar: "|"
    });
  }

  render() {
    return <span ref={t => this.text = t} />;
  }
}
