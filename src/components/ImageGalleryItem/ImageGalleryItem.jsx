import React, { Component } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { image } = this.props;

    return (
      <>
        <li className={css.galleryItem}>
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={css.ImageGalleryItemImage}
            onClick={this.toggleModal}
          />
          {this.state.showModal && (
            <Modal
              largeImageURL={image.largeImageURL}
              alt={image.tags}
              onClose={this.toggleModal}
            />
          )}
        </li>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
