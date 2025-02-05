import { render } from 'solid-js/web'
import './index.scss'
import {Router} from '@solidjs/router'
import {routes} from './common/routes'
import {DEV} from 'solid-js'
import {isServer} from 'solid-js/web';
import App from './components/app/app.component'
import appStoreProvider from './stores/app/app.store'
import trs from './services/translation/translation.service'

const root = document.getElementById('root')

if (DEV && !isServer) {
  console.log('In DEV mode');
}

const trLang = import.meta.env.VITE_LANG;

Promise.all([
  appStoreProvider.init(),
  trs.init(trLang)
]).then(() => {
  render(() => <Router root={App}>{routes}</Router>, root!);
}).catch((reason) => console.error('Error of starting application', reason));


