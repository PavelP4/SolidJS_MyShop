import { render } from 'solid-js/web'
import './index.scss'
import {Router} from '@solidjs/router'
import {routes} from './common/routes'
import {DEV} from 'solid-js'
import {isServer} from 'solid-js/web';
import App from './components/app/app.component'
import appStoreProvider from './stores/app.store'

const root = document.getElementById('root')

if (DEV && !isServer) {
  console.log('In DEV mode');
}

Promise.all([
  appStoreProvider.init()
]).then(() => {
  render(() => <Router root={App}>{routes}</Router>, root!);
}).catch((reason) => console.error('Error of starting application', reason));


