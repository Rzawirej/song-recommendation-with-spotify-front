import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { RemoveRedEye } from '@material-ui/icons';
import { InputAdornment} from '@material-ui/core';

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
    field: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: '30px !important',
        borderColor: 'yellow',
        [`& fieldset`]: {
            borderRadius: 50,
        },
        minWidth: 430,
        background: '#0B1830'
    },
    notchedOutline: {
        borderWidth: "2px",
        borderColor: "#FFFFFF !important"
    },
    input: {
        borderWidth: "2px",
        borderColor: "#FFFFFF !important"
    }
});

class _Field extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            passwordIsMasked: true
        }
        this.togglePasswordMask = this.togglePasswordMask.bind(this);
    }

    togglePasswordMask = () => {
        this.setState(prevState => ({
          passwordIsMasked: !prevState.passwordIsMasked,
        }));
      };

    render() {
        const { passwordIsMasked } = this.state;
        const { classes, fieldProps } = this.props;
            return (
            <TextField
            {...fieldProps}
            label={this.props.label || "<Un-labeled>"}
            InputProps={{ classes: {notchedOutline: classes.notchedOutline},
            endAdornment: (
                <InputAdornment position="end">
                  <RemoveRedEye
                    className={classes.eye}
                    onClick={this.togglePasswordMask}
                  />
                </InputAdornment>
              ),
            style: { color: 'white'} }}
            InputLabelProps={{
                style: { color: '#fff' },
                }}
            type={passwordIsMasked ? 'password' : 'text'} 
            className={classes.field}
            onChange={this.props.onChange}
            margin="dense"
            variant="outlined"
        />
    );
}
}

_Field.propTypes = {
    label: PropTypes.string,
    fieldProps: PropTypes.object,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(_Field);