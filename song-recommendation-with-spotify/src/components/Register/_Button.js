import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

// theme = createMuiTheme({
//     palette: {
//       primary: {
//         main: '#1ED760',
//         contrastText: '#ffffff'
//       },
//       secondary: {
//         main: '#FF0080',
//         contrastText: '#ffffff'
//       }
//     },
//     typography: {
//       button:{
//         fontFamily: 'typeface-nunito-sans',
//         fontStyle: 'normal',
//         fontWeight: 'bold',
//         fontSize: 14,
//         letterSpacing: 0.1
//       }
//     }
//   });
//   textField: {
//     [`& fieldset`]: {
//       borderRadius: 0,
//     },
// }

const styles = theme => ({
    green: {
        minWidth: 304,
        background: '#1ED760',
        borderRadius: 50,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    purple: {
        minWidth: 304,
        background: '#FF0080',
        borderRadius: 50,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
});


class _Button extends React.Component {
      render() {
          const { classes, fieldProps } = this.props;
             return (
                <Button
                {...fieldProps}
                inputProps={{ className: classes.fieldInput }}
                className={this.props.useClassGreen ? classes.green : classes.purple}
                variant="outlined"
                >
                {this.props.label}
                </Button>
        );
    }
}

_Button.propTypes = {
    label: PropTypes.string,
    fieldProps: PropTypes.object,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(_Button);