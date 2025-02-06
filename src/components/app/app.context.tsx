import {createContext, useContext} from "solid-js";
import {createStore, SetStoreFunction} from "solid-js/store";
import {NotificationModel, NotificationType} from "./notification/notification.model";


export class AppContextState {
  private readonly DEFAULT_NOTIFICATION_TIMEOUT = 5000;

  public readonly notification: NotificationModel;
  private readonly _setNotification: SetStoreFunction<NotificationModel>;


  constructor() {
    [this.notification, this._setNotification] = createStore(new NotificationModel());
  }

  public showInfo(message: string, timeout?: number) {
    this.showNotification(NotificationType.Info, message, timeout);
  }

  public showWarn(message: string, timeout?: number) {
    this.showNotification(NotificationType.Warn, message, timeout);
  }

  public showError(message: string, timeout?: number) {
    this.showNotification(NotificationType.Error, message, timeout);
  }

  private showNotification(type: NotificationType, message?: string, timeout?: number) {
    message = message || '';
    timeout = timeout || this.DEFAULT_NOTIFICATION_TIMEOUT;

    this._setNotification('type', type);
    this._setNotification('message', message);

    setTimeout(() => {
      this._setNotification('type', undefined);
      this._setNotification('message', undefined);
    }, timeout);
  }
}

const AppContext = createContext<AppContextState>();

export function AppContextProvider(props: any) {
  const contextValue = new AppContextState();

  
  return (
    <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext: cannot find a AppContext");
  }

  return context;
}