import styles from './footer.module.scss';
import { type Component } from "solid-js";

interface FooterProps {
}

const Footer: Component<FooterProps> = (props: FooterProps) => {

  return (
    <div class={styles.container}>
      <footer>
        <span>Made in <s>China</s> Belarus, 2025</span>
      </footer>
    </div>
  );
}

export default Footer;