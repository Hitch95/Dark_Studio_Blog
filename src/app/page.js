import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hero.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          The media for digital pros
        </h1>
        <p className={styles.description}>
          Check out the latest news from the tech. industry
        </p>
        <Button url="/posts" text="See Our Articles" />
      </div>
      <div className={styles.item}>
        <Image src={Hero} alt="hero image" className={styles.img} />
      </div>
    </div>
  );
}