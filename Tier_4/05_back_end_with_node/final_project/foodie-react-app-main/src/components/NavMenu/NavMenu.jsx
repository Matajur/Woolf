import { NavLink, useLocation } from 'react-router-dom';
import routes from '../../routes.jsx';
import { useMemo } from 'react';
import css from './NavMenu.module.css';
import clsx from 'clsx';

const NavMenu = ({ variant = 'nav', className = '', onLinkClick }) => {
  const location = useLocation();
  const navLinks = useMemo(() => routes?.filter(({ isNav }) => isNav) || [], [routes]);

  const buildLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

  return (
    <nav className={clsx(css[variant], className)}>
      {navLinks.map(({ path, title }) => (
        <NavLink key={path} to={path} className={buildLinkClass} state={{from: location.pathname}} onClick={onLinkClick} end>
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavMenu;
