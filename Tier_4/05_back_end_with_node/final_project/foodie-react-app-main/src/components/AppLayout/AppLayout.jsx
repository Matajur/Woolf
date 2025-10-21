import { Suspense, useEffect } from 'react';
import { useMatches } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../Header/Header.jsx';
import { AppLoader } from 'components/UI';
import { getSeo } from '../../seo';
import { useState } from 'react';
import Footer from '../Footer/Footer.jsx';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { closeLoginModal } from '../../store/modal/slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoginOpen } from '../../store/modal/selectors.js';
import LoginModal from '../LoginModal/LoginModal.jsx';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const matches = useMatches();
  const currentRouteName = matches.find(match => match.handle)?.handle.routeName;
  const layoutClass = matches
    .map(m => m.handle?.layoutClass)
    .filter(Boolean)
    .at(-1);

  const showLoginModal = useSelector(selectIsLoginOpen);

  const closeModal = () => {
    dispatch(closeLoginModal());
  };

  const [seo, setSeo] = useState({});
  useEffect(() => {
    const t = getSeo(currentRouteName);
    setSeo(t);
  }, [currentRouteName]);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        {seo.meta?.map(({ name, content }, index) => (
          <meta key={index} name={name} content={content} />
        ))}
      </Helmet>
      <Header className={layoutClass} />
      <main>
        <Suspense fallback={<AppLoader visible={true} />}>{children}</Suspense>
      </main>
      <Footer />
      <Toaster position="bottom-center" reverseOrder={false} />
      {showLoginModal && <LoginModal onClose={closeModal} />}
    </>
  );
};

export default AppLayout;
