import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Section, Content } from 'styled';
import { Router, Link } from '@reach/router';
import Headline from '../components/Headline';
import Script from '../script';

function ProjectDetails({ children, project }) {
  return (
    <Container>
      <Router>
        <Headline default {...project} />
        <Script path="script" />
      </Router>
      <nav>
        <Link to="script">script</Link>
      </nav>
    </Container>
  );
}

const mapStateToProps = ({ projects }, { projectId }) => ({
  project: Object.values(projects.toJS()).find(p => p.name === projectId),
});

export default connect(mapStateToProps)(ProjectDetails);
