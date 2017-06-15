import React, { Component } from "react";
import { removeFolder } from "adapters";
import { removeProject, deleteFile, updateProject } from "actions";
import Headline from "./Headline";
import TextEditor from "./TextEditor";
import filter from "lodash.filter";
import { Button, FileCollection } from "components/baseline";
import constants from "constants";
import classNames from "classnames";
const {
  MOODBOARD,
  STORYBOARD,
  STYLEFRAMES
} = constants.content;

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
      this.props.router.push("/dashboard")
    }
   const sectionClass = classNames({
      "Project-section": true
   });
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
        <FileCollection
          className={`MoodBoard ${sectionClass}`}
          projectPath={id}
          project={project}
          collectionId={MOODBOARD}
          title="Moodboard"
          references
         />
        <FileCollection
          className={`StoryBoard ${sectionClass}`}
          projectPath={id}
          project={project}
          collectionId={STORYBOARD}
          title="Storyboard"
          storyboards
         />

        <FileCollection
          className={`StyleFrames ${sectionClass}`}
          projectPath={id}
          project={project}
          collectionId={STYLEFRAMES}
          title="Style Frames"
          styleframes
         />
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
