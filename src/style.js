import { injectGlobal } from 'styled-components';

export function setCssBaseline() {
  injectGlobal`
    html {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    *, *::before, *::after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      background-color: #fafafa;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
  `;
}
