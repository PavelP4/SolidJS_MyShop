import {createSignal, Signal} from "solid-js";
import {createStore, SetStoreFunction} from "solid-js/store";
import {AuthResult, UserProfile} from "../services/authentication/auth.model";

interface AppStore {
  user: UserProfile;
  isAuthenticated: Signal<boolean>;
}

class AppStoreProvider {
  private _appStore: AppStore;
  private _setAppStore: SetStoreFunction<AppStore>;

  private _isInitialized: boolean = false;

  constructor() {
    [this._appStore, this._setAppStore] = createStore<AppStore>({
      user: this.createEmptyUser(),
      isAuthenticated: createSignal(false)
    });
  }

  public init(): Promise<void> {
    if (this._isInitialized) {
      console.warn('The AppStore is already initialized.');
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        this._isInitialized = true;
        resolve();
      }, 1000); // simulating a network loading
    });
  }

  public get userName(): string {
    return this._appStore.user.userName;
  }

  public get User(): UserProfile {
    return this._appStore.user;
  }

  private set User(value: UserProfile) {
    this._setAppStore('user', value);
  }

  public get isAuthenticated(): boolean {
    const [isAuthenticated] = this._appStore.isAuthenticated;
    return isAuthenticated();
  }

  private set isAuthenticated(value: boolean) {
    const [, setIsAuthenticated] = this._appStore.isAuthenticated;
    setIsAuthenticated(value);
  }

  public applyAuthentication(authResult: AuthResult) {
    if (!authResult.isAuthenticated) {
      this.resetAuthentication();
      return;
    }

    this.isAuthenticated = true;
    this.User = authResult.user || this.createEmptyUser();
  }

  public resetAuthentication() {
    this.isAuthenticated = false;
    this.User = this.createEmptyUser();
  }

  

  private createEmptyUser(): UserProfile {
    return {
      userId: 0,
      userName: ''
    };
  }
}

const appStoreProvider = new AppStoreProvider();

export default appStoreProvider;