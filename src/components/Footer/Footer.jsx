import Image from 'next/image';
import Link from 'next/link';
// CSS
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span>2025 </span>
        <span>Dark Studio </span>
        <span>All rights reserved.</span>
      </p>
      <div className={styles.socials}>
        <Link
          href='https://www.facebook.com/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Follow us on Facebook'
        >
          <Image
            src='/1.png'
            width={15}
            height={15}
            className={styles.icon}
            alt='Dark Studio Facebook Account'
          />
        </Link>

        <Link
          href='https://www.instagram.com/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Follow us on Instagram'
        >
          <Image
            src='/2.png'
            width={15}
            height={15}
            className={styles.icon}
            alt='Dark Studio Instagram Account'
          />
        </Link>

        <Link
          href='https://x.com/home'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Follow us on X'
        >
          <Image
            src='/3.webp'
            width={15}
            height={15}
            className={styles.icon}
            alt='Dark Studio X Account'
          />
        </Link>

        <Link
          href='https://www.youtube.com/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Follow us on YouTube'
        >
          <Image
            src='/4.png'
            width={15}
            height={15}
            className={styles.icon}
            alt='Dark Studio YouTube Account'
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
