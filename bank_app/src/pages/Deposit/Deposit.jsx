import React, { useState } from 'react';
import { Card, Input, Button, Statistic, Row, Col, message, Steps, Modal } from 'antd';
import { ArrowUpOutlined, LockOutlined } from '@ant-design/icons';
import './Deposit.css';

function Deposit() {
  const [amount, setAmount] = useState('');
  const [current, setCurrent] = useState(0);
  const [currentBalance] = useState(5000);
  const [isPinModalVisible, setIsPinModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [pinAttempts, setPinAttempts] = useState(0);

  const steps = [
    { title: 'Enter Amount', description: 'Specify deposit amount' },
    { title: 'Review', description: 'Confirm transaction details' },
    { title: 'Complete', description: 'Transaction confirmed' },
  ];

  const handleNext = () => {
    if (!amount || parseFloat(amount) <= 0) {
      message.error('Please enter a valid amount');
      return;
    }
    setCurrent(current + 1);
  };

  const handleVerifyPin = () => {
    const correctPin = '1234'; // Default PIN for demo
    
    if (pin === correctPin) {
      message.success('PIN verified successfully!');
      setIsPinModalVisible(false);
      setPin('');
      setPinAttempts(0);
      handleComplete();
    } else {
      const remaining = 3 - pinAttempts - 1;
      if (remaining === 0) {
        message.error('Maximum PIN attempts exceeded!');
        setIsPinModalVisible(false);
        setPin('');
        setCurrent(0);
        setAmount('');
        setPinAttempts(0);
      } else {
        setPinAttempts(pinAttempts + 1);
        message.error(`Incorrect PIN. ${remaining} attempts remaining.`);
        setPin('');
      }
    }
  };

  const handleShowPinModal = () => {
    setIsPinModalVisible(true);
  };

  const handleComplete = () => {
    message.success(`Successfully deposited ₹${parseFloat(amount).toFixed(2)}!`);
    setAmount('');
    setCurrent(0);
  };

  const handleConfirm = () => {
    if (current === 1) {
      handleShowPinModal();
    } else {
      handleNext();
    }
  };

  return (
    <div className="deposit-container">
      <Card className="deposit-card">
        <div className="deposit-header">
          <h1>💰 Deposit Money</h1>
          <p>Add funds to your account securely</p>
        </div>

        <Row gutter={[16, 16]} className="balance-row">
          <Col xs={24} sm={12}>
            <Card className="balance-card">
              <Statistic
                title="Current Balance"
                value={currentBalance}
                prefix="₹"
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card className="balance-card">
              <Statistic
                title="Amount to Deposit"
                value={amount ? parseFloat(amount) : 0}
                prefix="₹"
                precision={2}
                valueStyle={{ color: '#4caf50' }}
              />
            </Card>
          </Col>
        </Row>

        <div className="steps-section">
          <Steps current={current} items={steps} />
        </div>

        <div className="form-section">
          {current === 0 && (
            <div>
              <label className="form-label">Deposit Amount</label>
              <Input
                type="number"
                placeholder="Enter amount to deposit"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                size="large"
                prefix="₹"
                min="0"
                step="0.01"
                className="amount-input"
              />
              <p className="info-text">Minimum deposit: ₹1000 | Maximum deposit: ₹1,000,000</p>
            </div>
          )}

          {current === 1 && (
            <div className="review-section">
              <h3>Review Transaction Details</h3>
              <div className="review-item">
                <span>Current Balance:</span>
                <span className="review-value">₹{currentBalance.toFixed(2)}</span>
              </div>
              <div className="review-item">
                <span>Deposit Amount:</span>
                <span className="review-value" style={{ color: '#4caf50' }}>
                  +₹{parseFloat(amount).toFixed(2)}
                </span>
              </div>
              <div className="review-divider"></div>
              <div className="review-item total">
                <span>New Balance:</span>
                <span className="review-value">
                  ₹{(currentBalance + parseFloat(amount)).toFixed(2)}
                </span>
              </div>
              <div className="review-item">
                <span>Transaction Fee:</span>
                <span className="review-value">Free</span>
              </div>
            </div>
          )}

          {current === 2 && (
            <div className="success-section">
              <div className="success-icon">✅</div>
              <h3>Deposit Successful!</h3>
              <p>Your deposit of ₹{parseFloat(amount).toFixed(2)} has been processed.</p>
              <div className="success-details">
                <p>Transaction ID: TXN-2026-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>New Balance: ₹{(currentBalance + parseFloat(amount)).toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        <div className="button-group">
          {current > 0 && (
            <Button
              size="large"
              onClick={() => setCurrent(current - 1)}
              className="back-btn"
            >
              Back
            </Button>
          )}
          {current < 2 && (
            <Button
              type="primary"
              size="large"
              onClick={handleConfirm}
              className="next-btn"
            >
              {current === 0 ? 'Review' : 'Verify PIN'}
            </Button>
          )}
          {current === 2 && (
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setAmount('');
                setCurrent(0);
              }}
              className="reset-btn"
            >
              New Deposit
            </Button>
          )}
        </div>

        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LockOutlined />
              Enter Transaction PIN
            </div>
          }
          open={isPinModalVisible}
          onCancel={() => {
            setIsPinModalVisible(false);
            setPin('');
            setPinAttempts(0);
          }}
          footer={[
            <Button key="cancel" onClick={() => {
              setIsPinModalVisible(false);
              setPin('');
              setPinAttempts(0);
            }}>
              Cancel
            </Button>,
            <Button
              key="verify"
              type="primary"
              onClick={handleVerifyPin}
              disabled={pin.length !== 4}
            >
              Verify PIN
            </Button>,
          ]}
        >
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Enter your 4-digit PIN to confirm this transaction.
          </p>
          <Input.Password
            placeholder="Enter PIN"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && pin.length === 4 && handleVerifyPin()}
            autoFocus
            size="large"
          />
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#999' }}>
            Demo PIN: 1234
          </p>
        </Modal>
      </Card>
    </div>
  );
}

export default Deposit;
