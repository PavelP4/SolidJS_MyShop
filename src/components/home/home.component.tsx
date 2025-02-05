import styles from "./home.module.scss";
import {Component} from "solid-js";

interface HomeProps {

}

const Home: Component<HomeProps> = (props: HomeProps) => {

  return (
    <>
      <h1>Welcome to the shop!!!</h1>
    </>
  )
}

export default Home;