import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  Badge,
} from '@mui/material';
import {
  Settings,
  AdminPanelSettings,
  Analytics,
  Notifications,
  TrendingUp,
  Warning,
  CheckCircle,
  Add,
  Code,
  Storage,
  Security,
  IntegrationInstructions,
  BugReport,
} from '@mui/icons-material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
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

interface SystemStatus {
  id: number;
  service: string;
  status: 'Online' | 'Degraded' | 'Offline';
  uptime: string;
  responseTime: number;
}

const TechLanding: React.FC = () => {
  const [selectedWorklet, setSelectedWorklet] = useState<Worklet | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const worklets: Worklet[] = [
    {
      id: 1,
      title: 'System Administration',
      description: 'Manage system settings, user accounts, security configurations',
      icon: <Settings />,
      count: 15,
      status: 'success',
      action: 'Manage System',
    },
    {
      id: 2,
      title: 'Technical Configuration',
      description: 'Configure integrations, APIs, data mappings, workflows',
      icon: <AdminPanelSettings />,
      count: 8,
      status: 'warning',
      action: 'Configure Tech',
    },
    {
      id: 3,
      title: 'Integration Tools',
      description: 'Manage data integrations, API connections, ETL processes',
      icon: <IntegrationInstructions />,
      count: 12,
      status: 'success',
      action: 'Manage Integrations',
    },
    {
      id: 4,
      title: 'System Reports',
      description: 'View system logs, performance metrics, error reports',
      icon: <Analytics />,
      count: 25,
      status: 'info',
      action: 'View Reports',
    },
    {
      id: 5,
      title: 'Data Management',
      description: 'Manage data storage, backups, data quality, migrations',
      icon: <Storage />,
      count: 6,
      status: 'success',
      action: 'Manage Data',
    },
    {
      id: 6,
      title: 'Security & Access',
      description: 'Manage security policies, access controls, authentication',
      icon: <Security />,
      count: 18,
      status: 'warning',
      action: 'Manage Security',
    },
  ];

  const systemStatus: SystemStatus[] = [
    {
      id: 1,
      service: 'Core HR System',
      status: 'Online',
      uptime: '99.9%',
      responseTime: 120,
    },
    {
      id: 2,
      service: 'Payroll Engine',
      status: 'Online',
      uptime: '99.8%',
      responseTime: 85,
    },
    {
      id: 3,
      service: 'Time Tracking',
      status: 'Degraded',
      uptime: '98.5%',
      responseTime: 250,
    },
    {
      id: 4,
      service: 'Benefits Portal',
      status: 'Online',
      uptime: '99.7%',
      responseTime: 95,
    },
  ];

  const pendingIssues = [
    { id: 1, type: 'Performance Alert', service: 'Time Tracking', severity: 'Medium', time: '2 hours ago' },
    { id: 2, type: 'Integration Error', service: 'Payroll API', severity: 'High', time: '4 hours ago' },
    { id: 3, type: 'Security Update', service: 'User Authentication', severity: 'Low', time: '1 day ago' },
  ];

  const systemMetrics = [
    { name: 'System Uptime', value: 99.8, change: '+0.1', color: '#28a745' },
    { name: 'Active Users', value: 1250, change: '+25', color: '#0066cc' },
    { name: 'API Calls/min', value: 850, change: '+50', color: '#ffc107' },
    { name: 'Storage Used', value: 78, change: '+2', color: '#dc3545' },
  ];

  const performanceData = [
    { hour: '00:00', responseTime: 120, errors: 2 },
    { hour: '04:00', responseTime: 95, errors: 1 },
    { hour: '08:00', responseTime: 150, errors: 5 },
    { hour: '12:00', responseTime: 180, errors: 8 },
    { hour: '16:00', responseTime: 160, errors: 6 },
    { hour: '20:00', responseTime: 130, errors: 3 },
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

  const handleWorkletClick = (worklet: Worklet) => {
    setSelectedWorklet(worklet);
    setDrawerOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Workbench
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Notifications />}>
            Alerts
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            New Configuration
          </Button>
        </Box>
      </Box>

      {/* System Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {systemMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.name}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: metric.color, mr: 2 }}>
                    <TrendingUp />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {metric.value}{metric.name === 'System Uptime' ? '%' : ''}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {metric.name}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="success.main">
                  {metric.change} from last hour
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
                Technical Worklets
              </Typography>
              <Grid container spacing={2}>
                {worklets.map((worklet) => (
                  <Grid item xs={12} sm={6} key={worklet.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'rgba(0, 102, 204, 0.04)' },
                      }}
                      onClick={() => handleWorkletClick(worklet)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            {worklet.icon}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {worklet.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {worklet.description}
                            </Typography>
                          </Box>
                          <Chip
                            label={worklet.count}
                            size="small"
                            color={getStatusColor(worklet.status || 'default') as any}
                          />
                        </Box>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ mt: 1 }}
                        >
                          {worklet.action}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status & Issues */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* System Status */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    System Status
                  </Typography>
                  <List dense>
                    {systemStatus.map((service) => (
                      <ListItem key={service.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: service.status === 'Online' ? 'success.main' : 'warning.main' }}>
                            <CheckCircle />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={service.service}
                          secondary={`${service.uptime} uptime • ${service.responseTime}ms`}
                        />
                        <Chip
                          label={service.status}
                          size="small"
                          color={service.status === 'Online' ? 'success' : 'warning'}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Pending Issues */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Pending Issues
                    </Typography>
                    <Badge badgeContent={pendingIssues.length} color="error" sx={{ ml: 'auto' }}>
                      <BugReport />
                    </Badge>
                  </Box>
                  <List dense>
                    {pendingIssues.map((issue) => (
                      <ListItem key={issue.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'error.main' }}>
                            <Warning />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={issue.type}
                          secondary={`${issue.service} • ${issue.time}`}
                        />
                        <Chip
                          label={issue.severity}
                          size="small"
                          color={issue.severity === 'High' ? 'error' : issue.severity === 'Medium' ? 'warning' : 'info'}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* System Performance Chart */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Performance (24h)
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="responseTime" stroke="#0066cc" strokeWidth={2} name="Response Time (ms)" />
              <Line type="monotone" dataKey="errors" stroke="#dc3545" strokeWidth={2} name="Errors" />
            </LineChart>
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
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Configure Settings" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText primary="View Code" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Analytics />
                </ListItemIcon>
                <ListItemText primary="View Logs" />
              </ListItem>
            </List>
            
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" fullWidth>
                Open {selectedWorklet.title}
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default TechLanding; 