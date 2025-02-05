import {Button} from 'solid-bootstrap';
import styles from './header.module.scss';
import { createEffect, createSignal, Show, type Component } from "solid-js";
import appStoreProvider from '../../../stores/app/app.store';
import Login from '../login/login.component';
import trs from '../../../services/translation/translation.service';

interface HeaderProps {
}

const Header: Component<HeaderProps> = (props: HeaderProps) => {
  const [loginBtnTitle, setLoginBtnTitle] = createSignal('');
  const [showLoginModal, setShowLoginModal] = createSignal(false);

  createEffect(() => {
    setLoginBtnTitle(appStoreProvider.isAuthenticated 
      ? trs.get('header.actions.logout') 
      : trs.get('header.actions.login'));
  });
  
  const loginHandler = () => {
    if (!appStoreProvider.isAuthenticated) {
      setShowLoginModal(true);
    } else {
      appStoreProvider.resetAuthentication();
    }
  };

  return (
    <>
      <div class={styles.container}>
        <div class={styles.title} >
          <img src="/solid.svg" width={40} height={40}></img>
          <span>My shop application</span>
        </div>

        <Show when={appStoreProvider.isAuthenticated}>
          <div class={styles.userInfo}>
            <span><b>User:</b> {appStoreProvider.userName}</span>
          </div>
        </Show>

        <div class={styles.actions}>
          <Button variant="outline-primary" onClick={loginHandler}>{loginBtnTitle()}</Button>
        </div>
      </div>
      
      <Login show={[showLoginModal, setShowLoginModal]} />
    </>
    
  );
}

export default Header;