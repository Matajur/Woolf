import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { Icon } from '../UI/index.js';
import { updateAvatarThunk } from '../../store/auth/operations.js';
import css from './UploadUserAvatar.module.css';

const UploadUserAvatar = ({ avatar }) => {
  const { register } = useForm();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(avatar);
  const dispatch = useDispatch();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    const formData = new FormData();
    formData.append('avatar', file);
    dispatch(updateAvatarThunk(formData));
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  };

  return (
    <form>
      <label>
        <input
          type="file"
          accept="image/*"
          {...register('avatar')}
          ref={e => {
            fileInputRef.current = e;
            register('avatar').ref(e);
          }}
          className={css.fileInput}
          onChange={handleImageChange}
        />
        <button type="button" onClick={handleClick} className={css.btnUploadAvatar}>
          <span className={css.imgThumb}>
            <img src={previewImage} alt="User avatar" className={css.avatarImg} />
          </span>
          <span className={css.addBtn}>
            <Icon name="icon-plus" size="18" color="#FFFFFF" className={css.iconPlus} />
          </span>
        </button>
      </label>
    </form>
  );
};

export default UploadUserAvatar;
