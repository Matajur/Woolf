import css from './Logo.module.css';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

const Logo = ({ isDark, className = '' }) => {
  return isDark ? (
    <div className={clsx(css.logo, className)}>foodies</div>
  ) : (
    <Link to="/" className={clsx(css.logo, className)}>
      foodies
    </Link>
  );
};

export default Logo;
