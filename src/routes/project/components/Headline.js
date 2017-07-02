import React from "react";
import classNames from "classnames";
import { TextArea } from "components/baseline";

const Headline = ({ className, name, client, date, save }) => {
  const styles = classNames({
    Headline: true,
    [className]: className
  });

  return (
    <div className={styles}>
      <div className="content">
        <div>
          <TextArea
            value={name}
            placeholder="Enter client name"
            save={client => save({ client })}
            heading
          />

          <TextArea
            value={client}
            placeholder="Enter client name"
            save={client => save({ client })}
            subheading
          />
        </div>
      </div>
    </div>
  );
};

export default Headline;
