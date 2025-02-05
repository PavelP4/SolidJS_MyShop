import {createSignal, Signal} from "solid-js";
import {createStore, SetStoreFunction, Store, unwrap} from "solid-js/store";
import {AuthResult, UserProfile} from "../../services/authentication/auth.model";

interface AppStore {
  user: UserProfile;
  isAuthenticated: boolean;
}

class AppStoreProvider {
  private readonly _sessionStorageKey: string = 'AppStore';

  private _appStore: AppStore;
  private _setAppStore: SetStoreFunction<AppStore>;

  private _isInitialized: boolean = false;

  constructor() {
    [this._appStore, this._setAppStore] = this.createNewOrRestore();
  }

  public init(): Promise<void> {
    if (this._isInitialized) {
      console.warn('The AppStore is already initialized.');
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      setTimeout(() => {

        //update store with the newest loaded data or just ignore

        this._isInitialized = true;

        resolve();
      }, 10); // simulating a network loading
    });
  }

  public get userName(): string {
    return this._appStore.user.name;
  }

  public get User(): UserProfile {
    return this._appStore.user;
  }

  private set User(value: UserProfile) {
    this._setAppStore('user', value);
  }

  public get isAuthenticated(): boolean {
    return this._appStore.isAuthenticated;
  }

  private set isAuthenticated(value: boolean) {
    this._setAppStore('isAuthenticated', value);
  }

  public applyAuthentication(authResult: AuthResult) {
    if (!authResult.isAuthenticated) {
      this.resetAuthentication();
      return;
    }

    this.isAuthenticated = true;
    this.User = authResult.user || this.createEmptyUser();

    this.preserveStore();
  }

  public resetAuthentication() {
    this.isAuthenticated = false;
    this.User = this.createEmptyUser();

    this.preserveStore();
  }

  private createEmptyUser(): UserProfile {
    return {
      id: 0,
      name: '',
      email: '',
      age: 0
    };
  }

  private createEmptyStoreData(): AppStore {
    return {
      user: this.createEmptyUser(),
      isAuthenticated: false
    };
  }

  private preserveStore() {
    sessionStorage.setItem(this._sessionStorageKey, JSON.stringify(unwrap(this._appStore)));
  }

  private createNewOrRestore(): [get: Store<AppStore>, set: SetStoreFunction<AppStore>] {
    const sessionStorageValue = sessionStorage.getItem(this._sessionStorageKey);
    
    let data: AppStore = sessionStorageValue 
      ? JSON.parse(sessionStorageValue)
      : this.createEmptyStoreData();

    return createStore<AppStore>(data);
  }
}

const appStoreProvider = new AppStoreProvider();

export default appStoreProvider;