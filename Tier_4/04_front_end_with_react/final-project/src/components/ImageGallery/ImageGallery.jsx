import { ImageCard } from "components";
import styles from "./ImageGallery.module.css";

export const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.imageList}>
    {images.map((image, index) => (
      <li
        key={index}
        onClick={() => onImageClick(image)}
      >
        <ImageCard url={image.src} alt={image.alt} />
      </li>
    ))}
  </ul>
);
