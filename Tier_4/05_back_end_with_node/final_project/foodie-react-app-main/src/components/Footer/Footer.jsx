import Logo from '../Logo/Logo';
import Copyright from './Copyright.jsx';
import SocialLinks from './SocialLinks.jsx';
import css from './Footer.module.css';
import {Container} from "../UI/index.js";

const Footer = () => {
  return (
    <footer>
        <Container className={css.footer}>
          <Logo />
          <SocialLinks />
        </Container>
        <Copyright />
    </footer>
  );
};

export default Footer;
