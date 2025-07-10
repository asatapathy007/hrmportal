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
} from '@mui/material';
import {
  Add,
  MoreVert,
  Visibility,
  Edit,
  Delete,
  FilterList,
  DateRange,
  Download,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';

interface Report {
  id: number;
  name: string;
  type: string;
  createdBy: string;
  lastRun: string;
  status: 'Scheduled' | 'Completed' | 'Failed' | 'Running';
  nextRun?: string;
  recipients: number;
}

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const reports: Report[] = [
    {
      id: 1,
      name: 'Monthly HR Summary',
      type: 'Executive',
      createdBy: 'HR Manager',
      lastRun: '2024-12-15',
      status: 'Completed',
      recipients: 5,
    },
    {
      id: 2,
      name: 'Employee Turnover Analysis',
      type: 'Analytics',
      createdBy: 'Analytics Team',
      lastRun: '2024-12-14',
      status: 'Completed',
      recipients: 12,
    },
    {
      id: 3,
      name: 'Payroll Compliance Report',
      type: 'Compliance',
      createdBy: 'Payroll Admin',
      lastRun: '2024-12-13',
      status: 'Scheduled',
      nextRun: '2024-12-20',
      recipients: 3,
    },
  ];

  const employeeTrends = [
    { month: 'Jan', employees: 1200, hires: 25, terminations: 8 },
    { month: 'Feb', employees: 1215, hires: 30, terminations: 10 },
    { month: 'Mar', employees: 1230, hires: 28, terminations: 12 },
    { month: 'Apr', employees: 1245, hires: 35, terminations: 15 },
    { month: 'May', employees: 1255, hires: 32, terminations: 18 },
    { month: 'Jun', employees: 1265, hires: 40, terminations: 20 },
  ];

  const departmentMetrics = [
    { department: 'Engineering', headcount: 320, turnover: 2.1, avgSalary: 95000 },
    { department: 'Sales', headcount: 180, turnover: 3.2, avgSalary: 85000 },
    { department: 'Marketing', headcount: 95, turnover: 1.8, avgSalary: 75000 },
    { department: 'HR', headcount: 45, turnover: 1.2, avgSalary: 65000 },
    { department: 'Finance', headcount: 35, turnover: 0.8, avgSalary: 80000 },
  ];

  const reportTypes = [
    { type: 'Executive', count: 15, color: '#0066cc' },
    { type: 'Analytics', count: 28, color: '#28a745' },
    { type: 'Compliance', count: 12, color: '#ffc107' },
    { type: 'Operational', count: 35, color: '#dc3545' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Scheduled':
        return 'primary';
      case 'Running':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, report: Report) => {
    setAnchorEl(event.currentTarget);
    setSelectedReport(report);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReport(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Reports & Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<FilterList />} size="small">
            Filters
          </Button>
          <Button variant="outlined" startIcon={<DateRange />} size="small">
            Date Range
          </Button>
          <Button variant="contained" startIcon={<Add />} size="small">
            Create Report
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Reports
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                90
              </Typography>
              <Typography variant="body2" color="success.main">
                +12 this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Scheduled Reports
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                23
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Auto-generated
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Report Views
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                1,245
              </Typography>
              <Typography variant="body2" color="success.main">
                +8.3% vs last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Failed Reports
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold" color="error.main">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Require attention
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
                Employee Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={employeeTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="employees" stackId="1" stroke="#0066cc" fill="#0066cc" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="hires" stackId="2" stroke="#28a745" fill="#28a745" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="terminations" stackId="3" stroke="#dc3545" fill="#dc3545" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Types Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, count }) => `${type}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {reportTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Department Metrics */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Department Metrics
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="headcount" fill="#0066cc" name="Headcount" />
              <Bar yAxisId="right" dataKey="turnover" fill="#ffc107" name="Turnover %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Reports
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell>Report Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Last Run</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Recipients</TableCell>
                  <TableCell>Next Run</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {report.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={report.type}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{report.createdBy}</TableCell>
                    <TableCell>{new Date(report.lastRun).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        size="small"
                        color={getStatusColor(report.status) as any}
                      />
                    </TableCell>
                    <TableCell>{report.recipients}</TableCell>
                    <TableCell>
                      {report.nextRun ? new Date(report.nextRun).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, report)}
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
          View Report
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Download sx={{ mr: 1 }} fontSize="small" />
          Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit Report
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete Report
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Reports; 