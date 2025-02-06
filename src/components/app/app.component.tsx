import styles from './app.module.scss'
import Header from './header/header.component'
import Footer from './footer/footer.component'
import Navigation from './navigation/navigation.component'
import {ErrorBoundary, JSX, ParentComponent, Show} from 'solid-js'
import {Col, Container, Row} from 'solid-bootstrap'
import appStoreProvider from '../../stores/app/app.store'
import ErrorFallback from './errorFallback/errorFallback.component'
import Notification from './notification/notification.component'
import {AppContextProvider} from './app.context'

interface AppProps {
  children?: JSX.Element;
}

const App: ParentComponent<AppProps> = (props: AppProps) => {
  

  return (
    <AppContextProvider>
      <Container fluid>
        <Row>
          <Header />
        </Row>
        
        <Row class={styles.content}>
          <Show when={appStoreProvider.isAuthenticated} fallback={<h1>Please login...</h1>}>
            <Col md={2}>
              <Navigation />
            </Col>
            <Col>
              <ErrorBoundary fallback={(err) => <ErrorFallback originError={err} />}>
                {props.children}
              </ErrorBoundary>
            </Col>
          </Show>
        </Row>
        
        <Row>
          <Footer />
        </Row>
      </Container>

      <Notification />
    </AppContextProvider>
  )
}

export default App
