import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerDesc}>
        Made with ✨ by{' '}
        <a
          className={styles.footerLink}
          href="https://github.com/Matajur"
          target="_blank"
          rel="noopener noreferrer"
        >
          Matajur
        </a>
      </p>
    </footer>
  );
};
