import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Button, message, Avatar, Divider, Statistic } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useAuth } from '../../provider/AuthContextProvider';
import './Profile.css';

function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: user?.name?.split(' ')[0] || 'Chhoyisang',
    lastName: user?.name?.split(' ')[1] || 'Tamang',
    email: user?.email || 'chhoyisang.tamang@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, City, State 12345',
  });
  const [editData, setEditData] = useState(userData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(userData);
  };

  const handleSave = () => {
    if (!editData.firstName || !editData.lastName || !editData.email || !editData.phone) {
      message.error('Please fill all required fields');
      return;
    }
    setUserData(editData);
    setIsEditing(false);
    message.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Account Settings</h1>
        <p>Manage your personal and account information</p>
      </div>

      <Row gutter={[16, 16]}>
        {/* Profile Overview Card */}
        <Col xs={24} md={8}>
          <Card className="profile-card">
            <div className="profile-avatar">
              <Avatar size={100} icon={<UserOutlined />} />
            </div>
            <h2 style={{ textAlign: 'center', marginTop: '16px' }}>
              {userData.firstName} {userData.lastName}
            </h2>
            <p style={{ textAlign: 'center', color: '#666' }}>{userData.email}</p>
            <Divider />
            <div className="profile-stats">
              <Statistic
                title="Member Since"
                value="Jan 2026"
                size="small"
              />
              <Statistic
                title="Account Status"
                value="Verified"
                size="small"
                suffix="✓"
              />
            </div>
            <Button 
              type="primary" 
              block 
              onClick={handleEdit}
              disabled={isEditing}
              style={{ marginTop: '16px' }}
            >
              Edit Profile
            </Button>
          </Card>
        </Col>

        {/* Personal Information Card */}
        <Col xs={24} md={16}>
          <Card className="info-card">
            <h3>Personal Information</h3>
            {isEditing ? (
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="First Name" required>
                      <Input
                        value={editData.firstName}
                        onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                        prefix={<UserOutlined />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Last Name" required>
                      <Input
                        value={editData.lastName}
                        onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                        prefix={<UserOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Email Address" required>
                  <Input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    prefix={<MailOutlined />}
                  />
                </Form.Item>

                <Form.Item label="Phone Number" required>
                  <Input
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    prefix={<PhoneOutlined />}
                  />
                </Form.Item>

                <Form.Item label="Address">
                  <Input
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    prefix={<HomeOutlined />}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" onClick={handleSave} style={{ marginRight: '8px' }}>
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </Form.Item>
              </Form>
            ) : (
              <div className="info-display">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <label>First Name</label>
                      <p>{userData.firstName}</p>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <label>Last Name</label>
                      <p>{userData.lastName}</p>
                    </div>
                  </Col>
                </Row>

                <div className="info-item">
                  <label>Email Address</label>
                  <p>{userData.email}</p>
                </div>

                <div className="info-item">
                  <label>Phone Number</label>
                  <p>{userData.phone}</p>
                </div>

                <div className="info-item">
                  <label>Address</label>
                  <p>{userData.address}</p>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Security and Preferences Section */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} md={12}>
          <Card className="settings-card">
            <h3>Security Settings</h3>
            <div className="settings-item">
              <div className="settings-header">
                <span>Two-Factor Authentication</span>
                <Button size="small">Enable</Button>
              </div>
              <p className="settings-desc">Enhance your account security with 2FA</p>
            </div>
            <Divider />
            <div className="settings-item">
              <div className="settings-header">
                <span>Change Password</span>
                <Button size="small">Update</Button>
              </div>
              <p className="settings-desc">Change your password regularly</p>
            </div>
            <Divider />
            <div className="settings-item">
              <div className="settings-header">
                <span>Login Activity</span>
                <Button size="small" type="link">View</Button>
              </div>
              <p className="settings-desc">Monitor your account access</p>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="settings-card">
            <h3>Preferences</h3>
            <div className="settings-item">
              <div className="settings-header">
                <span>Email Notifications</span>
                <Button size="small">Configure</Button>
              </div>
              <p className="settings-desc">Manage your notification preferences</p>
            </div>
            <Divider />
            <div className="settings-item">
              <div className="settings-header">
                <span>Language & Region</span>
                <Button size="small">Change</Button>
              </div>
              <p className="settings-desc">English (US) • Pacific Time</p>
            </div>
            <Divider />
            <div className="settings-item">
              <div className="settings-header">
                <span>Data & Privacy</span>
                <Button size="small" type="link">Learn More</Button>
              </div>
              <p className="settings-desc">Control your data sharing</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
