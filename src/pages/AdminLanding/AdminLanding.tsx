import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  Badge,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  IconButton,
  Skeleton,
  Tooltip,
} from '@mui/material';
import {
  People,
  Business,
  Assignment,
  MonetizationOn,
  Shield,
  BusinessCenter,
  Analytics,
  Notifications,
  Schedule,
  Add,
  Work,
  Search,
  AccountCircle,
  Settings,
  Logout,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Person,
  WorkOutline,
  Approval,
  Timeline,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

interface Worklet {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  count?: number;
  status?: 'success' | 'warning' | 'error' | 'info';
  action?: string;
}

interface QuickAction {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

interface Notification {
  id: number;
  type: 'approval' | 'alert' | 'update';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const AdminLanding: React.FC = () => {
  const navigate = useNavigate();
  const [selectedWorklet, setSelectedWorklet] = useState<Worklet | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Header state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [quickActionsAnchor, setQuickActionsAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  
  // Loading states
  const [metricsLoading, setMetricsLoading] = useState(false);

  const worklets: Worklet[] = [
    {
      id: 1,
      title: 'Organization Management',
      description: 'Manage supervisory orgs, create subordinate orgs, assign roles',
      icon: <Business />,
      count: 12,
      status: 'success',
      action: 'Manage Orgs',
    },
    {
      id: 2,
      title: 'Staffing Models',
      description: 'Position management, headcount planning, job management',
      icon: <Assignment />,
      count: 8,
      status: 'warning',
      action: 'Configure Staffing',
    },
    {
      id: 3,
      title: 'Jobs & Positions',
      description: 'Create job families, assign positions, manage job profiles',
      icon: <Work />,
      count: 45,
      status: 'success',
      action: 'Manage Jobs',
    },
    {
      id: 4,
      title: 'Compensation',
      description: 'Compensation plans, salary bands, compensation rules',
      icon: <MonetizationOn />,
      count: 15,
      status: 'info',
      action: 'Configure Comp',
    },
    {
      id: 5,
      title: 'Security & Roles',
      description: 'Role assignments, security groups, access management',
      icon: <Shield />,
      count: 23,
      status: 'success',
      action: 'Manage Security',
    },
    {
      id: 6,
      title: 'Business Processes',
      description: 'Hire, terminate, job change, transfer workflows',
      icon: <BusinessCenter />,
      count: 6,
      status: 'warning',
      action: 'Configure BPs',
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: 1,
      title: 'Hire Employee',
      description: 'Initiate new hire process with multi-step wizard',
      icon: <People />,
      path: '/hire-employee/wizard',
    },
    {
      id: 2,
      title: 'Create Position',
      description: 'Add new position with budget approval',
      icon: <Work />,
      path: '/positions/create',
    },
    {
      id: 3,
      title: 'Assign Role',
      description: 'Assign security roles to employees',
      icon: <Shield />,
      path: '/roles/assign',
    },
    {
      id: 4,
      title: 'Configure Compensation',
      description: 'Set up compensation plans and salary bands',
      icon: <MonetizationOn />,
      path: '/compensation/setup',
    },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Hire Request', employee: 'Sarah Johnson', department: 'Engineering', time: '2 hours ago' },
    { id: 2, type: 'Job Change', employee: 'Mike Chen', department: 'Sales', time: '4 hours ago' },
    { id: 3, type: 'Termination', employee: 'Emily Davis', department: 'Marketing', time: '6 hours ago' },
  ];

  const notifications: Notification[] = [
    { id: 1, type: 'approval', title: 'Hire Request Pending', message: 'Sarah Johnson - Engineering', time: '2 hours ago', read: false },
    { id: 2, type: 'alert', title: 'System Maintenance', message: 'Scheduled maintenance tonight at 2 AM', time: '4 hours ago', read: true },
    { id: 3, type: 'update', title: 'New Feature Available', message: 'Enhanced reporting dashboard is now live', time: '6 hours ago', read: true },
  ];

  const systemMetrics = [
    { 
      name: 'Active Employees', 
      value: 1250, 
      change: '+12', 
      color: '#28a745',
      route: '/employees',
      icon: <People />
    },
    { 
      name: 'Open Positions', 
      value: 23, 
      change: '-3', 
      color: '#ffc107',
      route: '/jobs-positions',
      icon: <WorkOutline />
    },
    { 
      name: 'Pending Approvals', 
      value: 8, 
      change: '+2', 
      color: '#dc3545',
      route: '/employees',
      icon: <Approval />
    },
    { 
      name: 'Active Processes', 
      value: 15, 
      change: '+5', 
      color: '#0066cc',
      route: '/business-processes',
      icon: <Timeline />
    },
  ];

  const orgChartData = [
    { department: 'Engineering', headcount: 320, filled: 295, open: 25 },
    { department: 'Sales', headcount: 180, filled: 165, open: 15 },
    { department: 'Marketing', headcount: 95, filled: 88, open: 7 },
    { department: 'HR', headcount: 45, filled: 42, open: 3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Enhanced search routing based on query type
      const query = searchQuery.trim().toLowerCase();
      
      // Route to appropriate page based on search query
      if (query.includes('employee') || query.includes('hire') || query.includes('person')) {
        navigate('/employees');
      } else if (query.includes('position') || query.includes('job') || query.includes('requisition')) {
        navigate('/jobs-positions');
      } else if (query.includes('organization') || query.includes('org') || query.includes('department')) {
        navigate('/organization');
      } else if (query.includes('compensation') || query.includes('salary') || query.includes('pay')) {
        navigate('/compensation');
      } else if (query.includes('security') || query.includes('role') || query.includes('permission')) {
        navigate('/security');
      } else if (query.includes('staffing') || query.includes('headcount')) {
        navigate('/staffing');
      } else if (query.includes('process') || query.includes('workflow')) {
        navigate('/business-processes');
      } else if (query.includes('report') || query.includes('dashboard')) {
        navigate('/reports-dashboards');
      } else {
        // Default to search page for general queries
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    // Navigate directly to the page instead of opening dialog
    let actionRoute = action.path;
    switch (action.title) {
      case 'Hire Employee':
        actionRoute = '/jobs-positions';
        break;
      case 'Create Position':
        actionRoute = '/jobs-positions';
        break;
      case 'Assign Role':
        actionRoute = '/security';
        break;
      case 'Configure Compensation':
        actionRoute = '/compensation';
        break;
      default:
        break;
    }
    navigate(actionRoute);
    setQuickActionsAnchor(null);
  };

  const handleMetricClick = (route: string) => {
    navigate(route);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <Box>
      {/* Top Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1
      }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          My Picarro 2.0
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
          {/* Enhanced Workday Search Bar - Centered */}
          <Box sx={{ 
            position: 'relative', 
            flexGrow: 1, 
            maxWidth: 600, 
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
              <TextField
                size="small"
                placeholder="Search people, tasks, reports, organizations... (e.g., John Smith, Create Job Requisition, Headcount Report)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => {
                  setSearchFocused(true);
                  setShowSearchSuggestions(searchQuery.length > 0);
                }}
                onBlur={() => {
                  setSearchFocused(false);
                  // Delay hiding suggestions to allow clicking on them
                  setTimeout(() => setShowSearchSuggestions(false), 200);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color={searchFocused ? 'primary' : 'action'} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => {
                        setSearchQuery('');
                        setShowSearchSuggestions(false);
                      }}>
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'background.paper',
                      boxShadow: '0 0 0 2px rgba(0, 102, 204, 0.2)',
                    }
                  }
                }}
              />
            </form>
            
            {/* Search Suggestions Dropdown */}
            {showSearchSuggestions && (
              <Paper
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  mt: 1,
                  maxHeight: 400,
                  overflow: 'auto',
                  boxShadow: 3,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    🔍 Search Suggestions
                  </Typography>
                </Box>
                
                {/* People */}
                <Box sx={{ p: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 1, display: 'block' }}>
                    👥 People
                  </Typography>
                  <MenuItem onClick={() => { 
                    setSearchQuery('John Smith'); 
                    setShowSearchSuggestions(false);
                    // Navigate to employees page
                    navigate('/employees');
                  }}>
                    <ListItemIcon><Person /></ListItemIcon>
                    <ListItemText primary="John Smith" secondary="Employee ID: 100123" />
                  </MenuItem>
                  <MenuItem onClick={() => { 
                    setSearchQuery('Sarah Johnson'); 
                    setShowSearchSuggestions(false);
                    // Navigate to employees page
                    navigate('/employees');
                  }}>
                    <ListItemIcon><Person /></ListItemIcon>
                    <ListItemText primary="Sarah Johnson" secondary="Engineering Manager" />
                  </MenuItem>
                </Box>
                
                {/* Tasks */}
                <Box sx={{ p: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 1, display: 'block' }}>
                    📋 Tasks & Processes
                  </Typography>
                  <MenuItem onClick={() => { 
                    setSearchQuery('Create Job Requisition'); 
                    setShowSearchSuggestions(false);
                    // Navigate to jobs-positions page
                    navigate('/jobs-positions');
                  }}>
                    <ListItemIcon><Work /></ListItemIcon>
                    <ListItemText primary="Create Job Requisition" secondary="Business Process" />
                  </MenuItem>
                  <MenuItem onClick={() => { 
                    setSearchQuery('Request Time Off'); 
                    setShowSearchSuggestions(false);
                    // Navigate to business processes page
                    navigate('/business-processes');
                  }}>
                    <ListItemIcon><Schedule /></ListItemIcon>
                    <ListItemText primary="Request Time Off" secondary="Self Service" />
                  </MenuItem>
                </Box>
                
                {/* Reports */}
                <Box sx={{ p: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 1, display: 'block' }}>
                    📊 Reports
                  </Typography>
                  <MenuItem onClick={() => { 
                    setSearchQuery('Headcount Report'); 
                    setShowSearchSuggestions(false);
                    // Navigate to reports page
                    navigate('/reports-dashboards');
                  }}>
                    <ListItemIcon><Analytics /></ListItemIcon>
                    <ListItemText primary="Headcount Report" secondary="Standard Report" />
                  </MenuItem>
                  <MenuItem onClick={() => { 
                    setSearchQuery('Compensation Summary'); 
                    setShowSearchSuggestions(false);
                    // Navigate to reports page
                    navigate('/reports-dashboards');
                  }}>
                    <ListItemIcon><MonetizationOn /></ListItemIcon>
                    <ListItemText primary="Compensation Summary" secondary="Custom Report" />
                  </MenuItem>
                </Box>
                
                {/* Organizations */}
                <Box sx={{ p: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 1, display: 'block' }}>
                    🏢 Organizations
                  </Typography>
                  <MenuItem onClick={() => { 
                    setSearchQuery('Marketing Department'); 
                    setShowSearchSuggestions(false);
                    // Navigate to organization page
                    navigate('/organization');
                  }}>
                    <ListItemIcon><Business /></ListItemIcon>
                    <ListItemText primary="Marketing Department" secondary="Organization Unit" />
                  </MenuItem>
                  <MenuItem onClick={() => { 
                    setSearchQuery('Engineering Team'); 
                    setShowSearchSuggestions(false);
                    // Navigate to organization page
                    navigate('/organization');
                  }}>
                    <ListItemIcon><Business /></ListItemIcon>
                    <ListItemText primary="Engineering Team" secondary="Supervisory Organization" />
                  </MenuItem>
                </Box>
              </Paper>
            )}
          </Box>

          {/* Quick Actions Button */}
          <Tooltip title="Quick Actions">
            <Button
              variant="outlined"
              startIcon={<Add />}
              endIcon={<KeyboardArrowDown />}
              onClick={(e) => setQuickActionsAnchor(e.currentTarget)}
              sx={{ borderRadius: 2 }}
            >
              Quick Action
            </Button>
          </Tooltip>

          {/* Notifications Button - Extreme end */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={(e) => setNotificationsAnchor(e.currentTarget)}
              color="inherit"
              sx={{ position: 'relative' }}
            >
              <Badge badgeContent={unreadNotifications} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User Profile - Extreme end */}
          <Tooltip title="User Profile">
            <IconButton
              onClick={(e) => setUserMenuAnchor(e.currentTarget)}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={() => setNotificationsAnchor(null)}
        PaperProps={{
          sx: { width: 400, maxHeight: 500 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        {notifications.map((notification) => (
          <MenuItem 
            key={notification.id}
            onClick={() => {
              setNotificationsAnchor(null);
              navigate(`/notifications/${notification.id}`);
            }}
            sx={{ 
              opacity: notification.read ? 0.7 : 1,
              borderLeft: notification.read ? 'none' : '3px solid',
              borderColor: 'primary.main'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Typography variant="subtitle2" fontWeight="medium">
                {notification.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => { setNotificationsAnchor(null); navigate('/notifications'); }}>
          <Typography variant="body2">View All Notifications</Typography>
        </MenuItem>
      </Menu>

      {/* Quick Actions Menu */}
      <Menu
        anchorEl={quickActionsAnchor}
        open={Boolean(quickActionsAnchor)}
        onClose={() => setQuickActionsAnchor(null)}
        PaperProps={{
          sx: { width: 350 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Quick Actions</Typography>
        </Box>
        {quickActions.map((action) => {
          let actionRoute = action.path;
          switch (action.title) {
            case 'Hire Employee':
              actionRoute = '/jobs-positions';
              break;
            case 'Create Position':
              actionRoute = '/jobs-positions';
              break;
            case 'Assign Role':
              actionRoute = '/security';
              break;
            case 'Configure Compensation':
              actionRoute = '/compensation';
              break;
            default:
              break;
          }
          return (
            <MenuItem 
              key={action.id}
              onClick={() => {
                navigate(actionRoute);
                setQuickActionsAnchor(null);
              }}
              sx={{ py: 1.5 }}
            >
                          <ListItemIcon>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {action.icon}
                </Avatar>
              </ListItemIcon>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" fontWeight="medium">
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
      >
        <MenuItem onClick={() => { setUserMenuAnchor(null); navigate('/profile'); }}>
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Profile Settings" />
        </MenuItem>
        <MenuItem onClick={() => { setUserMenuAnchor(null); navigate('/preferences'); }}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Preferences" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { setUserMenuAnchor(null); navigate('/logout'); }}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>



      {/* System Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {systemMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.name}>
            <Card
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { 
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
              onClick={() => handleMetricClick(metric.route)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: metric.color, mr: 2 }}>
                    {metric.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {metricsLoading ? <Skeleton width={60} /> : metric.value}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {metric.name}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="success.main">
                  {metric.change} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Worklets */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Administrative Worklets
              </Typography>
              <Grid container spacing={2}>
                {worklets.map((worklet) => {
                  let mainRoute = '';
                  let actionRoute = '';
                  let badgeRoute = '';
                  switch (worklet.title) {
                    case 'Organization Management':
                      mainRoute = '/organization';
                      actionRoute = '/organization';
                      badgeRoute = '/organization';
                      break;
                    case 'Staffing Models':
                      mainRoute = '/staffing';
                      actionRoute = '/staffing';
                      badgeRoute = '/staffing';
                      break;
                    case 'Jobs & Positions':
                      mainRoute = '/jobs-positions';
                      actionRoute = '/jobs-positions';
                      badgeRoute = '/jobs-positions';
                      break;
                    case 'Compensation':
                      mainRoute = '/compensation';
                      actionRoute = '/compensation';
                      badgeRoute = '/compensation';
                      break;
                    case 'Security & Roles':
                      mainRoute = '/security';
                      actionRoute = '/security';
                      badgeRoute = '/security';
                      break;
                    case 'Business Processes':
                      mainRoute = '/business-processes';
                      actionRoute = '/business-processes';
                      badgeRoute = '/business-processes';
                      break;
                    default:
                      break;
                  }
                  return (
                    <Grid item xs={12} sm={6} md={4} key={worklet.id}>
                      <Card
                        variant="outlined"
                        sx={{ 
                          cursor: 'pointer', 
                          transition: 'all 0.2s',
                          '&:hover': { 
                            backgroundColor: 'rgba(0, 102, 204, 0.04)',
                            transform: 'translateY(-1px)',
                            boxShadow: 2
                          } 
                        }}
                        onClick={() => navigate(mainRoute)}
                        aria-label={`Go to ${worklet.title} dashboard`}
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(mainRoute); }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{worklet.icon}</Avatar>
                            <Typography variant="h6" fontWeight="bold">{worklet.title}</Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Badge
                              badgeContent={worklet.count}
                              color={getStatusColor(worklet.status || '')}
                              sx={{ ml: 2, cursor: 'pointer' }}
                              onClick={e => { e.stopPropagation(); navigate(badgeRoute); }}
                              aria-label={`Show ${worklet.count} pending items for ${worklet.title}`}
                              tabIndex={0}
                              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); navigate(badgeRoute); } }}
                              title={`Show ${worklet.count} pending items for ${worklet.title}`}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">{worklet.description}</Typography>
                          <Button
                            variant="text"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={e => { e.stopPropagation(); navigate(actionRoute); }}
                            aria-label={`${worklet.action} for ${worklet.title}`}
                          >
                            {worklet.action}
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Notifications */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <List dense>
                    {quickActions.map((action) => {
                      let actionRoute = action.path;
                      switch (action.title) {
                        case 'Hire Employee':
                          actionRoute = '/jobs-positions';
                          break;
                        case 'Create Position':
                          actionRoute = '/jobs-positions';
                          break;
                        case 'Assign Role':
                          actionRoute = '/security';
                          break;
                        case 'Configure Compensation':
                          actionRoute = '/compensation';
                          break;
                        default:
                          break;
                      }
                      return (
                        <ListItem 
                          key={action.id} 
                          sx={{ 
                            px: 0, 
                            cursor: 'pointer', 
                            transition: 'all 0.2s',
                            '&:hover': { 
                              backgroundColor: 'rgba(0, 102, 204, 0.04)',
                              transform: 'translateX(4px)'
                            } 
                          }}
                          onClick={() => navigate(actionRoute)}
                          aria-label={`Quick action: ${action.title}`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(actionRoute); }}
                          title={action.description}
                        >
                          <ListItemIcon>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>{action.icon}</Avatar>
                          </ListItemIcon>
                          <ListItemText primary={action.title} secondary={action.description} />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Pending Approvals */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ mb: 1, cursor: 'pointer' }}
                      onClick={() => navigate('/approvals/my-approvals')}
                      aria-label="Open full Pending Approvals inbox"
                      tabIndex={0}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/approvals/my-approvals'); }}
                    >
                      Pending Approvals
                    </Typography>
                    <Badge badgeContent={pendingApprovals.length} color="error" sx={{ ml: 'auto' }}>
                      <Notifications />
                    </Badge>
                  </Box>
                  <List dense>
                    {pendingApprovals.map((approval) => {
                      let approvalRoute = '';
                      switch (approval.type) {
                        case 'Hire Request':
                          approvalRoute = `/jobs-positions`;
                          break;
                        case 'Job Change':
                          approvalRoute = `/jobs-positions`;
                          break;
                        case 'Termination':
                          approvalRoute = `/employees`;
                          break;
                        default:
                          approvalRoute = `/employees`;
                          break;
                      }
                      return (
                        <ListItem 
                          key={approval.id} 
                          sx={{ 
                            px: 0, 
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': { 
                              backgroundColor: 'rgba(0, 102, 204, 0.04)',
                              transform: 'translateX(4px)'
                            } 
                          }}
                          onClick={() => navigate(approvalRoute)}
                          aria-label={`Open approval for ${approval.type} - ${approval.employee}`}
                          tabIndex={0}
                          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(approvalRoute); }}
                          title={`Open approval for ${approval.type} - ${approval.employee}`}
                        >
                          <ListItemIcon>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: 'warning.main' }}><Schedule /></Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={`${approval.type} - ${approval.employee} • ${approval.department} • ${approval.time}`}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Organization Chart Preview */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Organization Overview
            </Typography>
            <Button 
              variant="text" 
              size="small"
              onClick={() => navigate('/organization')}
            >
              View Full Chart
            </Button>
          </Box>
                      <ResponsiveContainer width="100%" height={200}>
              <BarChart data={orgChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="filled" stackId="a" fill="#28a745" name="Filled" />
                <Bar dataKey="open" stackId="a" fill="#ffc107" name="Open" />
              </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Worklet Detail Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { width: 400, p: 3 },
        }}
      >
        {selectedWorklet && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                {selectedWorklet.icon}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                {selectedWorklet.title}
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {selectedWorklet.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Available Actions
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create New" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Manage Existing" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Analytics />
                </ListItemIcon>
                <ListItemText primary="View Reports" />
              </ListItem>
            </List>
            
            <Box sx={{ mt: 3 }}>
              <Button 
                variant="contained" 
                fullWidth
                onClick={() => {
                  // This function is no longer used, but keeping it as per instructions
                  // The original code had it, so I'm keeping it.
                  // The logic for handling worklet actions is now directly in the JSX.
                  // setDrawerOpen(false); // This line was removed from the original file
                }}
              >
                Open {selectedWorklet.title}
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default AdminLanding; 