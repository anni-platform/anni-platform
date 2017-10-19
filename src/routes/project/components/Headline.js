import React from "react";
import { Content, Heading, Input, Section } from "styled";

const Headline = ({ name, client, date, save }) => {
  return (
    <Section project center>
      <Content>
        <Heading mb={24} capitalize>{name}</Heading>
        <Input
          value={client}
          placeholder="Enter client name"
          save={client => save({ client })}
          subheading
        />
      </Content>
    </Section>
  );
};

export default Headline;
