import React, { Component } from "react";
import classNames from "classnames";
import { ImageViewer } from "./ImageViewer";
import { ImageElement } from "./Image";
import {
  Button,
  Container,
  Card,
  DraggableCard,
  FieldGroup,
  Grid,
  Image,
  ImageControls,
  ImageControlsButton,
  TextArea
} from "styled";

import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import { ImageAspectRatio } from "utils";

/*
 * Image List Item
 */

export const ImageListItem = SortableElement(({
  children,
  content,
  index,
  className,
  handleClick,
  onCaptionUpdate,
  reference,
  storyboard,
  size,
  onImageSizeUpdate,
  onImageRemove
}) => {
  const src = !content.url ? content.preview : content.url;
  const { aspectRatio, name, caption, audio, video } = content;
  const imageAspectRatio = ImageAspectRatio[aspectRatio]
    ? ImageAspectRatio[aspectRatio].name
    : undefined;
  const styles = classNames({
    [className]: !!className,
    [imageAspectRatio]: true
  });

  const resizeButton = (
    <ImageControlsButton
      className={
        `resizeButton ${imageAspectRatio ? `hasSize ${imageAspectRatio}` : null}`
      }
    >
      {ImageAspectRatio.enumValues.map(i => (
        <div
          key={index + i.name}
          className={`${i.name} ${imageAspectRatio === i.name ? "active" : ""}`}
          onClick={() => onImageSizeUpdate({ aspectRatio: i.name })}
        />
      ))}
    </ImageControlsButton>
  );

  return (
    <DraggableCard className={styles} key={index} active>
      <Card>
        <ImageElement src={src} className="image">
          <Image src={src} alt={name} />
        </ImageElement>

        {reference &&
          <FieldGroup>
            <TextArea
              placeholder="Enter description..."
              onChange={({ target }) =>
                onCaptionUpdate({ caption: target.value })}
              value={caption}
              imageItem
            />
          </FieldGroup>}

        {storyboard &&
          <FieldGroup stacked>
            <TextArea
              icon="audio"
              placeholder="Audio"
              onChange={({ target }) =>
                onCaptionUpdate({ audio: target.value })}
              value={audio}
              imageItem
            />
            <TextArea
              icon="video"
              placeholder="Video"
              onChange={({ target }) =>
                onCaptionUpdate({ video: target.value })}
              value={video}
              imageItem
            />
          </FieldGroup>}

        <ImageControls className="disableDnD">
          {reference && resizeButton}
          <Button
            icon="popout"
            onClick={handleClick}
            iconStroke={4}
            noBorder
            iconSize={18}
          />
          <Button
            icon="delete"
            onClick={onImageRemove}
            iconStroke={4}
            noBorder
          />
        </ImageControls>
      </Card>
    </DraggableCard>
  );
});

/*
 * Image Grid
 */

const ImageGrid = SortableContainer(({
  items,
  className,
  handleClick,
  onCaptionUpdate,
  children,
  reference,
  storyboard,
  onImageSizeUpdate,
  removeCollectionItem,
  type
}) => {
  const listItems = items.map((item, index) => (
    <ImageListItem
      key={`imageListItem${index}`}
      content={item}
      index={index}
      handleClick={() => handleClick(index)}
      onCaptionUpdate={content => onCaptionUpdate(index, content)}
      onImageSizeUpdate={content => onImageSizeUpdate(index, content)}
      onImageRemove={() => removeCollectionItem(index, item.name)}
      storyboard={storyboard}
      reference={reference}
    >
      {children}
    </ImageListItem>
  ));
  return <Grid className={className}>{listItems}</Grid>;
});

/*
 * Image List
 */

export class ImageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: null,
      showViewer: false,
      items: props.content
    };
  }

  componentWillReceiveProps({ content }) {
    this.setState({ items: content });
  }

  handleClick = selection => this.setState({ selection, showViewer: true });

  onSortEnd = ({ oldIndex, newIndex }) =>
    this.props.onReorder(arrayMove(this.state.items, oldIndex, newIndex));

  shouldCancelStart = e => {
    // check classname
    const disabledClasses = ["viewerTarget", "disableDnD"];
    const targetClassNames = e.target.className &&
      typeof e.target.className === "string"
      ? e.target.className.split(" ")
      : [];
    let isDisabledClass = false;
    targetClassNames.forEach(c => {
      if (disabledClasses.indexOf(c) !== -1) {
        isDisabledClass = true;
      }
    });

    // check tagName
    const disabledElements = [
      "input",
      "textarea",
      "select",
      "option",
      "button"
    ];

    const isDisabledElement = disabledElements.indexOf(
      e.target.tagName.toLowerCase()
    ) !== -1;

    return isDisabledClass || isDisabledElement;
  };

  render() {
    const {
      content,
      children,
      className,
      references,
      storyboards,
      updateCollectionItem,
      removeCollectionItem
    } = this.props;
    const { showViewer, selection } = this.state;

    const imageViewer = showViewer
      ? <ImageViewer
          content={content}
          selection={selection}
          show={showViewer}
          onClose={() => {
            this.setState({
              selection: null,
              showViewer: false
            });
          }}
        >
          {children}
        </ImageViewer>
      : null;

    const styles = classNames({
      ImageList: true,
      className,
      references,
      storyboards
    });

    if (content) {
      return (
        <Container>
          <ImageGrid
            helperClass={"dragHelper"}
            axis="xy"
            className={styles}
            items={this.state.items}
            onSortEnd={this.onSortEnd}
            handleClick={this.handleClick}
            shouldCancelStart={this.shouldCancelStart}
            onCaptionUpdate={updateCollectionItem}
            onImageSizeUpdate={updateCollectionItem}
            removeCollectionItem={removeCollectionItem}
            reference={references}
            storyboard={storyboards}
          >
            {children}
          </ImageGrid>
          {imageViewer}
        </Container>
      );
    } else {
      return null;
    }
  }
}
