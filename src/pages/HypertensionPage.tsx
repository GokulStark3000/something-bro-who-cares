import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PredictionForm from '../components/PredictionForm';
import AnimatedBackground from '../components/AnimatedBackground';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const hypertensionFields = [
  {
    name: 'cp',
    label: 'Chest Pain Type',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'Typical Angina' },
      { value: 1, label: 'Atypical Angina' },
      { value: 2, label: 'Non-anginal Pain' },
      { value: 3, label: 'Asymptomatic' },
    ],
  },
  { 
    name: 'trestbps', 
    label: 'Resting Blood Pressure (mm Hg)', 
    type: 'number' as const, 
    required: true,
    min: 90,
    max: 200
  },
  { 
    name: 'chol', 
    label: 'Cholesterol (mg/dl)', 
    type: 'number' as const, 
    required: true,
    min: 100,
    max: 600
  },
  { 
    name: 'thalach', 
    label: 'Maximum Heart Rate', 
    type: 'number' as const, 
    required: true,
    min: 60,
    max: 220
  },
  { 
    name: 'oldpeak', 
    label: 'ST Depression', 
    type: 'number' as const, 
    required: true,
    min: 0,
    max: 6
  },
  {
    name: 'slope',
    label: 'Slope of ST Segment',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'Upsloping' },
      { value: 1, label: 'Flat' },
      { value: 2, label: 'Downsloping' },
    ],
  },
  { 
    name: 'ca', 
    label: 'Number of Major Vessels', 
    type: 'number' as const, 
    required: true,
    min: 0,
    max: 4
  },
];

const HypertensionPage = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    try {
      // Convert string values to numbers and format data according to backend expectations
      const processedData = {
        cp: parseFloat(data.cp),
        trestbps: parseFloat(data.trestbps),
        chol: parseFloat(data.chol),
        thalach: parseFloat(data.thalach),
        oldpeak: parseFloat(data.oldpeak),
        slope: parseFloat(data.slope),
        ca: parseFloat(data.ca)
      };

      const response = await fetch(`${backendUrl}/hypertension`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      const result = await response.json();
      console.log('Backend response:', result);
      
      // Handle the hypertension endpoint response format
      // The hypertension endpoint returns {result: "Hypertension" or "No Hypertension"}
      if (result.result) {
        if (typeof result.result === 'string' && result.result.includes('Missing required keys')) {
          setPrediction({
            error: result.result
          });
          return;
        }
        
        if (result.result === "Hypertension" || result.result === "No Hypertension") {
          // Format the prediction result
          const formattedResult = {
            result: result.result,
            message: result.result === "Hypertension" 
              ? "Based on your health indicators, you may be at risk for hypertension. Please consult with a healthcare provider for proper evaluation."
              : "Based on your health indicators, you appear to be at low risk for hypertension. Continue maintaining a healthy lifestyle."
          };
          
          setPrediction(formattedResult);
          return;
        }
      }
      
      // Handle unexpected response format
      setPrediction({
        error: 'Received an unexpected response format from the server. Please try again.'
      });
    } catch (error) {
      console.error('Error making prediction:', error);
      setPrediction({
        error: 'An error occurred while making the prediction. Please try again.'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedBackground variant="gradient" />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="static" 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hypertension Risk Assessment
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                mb: 4,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="h4" gutterBottom>
                About Hypertension Risk Assessment
              </Typography>
              <Typography variant="body1" paragraph>
              The Predictiva Hypertension Risk Assessment Tool employs advanced machine learning to estimate your risk of developing hypertension by analyzing key health indicators such as chest pain type, blood pressure, cholesterol levels, heart rate and other relevant factors.
              </Typography>
              <Typography variant="body1" paragraph>
              Trained on comprehensive healthcare datasets, the model uses SVM ML algorithms to detect patterns commonly linked with diabetes, and provides you with a personalized and data-driven risk evaluation.
              </Typography>
              <Typography variant="body1" color="error" paragraph>
                Please note: This tool is intended for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
              </Typography>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <PredictionForm
                fields={hypertensionFields}
                onSubmit={handleSubmit}
                title="Enter Your Health Information"
              />
            </Paper>
          </motion.div>

          <AnimatePresence>
            {prediction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Paper 
                  elevation={3} 
                  sx={{ 
                    p: 4, 
                    mt: 4,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Prediction Results
                  </Typography>
                  {prediction.error ? (
                    <Typography color="error">{prediction.error}</Typography>
                  ) : (
                    <>
                      <Typography variant="body1" paragraph>
                        Based on the provided information, your hypertension risk assessment is:
                      </Typography>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            mt: 2, 
                            mb: 2, 
                            fontWeight: 'bold',
                            color: prediction.result === "Hypertension" ? '#d32f2f' : '#2e7d32',
                          }}
                        >
                          {prediction.result}
                        </Typography>
                      </motion.div>
                      <Typography variant="body1" paragraph>
                        {prediction.message}
                      </Typography>
                      {prediction.result === "Hypertension" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Typography variant="body2" sx={{ mt: 2, color: 'warning.main', fontWeight: 'bold' }}>
                            Your risk level suggests you should consider consulting a healthcare provider for a thorough evaluation.
                          </Typography>
                        </motion.div>
                      )}
                    </>
                  )}
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Box>
    </motion.div>
  );
};

export default HypertensionPage; 