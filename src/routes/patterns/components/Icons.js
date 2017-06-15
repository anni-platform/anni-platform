import React from "react";

import { Card, Icon } from "components/baseline";

const items = [
  <Icon name="logo" />,
  <Icon name="notification" />,
  <Icon name="confirm" />,
  <Icon name="add" />,
  <Icon name="cancel" />,
  <Icon name="audio" />,
  <Icon name="video" />
];
const Icons = () => (
  <Card className="Icons">
    <ul>
      {items.map(function(item, index) {
        return <li key={index}>{item}<h4>{item.props.name}</h4></li>;
      })}
    </ul>
  </Card>
);

export default Icons;
