import {Component} from "solid-js";
import styles from "./loading.module.scss";


const Loading: Component = () => {

  return (
    <div class={styles.container}>
      <div>Loading...</div>
    </div>
  );
}

export default Loading;