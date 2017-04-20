import React from 'react';

const Card = ({ children }) => (
  <div className="Card">
    <div className="content">
      {children}
    </div>
  </div>
);

export default Card;
