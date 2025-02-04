import {A} from "@solidjs/router";
import {Accordion, Button, ListGroup} from "solid-bootstrap";
import { type Component } from "solid-js";

interface NavigationProps {
}

const Navigation: Component<NavigationProps> = (props: NavigationProps) => {

  return (
    <>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Orders</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <A href='/orders' activeClass="linkActive" inactiveClass="linkInactive" end>All orders</A>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Catalog</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <A href='/catalog/items' activeClass="linkActive" inactiveClass="linkInactive" end>All items</A>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Settings</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <A href='/settings/user-profile' activeClass="linkActive" inactiveClass="linkInactive" end>User Profile</A>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Navigation;