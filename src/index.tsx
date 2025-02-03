/* @refresh reload */
import { render } from 'solid-js/web'
import './index.scss'
import {Router} from '@solidjs/router'
import {routes} from './common/routes'
import App from './App'
import {DEV} from 'solid-js'
import {isServer} from 'solid-js/web';

const root = document.getElementById('root')

if (DEV && !isServer) {
  console.log('In DEV mode');
}

render(() => <Router root={App}>{routes}</Router>, root!)



