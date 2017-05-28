import React, { Component } from "react";
import { removeFolder } from "adapters";
import { removeProject, deleteFile, updateProject } from "actions";
import Headline from "./Headline";
import TextEditor from "./TextEditor";
import Moodboard from "./Moodboard";
import filter from "lodash.filter";
import { Button } from "components/baseline";

export default class ProjectDetail extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    if (!project) {
      this.props.router.push("/dashboard");
    }
  }
  render() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    if (!project) {
      return <div className="Project-deleted">Project deleted.</div>;
    }
    return (
      <div className="ProjectDetail">
        <Headline
          name={project.name}
          client={project.client && project.client.text}
          date={project.date && project.date.text}
          save={update => this.props.dispatch(updateProject({...update, id: project.id}))}

        />
        <TextEditor
          content={project.editorContent}
          save={update => {
          update.id = project.id;
          this.props.dispatch(updateProject(update));
        }} />
        <Moodboard projectPath={id} project={project} />
        <div>
          <Button
            onClick={() => {
              removeFolder(project.path_display).then(
                this._removeProject.bind(this)
              );
            }}
          >
            Delete Project
          </Button>
        </div>
      </div>
    );
  }

  _removeProject() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    this.props.dispatch(removeProject(project.id, id));
    const collectionKeys = Object.keys(this.props.files.collections);
    // remove all unused files from store
    Object.keys(this.props.files.archive).forEach(file => {
      const fileUsed = collectionKeys.map(collection =>
        collection.indexOf(file)
      );
      if (!filter(fileUsed, i => i > -1).length) {
        this.props.dispatch(deleteFile(file));
      }
    });
    this.props.router.push("/dashboard");
  }
}
