import css from './Footer.module.css';

const currentYear = new Date().getFullYear();

const Copyright = () => {
  return (
    <div className={css.copyright}>
      @{currentYear}, Foodies. All rights reserved
    </div>
  );
};

export default Copyright;
