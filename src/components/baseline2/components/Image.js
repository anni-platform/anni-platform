import React, { Component } from 'react';
import { preloadImage } from 'utils';
import PropTypes from 'prop-types';
import { Loader } from 'components/baseline';

export class ImageElement extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            error: ""
        }
    }
    componentDidMount() {
        preloadImage(this.props.src).then(() => {
            this.setState({ loaded: true });
        }).catch((e) => {
            this.setState({ error: "Error loading image" });
        });
    }
    render() {
        const { children, className } = this.props;
        const { loaded, error } = this.state;
        const style = !loaded ? { padding: 20 } : {};
        return (
            <div style={style} className={className} >
                {!loaded && !error && <Loader />}
                {!!error && <div>{error}</div>}
                {loaded && children}
            </div>
        )
    }
}
ImageElement.propTypes = {
  src: PropTypes.string.isRequired
};