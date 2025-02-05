import {Component, createEffect, createSignal, DEV, Show} from 'solid-js';
import styles from './errorFallback.module.scss';
import trs from '../../../services/translation/translation.service';
import {isServer} from 'solid-js/web';


interface ErrorFallbackProps {
  componentTitle?: string;
  originError?: any;
}

const ErrorFallback: Component<ErrorFallbackProps> = (props: ErrorFallbackProps) => {
  const isDev = DEV && !isServer;
  const trText = trs.get('app.view-error');

  const [errTitle, setErrTitle] = createSignal('');
  const [errText, setErrText] = createSignal('');

  createEffect(() => {
    setErrTitle(trText);

    if (props.componentTitle) {
      setErrTitle(`${trText}: ${props.componentTitle}`);
    }
  
    if (props.originError && isDev) {
      //setErrText(JSON.stringify(props.originError));
    }
  });

  return (
    <>
      <h3 class={styles.title}>{errTitle()}</h3>
      <Show when={isDev}>
        <p class={styles.text}>{errText()}</p>
      </Show>
    </>
  );
}

export default ErrorFallback;