import Image from 'next/image';
import Link from 'next/link';

import styles from './page.module.scss';
import Button from '../../components/Button/Button';

export const metadata = {
  title: 'About',
  description: 'This is the About Page',
};

const About = () => {
  return (
    <main className={styles.container} aria-label='About Page'>
      <section className={styles.imgContainer}>
        <Image
          src='/about.webp'
          fill={true}
          priority
          alt='An abstract representation of the tech industry'
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Tech. Blog</h1>
          <h2 className={styles.imgDesc}>
            High quality web articles about tech. industry
          </h2>
        </div>
      </section>
      <section className={styles.textContainer}>
        <article className={styles.item}>
          <h2 className={styles.title}>Who am I?</h2>
          <p className={styles.description}>
            Dark Studio Blog is the media for digital professionals. Published
            by{' '}
            <Link href={'https://github.com/Hitch95'} title="author's github">
              Hitch95
            </Link>{' '}
            since 2023, it is aimed at web professionals. It offers them a daily
            selection of tools, decryptions, news or even figures and surveys to
            enable them to feed their monitoring and meet the needs induced by
            the growing digitization of professions and companies. SEO, SEA,
            development, design, social media or even marketing are among the
            topics regularly discussed. A reference source, the site welcomes
            more than 2000 readers per month. Want to write to us? Send an email
            to the editor using this{' '}
            <Link href={'/contact'} title='contact page'>
              form
            </Link>
            .
          </p>
        </article>
        <article className={styles.item}>
          <h2 className={styles.title}>What We Do?</h2>
          <div className={styles.description}>
            Our teams of editors implement a daily watch on each news around the
            tech. industry in order to write quality articles. We also make it a
            point of honor to verify the quality of our sources. Our themes :
            <ul>
              <li> - Tech</li>
              <li> - Web</li>
              <li> - Tools</li>
            </ul>
          </div>
          <Link href={'/contact'}>
            <Button text={'Contact Us'}></Button>
          </Link>
        </article>
      </section>
    </main>
  );
};

export default About;
