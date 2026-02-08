import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Statistic, Tag, Modal, Input, message, Select } from 'antd';
import { useNavigate } from 'react-router';
import { useAuth } from '../../provider/AuthContextProvider';
import { LockOutlined } from '@ant-design/icons';
import './Home.css';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(80000);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'deposit',
      amount: 1000,
      date: '2026-01-15',
      description: 'Initial Deposit',
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 500,
      date: '2026-01-20',
      description: 'Cash Withdrawal at ATM',
    },
    {
      id: 3,
      type: 'transfer',
      amount: 750,
      date: '2026-01-25',
      description: 'Transfer to Rupa',
    },
    {
      id: 4,
      type: 'payment',
      amount: 150,
      date: '2026-01-28',
      description: 'Electricity Bill Payment',
    },
  ]);

  const [isDepositVisible, setIsDepositVisible] = useState(false);
  const [isWithdrawVisible, setIsWithdrawVisible] = useState(false);
  const [isTransferVisible, setIsTransferVisible] = useState(false);
  const [isBillVisible, setIsBillVisible] = useState(false);
  const [isPinModalVisible, setIsPinModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [pinAttempts, setPinAttempts] = useState(0);
  const [pendingTransaction, setPendingTransaction] = useState(null);
  const [amount, setAmount] = useState('');
  const [transferData, setTransferData] = useState({ recipient: '', amount: '' });
  const [billData, setBillData] = useState({ provider: '', amount: '' });
  const [filterType, setFilterType] = useState('all');

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      message.error('Please enter a valid amount');
      return;
    }
    setPendingTransaction({ type: 'deposit', amount });
    setIsPinModalVisible(true);
  };

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      message.error('Please enter a valid amount');
      return;
    }
    const newAmount = parseFloat(amount);
    if (newAmount > balance) {
      message.error('Insufficient balance!');
      return;
    }
    setPendingTransaction({ type: 'withdraw', amount });
    setIsPinModalVisible(true);
  };

  const handleTransfer = () => {
    if (!transferData.recipient || !transferData.amount || parseFloat(transferData.amount) <= 0) {
      message.error('Please fill all fields with valid amounts');
      return;
    }
    const newAmount = parseFloat(transferData.amount);
    if (newAmount > balance) {
      message.error('Insufficient balance!');
      return;
    }
    setPendingTransaction({ type: 'transfer', amount: transferData.amount, recipient: transferData.recipient });
    setIsPinModalVisible(true);
  };

  const handleBillPayment = () => {
    if (!billData.provider || !billData.amount || parseFloat(billData.amount) <= 0) {
      message.error('Please fill all fields with valid amounts');
      return;
    }
    const newAmount = parseFloat(billData.amount);
    if (newAmount > balance) {
      message.error('Insufficient balance!');
      return;
    }
    setPendingTransaction({ type: 'bill', amount: billData.amount, provider: billData.provider });
    setIsPinModalVisible(true);
  };

  const handleVerifyPin = () => {
    const correctPin = '1234';
    
    if (pin === correctPin) {
      message.success('PIN verified successfully!');
      executePendingTransaction();
      setIsPinModalVisible(false);
      setPin('');
      setPinAttempts(0);
      setPendingTransaction(null);
    } else {
      const remaining = 3 - pinAttempts - 1;
      if (remaining === 0) {
        message.error('Maximum PIN attempts exceeded!');
        setIsPinModalVisible(false);
        setPin('');
        setPinAttempts(0);
        setPendingTransaction(null);
      } else {
        setPinAttempts(pinAttempts + 1);
        message.error(`Incorrect PIN. ${remaining} attempts remaining.`);
        setPin('');
      }
    }
  };

  const executePendingTransaction = () => {
    if (!pendingTransaction) return;

    const txnAmount = parseFloat(pendingTransaction.amount);

    if (pendingTransaction.type === 'deposit') {
      setBalance(balance + txnAmount);
      setTransactions([
        {
          id: transactions.length + 1,
          type: 'deposit',
          amount: txnAmount,
          date: new Date().toISOString().split('T')[0],
          description: 'Deposit',
        },
        ...transactions,
      ]);
      message.success(`Deposited ₹${txnAmount.toFixed(2)} successfully!`);
      setAmount('');
      setIsDepositVisible(false);
    } else if (pendingTransaction.type === 'withdraw') {
      setBalance(balance - txnAmount);
      setTransactions([
        {
          id: transactions.length + 1,
          type: 'withdrawal',
          amount: txnAmount,
          date: new Date().toISOString().split('T')[0],
          description: 'Withdrawal',
        },
        ...transactions,
      ]);
      message.success(`Withdrawn ₹${txnAmount.toFixed(2)} successfully!`);
      setAmount('');
      setIsWithdrawVisible(false);
    } else if (pendingTransaction.type === 'transfer') {
      setBalance(balance - txnAmount);
      setTransactions([
        {
          id: transactions.length + 1,
          type: 'transfer',
          amount: txnAmount,
          date: new Date().toISOString().split('T')[0],
          description: `Transfer to ${pendingTransaction.recipient}`,
        },
        ...transactions,
      ]);
      message.success(`Transferred ₹${txnAmount.toFixed(2)} to ${pendingTransaction.recipient}!`);
      setTransferData({ recipient: '', amount: '' });
      setIsTransferVisible(false);
    } else if (pendingTransaction.type === 'bill') {
      setBalance(balance - txnAmount);
      setTransactions([
        {
          id: transactions.length + 1,
          type: 'payment',
          amount: txnAmount,
          date: new Date().toISOString().split('T')[0],
          description: `${pendingTransaction.provider} Bill Payment`,
        },
        ...transactions,
      ]);
      message.success(`Bill payment of ₹${txnAmount.toFixed(2)} successful!`);
      setBillData({ provider: '', amount: '' });
      setIsBillVisible(false);
    }
  };

  const filteredTransactions = filterType === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '120px',
      responsive: ['sm'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['md'],
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '100px',
      render: (type) => {
        const colors = { deposit: 'green', withdrawal: 'red', transfer: 'blue', payment: 'orange' };
        return <Tag color={colors[type]}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '120px',
      render: (amount, record) => (
        <span style={{ color: ['deposit', 'transfer'].includes(record.type) ? 'green' : 'red', fontWeight: 'bold' }}>
          {['deposit', 'transfer'].includes(record.type) ? '+' : '-'}रु{amount.toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <div className="home-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}! 👋</h1>
        <p>Manage your account and transactions</p>
      </div>

      {/* Main Account Section */}
      <Row gutter={[16, 16]} className="accounts-section">
        <Col xs={24} md={24}>
          <Card className="account-card primary-account">
            <div className="account-header">
              <h3>SAVING ACCOUNT</h3>
              <span className="account-number">****1234</span>
            </div>
            <div className="balance-display">
              <p>Total Balance</p>
              <h2>₹{balance.toFixed(2)}</h2>
            </div>
            <div className="account-footer">
              <small>Last Updated: Today</small>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Statistics Section */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title="Total Balance"
              value={balance}
              prefix="₹"
              precision={2}
              valueStyle={{ color: '#10B981', fontSize: '20px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title="This Month"
              value={transactions.length}
              suffix="transactions"
              valueStyle={{ color: '#4caf50', fontSize: '20px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title="Account Status"
              value="Active"
              valueStyle={{ color: '#ff9800', fontSize: '20px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card">
            <Statistic
              title="Credit Score"
              value="Excellent"
              valueStyle={{ color: '#4caf50', fontSize: '20px', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions Section */}
      <Card className="actions-card">
        <h3 style={{ marginBottom: '16px' }}>Quick Actions</h3>
        <Row gutter={[8, 8]} className="actions-row">
          <Col xs={12} sm={6} md={4}>
            <Button
              type="primary"
              block
              size="large"
              onClick={() => setIsDepositVisible(true)}
              className="action-btn"
            >
              💰 Deposit
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button
              danger
              block
              size="large"
              onClick={() => setIsWithdrawVisible(true)}
              className="action-btn"
            >
              🏧 Withdraw
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button 
              block 
              size="large" 
              onClick={() => setIsTransferVisible(true)}
              className="action-btn"
            >
              📤 Transfer
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button 
              block 
              size="large"
              onClick={() => setIsBillVisible(true)}
              className="action-btn"
            >
              📋 Pay Bills
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button block size="large" className="action-btn" onClick={() => navigate('/cards')}>
              💳 Cards
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Button block size="large" className="action-btn" onClick={() => navigate('/transactions')}>
              📊 Transactions
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Transactions Section */}
      <Card className="transactions-card">
        <div className="transactions-header">
          <h3>Recent Transactions</h3>
          <Select
            style={{ width: '150px' }}
            value={filterType}
            onChange={setFilterType}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Deposits', value: 'deposit' },
              { label: 'Withdrawals', value: 'withdrawal' },
              { label: 'Transfers', value: 'transfer' },
              { label: 'Payments', value: 'payment' },
            ]}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          responsive
          size="small"
        />
      </Card>

      {/* Deposit Modal */}
      <Modal
        title="Deposit Money"
        open={isDepositVisible}
        onOk={handleDeposit}
        onCancel={() => {
          setIsDepositVisible(false);
          setAmount('');
        }}
        okText="Deposit"
        cancelText="Cancel"
      >
        <p>Enter the amount you want to deposit:</p>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          size="large"
          prefix=" रु "
          min="0"
          step="0.01"
        />
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        title="Withdraw Money"
        open={isWithdrawVisible}
        onOk={handleWithdraw}
        onCancel={() => {
          setIsWithdrawVisible(false);
          setAmount('');
        }}
        okText="Withdraw"
        cancelText="Cancel"
      >
        <p>Enter the amount you want to withdraw:</p>
        <p style={{ color: '#666', fontSize: '12px' }}>
          Available Balance: रु {balance.toFixed(2)}
        </p>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          size="large"
          prefix=" रु "
          min="0"
          step="0.01"
          max={balance}
        />
      </Modal>

      {/* Transfer Modal */}
      <Modal
        title="Transfer Money"
        open={isTransferVisible}
        onOk={handleTransfer}
        onCancel={() => {
          setIsTransferVisible(false);
          setTransferData({ recipient: '', amount: '' });
        }}
        okText="Transfer"
        cancelText="Cancel"
      >
        <p>Transfer details:</p>
        <Input
          placeholder="Recipient Name / Account Number"
          value={transferData.recipient}
          onChange={(e) => setTransferData({ ...transferData, recipient: e.target.value })}
          size="large"
          style={{ marginBottom: '12px' }}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={transferData.amount}
          onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
          size="large"
          prefix=" रु "
          min="0"
          step="0.01"
        />
        <p style={{ color: '#666', fontSize: '12px', marginTop: '12px' }}>
          Available Balance:  रु {balance.toFixed(2)}
        </p>
      </Modal>

      {/* Bill Payment Modal */}
      <Modal
        title="Pay Bills"
        open={isBillVisible}
        onOk={handleBillPayment}
        onCancel={() => {
          setIsBillVisible(false);
          setBillData({ provider: '', amount: '' });
        }}
        okText="Pay"
        cancelText="Cancel"
      >
        <p>Bill payment details:</p>
        <Select
          placeholder="Select Service Provider"
          value={billData.provider || undefined}
          onChange={(value) => setBillData({ ...billData, provider: value })}
          style={{ width: '100%', marginBottom: '12px' }}
          options={[
            { label: 'Electricity Company', value: 'Electricity Company' },
            { label: 'Water Department', value: 'Water Department' },
            { label: 'Internet Provider', value: 'Internet Provider' },
            { label: 'Mobile Carrier', value: 'Mobile Carrier' },
            { label: 'Gas Company', value: 'Gas Company' },
          ]}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={billData.amount}
          onChange={(e) => setBillData({ ...billData, amount: e.target.value })}
          size="large"
          prefix=" रु "
          min="0"
          step="0.01"
        />
        <p style={{ color: '#666', fontSize: '12px', marginTop: '12px' }}>
          Available Balance: रु {balance.toFixed(2)}
        </p>
      </Modal>

      {/* PIN Verification Modal */}
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
          setPendingTransaction(null);
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setIsPinModalVisible(false);
            setPin('');
            setPinAttempts(0);
            setPendingTransaction(null);
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
          Enter your 4-digit PIN to confirm this {pendingTransaction?.type || 'transaction'}.
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
    </div>
  );
}

export default Home;
