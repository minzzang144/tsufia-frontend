import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    width: {
      full: string;
      half: string;
    };
    color: {
      dark: string;
      light: string;
    };
  }
}
