import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const primary = grey[100];
const secondary = grey[900];

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: [
      'ALTERNATE GOTHIC',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h5: {
      fontSize: '1.125rem',
    },
    h6: {
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 'bolder',
    },
  },
  overrides: {
    MuiTypography: {
      body1: {
        fontSize: '0.875rem',
      },
    },
    MuiTableCell: {
      root: {
        fontSize: '0.75rem',
      },
      sizeSmall: {
        padding: '8px 8px 7px 8px',
      },
      head: {
        fontWeight: '600',
      },
    },
    MuiToggleButtonGroup: {
      root: {
        borderRadius: '1rem',
        margin: '0 0.5rem',
      },
    },
    MuiToggleButton: {
      root: {
        borderRadius: '1rem',
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '0.875rem',
      },
      input: {
        padding: '6.5px 0 7px',
        fontSize: '0.875rem',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '8.5px 14px',
      },
      inputMarginDense: {
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      adornedEnd: {
        paddingRight: '0px',
      },
    },
    MuiStepper: {
      root: {
        paddingBottom: '0.5rem',
      },
    },
    MuiTab: {
      root: {
        minWidth: '120px',
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 9px) scale(1)',
        fontSize: '0.875rem',
        '&$marginDense': {
          transform: 'translate(14px, 9px) scale(1)',
        },
      },
    },
    MuiDialogTitle: {
      root: {
        padding: '24px 0 16px 0',
        margin: '0px 24px',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '0.875rem',
      },
    },
    MuiFormControl: {
      root: {
        margin: 'none',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: '40px',
      },
    },
    MuiIconButton: {
      edgeEnd: {
        marginRight: -12,
        '$sizeSmall&': {
          marginRight: 3,
        },
      },
    },
    MuiDialog: {
      paperWidthSm: {
        'min-width': '400px',
      },
    },
  },
});
const { breakpoints, typography: { pxToRem } } = defaultTheme;

const theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h1: {
        [breakpoints.down('sm')]: {
          fontSize: '3rem',
        },
      },
      h4: {
        [breakpoints.down('sm')]: {
          fontSize: '1.5rem',
        },
      },
    },
  },
};

export default theme;
