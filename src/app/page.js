import Image from "next/image";
import styles from "./page.module.scss";
import Hero from "public/hero.png";

export default function Home() {
  return (
    <main className={styles.container}>
      <section>
        <h1>
          The media for digital pros
        </h1>
        <p>
          Check out the latest news from the tech. industry
        </p>
        <button url="/posts" className={styles.button}>
          <span className={styles.circle} aria-hidden="true">
            <span className={styles.icon + " " + styles.arrow}></span>
          </span>
          <span className={styles.buttonText}>See Posts</span>
        </button>
      </section>
      <figure>
        <Image src={Hero} alt="hero image" />
      </figure>
    </main>
  );
}