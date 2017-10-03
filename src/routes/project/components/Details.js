import React, { Component, createElement } from "react";
// import { removeFolder } from "adapters";
import { removeProject, deleteFile, updateProject } from "actions";
import filter from "lodash.filter";
import { FileCollection } from "components/FileCollection";
import constants from "constants";
import classNames from "classnames";
const { MOODBOARD, STORYBOARD, STYLEFRAMES } = constants.content;

import { Container, Section } from "styled";

import Headline from "./Headline";
import TextEditor from "./TextEditor";
import { ProjectControls, ProjectSectionNavItem } from "./ProjectControls";

const ProjectSection = (
  {
    isActive,
    SectionType,
    SectionProps,
    key,
    save,
    className
  }
) => {
  const sectionClass = classNames(className, {
    ProjectSection: true
  });
  const props = { ...SectionProps, className: sectionClass, key, save };
  return isActive ? createElement(SectionType, props, null) : null;
};

const ProjectSectionNavigator = (
  {
    name,
    Sections,
    activeSectionIndex,
    activateSectionByIndex,
    save,
    projectPath
  }
) => {
  return (
    <Container>
      <Section project>
      {Sections.map((section, index) =>
        ProjectSection({
          ...section,
          save,
          key: `section${index}`,
          isActive: activeSectionIndex === index
        }))}
      </Section>
      <ProjectControls>
        {Sections.map(({ SectionType, name }, index) =>
          createElement(ProjectSectionNavItem, {
            key: `${name}sectionNavItem${index}`,
            name,
            checked: activeSectionIndex === index,
            onClick: () => activateSectionByIndex(index),
            projectPath
          }))}
      </ProjectControls>
    </Container>
  );
};

const getSections = (project, id) => [
  {
    name: "Introduction",
    SectionType: Headline,
    SectionProps: {
      className: "",
      name: project.name,
      client: project.client
    }
  },
  {
    name: "Script",
    SectionType: TextEditor,
    SectionProps: {
      className: "",
      content: project.editorContent
    }
  },
  {
    name: "Moodboard",
    SectionType: FileCollection,
    SectionProps: {
      className: `MoodBoard`,
      projectPath: id,
      project,
      collectionId: MOODBOARD,
      title: `MOODBOARD`,
      references: true
    }
  },
  {
    name: "Storyboard",
    SectionType: FileCollection,
    SectionProps: {
      className: `Storyboard`,
      projectPath: id,
      project,
      collectionId: STORYBOARD,
      title: `STORYBOARDS`,
      storyboards: true
    }
  },
  {
    name: "Styleframes",
    SectionType: FileCollection,
    SectionProps: {
      className: `Styleframes`,
      projectPath: id,
      project,
      collectionId: STYLEFRAMES,
      title: `STYLEFRAMES`,
      styleframes: true
    }
  }
];

const getActiveSectionIndex = (props, Sections) => {
  let activeSectionIndex = 1;
  const sectionQueryParam = props.location.query.section;
  if (sectionQueryParam) {
    const foundSection = Sections.findIndex(s => s.name === sectionQueryParam);
    if (foundSection > -1) {
      activeSectionIndex = foundSection;
    }
  }
  return activeSectionIndex;
};

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    const name = props.params.id;
    this.projectPath = props.location.pathname;
    const project = props.getProjectByName(name);
    const id = project.id;
    this.id = id;
    const Sections = getSections(project, id);
    let activeSectionIndex = getActiveSectionIndex(props, Sections);

    this.state = {
      activeSectionIndex,
      Sections
    };
  }
  componentDidMount() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    if (!project) {
      this.props.router.push("/dashboard");
    }
  }

  activateSectionByIndex = activeSectionIndex =>
    this.setState({ activeSectionIndex });

  save = update =>
    this.props.dispatch(updateProject({ ...update, id: this.id }));

  render() {
    const { id } = this.props.params;
    const project = this.props.getProjectByName(id);
    if (!project) {
      this.props.router.push("/dashboard");
    }

    const { Sections, activeSectionIndex } = this.state;
    const { save, projectPath } = this;

    return (
      <Container>
        {createElement(ProjectSectionNavigator, {
          activeSectionIndex,
          activateSectionByIndex: this.activateSectionByIndex,
          Sections,
          save,
          projectPath
        })}
      </Container>
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
        collection.indexOf(file));
      if (!filter(fileUsed, i => i > -1).length) {
        this.props.dispatch(deleteFile(file));
      }
    });
    this.props.router.push("/dashboard");
  }
}
