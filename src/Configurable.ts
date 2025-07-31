abstract class Configurable<T extends Record<string, unknown>> {
  protected readonly defaultConfig!: T;
  protected userConfig!: Partial<T>;

  constructor(config: Partial<T>) {
    this.config = config;
  }

  set config (config: Partial<T>) {
    this.userConfig = config;
  }

  get config (): T {
    return {...this.defaultConfig, ...this.userConfig};
  }

  toJSON(): { config: T } {
    return {...this, ...{ config: this.config} };
  }

  toString(): string {
    return JSON.stringify(this.config);
  }

  clone() {
    // @ts-ignore
    return new this.constructor(this.userConfig);
  }
}
