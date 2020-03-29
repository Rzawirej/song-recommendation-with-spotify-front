import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App/App";

import color from '@material-ui/core/colors/blueGrey';


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: color,
  },
  status: {
    danger: 'orange',
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);