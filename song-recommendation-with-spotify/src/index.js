import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App/App";
import COLOR from './assets/colors';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Nunito Sans']
  },
  palette: {
    primary:{
      light: COLOR.pink,
      main: COLOR.pink,
      dark: COLOR.pink,
    },
    secondary:{
      light: COLOR.orange,
      main: COLOR.orange,
      dark: COLOR.orange,
    },
    text:{
      primary: COLOR.white,
      secondary: COLOR.pink
    },
    background:{
      paper: COLOR.black,
      default: COLOR.darkBlue
    },
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);