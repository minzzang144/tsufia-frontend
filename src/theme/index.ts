import { DefaultTheme } from 'styled-components';

const deviceSizes = {
  mobile: '640px',
  laptop: '1024px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const theme: DefaultTheme = {
  width: {
    full: '100%',
    half: '50%',
  },
  color: {
    dark: '#000000',
    darkGray: 'rgba(0, 0, 0, 0.9)',
    light: '#FFFFFF',
    red: '#FF0000',
    yellow: '#FFEB00',
  },
  device,
};

export default theme;
