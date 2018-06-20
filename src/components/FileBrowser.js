import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Toggle, ListItem } from 'styled/components/FileBrowser';

function Directory({ files, selectedItem, selectItem }) {
  if (!files) return null;
  return (
    <ul>
      {files.map(file => (
        <File {...file} selectItem={selectItem} selectedItem={selectedItem} />
      ))}
    </ul>
  );
}

class File extends PureComponent {
  state = {
    open: false,
  };
  toggle = () => this.setState({ open: !this.state.open });
  render() {
    const { open } = this.state;
    const { name, files, selectedItem, selectItem } = this.props;
    return (
      <ListItem
        onClick={e => {
          e.stopPropagation();
          selectItem(name);
        }}
        selected={selectedItem === name}
      >
        {files && (
          <Toggle
            active={open}
            onClick={this.toggle}
            name="chevron-down"
            size={10}
          />
        )}
        {name}
        {open && <Directory files={files} {...{ selectedItem, selectItem }} />}
      </ListItem>
    );
  }
}

const demoFiles = 'abcdefghijklmnop'.split('');
const getNestedFiles = (name, files) =>
  demoFiles.map(n => ({
    name: `${name} file ${n}`,
    files,
  }));

const DEFAULT_FILES = [
  {
    name: 'top',
    files: getNestedFiles(`2nd level`, getNestedFiles(`3rd level`)),
  },
];

export default class FileBrowser extends PureComponent {
  static propTypes = {
    files: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.name,
        files: PropTypes.array,
      })
    ),
  };
  static defaultProps = {
    files: DEFAULT_FILES,
  };
  state = {
    selectedItem: null,
  };
  selectItem = selectedItem => {
    console.log(selectedItem);
    this.setState({ selectedItem });
  };
  render() {
    const { files } = this.props;
    const { selectedItem } = this.state;
    return (
      <Directory
        files={files}
        selectItem={this.selectItem}
        selectedItem={selectedItem}
      />
    );
  }
}
