import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "styled";

const _ContextualMenu = ({ children, className }) => {
  return (
    <div className={className}>
      <div className="arrow top" />
      <div className="container">
        <div className="content">
          {children ||
            <Paragraph padded>No New Notifications!</Paragraph>}
        </div>
      </div>
    </div>
  );
};

// Define Prop Types
_ContextualMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
};

export default _ContextualMenu;
