import {Button} from 'solid-bootstrap';
import styles from './header.module.scss';
import { type Component } from "solid-js";

interface HeaderProps {
}

const Header: Component<HeaderProps> = (props: HeaderProps) => {

  return (
    <div class={styles.container}>
      <div class={styles.title} >
        <img src="/solid.svg" width={40} height={40}></img>
        <span>My shop application</span>
      </div>
      <div class={styles.actions}>
        <Button variant="outline-primary">Login</Button>
      </div>
    </div>
  );
}

export default Header;