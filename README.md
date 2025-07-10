# HRM Portal - Human Capital Management Tool

A comprehensive HRM portal built with React, TypeScript, and Material-UI, designed to simulate enterprise HR management workflows.

## 🚀 Live Demo

The application is deployed on Vercel and includes demo functionality.

**Demo Credentials:**
- Email: `demo@picarro.com`
- Password: `demo123`

## 🛠️ Features

- **Role-based Access**: Admin, Manager, Employee, and Tech roles
- **Organization Management**: Department and position management
- **Jobs & Positions**: Create and manage job positions
- **Compensation**: Salary and benefits management
- **Security & Roles**: User permissions and access control
- **Business Processes**: Workflow management
- **Reports & Dashboards**: Analytics and reporting
- **Self Service**: Employee self-service portal

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Material-UI
- **State Management**: React Hooks
- **Routing**: React Router v6
- **Charts**: Recharts
- **Deployment**: Vercel

## 🚀 Deployment

### Prerequisites
- Node.js 16+ 
- npm 8+

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hrmportal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open http://localhost:3000
   - Login with demo credentials

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your repository to Vercel
   - Vercel will automatically detect the React app
   - The build configuration is already set up

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `REACT_APP_API_URL`: Backend API URL (optional for demo)

### API Configuration

The app is configured to work in demo mode without a backend. In production, you can:

1. Set up a backend API
2. Configure `REACT_APP_API_URL` environment variable
3. Update API endpoints in `src/config/api.js`

## 🐛 Troubleshooting

### Blank Page Issues

If you see a blank page after deployment:

1. **Check Console Errors**: Open browser developer tools (F12) and check the Console tab
2. **Verify Authentication**: Make sure you're logged in with demo credentials
3. **Check Network**: Ensure all static assets are loading properly

### Build Issues

If the build fails:

1. **Clear Cache**: Delete `node_modules` and `package-lock.json`, then run `npm install`
2. **Check Dependencies**: Ensure all dependencies are properly installed
3. **Verify Configuration**: Check that all configuration files are present

### API Issues

The application includes fallback data for demo purposes. If you need real API integration:

1. Deploy your backend API
2. Set the `REACT_APP_API_URL` environment variable
3. Update the API configuration in `src/config/api.js`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── config/             # Configuration files
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## 🎨 UI Components

- **Material-UI**: Modern, accessible UI components
- **Responsive Design**: Works on desktop and mobile
- **Theme Customization**: Consistent branding and styling
- **Accessibility**: WCAG compliant components

## 🔒 Security

- **Demo Mode**: No real authentication in demo
- **Production Ready**: Can be configured with real auth providers
- **Role-based Access**: Different features for different user roles

## 📊 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Optimized Build**: Production-optimized bundle
- **Lazy Loading**: Components load on demand
- **Caching**: Static assets are cached for performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for demonstration purposes.

## 🆘 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review browser console for errors
3. Verify all configuration files are present
4. Ensure all dependencies are installed

---

**Note**: This is a demo application. For production use, implement proper authentication, backend APIs, and security measures. 