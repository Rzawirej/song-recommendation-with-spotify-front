import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
        borderColor: "#FF0080 !important"
    },
    input: {
        borderWidth: "2px",
        borderColor: "#FF0080 !important"
    }
});

class _Field extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const { classes, fieldProps } = this.props;
            return (
            <TextField
            {...fieldProps}
            label={this.props.label || "<Un-labeled>"}
            InputProps={{ classes: {notchedOutline: classes.notchedOutline},
            style: { color: 'white'} }}
            InputLabelProps={{
                style: { color: '#fff' },
                }}
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