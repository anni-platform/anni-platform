import React from "react";
import { TextArea } from "components/baseline";
import moment from 'moment';

const currentDate = moment().format('MMMM Do YYYY');

const Headline = ({ name, client, date, save }) => {
  return (
    <div className="Headline">
      <div className="content">
        <h1>{name}</h1>

        <TextArea
          html={client ? client : "Client Name"}
          save={client => save({ client })}
          subheading
        />

        <TextArea
          className="date"
          html={date ? date : currentDate}
          save={date => save({ date })}
          center
        />
      </div>
    </div>
  );
};

export default Headline;
