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
  IconButton,
  Drawer,
  Badge,
  LinearProgress,
} from '@mui/material';
import {
  Group,
  People,
  Assessment,
  Work,
  BarChart,
  Notifications,
  TrendingUp,
  Warning,
  CheckCircle,
  Add,
  MoreVert,
  CalendarToday,
  Assignment,
  Book,
  EmojiEvents,
  SupervisorAccount,
  Approval,
  Schedule,
} from '@mui/icons-material';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
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

interface TeamMember {
  id: number;
  name: string;
  position: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  performance: number;
  lastReview: string;
  avatar: string;
}

const ManagerLanding: React.FC = () => {
  const [selectedWorklet, setSelectedWorklet] = useState<Worklet | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const worklets: Worklet[] = [
    {
      id: 1,
      title: 'Team Management',
      description: 'View team members, manage assignments, track performance',
      icon: <Group />,
      count: 8,
      status: 'success',
      action: 'Manage Team',
    },
    {
      id: 2,
      title: 'Approvals',
      description: 'Review and approve requests, time off, expense reports',
      icon: <Approval />,
      count: 5,
      status: 'warning',
      action: 'Review Requests',
    },
    {
      id: 3,
      title: 'Performance Reviews',
      description: 'Conduct reviews, set goals, provide feedback',
      icon: <Assessment />,
      count: 3,
      status: 'info',
      action: 'Start Reviews',
    },
    {
      id: 4,
      title: 'Recruiting',
      description: 'Post jobs, review candidates, manage hiring process',
      icon: <Work />,
      count: 2,
      status: 'success',
      action: 'Manage Hiring',
    },
    {
      id: 5,
      title: 'Team Reports',
      description: 'View team metrics, performance analytics, headcount',
      icon: <BarChart />,
      count: 12,
      status: 'success',
      action: 'View Reports',
    },
    {
      id: 6,
      title: 'Schedule Management',
      description: 'Manage team schedules, approve time off, track attendance',
      icon: <Schedule />,
      count: 15,
      status: 'warning',
      action: 'Manage Schedule',
    },
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Senior Software Engineer',
      status: 'Active',
      performance: 4.2,
      lastReview: '2024-12-01',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Mike Chen',
      position: 'Software Engineer',
      status: 'Active',
      performance: 3.8,
      lastReview: '2024-11-15',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Emily Davis',
      position: 'Product Manager',
      status: 'On Leave',
      performance: 4.5,
      lastReview: '2024-12-10',
      avatar: 'ED',
    },
    {
      id: 4,
      name: 'David Wilson',
      position: 'UX Designer',
      status: 'Active',
      performance: 4.0,
      lastReview: '2024-11-20',
      avatar: 'DW',
    },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Time Off Request', employee: 'Sarah Johnson', days: 3, date: '2 hours ago' },
    { id: 2, type: 'Expense Report', employee: 'Mike Chen', amount: '$450', date: '4 hours ago' },
    { id: 3, type: 'Performance Review', employee: 'David Wilson', status: 'Draft', date: '1 day ago' },
  ];

  const teamMetrics = [
    { name: 'Team Size', value: 8, change: '+1', color: '#28a745' },
    { name: 'Avg Performance', value: 4.1, change: '+0.2', color: '#0066cc' },
    { name: 'Pending Reviews', value: 3, change: '-2', color: '#ffc107' },
    { name: 'Open Positions', value: 2, change: '+1', color: '#dc3545' },
  ];

  const performanceData = [
    { month: 'Jul', avgRating: 3.8 },
    { month: 'Aug', avgRating: 3.9 },
    { month: 'Sep', avgRating: 4.0 },
    { month: 'Oct', avgRating: 4.1 },
    { month: 'Nov', avgRating: 4.2 },
    { month: 'Dec', avgRating: 4.1 },
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
          My Team
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Notifications />}>
            Notifications
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            Add Team Member
          </Button>
        </Box>
      </Box>

      {/* Team Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {teamMetrics.map((metric) => (
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
                Team Management Worklets
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

        {/* Team Members & Approvals */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Team Members */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Team Members
                  </Typography>
                  <List dense>
                    {teamMembers.map((member) => (
                      <ListItem key={member.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {member.avatar}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={member.name}
                          secondary={`${member.position} • ${member.performance}/5`}
                        />
                        <Chip
                          label={member.status}
                          size="small"
                          color={member.status === 'Active' ? 'success' : 'warning'}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Pending Approvals */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Pending Approvals
                    </Typography>
                    <Badge badgeContent={pendingApprovals.length} color="error" sx={{ ml: 'auto' }}>
                      <Notifications />
                    </Badge>
                  </Box>
                  <List dense>
                    {pendingApprovals.map((approval) => (
                      <ListItem key={approval.id} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'warning.main' }}>
                            <Approval />
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={approval.type}
                          secondary={`${approval.employee} • ${approval.date}`}
                        />
                        <Chip
                          label={approval.days || approval.amount || approval.status}
                          size="small"
                          color="primary"
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

      {/* Team Performance Chart */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Team Performance Trends
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[3, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="avgRating" stroke="#0066cc" strokeWidth={2} />
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
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="View Details" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Create New" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText primary="Generate Report" />
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

export default ManagerLanding; 