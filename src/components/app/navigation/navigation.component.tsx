import {A} from "@solidjs/router";
import {Accordion, ListGroup} from "solid-bootstrap";
import { type Component } from "solid-js";
import trx from "../../../directives/translation/translation.directive";
import trs from "../../../services/translation/translation.service";


interface NavigationProps {
}

const Navigation: Component<NavigationProps> = (props: NavigationProps) => {

  return (
    <>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header><span use:trx={'navigation.orders.title'}></span></Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <A href='/orders' activeClass="linkActive" inactiveClass="linkInactive" end>All orders</A>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>{trs.get('navigation.catalog.title')}</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <A href='/catalog/items' activeClass="linkActive" inactiveClass="linkInactive" end>All items</A>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>{trs.get('navigation.settings.title')}</Accordion.Header>
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