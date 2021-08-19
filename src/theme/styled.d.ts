import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    width: {
      full: string;
      half: string;
    };
    color: {
      dark: string;
      darkGray: string;
      light: string;
      red: string;
      yellow: string;
    };
  }
}
