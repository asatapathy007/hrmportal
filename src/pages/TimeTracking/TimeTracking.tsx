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
} from '@mui/material';
import {
  Add,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  Upload,
  Download,
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
} from 'recharts';

interface TimeEntry {
  id: number;
  employee: string;
  date: string;
  hours: number;
  project: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  submittedDate: string;
}

const TimeTracking: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const timeEntries: TimeEntry[] = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      date: '2024-12-15',
      hours: 8.5,
      project: 'Project Alpha',
      status: 'Approved',
      submittedDate: '2024-12-15',
    },
    {
      id: 2,
      employee: 'Mike Chen',
      date: '2024-12-15',
      hours: 7.5,
      project: 'Sales Campaign',
      status: 'Pending',
      submittedDate: '2024-12-15',
    },
    {
      id: 3,
      employee: 'Emily Davis',
      date: '2024-12-15',
      hours: 6.0,
      project: 'Marketing Materials',
      status: 'Approved',
      submittedDate: '2024-12-14',
    },
    {
      id: 4,
      employee: 'David Wilson',
      date: '2024-12-15',
      hours: 9.0,
      project: 'Brand Strategy',
      status: 'Approved',
      submittedDate: '2024-12-15',
    },
  ];

  const attendanceData = [
    { day: 'Mon', present: 1200, absent: 50 },
    { day: 'Tue', present: 1180, absent: 70 },
    { day: 'Wed', present: 1220, absent: 30 },
    { day: 'Thu', present: 1190, absent: 60 },
    { day: 'Fri', present: 1150, absent: 100 },
  ];

  const hoursData = [
    { week: 'Week 1', avgHours: 7.8 },
    { week: 'Week 2', avgHours: 8.2 },
    { week: 'Week 3', avgHours: 7.9 },
    { week: 'Week 4', avgHours: 8.1 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, entry: TimeEntry) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Time Tracking
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Upload />} size="small">
            Import
          </Button>
          <Button variant="outlined" startIcon={<Download />} size="small">
            Export
          </Button>
          <Button variant="contained" startIcon={<Add />} size="small">
            Add Time Entry
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Hours This Week
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                9,840
              </Typography>
              <Typography variant="body2" color="success.main">
                +5.2% vs last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Average Hours/Day
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                7.9
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target: 8.0 hours
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Approvals
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold" color="warning.main">
                23
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Require review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Attendance Rate
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                96.2%
              </Typography>
              <Typography variant="body2" color="success.main">
                +1.1% vs last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Weekly Attendance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#28a745" name="Present" />
                  <Bar dataKey="absent" fill="#dc3545" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Hours per Week
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgHours" stroke="#0066cc" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Time Entries Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Time Entries
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell>Employee</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeEntries.map((entry) => (
                  <TableRow key={entry.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {entry.employee.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {entry.employee}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                    <TableCell>{entry.hours} hrs</TableCell>
                    <TableCell>{entry.project}</TableCell>
                    <TableCell>
                      <Chip
                        label={entry.status}
                        size="small"
                        color={getStatusColor(entry.status) as any}
                      />
                    </TableCell>
                    <TableCell>{new Date(entry.submittedDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, entry)}
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
          Edit Entry
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete Entry
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TimeTracking; 