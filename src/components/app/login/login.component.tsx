import {Component, createEffect, createSignal, Show, Signal} from 'solid-js';
import styles from './login.module.scss';
import {Alert, Button, Form, Modal, Spinner} from 'solid-bootstrap';
import appStoreProvider from '../../../stores/app/app.store';
import authService from '../../../services/authentication/auth.service';

interface LoginProps {
  show: Signal<boolean>;
}

const Login: Component<LoginProps> = (props: LoginProps) => {
  const [show, setShow] = props.show;  
  const [formValidated, setFormValidated] = createSignal(false);
  const [showErrorAlert, setShowErrorAlert] = createSignal(false);
  const [isLogging, setIsLogging] = createSignal(false);

  let formElement: HTMLFormElement;

  let loginName: string = '';
  let password: string = '';

  createEffect((prev) => {
    if (!prev && show()) {
      setFormValidated(false);
      setIsLogging(false);
    }

    return show();
  });

  const showError = () => {
    if (!showErrorAlert()) {
      setShowErrorAlert(true);
    }
  };
  const hideError = () => {
    if (showErrorAlert()) {
      setShowErrorAlert(false);
    }
  };

  const handleCancel = () => {
    if (isLogging()) {
      return;
    }

    setShow(false);
    hideError();
  };

  const handleLogin = () => {
    hideError();

    const isValid = formElement!.checkValidity();
    setFormValidated(true);

    if (!isValid) {
      return;
    }

    setIsLogging(true);
    authService.authenticate(loginName, password).then(result => {
      if (!result.isAuthenticated) {
        setFormValidated(false);
        formElement!.reset();

        showError();
        
        return;
      }

      appStoreProvider.applyAuthentication(result);
      setShow(false);
    }).finally(() => {
      setIsLogging(false);
    });
  };

  const handleLoginInput = (e: any) => {
    loginName = e.currentTarget.value;

    hideError();
  };

  const handlePasswordInput = (e: any) => {
    password = e.currentTarget.value;

    hideError();
  };



  return (
    <Modal
      show={show()}
      onHide={handleCancel}
      aria-labelledby="title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="title">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formElement!} validated={formValidated()}>
          <Form.Group class="mb-3" controlId="formLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" placeholder="Login name" onInput={handleLoginInput} required disabled={isLogging()} />
            <Form.Control.Feedback type="invalid">
              Please enter a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group class="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onInput={handlePasswordInput} required disabled={isLogging()} />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        <Alert variant="danger" show={showErrorAlert()} dismissible onClose={() => hideError()}>
          <Alert.Heading>Failed</Alert.Heading>
          <p>
            The user name or password are not valid.
          </p>
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLogin} disabled={isLogging()}>
          <Show when={isLogging()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style="margin-right: 8px;"
            />
          </Show>
          Login
        </Button>
        <Button variant="secondary" onClick={handleCancel} disabled={isLogging()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;