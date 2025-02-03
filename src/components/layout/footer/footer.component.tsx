import styles from './footer.module.scss';
import { type Component } from "solid-js";

interface FooterProps {
}

const Footer: Component<FooterProps> = (props: FooterProps) => {

  return (
    <div class={styles.container}>
      <footer>Footer</footer>
    </div>
  );
}

export default Footer;