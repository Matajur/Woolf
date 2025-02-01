import ImageCard from "components/ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

export const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.imageList}>
    {images.map((image) => (
      <li
        className={styles.imageCard}
        key={image.id}
        onClick={() => onImageClick(image)}
      >
        <ImageCard
          url={image.urls.small}
          author={image.user.name}
          alt={image.alt_description}
          description={image.description}
          likes={image.likes}
        />
      </li>
    ))}
  </ul>
);
