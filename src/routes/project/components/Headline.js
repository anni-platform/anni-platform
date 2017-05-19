import React from "react";
import { TextEditor } from "components/baseline";

const Headline = ({ name, client, date, save }) => {
  return (
    <div className="Headline">
      <div className="content">
        <h1>{name}</h1>
        <TextEditor
          html={`<h3>${client ? client : "Client Name"}</h3>`}
          save={client => save({ client })}
        />
        <TextEditor
          html={`<p className=\"date\">${date ? date : "November 20, 2016"}</p>`}
          save={date => save({ date })}
        />
      </div>
    </div>
  );
};

export default Headline;
