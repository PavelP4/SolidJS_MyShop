import {A} from '@solidjs/router'
import './App.scss'

function App(props: any) {
  return (
    <>
      <header>Header</header>

      <section>
        <A href='/home' activeClass="linkActive" inactiveClass="linkInactive" end>Home</A>
        <A href='/home/details/5' activeClass="linkActive" inactiveClass="linkInactive" end>Home details</A>
        <A href='/about' activeClass="linkActive" inactiveClass="linkInactive" end>About</A>
      </section>

      {props.children}

      <footer>Footer</footer>
    </>
  )
}

export default App
