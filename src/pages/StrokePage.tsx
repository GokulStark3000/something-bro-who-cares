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

interface FormData {
  sex: number;
  age: string | number;
  hypertension: number;
  heart_disease: number;
  ever_married: number;
  avg_glucose_level: string | number;
  smoking_status: number;
}

interface PredictionResult {
  Result: number;
}

const initialFormData: FormData = {
  sex: -1,
  age: '',
  hypertension: -1,
  heart_disease: -1,
  ever_married: -1,
  avg_glucose_level: '',
  smoking_status: -1,
};

const formFields = [
  {
    name: 'sex',
    label: 'Sex',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'Female' },
      { value: 1, label: 'Male' },
    ],
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number' as const,
    required: true,
    min: 0,
    max: 100,
  },
  {
    name: 'hypertension',
    label: 'Hypertension',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    name: 'heart_disease',
    label: 'Heart Disease',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    name: 'ever_married',
    label: 'Ever Married',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    name: 'avg_glucose_level',
    label: 'Average Glucose Level',
    type: 'number' as const,
    required: true,
    min: 50,
    max: 300,
  },
  {
    name: 'smoking_status',
    label: 'Smoking Status',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'Never smoked' },
      { value: 1, label: 'Smokes' },
    ],
  },
];

const StrokePage = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    try {
      // Convert string values to numbers and format data according to backend expectations
      const processedData = {
        sex: parseFloat(data.sex),
        age: parseFloat(data.age),
        hypertension: parseFloat(data.hypertension),
        heart_disease: parseFloat(data.heart_disease),
        ever_married: parseFloat(data.ever_married),
        avg_glucose_level: parseFloat(data.avg_glucose_level),
        smoking_status: parseFloat(data.smoking_status)
      };

      const response = await fetch('http://localhost:5000/stroke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      const result = await response.json();
      console.log('Backend response:', result);
      
      // Format the prediction result
      const probability = result.Result;
      const formattedResult = {
        probability: (probability * 100).toFixed(2),
        risk: probability > 0.5 ? 'High' : 'Low',
        message: probability > 0.5 
          ? 'You have a high risk of stroke. Please consult a healthcare provider.'
          : 'You have a low risk of stroke. Continue maintaining a healthy lifestyle.'
      };
      
      setPrediction(formattedResult);
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
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(21, 101, 192, 0.1)',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
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
              Stroke Risk Assessment
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
              elevation={0}
              sx={{ 
                p: 4, 
                mb: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(21, 101, 192, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px 0 rgba(21, 101, 192, 0.1)',
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: '#263238',
                  mb: 3,
                }}
              >
                About Stroke Risk Assessment
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  color: '#455A64',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                }}
              >
                The Predictiva Stroke Risk Assessment Tool employs advanced machine learning to estimate your risk of stroke by analyzing key health indicators such as age, hypertension, heart disease history, and other relevant factors.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  color: '#455A64',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                }}
              >
                Trained on comprehensive healthcare datasets, the model uses XGBoost ML algorithm to detect patterns commonly linked with diabetes, and provides you with a personalized and data-driven risk evaluation.
              </Typography>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(21, 101, 192, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(21, 101, 192, 0.1)',
                }}
              >
                <Typography 
                  variant="body1"
                  sx={{
                    color: '#1565C0',
                    fontWeight: 500,
                  }}
                >
                  Please note: This tool is intended for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
                </Typography>
              </Box>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(21, 101, 192, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px 0 rgba(21, 101, 192, 0.1)',
              }}
            >
              <PredictionForm
                fields={formFields}
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
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    mt: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(21, 101, 192, 0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px 0 rgba(21, 101, 192, 0.1)',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: '#263238',
                    }}
                  >
                    Prediction Results
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      color: '#455A64',
                      fontSize: '1.1rem',
                    }}
                  >
                    Based on the provided information, your stroke risk is:
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
                        color: prediction.risk === 'High' ? '#d32f2f' : '#2e7d32',
                      }}
                    >
                      {prediction.risk} Risk
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 2, 
                        color: '#455A64',
                        fontWeight: 500,
                      }}
                    >
                      Risk Probability: {prediction.probability}%
                    </Typography>
                  </motion.div>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 2, 
                      color: '#455A64',
                      fontSize: '1rem',
                    }}
                  >
                    {prediction.message}
                  </Typography>
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Box>
    </motion.div>
  );
};

export default StrokePage; 