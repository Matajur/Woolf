import clsx from 'clsx';
import css from './Hero.module.css';
import { Container } from 'components/UI';
import heroImg_1 from '/src/images/hero/hero-cake.webp';
import heroImg_1x2 from '/src/images/hero/hero-cake@2x.webp';
import heroImg_2 from '/src/images/hero/hero-meat.webp';
import heroImg_2x2 from '/src/images/hero/hero-meat@2x.webp';
import { Btn, Section, Subtitle } from '../UI';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/auth/selectors';
import { setModalLoginOpen } from '../../store/modal/operations';

const Hero = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClickCta = () => {
    isLoggedIn ? navigate(`/recipe/add`) : dispatch(setModalLoginOpen(true));
  };

  return (
    <Section className={css.section}>
      <div className={css.wrapper}>
        <Container>
          <div className={css.heroInfo}>
            <h1 className={css.title}>{title}</h1>
            <Subtitle className={css.subtitle}>{subtitle}</Subtitle>
            <Btn variant="outlined" className={css.btn} onClick={handleClickCta}>
              Add recipe
            </Btn>
          </div>
          <div className={css.wrapperFigure}>
            <div>
              <img className={css.image_1} src={heroImg_1} srcSet={`${heroImg_1} 1x, ${heroImg_1x2} 2x`} />
            </div>
            <div>
              <img className={css.image_2} src={heroImg_2} srcSet={`${heroImg_2} 1x, ${heroImg_2x2} 2x`} />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default Hero;
