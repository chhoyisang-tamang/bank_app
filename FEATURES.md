# Bank App - Complete Banking Platform

A modern, responsive banking application built with React, featuring user authentication, account management, transaction tracking, and more.

## ✨ Features Implemented

### 1. **Authentication & Security**

- User signup/registration system with email validation
- Secure login functionality
- Password protection and account safety
- Session persistence with localStorage
- Protected routes for authenticated users only

### 2. **Dashboard & Home Page**

- Dual account display (Checking & Savings accounts)
- Real-time account balance tracking
- Quick statistics cards:
  - Total Balance
  - Monthly Transactions
  - Account Status
  - Credit Score
- 6 Quick Action Buttons:
  - 💰 Deposit
  - 🏧 Withdraw
  - 📤 Transfer
  - 📋 Pay Bills
  - 💳 Cards Management
  - 📊 Transaction History

### 3. **Financial Transactions**

- **Deposit Money**: Add funds to your account with validation
- **Withdraw Funds**: Safely withdraw money with balance checks
- **Transfer Money**: Send funds between accounts/users with validation
- **Bill Payments**: Pay bills to utility providers:
  - Electricity
  - Water
  - Internet
  - Mobile
  - Gas
- All transactions recorded with:
  - Date and time stamps
  - Description
  - Transaction type
  - Amount
  - Updated balance

### 4. **Transaction History**

- Complete transaction log with filtering options
- Filter by transaction type:
  - All transactions
  - Deposits
  - Withdrawals
  - Transfers
  - Bill Payments
- Advanced date range filtering
- Summary statistics:
  - Total deposits
  - Total withdrawals
  - Total payments
  - Transaction count
- Sorting by date and amount
- Download and print capabilities
- Responsive table design

### 5. **Card Management**

- View all registered cards (Debit & Credit)
- Add new cards with validation:
  - Card Type (Debit/Credit)
  - Card Holder Name
  - 16-digit Card Number
  - Expiration Date (MM/YY)
  - CVV (3-4 digits)
- Card security features:
  - Toggle card visibility (show/hide card numbers)
  - Activate/Deactivate cards
  - Set primary card
- Delete unwanted cards
- Card display with masked card numbers for security
- Responsive card grid layout

### 6. **User Profile & Settings**

- View account information
- Edit personal details:
  - First Name & Last Name
  - Email Address
  - Phone Number
  - Mailing Address
- Member information:
  - Member since date
  - Account status
- Security settings:
  - Change password option
  - Login activity history
- Preferences:
  - Email notification settings
  - Language selection
  - Data privacy controls
- Edit mode with save/cancel functionality

### 7. **Responsive Design**

The application is fully responsive across all devices:

**Desktop (> 768px)**

- Full navigation menu
- Multi-column layouts
- Desktop-optimized spacing

**Tablet (480px - 768px)**

- Adapted navigation with hamburger menu
- 2-3 column grid layouts
- Optimized touch targets
- Adjusted font sizes

**Mobile (< 480px)**

- Single column layouts
- Full-width buttons and inputs
- Hamburger menu navigation
- Compact spacing
- Readable font sizes
- Touch-friendly interface

### 8. **User Interface**

- Modern Ant Design component library
- Gradient header with purple theme
- Smooth animations and transitions
- Icon-based navigation
- Modal dialogs for actions
- Toast notifications for feedback
- Color-coded transaction types:
  - Green for deposits
  - Red for withdrawals
  - Blue for transfers
  - Orange for bill payments

### 9. **Navigation**

- Sticky header with hamburger menu on mobile
- Navigation links:
  - Home (Dashboard)
  - Deposit
  - Withdraw
  - Transactions History
  - Cards Management
  - Profile & Settings
  - Logout
- Mobile drawer navigation
- Active link highlighting

## 📁 Project Structure

```
bank_app/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/
│   │   ├── Home/           # Dashboard
│   │   ├── Login/          # Login page
│   │   ├── Signup/         # Registration page
│   │   ├── Deposit/        # Deposit money
│   │   ├── Withdraw/       # Withdraw money
│   │   ├── Transactions/   # Transaction history
│   │   ├── Cards/          # Card management
│   │   └── Profile/        # User settings
│   ├── provider/
│   │   ├── AuthContextProvider.jsx   # Auth state management
│   │   ├── MainLayout.jsx            # Main layout wrapper
│   │   ├── protected-route.jsx        # Protected routes
│   │   └── ProtectedLayout.jsx        # Protected layout
│   ├── router/             # Route configurations
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   ├── main.jsx            # Entry point
│   └── index.css            # Global CSS
├── public/                 # Static assets
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint configuration
```

## 🛠 Technologies Used

- **React 19.2.0** - UI library with hooks
- **React Router 7.13.0** - Client-side routing
- **Ant Design 6.2.2** - Modern UI component library
- **React Hook Form 7.71.1** - Form state management
- **Yup 1.7.1** - Form validation
- **Vite 7.2.4** - Build tool & dev server
- **CSS3** - Responsive styling with flexbox & grid

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
cd bank_app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Default Test Credentials

The application has a pre-configured demo account:

- **Email**: admin@test.com
- **Password**: password123

You can also create a new account by clicking "Sign Up".

## 📱 Responsive Breakpoints

The application uses the following breakpoints:

- **Extra Small (XS)**: < 480px (Mobile)
- **Small (SM)**: 480px - 767px (Tablet)
- **Medium (MD)**: 768px - 1023px (Tablet/Small Laptop)
- **Large (LG)**: ≥ 1024px (Desktop)

All pages automatically adapt to these screen sizes for optimal user experience.

## 💡 Key Features Details

### Balance Management

- Separate checking and savings accounts
- Real-time balance updates
- Transaction validation (insufficient balance checks)
- Automatic transaction logging

### Security

- Masked card numbers display
- Card activation/deactivation
- Password-protected accounts
- Session management

### User Experience

- Real-time form validation
- Success/error notifications
- Modal dialogs for transactions
- Transaction history with filtering
- Print and download capabilities

## 🎨 Design Highlights

- **Color Scheme**: Purple gradient header, white cards, blue accents
- **Typography**: Clear hierarchy with appropriate font sizes
- **Spacing**: Consistent padding and margins across all pages
- **Icons**: Ant Design icons for better UX
- **Animations**: Smooth transitions and hover effects

## 📊 Account Information

### Checking Account

- Initial Balance: $5,000.00
- Type: Primary transaction account

### Savings Account

- Initial Balance: $2,500.00
- Type: Long-term savings account

## 🔄 Transaction Flow

1. User initiates transaction (Deposit/Withdraw/Transfer/Payment)
2. Form validation occurs
3. Balance verification (for withdrawals/transfers/payments)
4. Transaction is processed
5. Balance is updated
6. Transaction is logged with timestamp
7. Success notification is shown
8. Transaction appears in history

## 📈 Future Enhancements

Potential features to be added:

- Loan application system
- Investment portfolio
- Budget planning tools
- Recurring bill setup
- Mobile app integration
- Two-factor authentication
- Advanced analytics & reports
- Digital check deposits
- Wire transfer capabilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Created as a comprehensive banking application demonstration.

## 📞 Support

For support or questions, please open an issue in the repository.

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Fully Functional ✅
