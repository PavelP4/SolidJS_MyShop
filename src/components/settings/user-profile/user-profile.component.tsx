import {Card, Col, Form, Row} from "solid-bootstrap";
import styles from "./user-profile.module.scss";
import {Component} from "solid-js";
import appStoreProvider from "../../../stores/app/app.store";

interface UserProfileProps {

}

const UserProfile: Component<UserProfileProps> = (props: UserProfileProps) => {

  const userProfile = appStoreProvider.User;

  return (
    <Card class={styles.container}>
      <Card.Header as="h5">User profile</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group as={Row} class="mb-3" controlId="formUserName">
            <Form.Label column sm={2}>
              Name:
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="text" value={userProfile.name} readOnly={true}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} class="mb-3" controlId="formEmail">
            <Form.Label column sm={2}>
              Email:
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="email" value={userProfile.email} readOnly={true}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} class="mb-3" controlId="formAge">
            <Form.Label column sm={2}>
              Age:
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="text" value={userProfile.age} readOnly={true}/>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserProfile;