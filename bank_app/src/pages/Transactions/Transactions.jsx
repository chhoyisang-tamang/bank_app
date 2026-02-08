import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, DatePicker, Row, Col, Statistic, Space, Tag, Empty } from 'antd';
import { DownloadOutlined, PrinterOutlined, FilterOutlined } from '@ant-design/icons';
import { useAuth } from '../../provider/AuthContextProvider';
import './Transactions.css';

function Transactions() {
  const { user } = useAuth();
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);

  // Mock transaction data
  const allTransactions = [
    { id: 1, date: '2026-01-15', description: 'ATM Withdrawal', type: 'withdrawal', amount: 200, balance: 8300 },
    { id: 2, date: '2026-01-14', description: 'Salary Deposit', type: 'deposit', amount: 3500, balance: 8500 },
    { id: 3, date: '2026-01-12', description: 'Bill Payment - Electricity', type: 'payment', amount: 150, balance: 5000 },
    { id: 4, date: '2026-01-10', description: 'Transfer to Madhu', type: 'transfer', amount: 1000, balance: 5150 },
    { id: 5, date: '2026-01-08', description: 'Online Purchase', type: 'payment', amount: 89.99, balance: 6150 },
    { id: 6, date: '2026-01-05', description: 'Check Deposit', type: 'deposit', amount: 500, balance: 6239.99 },
    { id: 7, date: '2025-12-28', description: 'ATM Withdrawal', type: 'withdrawal', amount: 300, balance: 5739.99 },
    { id: 8, date: '2025-12-25', description: 'Refund - Online Store', type: 'deposit', amount: 75, balance: 6039.99 },
  ];

  const filteredTransactions = allTransactions.filter(transaction => {
    if (selectedType !== 'all' && transaction.type !== selectedType) return false;
    if (dateRange[0] && dateRange[1]) {
      const txDate = new Date(transaction.date);
      if (txDate < dateRange[0].toDate() || txDate > dateRange[1].toDate()) return false;
    }
    return true;
  });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
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
      render: (type) => {
        const colors = {
          deposit: 'green',
          withdrawal: 'red',
          transfer: 'blue',
          payment: 'orange',
        };
        return <Tag color={colors[type]}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <span className={record.type === 'deposit' ? 'amount-positive' : 'amount-negative'}>
          {record.type === 'deposit' ? '+' : '-'}₹{amount.toFixed(2)}
        </span>
      ),
      align: 'right',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      responsive: ['lg'],
      render: (balance) => `₹${balance.toFixed(2)}`,
      align: 'right',
    },
  ];

  const handleDownloadPDF = () => {
    alert('Download PDF feature coming soon!');
  };

  const handlePrint = () => {
    window.print();
  };

  const totalDeposits = filteredTransactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = filteredTransactions
    .filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPayments = filteredTransactions
    .filter(t => t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h1>Transaction History</h1>
        <p>View and manage all your account transactions</p>
      </div>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} className="summary-row">
        <Col xs={24} sm={12} md={6}>
          <Card className="summary-card">
            <Statistic
              title="Total Deposits"
              value={totalDeposits}
              prefix="₹"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="summary-card">
            <Statistic
              title="Total Withdrawals"
              value={totalWithdrawals}
              prefix="₹"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="summary-card">
            <Statistic
              title="Total Payments"
              value={totalPayments}
              prefix="₹"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="summary-card">
            <Statistic
              title="Total Transactions"
              value={filteredTransactions.length}
              suffix="txn"
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card className="filter-card">
        <Row justify="space-between" align="middle" gutter={[16, 16]} wrap>
          <Col flex="auto">
            <Space>
              <Select
                style={{ width: 150 }}
                value={selectedType}
                onChange={setSelectedType}
                options={[
                  { label: 'All Types', value: 'all' },
                  { label: 'Deposits', value: 'deposit' },
                  { label: 'Withdrawals', value: 'withdrawal' },
                  { label: 'Transfers', value: 'transfer' },
                  { label: 'Payments', value: 'payment' },
                ]}
              />
              <Button onClick={() => setFilterVisible(true)} icon={<FilterOutlined />}>
                Advanced Filter
              </Button>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button icon={<DownloadOutlined />} onClick={handleDownloadPDF}>
                Download
              </Button>
              <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                Print
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Transactions Table */}
      <Card className="transactions-card">
        {filteredTransactions.length > 0 ? (
          <Table
            columns={columns}
            dataSource={filteredTransactions}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        ) : (
          <Empty description="No transactions found" style={{ marginTop: '50px' }} />
        )}
      </Card>

      {/* Advanced Filter Modal */}
      <Modal
        title="Advanced Filter"
        open={filterVisible}
        onCancel={() => setFilterVisible(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Transaction Type">
            <Select
              value={selectedType}
              onChange={setSelectedType}
              options={[
                { label: 'All Types', value: 'all' },
                { label: 'Deposits', value: 'deposit' },
                { label: 'Withdrawals', value: 'withdrawal' },
                { label: 'Transfers', value: 'transfer' },
                { label: 'Payments', value: 'payment' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Date Range">
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              value={dateRange}
              onChange={setDateRange}
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => setFilterVisible(false)}
            style={{ width: '100%' }}
          >
            Apply Filters
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Transactions;
