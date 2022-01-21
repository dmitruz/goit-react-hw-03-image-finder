import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

/*const GalleryItem = ({ id, imageSrc, alt, handleLargeImage }) => {
  return (
    <li
      className={styles.item}
      data-id={id}
      onClick={handleLargeImage}
      role="presentation"
    >
      <img src={imageSrc} alt={alt} className={styles.itemImage} />
    </li>
  );
};

GalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleLargeImage: PropTypes.func.isRequired,
};

export default GalleryItem;
*/
export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  alt,
  onImageClick,
}) {
  return (
    <li
      className={styles.item}
      src={webformatURL}
        alt={alt}
        onClick={() => onImageClick(largeImageURL)}
      />
    
  );
}
ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};