import {useParams} from "@solidjs/router";
import styles from "./home-details.module.scss";
import { type Component } from "solid-js";
import {Accordion, Carousel, Container, Nav, Navbar} from "solid-bootstrap";

interface HomeDetailsProps {
  userName: string;
}

const HomeDetails: Component<HomeDetailsProps> = (props) => {
  const params = useParams();

  //useBeforeLeave((e: BeforeLeaveEventArgs) => {
  //  console.log('useBeforeLeave', e);
  //});

  return (
    <>
      <h1 class={styles.header}>Home details ({params.id || 'no param'})</h1>
      <p>VITE_USER_ID: {import.meta.env.VITE_USER_ID}</p>
      <p>User name: {props.userName || 'no name'}</p>
      <input data-testid="userInput" type="text"/>

      <hr/>
    </>
  )
}

export default HomeDetails;