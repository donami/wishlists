declare module 'contrast-color' {
  export interface ContrastColor {
    new (options: any): void;
  }
  export class ContrastColor {
    constructor(options: any) {}
  }

  export const contrastColor = (options: any) => any;

  export default ContrastColor;
}
