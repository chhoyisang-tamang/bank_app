# Bank App Setup & Installation Guide

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Access the Application

Open your browser and navigate to: `http://localhost:5173`

---

## 📋 Project Overview

This is a **professional banking application** built with React and modern web technologies. The app features user authentication, account management, transaction tracking, card management, and comprehensive financial tools.

## ✅ System Requirements

- **Node.js**: v14.0 or higher
- **npm**: v6.0 or higher
- **Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)

## 📦 Dependencies

The project uses the following key dependencies:

- **React 19.2.0** - Frontend UI framework
- **React Router 7.13.0** - Client-side routing
- **Ant Design 6.2.2** - UI component library
- **React Hook Form 7.71.1** - Form state management
- **Yup 1.7.1** - Form validation schema
- **Axios 1.13.4** - HTTP client

## 🎯 Available Commands

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Preview Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality.

## 🔐 Authentication

### Demo Credentials

```
Email: admin@test.com
Password: password123
```

### Creating New Account

1. Click "Sign Up" on the login page
2. Enter your details:
   - Name (First and Last)
   - Email
   - Password
3. Click "Create Account"
4. You'll be logged in automatically

## 📱 Responsive Design

The application automatically adapts to different screen sizes:

| Screen Size | Breakpoint    | Layout                        |
| ----------- | ------------- | ----------------------------- |
| Mobile      | < 480px       | Single column, hamburger menu |
| Tablet      | 480px - 768px | Two columns, adaptive menus   |
| Desktop     | > 768px       | Multi-column, full navigation |

## 🏠 Pages & Features

### 1. **Dashboard (Home)**

- View account balances
- Quick action buttons
- Recent transactions
- Account statistics
- Access all features from one place

### 2. **Deposit**

- Add funds to checking account
- Amount validation
- Transaction confirmation
- Balance update

### 3. **Withdraw**

- Withdraw from checking account
- Balance verification
- Withdrawal history
- Receipt confirmation

### 4. **Transactions**

- Complete transaction history
- Filter by transaction type
- Date range filtering
- Summary statistics
- Print and download options

### 5. **Cards**

- View all registered cards
- Add new debit/credit cards
- Card security features
- Activate/deactivate cards
- Set primary card

### 6. **Profile**

- View personal information
- Edit account details
- Security settings
- Preferences management
- Member information

### 7. **Login/Signup**

- User authentication
- Form validation
- Account creation
- Secure login

## 🎨 Color Scheme

- **Primary**: Purple (#667eea to #764ba2 gradient)
- **Accent**: Blue (#2196f3)
- **Success**: Green (#52c41a)
- **Danger**: Red (#f5222d)
- **Warning**: Orange (#faad14)
- **Background**: Light Gray (#f5f7fa)

## 🗂 Project Structure

```
bank_app/
├── src/
│   ├── pages/                    # Page components
│   │   ├── Home/                # Dashboard
│   │   ├── Login/               # Login page
│   │   ├── Signup/              # Registration
│   │   ├── Deposit/             # Deposit page
│   │   ├── Withdraw/            # Withdraw page
│   │   ├── Transactions/        # Transaction history
│   │   ├── Cards/               # Card management
│   │   └── Profile/             # User profile
│   ├── provider/                 # Context & Layout
│   │   ├── AuthContextProvider.jsx
│   │   ├── MainLayout.jsx
│   │   └── protected-route.jsx
│   ├── App.jsx                   # Main app
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── package.json                  # Dependencies
├── vite.config.js               # Vite config
├── eslint.config.js             # ESLint config
├── FEATURES.md                  # Complete feature list
└── SETUP.md                     # This file
```

## 🔒 Security Features

- Password protected accounts
- Session management with localStorage
- Protected routes for authenticated users
- Form validation on all inputs
- Card number masking
- Secure deposit/withdrawal verification

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

### Module Not Found

Clear node_modules and reinstall:

```bash
rm -rf node_modules
npm install
```

### Build Issues

Clear cache and rebuild:

```bash
npm run build --force
```

## 📊 Account Information

### Initial Account Balance

- **Checking Account**: $5,000.00
- **Savings Account**: $2,500.00
- **Total Balance**: $7,500.00

### Supported Transactions

- Deposits
- Withdrawals
- Transfers between accounts
- Bill payments
- Card management

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Output

Production files will be in the `dist/` folder, ready to deploy to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📝 Development Workflow

1. **Start Development Server**

   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files in `src/` folder
   - Changes auto-refresh in browser

3. **Test Changes**
   - Check functionality in browser
   - Verify responsive design (F12 Dev Tools)
   - Test on different screen sizes

4. **Check for Errors**

   ```bash
   npm run lint
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🤝 Best Practices

1. **Keep Components Small**: Each component should have a single responsibility
2. **Use React Hooks**: Use hooks for state management
3. **Form Validation**: Always validate user inputs
4. **Error Handling**: Provide meaningful error messages
5. **Responsive Design**: Test on mobile, tablet, and desktop
6. **Performance**: Keep bundle size small, lazy load routes

## 📚 Documentation

- **Features**: See [FEATURES.md](./FEATURES.md) for complete feature list
- **React**: https://react.dev
- **Ant Design**: https://ant.design
- **React Router**: https://reactrouter.com
- **Vite**: https://vitejs.dev

## 🆘 Getting Help

1. Check the [FEATURES.md](./FEATURES.md) file for feature documentation
2. Review component code in the `src/` folder
3. Check browser console for error messages
4. Verify all dependencies are installed

## 📄 File Descriptions

| File               | Purpose                          |
| ------------------ | -------------------------------- |
| `package.json`     | Project dependencies and scripts |
| `vite.config.js`   | Vite build configuration         |
| `eslint.config.js` | Code quality rules               |
| `index.html`       | HTML entry point                 |
| `src/main.jsx`     | React app entry point            |
| `src/App.jsx`      | Main app component with routes   |

## ✨ Latest Updates

### Version 1.0.0 - January 2026

- ✅ Complete authentication system
- ✅ Full dashboard with dual accounts
- ✅ Transaction management (deposit, withdraw, transfer, bills)
- ✅ Comprehensive transaction history
- ✅ Card management system
- ✅ User profile and settings
- ✅ Fully responsive design
- ✅ Mobile-first approach
- ✅ Ant Design UI components
- ✅ Form validation with Yup
- ✅ State management with Context API

## 🎓 Learning Resources

This project demonstrates:

- React hooks and state management
- React Router for navigation
- Form handling with React Hook Form
- Component composition and reusability
- Responsive CSS design
- Authentication patterns
- Context API for global state

---

**Need More Help?** Check the source code comments or review individual page components in the `src/pages/` directory.

**Happy Banking! 🏦**
