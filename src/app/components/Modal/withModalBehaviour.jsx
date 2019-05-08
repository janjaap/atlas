import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const propTypes = {
  id: PropTypes.string.isRequired,
  closeModalAction: PropTypes.func,
  open: PropTypes.bool
};

function withModalBehaviour(WrappedComponent) {
  class Modal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        open: this.props.open
      };

      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    // Hack to open the modal from other libraries than React (now used by angular)
    componentDidMount() {
      window.addEventListener(`openForm_${this.props.id}`, this.handleOpen);
    }

    componentWillUnmount() {
      window.removeEventListener(`openForm_${this.props.id}`, this.handleOpen);
    }

    handleOpen() {
      this.setState({ open: true });
    }

    handleClose() {
      this.setState({ open: false });
      this.props.closeModalAction();
    }

    render() {
      const { open } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          handleClose={this.handleClose}
          open={open}
        />
      );
    }
  }

  Modal.defaultProps = {
    closeModalAction: () => {
    },
    open: false
  };

  Modal.propTypes = propTypes;

  return Modal;
}


export default withModalBehaviour;
