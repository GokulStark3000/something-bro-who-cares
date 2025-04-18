import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AnimatedBackground from '../components/AnimatedBackground';

const HomePage = () => {
  const navigate = useNavigate();

  const assessmentCards = [
    {
      title: 'Stroke Risk Assessment',
      description: 'Evaluate your risk of stroke based on various health factors and lifestyle indicators.',
      path: '/stroke',
      color: '#1565C0',
      icon: '🧠',
      gradient: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
    },
    {
      title: 'Diabetes Risk Assessment',
      description: 'Assess your risk of developing diabetes using advanced machine learning algorithm.',
      path: '/diabetes',
      color: '#009688',
      icon: '🩸',
      gradient: 'linear-gradient(135deg, #009688 0%, #26A69A 100%)',
    },
    {
      title: 'Obesity Risk Assessment',
      description: 'Analyze your risk of obesity based on lifestyle factors and health indicators.',
      path: '/obesity',
      color: '#1565C0',
      icon: '⚖️',
      gradient: 'linear-gradient(135deg, #1565C0 0%, #1E88E5 100%)',
    },
    {
      title: 'Hypertension Risk Assessment',
      description: 'Evaluate your risk of hypertension based on blood pressure and health indicators.',
      path: '/hypertension',
      color: '#009688',
      icon: '❤️',
      gradient: 'linear-gradient(135deg, #009688 0%, #26A69A 100%)',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedBackground variant="gradient" />
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <AppBar 
          position="static" 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(21, 101, 192, 0.1)',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <HealthAndSafetyIcon sx={{ mr: 2, fontSize: '2rem', color: '#1565C0' }} />
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 'bold',
                color: '#263238',
                letterSpacing: '0.5px',
              }}
            >
              Predictiva
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: 6, 
                mb: 6,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(21, 101, 192, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px 0 rgba(21, 101, 192, 0.1)',
              }}
            >
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{
                  fontWeight: 800,
                  textAlign: 'center',
                  color: '#263238',
                  mb: 4,
                }}
              >
                Welcome to Predictiva
              </Typography>
              <Typography 
                variant="h6" 
                paragraph 
                sx={{ 
                  fontSize: '1.25rem',
                  textAlign: 'center',
                  color: '#455A64',
                  maxWidth: '800px',
                  margin: '0 auto',
                  mb: 4,
                }}
              >
                Predictiva offers state-of-the-art tools designed to safeguard your clinical health and inform future lifestyle choices. Our solutions cover several prevalent and detrimental conditions, delivering accurate insights into your potential health risks. Built using comprehensive healthcare data, each tool analyses numerous medical and lifestyle factors to provide science-based predictions, and help you make educated decisions about your future well-being.

              </Typography>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(21, 101, 192, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(21, 101, 192, 0.1)',
                  maxWidth: '800px',
                  margin: '0 auto',
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    color: '#1565C0',
                  }}
                >
                  Please note: These tools are for informational purposes only, and are not a substitute for professional medical advice. Always consult with a certified healthcare provider for proper medical evaluation.
                </Typography>
              </Box>
            </Paper>
          </motion.div>

          <Grid container spacing={4}>
            {assessmentCards.map((card, index) => (
              <Grid item xs={12} md={6} key={card.title}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(21, 101, 192, 0.1)',
                      borderRadius: '16px',
                      boxShadow: '0 8px 32px 0 rgba(21, 101, 192, 0.1)',
                      overflow: 'hidden',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: card.gradient,
                      },
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 48px 0 rgba(21, 101, 192, 0.15)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h2" sx={{ mr: 2 }}>{card.icon}</Typography>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          color: card.color,
                        }}
                      >
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      paragraph 
                      sx={{ 
                        flexGrow: 1,
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                        color: '#455A64',
                      }}
                    >
                      {card.description}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate(card.path)}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        mt: 2,
                        background: card.gradient,
                        borderRadius: '8px',
                        padding: '12px 28px',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 15px 0 rgba(21, 101, 192, 0.15)',
                        '&:hover': {
                          background: card.gradient,
                          opacity: 0.9,
                          transform: 'translateX(5px)',
                        },
                      }}
                    >
                      Start Assessment
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
};

export default HomePage; 