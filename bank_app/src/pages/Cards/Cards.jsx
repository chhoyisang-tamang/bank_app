import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select, Row, Col, Space, message, Empty, Switch, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from '../../provider/AuthContextProvider';
import './Cards.css';

function Cards() {
  const { user } = useAuth();
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'Debit Card',
      number: '4532 1234 5678 9010',
      cardHolder: 'Chhoyisang Tamang',
      expiry: '12/26',
      isActive: true,
      isPrimary: true,
      masked: '4532 **** **** 9010',
      cvv: '***',
    },
    {
      id: 2,
      type: 'Credit Card',
      number: '5425 2334 3010 9903',
      cardHolder: 'Chhoyisang Tamang',
      expiry: '08/27',
      isActive: true,
      isPrimary: false,
      masked: '5425 **** **** 9903',
      cvv: '***',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [visibleCardDetails, setVisibleCardDetails] = useState({});

  const handleAddCard = () => {
    setIsModalVisible(true);
  };

  const handleCardSubmit = (values) => {
    const newCard = {
      id: Date.now(),
      type: values.cardType,
      number: values.cardNumber,
      cardHolder: values.cardHolder,
      expiry: values.expiry,
      isActive: true,
      isPrimary: false,
      masked: `${values.cardNumber.slice(0, 4)} **** **** ${values.cardNumber.slice(-4)}`,
      cvv: '***',
    };
    setCards([...cards, newCard]);
    message.success('Card added successfully!');
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDeleteCard = (cardId) => {
    Modal.confirm({
      title: 'Delete Card',
      content: 'Are you sure you want to delete this card?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        setCards(cards.filter(c => c.id !== cardId));
        message.success('Card deleted successfully!');
      },
    });
  };

  const handleToggleActive = (cardId) => {
    setCards(
      cards.map(c => (c.id === cardId ? { ...c, isActive: !c.isActive } : c))
    );
    message.success('Card status updated!');
  };

  const handleTogglePrimary = (cardId) => {
    setCards(
      cards.map(c => ({
        ...c,
        isPrimary: c.id === cardId ? true : false,
      }))
    );
    message.success('Primary card updated!');
  };

  const toggleCardDetails = (cardId) => {
    setVisibleCardDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="cards-container">
      <div className="cards-header">
        <h1>My Cards</h1>
        <p>Manage your debit and credit cards</p>
      </div>

      <div className="cards-actions">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleAddCard}
        >
          Add New Card
        </Button>
      </div>

      <Row gutter={[16, 16]} className="cards-grid">
        {cards.length > 0 ? (
          cards.map(card => (
            <Col xs={24} sm={24} md={12} lg={8} key={card.id}>
              <Card className={`card-item ${!card.isActive ? 'disabled' : ''}`}>
                <div className="card-header">
                  <span className="card-type">{card.type}</span>
                  {card.isPrimary && (
                    <span className="primary-badge">PRIMARY</span>
                  )}
                </div>

                <div className="card-number">
                  <div className="card-display">
                    {visibleCardDetails[card.id] ? card.number : card.masked}
                  </div>
                  <Button
                    type="text"
                    size="small"
                    icon={visibleCardDetails[card.id] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    onClick={() => toggleCardDetails(card.id)}
                  />
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <span className="label">Card Holder</span>
                    <span className="value">{card.cardHolder}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Expires</span>
                    <span className="value">{card.expiry}</span>
                  </div>
                </div>

                <Divider style={{ margin: '12px 0' }} />

                <div className="card-controls">
                  <div className="control-row">
                    <span>Active</span>
                    <Switch
                      checked={card.isActive}
                      onChange={() => handleToggleActive(card.id)}
                    />
                  </div>
                  <div className="control-row">
                    <span>Primary Card</span>
                    <Switch
                      checked={card.isPrimary}
                      onChange={() => handleTogglePrimary(card.id)}
                      disabled={!card.isActive}
                    />
                  </div>
                </div>

                <div className="card-actions">
                  <Button
                    danger
                    block
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Delete Card
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={24}>
            <Empty description="No cards found" />
          </Col>
        )}
      </Row>

      {/* Add Card Modal */}
      <Modal
        title="Add New Card"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCardSubmit}
        >
          <Form.Item
            label="Card Type"
            name="cardType"
            rules={[{ required: true, message: 'Please select card type' }]}
          >
            <Select
              options={[
                { label: 'Debit Card', value: 'Debit Card' },
                { label: 'Credit Card', value: 'Credit Card' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Card Holder Name"
            name="cardHolder"
            rules={[{ required: true, message: 'Please enter card holder name' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { required: true, message: 'Please enter card number' },
              { pattern: /^\d{16}$/, message: 'Card number must be 16 digits' },
            ]}
          >
            <Input placeholder="1234567890123456" maxLength="16" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item
                label="Expiry (MM/YY)"
                name="expiry"
                rules={[
                  { required: true, message: 'Please enter expiry' },
                  { pattern: /^\d{2}\/\d{2}$/, message: 'Format: MM/YY' },
                ]}
              >
                <Input placeholder="12/26" maxLength="5" />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[
                  { required: true, message: 'Please enter CVV' },
                  { pattern: /^\d{3,4}$/, message: 'CVV must be 3-4 digits' },
                ]}
              >
                <Input placeholder="123" maxLength="4" type="password" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" block>
            Add Card
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Cards;
