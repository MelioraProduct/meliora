import { createTheme } from '@mui/material/styles';
import { extendTheme } from '@mui/joy/styles';

// Material UI Theme
export const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#17BEDB",
      light: "#4DCDE4",
      dark: "#108BA3",
      contrastText: "#fff",
    },
    secondary: {
      main: "#020617",
      light: "#1E293B",
      dark: "#0F172A",
      contrastText: "#fff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
  },
});

// Joy UI Theme
export const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#E3F2F9",
          100: "#C5E4F3",
          200: "#A2D4EC",
          300: "#7AC1E4",
          400: "#47A9DA",
          500: "#17BEDB",
          600: "#108BA3",
          700: "#0C6B7F",
          800: "#084C5B",
          900: "#052E37",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    JoyCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
      defaultProps: {
        variant: "outlined",
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
      defaultProps: {
        variant: "solid",
        color: "primary",
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          "--Input-radius": "8px",
        },
      },
    },
    JoyFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    JoyRating: {
      styleOverrides: {
        root: {
          "--joy-palette-neutral-50": "#F8FAFC",
          "--joy-palette-neutral-100": "#F1F5F9",
          "--joy-palette-neutral-200": "#E2E8F0",
          "--joy-palette-neutral-300": "#CBD5E1",
          "--joy-palette-neutral-400": "#94A3B8",
          "--joy-palette-neutral-500": "#64748B",
          "--joy-palette-neutral-600": "#475569",
          "--joy-palette-neutral-700": "#334155",
          "--joy-palette-neutral-800": "#1E293B",
          "--joy-palette-neutral-900": "#0F172A",
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default materialTheme; 