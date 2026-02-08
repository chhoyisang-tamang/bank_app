import React, { useState } from 'react';
import { Card, Input, Typography, Form, Button, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../provider/AuthContextProvider';
import './Signup.css';

const { Title } = Typography;

const signupSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'First name must be at least 3 characters')
    .required('First name is required'),

  lastName: Yup.string()
    .min(3, 'Last name must be at least 3 characters')
    .required('Last name is required'),

address: Yup.string()
  .notRequired()
  .test(
    'min-if-filled',
    'Address must be at least 3 characters',
    (value) => !value || value.length >= 3
  ),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      setError('');
      // Create new account and auto-login
      const { confirmPassword, ...signupData } = data;
      await signup(signupData);
      message.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      message.error(err.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <div className="signup-header">
          <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
            🏦 Create Account
          </Title>
          <p style={{ textAlign: 'center', color: '#666', marginTop: '8px' }}>
            Join our bank today
          </p>
        </div>

        {error && (
          <div className="error-message" style={{ marginBottom: '16px', color: '#d32f2f' }}>
            {error}
          </div>
        )}

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <div className="form-row">
            {/* First Name */}
            <Form.Item
              label="First Name"
              validateStatus={errors.firstName ? 'error' : ''}
              help={errors.firstName?.message}
              className="form-item-half"
            >
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="First name" size="large" />
                )}
              />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
              label="Last Name"
              validateStatus={errors.lastName ? 'error' : ''}
              help={errors.lastName?.message}
              className="form-item-half"
            >
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Last name" size="large" />
                )}
              />
            </Form.Item>
          </div>

          {/* Address */}
          <Form.Item
            label="Address"
            validateStatus={errors.address ? 'error' : ''}
            help={errors.address?.message}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your address" size="large" />
              )}
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email Address"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="user@test.com" type="email" size="large" />
              )}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder="At least 8 characters" size="large" />
              )}
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirmPassword ? 'error' : ''}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Confirm password"
                  size="large"
                />
              )}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
            size="large"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Form>

        <div className="login-link" style={{ marginTop: '16px', textAlign: 'center' }}>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </Card>
    </div>
  );
}

export default Signup;