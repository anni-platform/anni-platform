import React, { Component } from "react";
import PropTypes from "prop-types";
import { Avatar, Paragraph, TextArea, Subheading } from "styled";
import Transition from "react-transition-group/Transition";

class _FeedbackItem extends Component {
  constructor() {
    super();
    this.state = {
      isNew: false,
      isOpen: false,
    };
  }

  handleContextualNote = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const {
      direction,
      author,
      className,
      contextual,
      message,
      commentCount,
      time,
    } = this.props;

    const { isNew, isOpen } = this.state;

    return (
      <div className={`${className} ${direction}`}>
        {contextual && (
          <div>
            {isNew ? (
              <div className="newItem">
                <span className="legend">Add Comment</span>
              </div>
            ) : (
              <div className="badge" onClick={this.handleContextualNote}>
                <div className="content">
                  <Subheading micro className="commentCount">
                    {commentCount || "1"}
                  </Subheading>
                </div>
                <div className="pulsatingRings" />
              </div>
            )}
          </div>
        )}
        <Transition in={contextual ? isOpen : true} timeout={100} unmountOnExit>
          {state => (
            <div className={`note ${state}`}>
              {contextual && <div className={`arrow ${direction}`} />}
              <div className="container">
                <Avatar initial={author.charAt(0)} mr={12} />
                <div className="content">
                  <Paragraph color strong inline>
                    {author}
                  </Paragraph>
                  <Paragraph subtle small ml={16} inline>
                    {time}
                  </Paragraph>
                  <Paragraph>{message}</Paragraph>
                </div>
              </div>
              {contextual && (
                <TextArea placeholder="Enter comment..." feedback />
              )}
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

// Define Prop Types
_FeedbackItem.propTypes = {
  arrow: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.object,
  contextual: PropTypes.bool,
  feedback: PropTypes.string,
  time: PropTypes.string,
};

export default _FeedbackItem;
