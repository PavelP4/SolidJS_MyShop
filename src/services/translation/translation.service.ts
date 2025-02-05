class TranslationService {
  private _isInitialized: boolean = false;

  private _supportedLangs = ['en', 'de'];
  private _trJson: any;

  private readonly _keyPathSeparator = '.';

  constructor() {
  }

  public init(lang: string): Promise<void> {
    if (this._isInitialized) {
      console.warn('The TranslationService is already initialized.');
      return Promise.resolve();
    }

    if (!this.isValidLang(lang)) {
      throw new Error(`The language '${lang}' is not valid.`);
    }

    return fetch(`./src/assets/translations/${lang}.json`)
      .then(r => r.json())
      .then(result => {
        this._trJson = result;

        this._isInitialized = true;
        return Promise.resolve();
      });
  }

  public get(key: string): string {
    if (!key) {
      console.error(`A translation for the key '${key}' is not found.`);
      return '';
    }

    const result = key
      .split(this._keyPathSeparator)
      .reduce((previous, current) => previous[current.trim()], this._trJson);

    return result;
  }

  private isValidLang(lang: string): boolean {
    return !!lang && this._supportedLangs.indexOf(lang) !== -1;
  }
}

const trs = new TranslationService();

export default trs;