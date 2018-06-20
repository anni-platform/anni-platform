import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectManager from 'containers/ProjectManager';
import { ProjectList, ProjectListItem } from './components/ProjectList';
import { Content, Heading, Paragraph, Section } from 'styled';

class Dashboard extends Component {
  render() {
    const { projects, auth } = this.props;
    const userInfo = auth.get('userInfo');
    const projectItems = projects.map(project => {
      return (
        <ProjectListItem
          id={project.id}
          name={project.name}
          path={project.path_display}
          key={project.name}
        />
      );
    });

    const empty = (
      <Section>
        <Paragraph>Empty</Paragraph>
      </Section>
    );

    const projectsList = <ProjectList>{projectItems}</ProjectList>;

    return (
      <Section>
        <Content>
          <Heading>
            Welcome Back{' '}
            {userInfo && userInfo.name && userInfo.name.familiar_name}!
          </Heading>
          <Paragraph mb={32} strong>
            You have 12 unread notifications
          </Paragraph>
          <Paragraph mb={24} strong>
            Your Projects
          </Paragraph>
          <Content full>{projectItems.length ? projectsList : empty}</Content>
        </Content>
      </Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: Object.values(state.projects.toJS()),
  };
}

export default connect(mapStateToProps)(ProjectManager(Dashboard));
