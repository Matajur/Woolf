import Logo from '../Logo/Logo';
import NavMenu from '../NavMenu/NavMenu';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import css from './Header.module.css';
import { Btn, Container, Icon } from '../UI/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useMatches } from 'react-router-dom';
import LoginModal from 'components/LoginModal/LoginModal.jsx';
import { setModalLoginOpen } from 'store/modal/operations';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

const Header = ({ className }) => {
  const dispatch = useDispatch();
  const matches = useMatches();
  const layoutClass = matches
    .map(m => m.handle?.layoutClass)
    .filter(Boolean)
    .at(-1);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { isLoginModalOpen } = useSelector(state => state.modal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimatingClose, setIsAnimatingClose] = useState(false);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isMobileMenuOpen) {
      html.classList.add(css.noScroll);
      body.classList.add(css.noScroll);
    } else {
      html.classList.remove(css.noScroll);
      body.classList.remove(css.noScroll);
    }

    return () => {
      html.classList.remove(css.noScroll);
      body.classList.remove(css.noScroll);
    };
  }, [isMobileMenuOpen]);

  const openMenu = () => {
    setIsMobileMenuOpen(true);
    setIsAnimatingClose(false);
    setIsAnimatingOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimatingOpen(true);
      });
    });
  };

  const closeMenu = () => {
    setIsAnimatingClose(true);
    setIsAnimatingOpen(false);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsAnimatingClose(false);
    }, 300);
  };

  const handleLoginModalClose = () => {
    dispatch(setModalLoginOpen(false));
  };

  return (
    <header className={className}>
      <div className={clsx(css.headerWrapper, layoutClass === 'home' && css.headerWrapperDark)}>
        <Container className={layoutClass === 'home' && css.container} dataTheme={layoutClass === 'home' ? 'dark' : ''}>
          {isMobileMenuOpen && <div className={css.overlay} onClick={closeMenu} />}
          <div id="menuContainer" className={clsx(isMobileMenuOpen ? css.menuContainerMobile : css.menuContainer,
            isAnimatingOpen && css.menuContainerOpen,
            isAnimatingClose && css.menuContainerClosed)}>
            {isMobileMenuOpen && (
              <Btn variant="clear" className={css.menuClose} aria-label="Close menu" onClick={closeMenu}>
                <Icon name="icon-close" className={css.closeIcon} />
              </Btn>
            )}
            <Logo isDark={layoutClass === 'home'} className={isMobileMenuOpen ? css.logoMenu : css.logoDesktop} />
            <NavMenu variant={isMobileMenuOpen ? 'navMenu' : 'nav'} onLinkClick={isMobileMenuOpen ? closeMenu : undefined} />
            {!isMobileMenuOpen && (
              <div className={css.menuAndUser}>
                {isLoggedIn ? <UserBar /> : <AuthBar />}
                <Btn
                  variant="clear"
                  className={css.menuOpen}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label="Open menu"
                  onClick={openMenu}
                >
                  <Icon name="icon-burger-menu" className={css.burgerIcon} />
                </Btn>
              </div>
            )}
          </div>
          {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} />}
        </Container>
      </div>
    </header>
  );
};

export default Header;
