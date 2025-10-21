import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import css from './HomePage.module.css';
import { Section, Container, Btn } from 'components/UI';
import Hero from 'components/Hero/Hero';
import Testimonials from 'components/Testimonials/Testimonials';

import { selectTestimonials } from 'store/testimonials/selectors';
import { fetchTestimonials } from 'store/testimonials/operations';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const testimonials = useSelector(selectTestimonials);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const heroProps = {
    title: 'Improve Your Culinary Talents',
    subtitle: 'Amazing recipes for beginners in the world of cooking, enveloping you in the aromas and tastes of various cuisines.',
  };

  return (
    <>
      <Hero {...heroProps}>
        <Btn variant="outlined" className={css.heroBtn} onClick={() => navigate('/catalog')}>
          Add recipe
        </Btn>
      </Hero>
      <Section id="homepage-categories" className={css.section}>
        <Container>
          <Outlet />
        </Container>
      </Section>

      <Section style={{ marginBottom: 80 }}>
        <Container>{testimonials?.length && <Testimonials testimonials={testimonials} />}</Container>
      </Section>
    </>
  );
};

export default HomePage;
