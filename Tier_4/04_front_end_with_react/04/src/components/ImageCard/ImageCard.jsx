const ImageCard = ({ url, author, alt, description, likes }) => {
  return (
    <div>
      <img src={url} alt={alt} />
      <p>Author: {author}</p>
      <p>Likes: {likes}</p>
      <p>Description: {description}</p>
    </div>
  );
};

export default ImageCard;
