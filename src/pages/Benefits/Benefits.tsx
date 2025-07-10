import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  MoreVert,
  HealthAndSafety,
  LocalHospital,
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface BenefitPlan {
  id: number;
  name: string;
  type: 'Health' | 'Dental' | 'Vision' | 'Life' | 'Disability';
  provider: string;
  enrollmentCount: number;
  totalEmployees: number;
  status: 'Active' | 'Inactive' | 'Pending';
  costPerEmployee: number;
  effectiveDate: string;
}

const Benefits: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<BenefitPlan | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const benefitPlans: BenefitPlan[] = [
    {
      id: 1,
      name: 'Premium Health Plan',
      type: 'Health',
      provider: 'Blue Cross Blue Shield',
      enrollmentCount: 850,
      totalEmployees: 1250,
      status: 'Active',
      costPerEmployee: 450,
      effectiveDate: '2024-01-01',
    },
    {
      id: 2,
      name: 'Basic Health Plan',
      type: 'Health',
      provider: 'Aetna',
      enrollmentCount: 320,
      totalEmployees: 1250,
      status: 'Active',
      costPerEmployee: 280,
      effectiveDate: '2024-01-01',
    },
    {
      id: 3,
      name: 'Dental Coverage',
      type: 'Dental',
      provider: 'Delta Dental',
      enrollmentCount: 1100,
      totalEmployees: 1250,
      status: 'Active',
      costPerEmployee: 35,
      effectiveDate: '2024-01-01',
    },
    {
      id: 4,
      name: 'Vision Coverage',
      type: 'Vision',
      provider: 'VSP',
      enrollmentCount: 980,
      totalEmployees: 1250,
      status: 'Active',
      costPerEmployee: 15,
      effectiveDate: '2024-01-01',
    },
    {
      id: 5,
      name: 'Life Insurance',
      type: 'Life',
      provider: 'MetLife',
      enrollmentCount: 1200,
      totalEmployees: 1250,
      status: 'Active',
      costPerEmployee: 25,
      effectiveDate: '2024-01-01',
    },
  ];

  const enrollmentData = [
    { month: 'Jan', enrolled: 1100, total: 1250 },
    { month: 'Feb', enrolled: 1120, total: 1250 },
    { month: 'Mar', enrolled: 1150, total: 1250 },
    { month: 'Apr', enrolled: 1180, total: 1250 },
    { month: 'May', enrolled: 1200, total: 1250 },
    { month: 'Jun', enrolled: 1220, total: 1250 },
  ];

  const benefitTypeData = [
    { name: 'Health', value: 1170, color: '#0066cc' },
    { name: 'Dental', value: 1100, color: '#28a745' },
    { name: 'Vision', value: 980, color: '#ffc107' },
    { name: 'Life', value: 1200, color: '#dc3545' },
    { name: 'Disability', value: 850, color: '#6f42c1' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Health':
        return <HealthAndSafety />;
      case 'Dental':
        return <LocalHospital />;
      case 'Vision':
        return <Visibility />;
      case 'Life':
        return <CheckCircle />;
      case 'Disability':
        return <Warning />;
      default:
        return <HealthAndSafety />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, plan: BenefitPlan) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlan(plan);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPlan(null);
  };

  const handleViewDetails = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Benefits
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="small"
        >
          Add Benefit Plan
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Enrollment
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                1,220
              </Typography>
              <Typography variant="body2" color="success.main">
                97.6% of employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Plans
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Across all categories
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Monthly Cost
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {formatCurrency(805000)}
              </Typography>
              <Typography variant="body2" color="success.main">
                +2.3% vs last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Changes
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold" color="warning.main">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Require approval
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Enrollment Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrolled" fill="#0066cc" name="Enrolled" />
                  <Bar dataKey="total" fill="#e9ecef" name="Total Employees" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enrollment by Benefit Type
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={benefitTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {benefitTypeData.map((entry, index) => (
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

      {/* Benefit Plans Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Benefit Plans
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell>Plan</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Enrollment</TableCell>
                  <TableCell>Cost per Employee</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Effective Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {benefitPlans.map((plan) => (
                  <TableRow key={plan.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {plan.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getTypeIcon(plan.type)}
                        <Typography variant="body2">
                          {plan.type}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{plan.provider}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {plan.enrollmentCount.toLocaleString()} / {plan.totalEmployees.toLocaleString()}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(plan.enrollmentCount / plan.totalEmployees) * 100}
                          sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{formatCurrency(plan.costPerEmployee)}</TableCell>
                    <TableCell>
                      <Chip
                        label={plan.status}
                        size="small"
                        color={getStatusColor(plan.status) as any}
                      />
                    </TableCell>
                    <TableCell>{new Date(plan.effectiveDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, plan)}
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
        <MenuItem onClick={handleViewDetails}>
          <Visibility sx={{ mr: 1 }} fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit Plan
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete Plan
        </MenuItem>
      </Menu>

      {/* Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Benefit Plan Details</DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedPlan.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Type
                  </Typography>
                  <Typography variant="body1">
                    {selectedPlan.type}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Provider
                  </Typography>
                  <Typography variant="body1">
                    {selectedPlan.provider}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Enrollment Rate
                  </Typography>
                  <Typography variant="body1">
                    {((selectedPlan.enrollmentCount / selectedPlan.totalEmployees) * 100).toFixed(1)}%
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Cost per Employee
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(selectedPlan.costPerEmployee)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Manage Enrollment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Benefits; 