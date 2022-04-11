import { ThemeProvider, createTheme, CssBaseline,responsiveFontSizes } from "@mui/material";
import Home from "./views/Home";

let theme = createTheme({
  palette: {
    // mode: "dark",
    background: {
      default: "#111217",
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#70fbe0",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#1b1c23",
      // dark: will be calculated from palette.secondary.main,
      //contrastText: "#ffcc00",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    text: {
      primary: "#ebeef2",
      secondary: "#70fbe0",
    },
  },
  typography: {
    fontFamily: [
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
    h4: {
      fontSize: 24
    },
    h6: {
      fontSize: 12
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#70fbe0",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#70fbe0",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#70fbe0",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#70fbe0",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      }
    },
    MuiAutocomplete: {
      styleOverrides:{
        listbox: {
          '& .MuiAutocomplete-option[aria-selected="true"]': {  // works
            backgroundColor: '#111217',
          },
          '& .MuiAutocomplete-option[aria-selected="false"]': {  // works
            backgroundColor: '#1b1c23',
          },
          '& .MuiAutocomplete-option[aria-selected="true"].Mui-focused': { // works
            backgroundColor: '#70fbe0',
            color: "#000"
          },
          '& .MuiAutocomplete-option:hover': { // works
            backgroundColor: '#111217',
          },
          '& .MuiAutocomplete-option:after': { // works
            backgroundColor: '#111217',
          },
          
        },
      }
    },
  },
});

function App() {
  theme = responsiveFontSizes(theme);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home/>
    </ThemeProvider>
  );
}

export default App;
