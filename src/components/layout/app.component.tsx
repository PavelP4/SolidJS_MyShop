import styles from './app.module.scss'
import Header from './header/header.component'
import Footer from './footer/footer.component'
import Navigation from './navigation/navigation.component'
import {JSX, ParentComponent} from 'solid-js'
import {Col, Container, Row} from 'solid-bootstrap'

interface AppProps {
  children?: JSX.Element;
}

const App: ParentComponent<AppProps> = (props: AppProps) => {
  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      <Row class={styles.content}>
        <Col md={2}>
          <Navigation />
        </Col>
        <Col>
          {props.children}
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  )
}

export default App
