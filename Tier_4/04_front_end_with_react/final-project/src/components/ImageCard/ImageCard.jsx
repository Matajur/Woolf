import styles from "./ImageCard.module.css";

export const ImageCard = ({ url, alt }) => {
  return (
    <div className={styles.imageCard}>
      <img src={url} alt={alt} style={{ width: "120px", height: "120px" }} className={styles.image} />
    </div>
  );
};
