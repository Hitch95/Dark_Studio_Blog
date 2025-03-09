import Image from 'next/image';
import Link from 'next/link';
// CSS
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>2025 Dark Studio All rights reserved.</p>
      <div>
        <Link
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Facebook"
        >
          <Image
            src="/1.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="Dark Studio Facebook Account"
          />
        </Link>

        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
        >
          <Image
            src="/2.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="Dark Studio Instagram Account"
          />
        </Link>

        <Link
          href="https://twitter.com/home"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Twitter"
        >
          <Image
            src="/3.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="Dark Studio Twitter Account"
          />
        </Link>

        <Link
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on YouTube"
        >
          <Image
            src="/4.png"
            width={15}
            height={15}
            className={styles.icon}
            alt="Dark Studio YouTube Account"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
