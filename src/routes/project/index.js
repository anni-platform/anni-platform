import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import constants from "constants";
import ProjectManager from "containers/ProjectManager";
import ProjectDetails from "./components/Details";
import ProjectForm from "./components/CreateForm";
import AuthManager from "containers/AuthManager";

class Project extends PureComponent {
  render() {
    const { action } = this.props.params;
    switch (action) {
      case constants.project.newProject:
        return <ProjectForm {...this.props} />;
      default:
        return <ProjectDetails {...this.props} />;
    }
  }
}

export default ProjectManager(withRouter(AuthManager(Project)));
