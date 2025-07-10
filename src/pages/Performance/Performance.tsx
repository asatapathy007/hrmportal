import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  LinearProgress,
  Rating,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Assessment,
  TrendingUp,
  CheckCircle,
  Download,
  Upload,
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface PerformanceReview {
  id: number;
  employee: string;
  reviewer: string;
  period: string;
  rating: number;
  status: 'Draft' | 'In Progress' | 'Completed' | 'Overdue';
  dueDate: string;
  completedDate?: string;
}

interface Goal {
  id: number;
  employee: string;
  title: string;
  category: string;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Completed' | 'Overdue';
  dueDate: string;
}

const Performance: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const performanceReviews: PerformanceReview[] = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      reviewer: 'John Smith',
      period: 'Q4 2024',
      rating: 4.2,
      status: 'Completed',
      dueDate: '2024-12-31',
      completedDate: '2024-12-15',
    },
    {
      id: 2,
      employee: 'Mike Chen',
      reviewer: 'Lisa Wang',
      period: 'Q4 2024',
      rating: 3.8,
      status: 'In Progress',
      dueDate: '2024-12-31',
    },
    {
      id: 3,
      employee: 'Emily Davis',
      reviewer: 'David Wilson',
      period: 'Q4 2024',
      rating: 4.5,
      status: 'Draft',
      dueDate: '2024-12-31',
    },
  ];

  const goals: Goal[] = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      title: 'Complete Advanced React Course',
      category: 'Learning',
      progress: 85,
      status: 'On Track',
      dueDate: '2024-12-31',
    },
    {
      id: 2,
      employee: 'Mike Chen',
      title: 'Increase Sales by 20%',
      category: 'Sales',
      progress: 65,
      status: 'At Risk',
      dueDate: '2024-12-31',
    },
    {
      id: 3,
      employee: 'Emily Davis',
      title: 'Launch New Marketing Campaign',
      category: 'Marketing',
      progress: 100,
      status: 'Completed',
      dueDate: '2024-12-15',
    },
  ];

  const ratingDistribution = [
    { rating: '5.0', count: 45 },
    { rating: '4.0-4.9', count: 120 },
    { rating: '3.0-3.9', count: 85 },
    { rating: '2.0-2.9', count: 15 },
    { rating: '1.0-1.9', count: 5 },
  ];

  const performanceTrends = [
    { month: 'Jul', avgRating: 3.8 },
    { month: 'Aug', avgRating: 3.9 },
    { month: 'Sep', avgRating: 4.0 },
    { month: 'Oct', avgRating: 4.1 },
    { month: 'Nov', avgRating: 4.2 },
    { month: 'Dec', avgRating: 4.3 },
  ];

  const competencyData = [
    { competency: 'Technical Skills', score: 4.2 },
    { competency: 'Communication', score: 3.9 },
    { competency: 'Leadership', score: 4.1 },
    { competency: 'Problem Solving', score: 4.0 },
    { competency: 'Teamwork', score: 4.3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'On Track':
        return 'success';
      case 'In Progress':
        return 'primary';
      case 'At Risk':
        return 'warning';
      case 'Overdue':
      case 'Draft':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setAnchorEl(event.currentTarget);
    if ('period' in item) {
      // setSelectedReview(item); // Removed
      // setSelectedGoal(null); // Removed
    } else {
      // setSelectedGoal(item); // Removed
      // setSelectedReview(null); // Removed
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // setSelectedReview(null); // Removed
    // setSelectedGoal(null); // Removed
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Performance
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Upload />} size="small">
            Import
          </Button>
          <Button variant="outlined" startIcon={<Download />} size="small">
            Export
          </Button>
          <Button variant="contained" startIcon={<Add />} size="small">
            Create Review
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Average Rating
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                4.2/5
              </Typography>
              <Typography variant="body2" color="success.main">
                +0.3 vs last quarter
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Reviews Due
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold" color="warning.main">
                23
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This quarter
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Goals Completed
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                156
              </Typography>
              <Typography variant="body2" color="success.main">
                78% completion rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Top Performers
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                45
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating 4.5+
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rating Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratingDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0066cc" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgRating" stroke="#28a745" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Competency Scores
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={competencyData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="competency" />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} />
                  <Radar name="Score" dataKey="score" stroke="#0066cc" fill="#0066cc" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Reviews Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Performance Reviews
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell>Employee</TableCell>
                  <TableCell>Reviewer</TableCell>
                  <TableCell>Period</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Completed</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {performanceReviews.map((review) => (
                  <TableRow key={review.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {review.employee.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {review.employee}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{review.reviewer}</TableCell>
                    <TableCell>{review.period}</TableCell>
                    <TableCell>
                      <Rating value={review.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={review.status}
                        size="small"
                        color={getStatusColor(review.status) as any}
                      />
                    </TableCell>
                    <TableCell>{new Date(review.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {review.completedDate ? new Date(review.completedDate).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, review)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Goals Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Employee Goals
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell>Employee</TableCell>
                  <TableCell>Goal</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {goals.map((goal) => (
                  <TableRow key={goal.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {goal.employee.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {goal.employee}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {goal.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{goal.category}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={goal.progress}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {goal.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={goal.status}
                        size="small"
                        color={getStatusColor(goal.status) as any}
                      />
                    </TableCell>
                    <TableCell>{new Date(goal.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, goal)}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Visibility sx={{ mr: 1 }} fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Performance; 