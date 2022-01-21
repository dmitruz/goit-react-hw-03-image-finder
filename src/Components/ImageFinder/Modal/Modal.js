import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import styles from './Modal.module.css';

import { createPortal } from "react-dom";
import { Overlay, ModalContainer } from "./Modal.styled";
/*class Modal extends Component {
  state = {
    isModalOpen: true,
  };

  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    handleModalClose: PropTypes.func.isRequired,
  };

  overlayRef = createRef();

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyPress);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyPress);
  };

  handleKeyPress = event => {
    if (event.code !== 'Escape') return;
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
    this.props.handleModalClose();
  };

  handleOverlayClick = event => {
    const { current } = this.overlayRef;
    if (current && event.target !== current) return;
    this.toggleModal();
  };

  render() {
    const { largeImageURL } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        {isModalOpen && (
          <div
            className={styles.overlay}
            onClick={this.handleOverlayClick}
            ref={this.overlayRef}
            role="presentation"
          >
            <div className={styles.modal}>
              <img src={largeImageURL} alt="" className={styles.img} />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Modal;
*/
const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalContainer>{this.props.children}</ModalContainer>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};