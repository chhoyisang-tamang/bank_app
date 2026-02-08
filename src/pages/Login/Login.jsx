import React, { useState } from 'react';
import { Card, Input, Typography, Form, Button, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../../provider/AuthContextProvider';
import './Login.css'; 

const { Title } = Typography;

/* Validation Schema */
const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required'),
});

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      setError('');
      await login(data.email, data.password);
      message.success('Login successful!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      message.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
            🏦 Bank App
          </Title>
          <p style={{ textAlign: 'center', color: '#666', marginTop: '8px' }}>
            Welcome back!
          </p>
        </div>

        {error && (
          <div className="error-message" style={{ marginBottom: '16px', color: '#d32f2f' }}>
            {error}
          </div>
        )}

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
                <Input 
                  {...field} 
                  placeholder="admin@test.com" 
                  size="large"
                  type="email"
                />
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
                <Input.Password 
                  {...field} 
                  placeholder="Enter your password" 
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
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        <div className="signup-link" style={{ marginTop: '16px', textAlign: 'center' }}>
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>

        <div className="demo-credentials" style={{ 
          marginTop: '20px', 
          padding: '12px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Demo Credentials:</p>
          <p style={{ margin: '4px 0' }}>📧 Email: admin@test.com</p>
          <p style={{ margin: '4px 0' }}>🔐 Password: password</p>
        </div>
      </Card>
    </div>
  );
}

export default Login;