import Image from "next/image";
import styles from "./page.module.scss";
import Hero from "public/hero.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <main className={styles.container}>
      <div>
        <h1>
          The media for digital pros
        </h1>
        <p>
          Check out the latest news from the tech. industry
        </p>
        <Button url="/posts" text="See Our Posts" />
      </div>
      <div>
        <Image src={Hero} alt="hero image"/>
      </div>
    </main>
  );
}