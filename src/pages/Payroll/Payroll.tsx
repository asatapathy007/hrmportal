import React, { useState, useEffect } from 'react';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Download,
  Visibility,
  Edit,
  Delete,
  PlayArrow,
  Pause,
  CheckCircle,
  Error as ErrorIcon,
  Person,
  MonetizationOn,
  Receipt,
  Payment,
} from '@mui/icons-material';

interface Payroll {
  id: string;
  payrollId: string;
  employee: {
    id: string;
    workerId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  payPeriod: string;
  payDate: string;
  baseSalary: number;
  bonuses: number;
  overtime: number;
  allowances: number;
  deductions: number;
  taxes: number;
  grossPay: number;
  netPay: number;
  status: string;
  paymentMethod: string;
  bankAccount?: string;
  notes?: string;
}

interface PayrollFormData {
  employeeId: string;
  payPeriod: string;
  payDate: string;
  baseSalary: string;
  bonuses: string;
  overtime: string;
  allowances: string;
  deductions: string;
  taxes: string;
  paymentMethod: string;
  bankAccount: string;
  notes: string;
  status: string;
}

interface Employee {
  id: string;
  workerId: string;
  firstName: string;
  lastName: string;
  email: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

const PayrollComponent: React.FC = () => {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const [formData, setFormData] = useState<PayrollFormData>({
    employeeId: '',
    payPeriod: '',
    payDate: '',
    baseSalary: '',
    bonuses: '',
    overtime: '',
    allowances: '',
    deductions: '',
    taxes: '',
    paymentMethod: 'Direct Deposit',
    bankAccount: '',
    notes: '',
    status: 'Paid'
  });

  // Fetch payrolls and employees from API
  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/payrolls`);
      if (!response.ok) {
        setError('Failed to fetch payrolls');
        return;
      }
      const data = await response.json();
      setPayrolls(data);
      setError(null);
    } catch (err) {
      setError('An error occurred while fetching payrolls');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) {
        console.error('Failed to fetch employees');
        return;
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  useEffect(() => {
    fetchPayrolls();
    fetchEmployees();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Processing':
        return 'warning';
      case 'Pending':
        return 'info';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle fontSize="small" />;
      case 'Processing':
        return <PlayArrow fontSize="small" />;
      case 'Pending':
        return <Pause fontSize="small" />;
      case 'Failed':
        return <ErrorIcon fontSize="small" />;
      default:
        return <CheckCircle fontSize="small" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, payroll: Payroll) => {
    setAnchorEl(event.currentTarget);
    setSelectedPayroll(payroll);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPayroll(null);
  };

  const handleAddPayroll = () => {
    setIsEditMode(false);
    setFormData({
      employeeId: '',
      payPeriod: '',
      payDate: '',
      baseSalary: '',
      bonuses: '',
      overtime: '',
      allowances: '',
      deductions: '',
      taxes: '',
      paymentMethod: 'Direct Deposit',
      bankAccount: '',
      notes: '',
      status: 'Paid'
    });
    setOpenDialog(true);
  };

  const handleEdit = () => {
    if (selectedPayroll) {
      setIsEditMode(true);
      setFormData({
        employeeId: selectedPayroll.employee.id,
        payPeriod: selectedPayroll.payPeriod,
        payDate: selectedPayroll.payDate.split('T')[0],
        baseSalary: selectedPayroll.baseSalary.toString(),
        bonuses: selectedPayroll.bonuses.toString(),
        overtime: selectedPayroll.overtime.toString(),
        allowances: selectedPayroll.allowances.toString(),
        deductions: selectedPayroll.deductions.toString(),
        taxes: selectedPayroll.taxes.toString(),
        paymentMethod: selectedPayroll.paymentMethod,
        bankAccount: selectedPayroll.bankAccount || '',
        notes: selectedPayroll.notes || '',
        status: selectedPayroll.status
      });
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedPayroll) {
      try {
        const response = await fetch(`${API_BASE_URL}/payrolls/${selectedPayroll.id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete payroll');
        }
        setSnackbar({
          open: true,
          message: 'Payroll deleted successfully',
          severity: 'success'
        });
        fetchPayrolls();
      } catch (err) {
        setSnackbar({
          open: true,
          message: err instanceof Error ? err.message : 'Failed to delete payroll',
          severity: 'error'
        });
      }
    }
    handleMenuClose();
  };

  const handleSubmit = async () => {
    try {
      const url = isEditMode 
        ? `${API_BASE_URL}/payrolls/${selectedPayroll?.id}`
        : `${API_BASE_URL}/payrolls`;
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

              if (!response.ok) {
          throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} payroll`);
        }

      setSnackbar({
        open: true,
        message: `Payroll ${isEditMode ? 'updated' : 'created'} successfully`,
        severity: 'success'
      });
      
      setOpenDialog(false);
      fetchPayrolls();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : `Failed to ${isEditMode ? 'update' : 'create'} payroll`,
        severity: 'error'
      });
    }
  };

  const handleFormChange = (field: keyof PayrollFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Payroll Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddPayroll}
        >
          Add Payroll Entry
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Payroll Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <MonetizationOn color="primary" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(payrolls.reduce((sum, p) => sum + p.grossPay, 0))}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Gross Pay
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Payment color="success" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {formatCurrency(payrolls.reduce((sum, p) => sum + p.netPay, 0))}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Net Pay
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Receipt color="warning" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {payrolls.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Entries
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Person color="info" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {new Set(payrolls.map(p => p.employee.id)).size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Employees
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payroll Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Pay Period</TableCell>
                  <TableCell>Base Salary</TableCell>
                  <TableCell>Bonuses</TableCell>
                  <TableCell>Overtime</TableCell>
                  <TableCell>Gross Pay</TableCell>
                  <TableCell>Net Pay</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payrolls.map((payroll) => (
                  <TableRow key={payroll.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Person />
                        <Box>
                          <Typography variant="subtitle2">
                            {payroll.employee.firstName} {payroll.employee.lastName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {payroll.employee.workerId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {payroll.payPeriod}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(payroll.payDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(payroll.baseSalary)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatCurrency(payroll.bonuses)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatCurrency(payroll.overtime)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatCurrency(payroll.grossPay)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {formatCurrency(payroll.netPay)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payroll.status}
                        color={getStatusColor(payroll.status) as any}
                        size="small"
                        icon={getStatusIcon(payroll.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, payroll)}
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

      {/* Payroll Form Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditMode ? 'Edit Payroll Entry' : 'Add New Payroll Entry'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Employee</InputLabel>
                <Select
                  value={formData.employeeId}
                  onChange={(e) => handleFormChange('employeeId', e.target.value)}
                  label="Employee"
                  required
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName} ({employee.workerId})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pay Period"
                value={formData.payPeriod}
                onChange={(e) => handleFormChange('payPeriod', e.target.value)}
                placeholder="e.g., January 2024"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pay Date"
                type="date"
                value={formData.payDate}
                onChange={(e) => handleFormChange('payDate', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Base Salary"
                type="number"
                value={formData.baseSalary}
                onChange={(e) => handleFormChange('baseSalary', e.target.value)}
                required
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bonuses"
                type="number"
                value={formData.bonuses}
                onChange={(e) => handleFormChange('bonuses', e.target.value)}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Overtime"
                type="number"
                value={formData.overtime}
                onChange={(e) => handleFormChange('overtime', e.target.value)}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Allowances"
                type="number"
                value={formData.allowances}
                onChange={(e) => handleFormChange('allowances', e.target.value)}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Deductions"
                type="number"
                value={formData.deductions}
                onChange={(e) => handleFormChange('deductions', e.target.value)}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Taxes"
                type="number"
                value={formData.taxes}
                onChange={(e) => handleFormChange('taxes', e.target.value)}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={formData.paymentMethod}
                  onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                  label="Payment Method"
                  required
                >
                  {['Direct Deposit', 'Check', 'Cash'].map((method) => (
                    <MenuItem key={method} value={method}>
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bank Account"
                value={formData.bankAccount}
                onChange={(e) => handleFormChange('bankAccount', e.target.value)}
                placeholder="Account number (optional)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                value={formData.notes}
                onChange={(e) => handleFormChange('notes', e.target.value)}
                multiline
                rows={3}
                placeholder="Additional notes about this payroll entry"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.employeeId || !formData.payPeriod || !formData.payDate || !formData.baseSalary}
          >
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        <MenuItem>
          <Visibility sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem>
          <Download sx={{ mr: 1 }} />
          Export
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PayrollComponent; 