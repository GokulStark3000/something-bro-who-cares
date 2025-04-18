import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import DiabetesPage from './pages/DiabetesPage';
import StrokePage from './pages/StrokePage';
import HypertensionPage from './pages/HypertensionPage';
import ObesityPage from './pages/ObesityPage';
import PredictionForm from './components/PredictionForm';
import Footer from './components/Footer';

const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#37474F',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      color: '#37474F',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      color: '#37474F',
      fontWeight: 700,
    },
    h4: {
      color: '#37474F',
      fontWeight: 600,
    },
    h5: {
      color: '#37474F',
      fontWeight: 600,
    },
    h6: {
      color: '#37474F',
      fontWeight: 600,
    },
    body1: {
      color: '#37474F',
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    body2: {
      color: '#546E7A',
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#3949AB', // Deep Indigo
      light: '#F3E5F5', // Light Lavender
    },
    secondary: {
      main: '#66BB6A', // Mint Green
      light: '#E0F2F1', // Soft Aqua
    },
    background: {
      default: '#F3E5F5', // Light Lavender
      paper: '#FFFFFF',
    },
    text: {
      primary: '#37474F', // Charcoal Gray
      secondary: '#546E7A', // Lighter Charcoal
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'linear-gradient(rgba(243, 229, 245, 0.1), rgba(224, 242, 241, 0.1))',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#3949AB',
          '&:hover': {
            backgroundColor: '#303F9F',
          },
        },
        containedSecondary: {
          backgroundColor: '#66BB6A',
          '&:hover': {
            backgroundColor: '#4CAF50',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(57, 73, 171, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/diabetes/*" element={<DiabetesPage />} />
              <Route path="/stroke/*" element={<StrokePage />} />
              <Route path="/hypertension/*" element={<HypertensionPage />} />
              <Route path="/obesity/*" element={<ObesityPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
