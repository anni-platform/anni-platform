import React from 'react';
import { Container, Section } from 'styled';
import TextEditor from '../components/TextEditor';

export default function Script(props) {
  return (
    <Section project center>
      <Container>
        <TextEditor save={() => null} />
      </Container>
    </Section>
  );
}
