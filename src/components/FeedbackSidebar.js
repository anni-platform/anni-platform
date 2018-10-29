import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

import { FeedbackSidebar, FeedbackList, Paragraph, TextArea } from "styled";

class FeedbackArea extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  // Check for updates from parent component via props
  componentWillReceiveProps(nextProps) {
    const { show } = this.state;

    if (nextProps.show !== show) {
      this.setState({ show: nextProps.show });
    }
  }

  render() {
    const { show, children } = this.props;

    return (
      <Transition in={show} timeout={200} unmountOnExit>
        {state => (
          <FeedbackSidebar className={state}>
            <FeedbackList>
              {children ||
              <Paragraph padded>There are no notifications at this time!
              </Paragraph>}
            </FeedbackList>
            <TextArea placeholder="Enter comment..." sidebar />
          </FeedbackSidebar>
        )}
      </Transition>
    );
  }
}

export default FeedbackArea;
