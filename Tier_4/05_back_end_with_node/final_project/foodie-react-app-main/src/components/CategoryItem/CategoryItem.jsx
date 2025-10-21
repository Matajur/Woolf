import { Btn, Chip, Icon } from 'components/UI';
import css from './CategoryItem.module.css';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ category, className = '' }) => {
  const { id, name: catName, srcSet: srcSetObj = {} } = category;
  const navigate = useNavigate();
  const placeholder = `https://placehold.co/900x600?text=${catName}`;
  const srcSet = Object.entries(srcSetObj)
    .map(([resolution, url]) => `${url} ${resolution}`)
    .join(', ') ?? [placeholder];

  const slug = catName?.toLowerCase().trim().replace(/\s+/g, '_');

  return (
    <div className={clsx(css.card, className)} onClick={() => navigate(`category/${slug}`)}>
      <img src={srcSet['1x']} srcSet={srcSet} alt={catName} className={css.cardImage} />
      <div className={css.backdrop}></div>
      <div className={css.actions}>
        <Chip className={css.chip} label={catName} />
        <Btn variant="btn-icon">
          <Icon name="icon-arrow-up-right" size="18" color="#fff" />
        </Btn>
      </div>
    </div>
  );
};

export default CategoryItem;
