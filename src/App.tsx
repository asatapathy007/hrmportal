import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';

// Role-based pages
import EmployeeLanding from './pages/EmployeeLanding/EmployeeLanding';
import ManagerLanding from './pages/ManagerLanding/ManagerLanding';
import AdminLanding from './pages/AdminLanding/AdminLanding';
import TechLanding from './pages/TechLanding/TechLanding';

// Core functional workflows
import OrganizationManagement from './pages/OrganizationManagement/OrganizationManagement';
import StaffingModels from './pages/StaffingModels/StaffingModels';
import JobsPositions from './pages/JobsPositions/JobsPositions';
import Compensation from './pages/Compensation/Compensation';
import SecurityRoles from './pages/SecurityRoles/SecurityRoles';
import BusinessProcesses from './pages/BusinessProcesses/BusinessProcesses';
import Transactions from './pages/Transactions/Transactions';
import SearchNavigation from './pages/SearchNavigation/SearchNavigation';
import SelfService from './pages/SelfService/SelfService';
import ReportsDashboards from './pages/ReportsDashboards/ReportsDashboards';

// Legacy pages (keeping for reference)
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Payroll from './pages/Payroll/Payroll';
import Benefits from './pages/Benefits/Benefits';
import TimeTracking from './pages/TimeTracking/TimeTracking';
import Recruiting from './pages/Recruiting/Recruiting';
import Performance from './pages/Performance/Performance';
import Learning from './pages/Learning/Learning';
import Reports from './pages/Reports/Reports';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0066cc',
    },
    secondary: {
      main: '#28a745',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [currentRole, setCurrentRole] = useState('Admin'); // Default role

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const getLandingPage = () => {
    switch (currentRole) {
      case 'Employee':
        return <EmployeeLanding />;
      case 'Manager':
        return <ManagerLanding />;
      case 'Admin':
        return <AdminLanding />;
      case 'Tech':
        return <TechLanding />;
      default:
        return <AdminLanding />;
    }
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout currentRole={currentRole}>
          <Routes>
            {/* Role-based landing pages */}
            <Route path="/" element={getLandingPage()} />
            <Route path="/employee" element={<EmployeeLanding />} />
            <Route path="/manager" element={<ManagerLanding />} />
            <Route path="/admin" element={<AdminLanding />} />
            <Route path="/tech" element={<TechLanding />} />

            {/* Core functional workflows */}
            <Route path="/organization" element={<OrganizationManagement />} />
            <Route path="/staffing" element={<StaffingModels />} />
            <Route path="/jobs-positions" element={<JobsPositions />} />
            <Route path="/compensation" element={<Compensation />} />
            <Route path="/security" element={<SecurityRoles />} />
            <Route path="/business-processes" element={<BusinessProcesses />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/search" element={<SearchNavigation />} />
            <Route path="/self-service" element={<SelfService />} />
            <Route path="/reports-dashboards" element={<ReportsDashboards />} />

            {/* Legacy routes for backward compatibility */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
            <Route path="/recruiting" element={<Recruiting />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/reports" element={<Reports />} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 