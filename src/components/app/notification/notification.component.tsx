import {Component, createEffect, createSignal, Show} from 'solid-js';
import styles from './notification.module.scss';
import {useAppContext} from '../app.context';
import {Alert} from 'solid-bootstrap';
import {NotificationType} from './notification.model';
import trs from '../../../services/translation/translation.service';


interface NotificationProps {
}

const Notification: Component<NotificationProps> = (props: NotificationProps) => {
  const appContext = useAppContext();
  
  //const [isShown, setIsShown] =  createSignal(false);

  createEffect(() => {
    if (appContext.notification.type) {
      console.log(appContext.notification.type);
    }
  });

  const alertVariant = () => {
    switch (appContext.notification.type) {
      case NotificationType.Info:
        return "primary";
      case NotificationType.Warn:
        return "warning";
      case NotificationType.Error:
        return "danger";
      default:
        return "";
    }
  };

  const alertHeading = () => {
    switch (appContext.notification.type) {
      case NotificationType.Info:
        return trs.get('app.notification.header.info');
      case NotificationType.Warn:
        return trs.get('app.notification.header.warn');
      case NotificationType.Error:
        return trs.get('app.notification.header.error');
      default:
        return "";
    }
  };

  return (
    <Show when={!!appContext.notification.type}>
      <Alert class={styles.alert} variant={alertVariant()} dismissible>
        <Alert.Heading>{alertHeading()}</Alert.Heading>
        <p>
          {appContext.notification.message}
        </p>
      </Alert>
    </Show>
  );
}

export default Notification;