type TNoop = (...args: any[])=> any

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Global extends NodeJS.Global {
    NOOP: TNoop;
  }
}

declare const NOOP: TNoop
