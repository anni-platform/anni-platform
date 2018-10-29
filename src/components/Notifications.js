import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

import { ContextualMenu } from "styled";

class Notifications extends Component {
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
    const { show } = this.props;

    return (
      <Transition in={show} timeout={100} unmountOnExit>
        {state => (
          <ContextualMenu arrowOffset={74} className={state} />
        )}
      </Transition>
    );
  }
}

export default Notifications;
