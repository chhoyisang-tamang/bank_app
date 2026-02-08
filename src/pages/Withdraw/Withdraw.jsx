import React, { useState } from 'react';
import { Card, Input, Button, Statistic, Row, Col, message, Steps, Select, Modal } from 'antd';
import { ArrowDownOutlined, LockOutlined } from '@ant-design/icons';
import './Withdraw.css';

function Withdraw() {
  const [amount, setAmount] = useState('');
  const [current, setCurrent] = useState(0);
  const [currentBalance] = useState(5000);
  const [method, setMethod] = useState('atm');
  const [isPinModalVisible, setIsPinModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [pinAttempts, setPinAttempts] = useState(0);

  const steps = [
    { title: 'Enter Amount', description: 'Specify withdrawal amount' },
    { title: 'Select Method', description: 'Choose withdrawal method' },
    { title: 'Review', description: 'Confirm transaction' },
    { title: 'Complete', description: 'Transaction confirmed' },
  ];

  const withdrawMethods = [
    { label: '🏧 ATM Withdrawal', value: 'atm' },
    { label: '💳 Card Transfer', value: 'card' },
    { label: '💰 Bank Transfer', value: 'bank' },
    { label: '📱 Mobile Wallet', value: 'mobile' },
  ];

  const handleNext = () => {
    if (current === 0) {
      if (!amount || parseFloat(amount) <= 0) {
        message.error('Please enter a valid amount');
        return;
      }
      if (parseFloat(amount) > currentBalance) {
        message.error('Insufficient balance');
        return;
      }
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
        setCurrent(2);
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
    message.success(`Successfully withdrew ₹${parseFloat(amount).toFixed(2)} via ${method}!`);
    setAmount('');
    setCurrent(0);
  };

  const getMethodDescription = () => {
    const methods = {
      atm: 'Cash withdrawal from ATM. Usually available 24/7.',
      card: 'Transfer to your linked debit card (1-2 business days)',
      bank: 'Direct transfer to your bank account (Same day)',
      mobile: 'Transfer to your mobile wallet (Instant)',
    };
    return methods[method] || '';
  };

  return (
    <div className="withdraw-container">
      <Card className="withdraw-card">
        <div className="withdraw-header">
          <h1>🏧 Withdraw Money</h1>
          <p>Take out funds from your account securely</p>
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
                title="Amount to Withdraw"
                value={amount ? parseFloat(amount) : 0}
                prefix="₹"
                precision={2}
                valueStyle={{ color: '#f44336' }}
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
              <label className="form-label">Withdrawal Amount</label>
              <Input
                type="number"
                placeholder="Enter amount to withdraw"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                size="large"
                prefix="₹"
                min="0"
                step="0.01"
                max={currentBalance}
                className="amount-input"
              />
              <p className="info-text">
                Minimum withdrawal: ₹1000 | Maximum available: ₹{currentBalance.toFixed(2)}
              </p>
            </div>
          )}

          {current === 1 && (
            <div>
              <label className="form-label">Withdrawal Method</label>
              <Select
                value={method}
                onChange={setMethod}
                options={withdrawMethods}
                size="large"
                className="method-select"
              />
              <div className="method-description">
                <p>{getMethodDescription()}</p>
              </div>
            </div>
          )}

          {current === 2 && (
            <div className="review-section">
              <h3>Review Transaction Details</h3>
              <div className="review-item">
                <span>Current Balance:</span>
                <span className="review-value">₹{currentBalance.toFixed(2)}</span>
              </div>
              <div className="review-item">
                <span>Withdrawal Amount:</span>
                <span className="review-value" style={{ color: '#f44336' }}>
                  -₹{parseFloat(amount).toFixed(2)}
                </span>
              </div>
              <div className="review-item">
                <span>Withdrawal Method:</span>
                <span className="review-value">{method.toUpperCase()}</span>
              </div>
              <div className="review-divider"></div>
              <div className="review-item total">
                <span>Remaining Balance:</span>
                <span className="review-value">
                  ₹{(currentBalance - parseFloat(amount)).toFixed(2)}
                </span>
              </div>
              <div className="review-item">
                <span>Transaction Fee:</span>
                <span className="review-value">Free</span>
              </div>
            </div>
          )}

          {current === 3 && (
            <div className="success-section">
              <div className="success-icon">✅</div>
              <h3>Withdrawal Successful!</h3>
              <p>Your withdrawal of ₹{parseFloat(amount).toFixed(2)} has been initiated.</p>
              <div className="success-details">
                <p>Transaction ID: TXN-2026-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Method: {method.toUpperCase()}</p>
                <p>Remaining Balance: ₹{(currentBalance - parseFloat(amount)).toFixed(2)}</p>
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
          {current < 3 && (
            <Button
              type="primary"
              size="large"
              onClick={current === 2 ? handleShowPinModal : handleNext}
              className="next-btn"
            >
              {current === 0 ? 'Next' : current === 1 ? 'Review' : 'Verify PIN'}
            </Button>
          )}
          {current === 3 && (
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setAmount('');
                setCurrent(0);
              }}
              className="complete-btn"
            >
              New Withdrawal
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
            Enter your 4-digit PIN to confirm this withdrawal.
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

export default Withdraw;
