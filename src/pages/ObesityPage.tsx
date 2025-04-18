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

const obesityFields = [
  {
    name: 'Gender',
    label: 'Gender',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'Female' },
      { value: 1, label: 'Male' },
    ],
  },
  { 
    name: 'Age', 
    label: 'Age', 
    type: 'number' as const, 
    required: true, 
    min: 14, 
    max: 61,
    helperText: 'Age must be between 14 and 61 years'
  },
  { 
    name: 'Height', 
    label: 'Height (m)', 
    type: 'number' as const, 
    required: true, 
    step: 0.01,
    min: 1.45,
    max: 1.97,
    helperText: 'Height must be between 1.45m and 1.97m'
  },
  { 
    name: 'Weight', 
    label: 'Weight (kg)', 
    type: 'number' as const, 
    required: true, 
    step: 0.1,
    min: 39,
    max: 165,
    helperText: 'Weight must be between 39kg and 165kg'
  },
  {
    name: 'family_history_with_overweight',
    label: 'Family History with Overweight',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ],
  },
  {
    name: 'CAEC',
    label: 'Consumption of Food Between Meals',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Sometimes' },
      { value: 2, label: 'Frequently' },
      { value: 3, label: 'Always' },
    ],
  },
  {
    name: 'CH2O',
    label: 'Daily Water Consumption',
    type: 'select' as const,
    required: true,
    options: [
      { value: 1, label: 'Less than 1L' },
      { value: 2, label: '1-2L' },
      { value: 3, label: 'More than 2L' },
    ],
  },
  {
    name: 'CALC',
    label: 'Alcohol Consumption',
    type: 'select' as const,
    required: true,
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Sometimes' },
      { value: 2, label: 'Frequently' },
      { value: 3, label: 'Always' },
    ],
  }
];

const getWeightCategory = (prediction: number) => {
  switch (prediction) {
    case 0:
      return 'Insufficient Weight';
    case 1:
      return 'Normal Weight';
    case 2:
      return 'Overweight Level I';
    case 3:
      return 'Overweight Level II';
    case 4:
      return 'Obesity Type I';
    case 5:
      return 'Obesity Type II';
    case 6:
      return 'Obesity Type III';
    default:
      return 'Unknown';
  }
};

const getCategoryColor = (prediction: number) => {
  switch (prediction) {
    case 0:
      return '#ff9800'; // Orange for insufficient
    case 1:
      return '#4caf50'; // Green for normal
    case 2:
      return '#ffa726'; // Light orange for overweight I
    case 3:
      return '#f57c00'; // Orange for overweight II
    case 4:
      return '#ef5350'; // Light red for obesity I
    case 5:
      return '#d32f2f'; // Red for obesity II
    case 6:
      return '#b71c1c'; // Dark red for obesity III
    default:
      return '#455A64';
  }
};

const ObesityPage = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      setError(null); // Clear any previous errors
      
      // Validate input values
      if (data.Age < 14 || data.Age > 61) {
        setError('Age must be between 14 and 61 years');
        return;
      }

      if (data.Height < 1.45 || data.Height > 1.97) {
        setError('Height must be between 1.45m and 1.97m');
        return;
      }

      if (data.Weight < 39 || data.Weight > 165) {
        setError('Weight must be between 39kg and 165kg');
        return;
      }

      // Convert string values to numbers
      const processedData = Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = typeof value === 'string' ? parseFloat(value) : value;
        return acc;
      }, {} as any);

      const response = await fetch('http://localhost:5000/obesity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      const result = await response.json();
      console.log('Backend response:', result);
      
      // Handle both string and number predictions from backend
      if (typeof result.Result === 'string') {
        // Convert string prediction to number for display
        const predictionMap: { [key: string]: number } = {
          'Insufficient_Weight': 0,
          'Normal_Weight': 1,
          'Overweight_Level_I': 2,
          'Overweight_Level_II': 3,
          'Obesity_Type_I': 4,
          'Obesity_Type_II': 5,
          'Obesity_Type_III': 6
        };
        setPrediction(predictionMap[result.Result] ?? 0);
      } else {
        setPrediction(result.Result);
      }
    } catch (error) {
      console.error('Error making prediction:', error);
      setError('An error occurred while making the prediction. Please try again.');
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
              Obesity Risk Assessment
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
                About Obesity Risk Assessment
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
                The Predictiva Obesity Risk Assessment Tool employs advanced machine learning to estimate your risk of obesity by analyzing key health indicators such as height, weight, dietary habits, family history, and other relevant factors.

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
                Trained on comprehensive healthcare datasets, the model uses Random Forest ML algorithm to detect patterns commonly linked with diabetes, and provides you with a personalized and data-driven risk evaluation.
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
                fields={obesityFields}
                onSubmit={handleSubmit}
                title="Enter Your Lifestyle Information"
              />
              {error && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: '#ffebee',
                    borderRadius: '8px',
                    border: '1px solid #ef5350',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#d32f2f',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    ⚠️ {error}
                  </Typography>
                </Box>
              )}
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
                    Based on the provided information, your weight category is:
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
                        color: getCategoryColor(prediction),
                      }}
                    >
                      {getWeightCategory(prediction)}
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
                    This assessment is based on the provided data. Please consult with a healthcare professional for a proper medical evaluation and personalized advice.
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

export default ObesityPage; 