import { Outlet, NavLink, useLocation, Navigate } from "react-router";
import { useAuth } from "./AuthContextProvider";
import { Button, Drawer, Menu, Badge, Popover } from "antd";
import { useState } from "react";
import { MenuOutlined, LogoutOutlined, HomeOutlined, DollarOutlined, UserOutlined, FileTextOutlined, CreditCardOutlined, BellOutlined } from "@ant-design/icons";
import './MainLayout.css';

export default function MainLayout() {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Travel', message: 'Your travel insurance is active', time: '2 hours ago' },
    { id: 2, type: 'Travel', message: 'New travel deals available', time: '5 hours ago' },
  ]);

  if (loading) return <div className="loading">Loading...</div>;

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#10B981" : "#333",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  });

  const handleLogout = async () => {
    await logout();
    setDrawerVisible(false);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const menuItems = [
    {
      key: '1',
      label: <NavLink to="/" style={linkStyle} end>
        <HomeOutlined /> Home
      </NavLink>,
    },
    {
      key: '2',
      label: <NavLink to="/deposit" style={linkStyle}>
        <DollarOutlined /> Deposit
      </NavLink>,
    },
    {
      key: '3',
      label: <NavLink to="/withdraw" style={linkStyle}>
        <DollarOutlined /> Withdraw
      </NavLink>,
    },
    {
      key: '4',
      label: <NavLink to="/transactions" style={linkStyle}>
        <FileTextOutlined /> Transactions
      </NavLink>,
    },
    {
      key: '5',
      label: <NavLink to="/cards" style={linkStyle}>
        <CreditCardOutlined /> Cards
      </NavLink>,
    },
    {
      key: '6',
      label: <NavLink to="/profile" style={linkStyle}>
        <UserOutlined /> Profile
      </NavLink>,
    },
    {
      key: '7',
      label: <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </span>,
    },
  ];

  const notificationContent = (
    <div className="notifications-dropdown">
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <div key={notif.id} className="notification-item">
            <span className="notif-type">{notif.type}</span>
            <p>{notif.message}</p>
            <span className="notif-time">{notif.time}</span>
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );

  return (
    <div className="layout-wrapper">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">Test Bank</h1>
          </div>
          <div className="header-right">
            <Popover content={notificationContent} title="Notifications" placement="bottomRight" trigger="click">
              <Badge count={notifications.length} showZero>
                <Button type="text" icon={<BellOutlined style={{ fontSize: '18px', color: 'white' }} />} />
              </Badge>
            </Popover>
            <Button
              type="primary"
              danger
              onClick={handleLogout}
              style={{ marginLeft: '16px' }}
            >
              <LogoutOutlined /> Logout
            </Button>
            {/* Mobile Hamburger Menu */}
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: '20px', color: 'white' }} />}
              onClick={() => setDrawerVisible(true)}
              className="hamburger-btn"
            />
          </div>
        </div>
      </header>

      <div className="layout-body">
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <Menu items={menuItems} mode="vertical" className="sidebar-menu" />
        </aside>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          className="nav-drawer"
        >
          <Menu items={menuItems} mode="vertical" />
        </Drawer>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer className="footer">
        <p>© 2026 SANG bank. All rights reserved. Welcome, {user?.name}!</p>
      </footer>
    </div>
  );
}