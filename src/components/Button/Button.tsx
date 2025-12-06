import styles from './button.module.scss';

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return <button className={styles.button_component}>{text}</button>;
};

export default Button;
