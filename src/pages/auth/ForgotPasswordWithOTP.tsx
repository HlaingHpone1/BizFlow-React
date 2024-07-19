import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CustomContainer from '../../layouts/CustomContainer';
import { Email, MarkEmailReadRounded, PasswordRounded, Visibility, VisibilityOff, VpnKeyRounded } from '@mui/icons-material';
import * as Yup from 'yup';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import { useState } from 'react';
import { useFormik } from 'formik';
import { otpCode, resetPasswordWithOTP, verifyMail, verifyOTPCode } from '../../api/auth';
import { alertStore } from '../../store/alertStore';
import { useNavigate } from 'react-router-dom';

type ForgotPasswordValues = {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

const validationSchemas = [
  Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  }),
  Yup.object({
    otp: Yup.string().matches(/^\d{6}$/, 'OTP must be exactly 6 digits').required('Required'),
  }),
  Yup.object({
    password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must be match")
      .required("Confirm Password Required"),
  }),
];

const ForgotPasswordWithOTP = () => {
  const navigate = useNavigate();

  const { setAlert } = alertStore();

  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const steps = [
    { label: 'Mail Verify', icon: <MarkEmailReadRounded /> },
    { label: 'Enter OTP Code', icon: <PasswordRounded /> },
    { label: 'Change Password', icon: <VpnKeyRounded /> },
  ];

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const { handleBlur, handleChange, handleSubmit, touched, errors } = useFormik<ForgotPasswordValues>({
    initialValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
      if (activeStep === 0) {
        setIsLoading(true);
        verifyMail(values)
          .then((response) => {
            if (response.data.meta.code) {
              setAlert(true, response?.data.message, "success");
              otpCode(values);
              handleNext();
            }
          })
          .catch((e) => {
            setAlert(true, e?.response?.data.message, "error");
            setIsLoading(false);
          })
          .finally(() => setIsLoading(false))

      } else if (activeStep === 1) {
        setIsLoading(true);
        verifyOTPCode(values)
          .then((response) => {
            if (response.data.meta.code) {
              setAlert(true, response?.data.message, "success");
              handleNext();
            }
          })
          .catch((e: any) => setAlert(true, e?.response?.data.message, "error"))
          .finally(() => setIsLoading(false))
      } else if (activeStep === 2) {
        setIsLoading(true);
        resetPasswordWithOTP(values)
          .then((response) => {
            if (response.data.meta.code) {
              setAlert(true, response?.data.message, "success");
              navigate("/login")
            }
          })
          .catch((e: any) => {
            setAlert(true, e?.response?.data.message, "error")
            setIsLoading(false);
          })
          .finally(() => setIsLoading(false))
      }
    }
  })

  console.log(errors);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  return (
    <CustomContainer>
      <Paper sx={{
        padding: "35px",
        width: "50%",
      }}>
        <Typography
          component="h1"
          variant="h4"
          paddingX={2}
          marginBottom={2}
          sx={{
            marginBottom: "3rem",
            fontWeight: "600",
            fontSize: "3rem",
            fontFamily: "Roboto Slab Variable",
            textAlign: "center"
          }}
        >
          Forgot Password
        </Typography>
        <Box sx={{ marginBottom: "20px" }}>
          <Stepper
            size="lg"
            sx={{
              width: '100%',
              '--StepIndicator-size': '3rem',
              '--Step-connectorInset': '0px',
              [`& .${stepIndicatorClasses.root}`]: {
                borderWidth: 4,
              },
              [`& .${stepClasses.root}::after`]: {
                height: 4,
              },
              [`& .${stepClasses.completed}`]: {
                [`& .${stepIndicatorClasses.root}`]: {
                  borderColor: 'primary.300',
                  color: 'primary.300',
                },
                '&::after': {
                  bgcolor: 'primary.300',
                },
              },
              [`& .${stepClasses.active}`]: {
                [`& .${stepIndicatorClasses.root}`]: {
                  borderColor: 'currentColor',
                },
              },
              [`& .${stepClasses.disabled} *`]: {
                color: 'neutral.outlinedDisabledColor',
              },
            }}
          >
            {steps.map((step, index) => (
              <Step
                key={step.label}
                orientation="vertical"
                completed={index < activeStep}
                active={index === activeStep}
                disabled={index > activeStep}
                indicator={
                  <StepIndicator variant="outlined" color={index <= activeStep ? "primary" : "neutral"}>
                    {step.icon}
                  </StepIndicator>
                }
              >
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'lg',
                    fontSize: '0.75rem',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                  }}
                >
                  {step.label}
                </Typography>
              </Step>
            ))}
          </Stepper>

          {/* <Button
            disabled={activeStep === steps.length - 1}
            onClick={handleNext}
          >
            Next
          </Button> */}
        </Box>
        <Box sx={{ width: '75%', margin: "0 auto" }}>
          <form action="" onSubmit={handleSubmit}>
            {
              activeStep === 0 && (
                <>
                  <Typography
                    sx={{
                      marginBottom: "25px",

                      fontWeight: '700',
                      fontSize: '1.75rem',
                      fontFamily: "Roboto Slab Variable",

                      textAlign: 'center',
                    }}
                  >
                    Verify Mail
                  </Typography>
                  <FormControl fullWidth sx={{ m: "8px 0px" }} >
                    <TextField
                      label="Email *"
                      name="email"
                      placeholder='Enter your email'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </FormControl>
                </>
              )
            }
            {
              activeStep === 1 && (
                <>
                  <Typography
                    sx={{
                      marginBottom: "25px",

                      fontWeight: '700',
                      fontSize: '1.75rem',
                      fontFamily: "Roboto Slab Variable",

                      textAlign: 'center',
                    }}
                  >
                    Enter OTP Code
                  </Typography>
                  <FormControl fullWidth sx={{ m: "8px 0px" }} >
                    <TextField
                      label="OTP Code *"
                      name="otp"
                      placeholder='Enter your OTP Code'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.otp && Boolean(errors.otp)}
                      helperText={touched.otp && errors.otp}
                    />
                  </FormControl>
                </>
              )
            }

            {
              activeStep === 2 && (
                <>
                  <Typography
                    sx={{
                      marginBottom: "25px",

                      fontWeight: '700',
                      fontSize: '1.75rem',
                      fontFamily: "Roboto Slab Variable",

                      textAlign: 'center',
                    }}
                  >
                    Change Password
                  </Typography>
                  <FormControl fullWidth sx={{ m: "8px 0px" }} >
                    <TextField
                      label="New Password *"
                      name="password"
                      type={showPassword.password ? 'text' : 'password'}
                      placeholder='Enter your password'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyRounded />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword({
                                ...showPassword,
                                password: !showPassword.password,
                              })}
                            >
                              {showPassword.password ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: "8px 0px" }} >
                    <TextField
                      label="Confirm Password *"
                      name="confirmPassword"
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      placeholder='Confirm your password'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyRounded />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword({
                                ...showPassword,
                                confirmPassword: !showPassword.confirmPassword,
                              })}
                            >
                              {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                  </FormControl>
                </>
              )
            }
            <Stack direction="row" justifyContent="space-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant='text'
                size='small'
              >
                Back
              </Button>
              <Button variant='contained' type='submit' sx={{
                margin: "20px 0 0 auto",
                padding: "8px 30px",
                display: "block",
              }}
                disabled={isLoading}
              >
                Submit</Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </CustomContainer>
  )
}

export default ForgotPasswordWithOTP
