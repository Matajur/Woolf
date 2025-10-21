import css from './Footer.module.css';
import { Icon } from '../UI/index.js';

const socialMediaLinks = [
  {
    href: 'https://www.facebook.com',
    label: 'Facebook',
    iconId: 'icon-facebook',
  },
  {
    href: 'https://www.instagram.com',
    label: 'Instagram',
    iconId: 'icon-instagram',
  },
  {
    href: 'https://www.youtube.com',
    label: 'YouTube',
    iconId: 'icon-youtube',
  },
];

const SocialLinks = () => {
  return (
    <ul className={css.socialLinks}>
      {socialMediaLinks.map(({ href, label, iconId }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label}>
            <Icon className={css.icon} name={iconId} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
