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
  LinearProgress,
} from '@mui/material';
import {
  AccountCircle,
  Schedule,
  School,
  Assessment,
  Notifications,
  TrendingUp,
  CheckCircle,
  Add,
  CalendarToday,
  AttachMoney,
  HealthAndSafety,
  Assignment,
  Book,
} from '@mui/icons-material';
import {
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

interface QuickAction {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const EmployeeLanding: React.FC = () => {
  const [selectedWorklet, setSelectedWorklet] = useState<Worklet | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const worklets: Worklet[] = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'View and update your personal details, contact info, emergency contacts',
      icon: <AccountCircle />,
      count: 3,
      status: 'success',
      action: 'Update Info',
    },
    {
      id: 2,
      title: 'Time & Attendance',
      description: 'Submit time sheets, view attendance, request time off',
      icon: <Schedule />,
      count: 8,
      status: 'success',
      action: 'Manage Time',
    },
    {
      id: 3,
      title: 'Benefits',
      description: 'View benefits summary, enroll in plans, update dependents',
      icon: <HealthAndSafety />,
      count: 5,
      status: 'info',
      action: 'View Benefits',
    },
    {
      id: 4,
      title: 'Learning',
      description: 'Access training courses, view progress, complete assignments',
      icon: <School />,
      count: 12,
      status: 'warning',
      action: 'Continue Learning',
    },
    {
      id: 5,
      title: 'Performance',
      description: 'View goals, performance reviews, development plans',
      icon: <Assessment />,
      count: 2,
      status: 'success',
      action: 'View Performance',
    },
    {
      id: 6,
      title: 'Compensation',
      description: 'View salary information, compensation history, bonus details',
      icon: <AttachMoney />,
      count: 1,
      status: 'success',
      action: 'View Comp',
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: 1,
      title: 'Submit Time Sheet',
      description: 'Enter your weekly hours',
      icon: <Schedule />,
      path: '/time-tracking',
    },
    {
      id: 2,
      title: 'Request Time Off',
      description: 'Submit vacation request',
      icon: <CalendarToday />,
      path: '/self-service',
    },
    {
      id: 3,
      title: 'Update Address',
      description: 'Change your contact info',
      icon: <AccountCircle />,
      path: '/self-service',
    },
    {
      id: 4,
      title: 'Enroll in Course',
      description: 'Find training opportunities',
      icon: <School />,
      path: '/learning',
    },
  ];

  const recentActivities = [
    { id: 1, type: 'Time Sheet Submitted', date: 'Today', status: 'completed' },
    { id: 2, type: 'Course Completed', date: 'Yesterday', status: 'completed' },
    { id: 3, type: 'Performance Review', date: '2 days ago', status: 'pending' },
    { id: 4, type: 'Benefits Updated', date: '1 week ago', status: 'completed' },
  ];

  const personalMetrics = [
    { name: 'Hours This Week', value: 40, target: 40, color: '#28a745' },
    { name: 'Courses Completed', value: 8, target: 10, color: '#0066cc' },
    { name: 'Goals Achieved', value: 3, target: 5, color: '#ffc107' },
    { name: 'Days Until Review', value: 15, target: 30, color: '#dc3545' },
  ];

  const learningProgress = [
    { course: 'Advanced React', progress: 85, status: 'In Progress' },
    { course: 'Leadership Skills', progress: 100, status: 'Completed' },
    { course: 'Project Management', progress: 60, status: 'In Progress' },
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
          All About Me
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Notifications />}>
            Notifications
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            Quick Action
          </Button>
        </Box>
      </Box>

      {/* Personal Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {personalMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.name}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: metric.color, mr: 2 }}>
                    <TrendingUp />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {metric.value}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {metric.name}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(metric.value / metric.target) * 100}
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Target: {metric.target}
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
                My Worklets
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

        {/* Quick Actions & Activities */}
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
                    {quickActions.map((action) => (
                      <ListItem key={action.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                            {action.icon}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={action.title}
                          secondary={action.description}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activities */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activities
                  </Typography>
                  <List dense>
                    {recentActivities.map((activity) => (
                      <ListItem key={activity.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'success.main' }}>
                            <CheckCircle />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.type}
                          secondary={activity.date}
                        />
                        <Chip
                          label={activity.status}
                          size="small"
                          color={activity.status === 'completed' ? 'success' : 'warning'}
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

      {/* Learning Progress */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Learning Progress
          </Typography>
          <Grid container spacing={2}>
            {learningProgress.map((course) => (
              <Grid item xs={12} md={4} key={course.course}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Book sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle1" fontWeight="medium">
                        {course.course}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                        sx={{ flexGrow: 1, mr: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {course.progress}%
                      </Typography>
                    </Box>
                    <Chip
                      label={course.status}
                      size="small"
                      color={course.status === 'Completed' ? 'success' : 'primary'}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="View Details" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Update Information" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText primary="View History" />
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

export default EmployeeLanding; 