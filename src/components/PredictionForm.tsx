import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from '@mui/material';

interface FormField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select';
  options?: { value: string | number; label: string }[];
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

interface PredictionFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
  title: string;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ fields, onSubmit, title }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [error, setError] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    // Convert string value to number if it's a numeric string
    const processedValue = !isNaN(Number(value)) ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate required fields
    const missingFields = fields
      .filter((field) => field.required && (formData[field.name] === undefined || formData[field.name] === ''))
      .map((field) => field.label);

    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Convert number fields to numbers
    const processedData = Object.entries(formData).reduce((acc, [key, value]) => {
      const field = fields.find((f) => f.name === key);
      if (field?.type === 'number') {
        acc[key] = Number(value);
      } else if (field?.type === 'select') {
        // Ensure select values are properly converted to numbers if they're numeric
        acc[key] = !isNaN(Number(value)) ? Number(value) : value;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    onSubmit(processedData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              {field.type === 'select' ? (
                <FormControl fullWidth required={field.required}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formData[field.name]?.toString() || ''}
                    label={field.label}
                    onChange={handleSelectChange}
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value.toString()}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  required={field.required}
                  inputProps={{
                    min: field.min,
                    max: field.max,
                    step: field.step,
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
          fullWidth
        >
          Get Prediction
        </Button>
      </Box>
    </Paper>
  );
};

export default PredictionForm; 