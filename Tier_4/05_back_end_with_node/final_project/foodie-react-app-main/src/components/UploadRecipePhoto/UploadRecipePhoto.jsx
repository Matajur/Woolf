import clsx from "clsx";
import { useRef} from "react";
import { Icon } from "../UI/index.js";
import css from "./UploadRecipePhoto.module.css";

const UploadRecipePhoto = ({
  register,
  setValue,
  previewImage,
  setPreviewImage,
}) => {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setValue("thumb", file);
    }
  };

  return (
    <label className={css.uploadContainer}>
      <input
        type="file"
        accept="image/*"
        {...register("thumb")}
        ref={fileInputRef}
        onChange={handleImageChange}
        className={css.fileInput}
      />
      <button
        type="button"
        className={clsx(previewImage ? css.uploadBtnWthImage : css.uploadBtn)}
        onClick={handleClick}
      >
        {previewImage ? (
          <span className={css.imageBackground}>
            <img src={previewImage} alt="Preview image" className={css.recipeThumb} />
          </span>
        ) : (
          <>
            <span className={css.iconsContainer}>
              <span className={css.iconCapture}>
                <Icon
                  name="icon-capture"
                  size="64"
                  color="#BFBEBE"
                  className={css.mainIcon}
                />
                <span className={css.iconBg}></span>
              </span>
              <Icon
                name="icon-camera"
                size="24"
                color="#BFBEBE"
                className={css.centerIcon}
              />
            </span>
            <span className={css.text}>Upload a photo</span>
          </>
        )}
      </button>
      {previewImage && (
        <button
          type="button"
          className={clsx(css.text, css.btnAfterPicture)}
          onClick={handleClick}
        >
          Upload another photo
        </button>
      )}
    </label>
  );
};

export default UploadRecipePhoto;
