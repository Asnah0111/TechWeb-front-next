import styles from "../app/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <img src="/img/Vector.svg" alt="Sun Co" className={styles.logo} />
        <span className={styles.brand}>SUN CO.</span>
      </div>
      <div className={styles.center}>
        {new Date().getFullYear()} dot.cards test task. All rights reserved
      </div>
      <div className={styles.right}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
          className={styles.icon}
        >
          <img src="/img/Instagram.svg" alt="" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener"
          aria-label="Twitter"
          className={styles.icon}
        >
          <img src="/img/Twitter.svg" alt="" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener"
          aria-label="YouTube"
          className={styles.icon}
        >
          <img src="/img/Youtube.svg" alt="" />
        </a>
      </div>
    </footer>
  );
}
