import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Tooltip,
  Snackbar,
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Download,
  Upload,
  Person,
  Business,
  LocationOn,
  SupervisorAccount,
} from '@mui/icons-material';
import { API_BASE_URL } from '../../config/api';

interface Employee {
  id: string;
  workerId: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  email: string;
  workEmail?: string;
  personalEmail?: string;
  phone?: string;
  workPhone?: string;
  dateOfBirth?: string;
  gender?: string;
  ethnicity?: string;
  maritalStatus?: string;
  hireDate: string;
  originalHireDate?: string;
  employmentType: string;
  workerType: string;
  employmentStatus: string;
  isActive: boolean;
  position?: {
    id: string;
    title: string;
    positionId: string;
  };
  jobProfile?: {
    id: string;
    name: string;
  };
  organization?: {
    id: string;
    name: string;
    code: string;
  };
  location?: {
    id: string;
    name: string;
  };
  manager?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  compensationGrade?: {
    id: string;
    name: string;
  };
}

interface EmployeeFormData {
  workerId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  email: string;
  workEmail: string;
  personalEmail: string;
  phone: string;
  workPhone: string;
  dateOfBirth: string;
  gender: string;
  ethnicity: string;
  maritalStatus: string;
  hireDate: string;
  employmentType: string;
  workerType: string;
  employmentStatus: string;
  positionId: string;
  jobProfileId: string;
  organizationId: string;
  locationId: string;
  managerId: string;
  compensationGradeId: string;
  isActive: boolean;
}

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [compensationGrades, setCompensationGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [organizationFilter, setOrganizationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);

  const [formData, setFormData] = useState<EmployeeFormData>({
    workerId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    preferredName: '',
    email: '',
    workEmail: '',
    personalEmail: '',
    phone: '',
    workPhone: '',
    dateOfBirth: '',
    gender: '',
    ethnicity: '',
    maritalStatus: '',
    hireDate: '',
    employmentType: 'Full-time',
    workerType: 'Regular',
    employmentStatus: 'Active',
    positionId: '',
    jobProfileId: '',
    organizationId: '',
    locationId: '',
    managerId: '',
    compensationGradeId: '',
    isActive: true
  });

  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary'];
  const workerTypes = ['Regular', 'Contractor', 'Intern', 'Temporary'];
  const employmentStatuses = ['Active', 'Inactive', 'Terminated', 'On Leave'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const ethnicities = ['White', 'Black', 'Hispanic', 'Asian', 'Other'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch positions
  const fetchPositions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/positions`);
      if (response.ok) {
        const data = await response.json();
        setPositions(data);
      }
    } catch (err) {
      console.error('Failed to fetch positions:', err);
    }
  };

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/organizations`);
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
      }
    } catch (err) {
      console.error('Failed to fetch organizations:', err);
    }
  };

  // Fetch locations
  const fetchLocations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/locations`);
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      }
    } catch (err) {
      console.error('Failed to fetch locations:', err);
    }
  };

  // Fetch compensation grades
  const fetchCompensationGrades = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/compensation-grades`);
      if (response.ok) {
        const data = await response.json();
        setCompensationGrades(data);
      }
    } catch (err) {
      console.error('Failed to fetch compensation grades:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
    fetchOrganizations();
    fetchLocations();
    fetchCompensationGrades();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.workerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrganization = !organizationFilter || employee.organization?.code === organizationFilter;
    const matchesStatus = !statusFilter || employee.employmentStatus === statusFilter;
    const matchesInactive = showInactive || employee.isActive;

    return matchesSearch && matchesOrganization && matchesStatus && matchesInactive;
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, employee: Employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleAddEmployee = () => {
    setIsEditMode(false);
    setFormData({
      workerId: '',
      firstName: '',
      lastName: '',
      middleName: '',
      preferredName: '',
      email: '',
      workEmail: '',
      personalEmail: '',
      phone: '',
      workPhone: '',
      dateOfBirth: '',
      gender: '',
      ethnicity: '',
      maritalStatus: '',
      hireDate: '',
      employmentType: 'Full-time',
      workerType: 'Regular',
      employmentStatus: 'Active',
      positionId: '',
      jobProfileId: '',
      organizationId: '',
      locationId: '',
      managerId: '',
      compensationGradeId: '',
      isActive: true
    });
    setOpenDialog(true);
  };

  const handleEdit = () => {
    if (selectedEmployee) {
      setIsEditMode(true);
      setFormData({
        workerId: selectedEmployee.workerId,
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
        middleName: selectedEmployee.middleName || '',
        preferredName: selectedEmployee.preferredName || '',
        email: selectedEmployee.email,
        workEmail: selectedEmployee.workEmail || '',
        personalEmail: selectedEmployee.personalEmail || '',
        phone: selectedEmployee.phone || '',
        workPhone: selectedEmployee.workPhone || '',
        dateOfBirth: selectedEmployee.dateOfBirth ? selectedEmployee.dateOfBirth.split('T')[0] : '',
        gender: selectedEmployee.gender || '',
        ethnicity: selectedEmployee.ethnicity || '',
        maritalStatus: selectedEmployee.maritalStatus || '',
        hireDate: selectedEmployee.hireDate.split('T')[0],
        employmentType: selectedEmployee.employmentType,
        workerType: selectedEmployee.workerType,
        employmentStatus: selectedEmployee.employmentStatus,
        positionId: selectedEmployee.position?.id || '',
        jobProfileId: selectedEmployee.jobProfile?.id || '',
        organizationId: selectedEmployee.organization?.id || '',
        locationId: selectedEmployee.location?.id || '',
        managerId: selectedEmployee.manager?.id || '',
        compensationGradeId: selectedEmployee.compensationGrade?.id || '',
        isActive: selectedEmployee.isActive
      });
      setOpenDialog(true);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedEmployee) {
      try {
        const response = await fetch(`${API_BASE_URL}/employees/${selectedEmployee.id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw 'Failed to delete employee';
        }
        setSnackbar({
          open: true,
          message: 'Employee deleted successfully',
          severity: 'success'
        });
        fetchEmployees();
      } catch (err) {
        setSnackbar({
          open: true,
          message: typeof err === 'string' ? err : 'Failed to delete employee',
          severity: 'error'
        });
      }
    }
    handleMenuClose();
  };

  const handleSubmit = async () => {
    try {
      const url = isEditMode 
        ? `${API_BASE_URL}/employees/${selectedEmployee?.id}`
        : `${API_BASE_URL}/employees`;
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw `Failed to ${isEditMode ? 'update' : 'create'} employee`;
      }

      setSnackbar({
        open: true,
        message: `Employee ${isEditMode ? 'updated' : 'created'} successfully`,
        severity: 'success'
      });
      
      setOpenDialog(false);
      fetchEmployees();
    } catch (err) {
      setSnackbar({
        open: true,
        message: typeof err === 'string' ? err : `Failed to ${isEditMode ? 'update' : 'create'} employee`,
        severity: 'error'
      });
    }
  };

  const handleFormChange = (field: keyof EmployeeFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'warning';
      case 'Terminated':
        return 'error';
      default:
        return 'default';
    }
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
          Employee Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Organization</InputLabel>
                <Select
                  value={organizationFilter}
                  onChange={(e) => setOrganizationFilter(e.target.value)}
                  label="Organization"
                >
                  <MenuItem value="">All Organizations</MenuItem>
                  {organizations.map((org) => (
                    <MenuItem key={org.id} value={org.code}>
                      {org.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  {employmentStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                  />
                }
                label="Show Inactive"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Export">
                  <IconButton>
                    <Download />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Import">
                  <IconButton>
                    <Upload />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Worker ID</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar>
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">
                            {employee.firstName} {employee.lastName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {employee.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {employee.workerId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {employee.position?.title || 'No Position'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {employee.position?.positionId || ''}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Business fontSize="small" color="action" />
                        <Box>
                          <Typography variant="body2">
                            {employee.organization?.name || 'No Organization'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {employee.organization?.code || ''}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2">
                          {employee.location?.name || 'No Location'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {employee.manager ? (
                        <Box>
                          <Typography variant="body2">
                            {employee.manager.firstName} {employee.manager.lastName}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No Manager
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={employee.employmentStatus}
                        color={getStatusColor(employee.employmentStatus) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, employee)}
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

      {/* Employee Form Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditMode ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Worker ID"
                value={formData.workerId}
                onChange={(e) => handleFormChange('workerId', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleFormChange('firstName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleFormChange('lastName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Middle Name"
                value={formData.middleName}
                onChange={(e) => handleFormChange('middleName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Preferred Name"
                value={formData.preferredName}
                onChange={(e) => handleFormChange('preferredName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange('email', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Work Email"
                type="email"
                value={formData.workEmail}
                onChange={(e) => handleFormChange('workEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Personal Email"
                type="email"
                value={formData.personalEmail}
                onChange={(e) => handleFormChange('personalEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleFormChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Work Phone"
                value={formData.workPhone}
                onChange={(e) => handleFormChange('workPhone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleFormChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={(e) => handleFormChange('gender', e.target.value)}
                  label="Gender"
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Ethnicity</InputLabel>
                <Select
                  value={formData.ethnicity}
                  onChange={(e) => handleFormChange('ethnicity', e.target.value)}
                  label="Ethnicity"
                >
                  {ethnicities.map((ethnicity) => (
                    <MenuItem key={ethnicity} value={ethnicity}>
                      {ethnicity}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  value={formData.maritalStatus}
                  onChange={(e) => handleFormChange('maritalStatus', e.target.value)}
                  label="Marital Status"
                >
                  {maritalStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Hire Date"
                type="date"
                value={formData.hireDate}
                onChange={(e) => handleFormChange('hireDate', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  value={formData.employmentType}
                  onChange={(e) => handleFormChange('employmentType', e.target.value)}
                  label="Employment Type"
                  required
                >
                  {employmentTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Worker Type</InputLabel>
                <Select
                  value={formData.workerType}
                  onChange={(e) => handleFormChange('workerType', e.target.value)}
                  label="Worker Type"
                  required
                >
                  {workerTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Employment Status</InputLabel>
                <Select
                  value={formData.employmentStatus}
                  onChange={(e) => handleFormChange('employmentStatus', e.target.value)}
                  label="Employment Status"
                  required
                >
                  {employmentStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select
                  value={formData.positionId}
                  onChange={(e) => handleFormChange('positionId', e.target.value)}
                  label="Position"
                >
                  {positions.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.title} ({position.positionId})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Organization</InputLabel>
                <Select
                  value={formData.organizationId}
                  onChange={(e) => handleFormChange('organizationId', e.target.value)}
                  label="Organization"
                >
                  {organizations.map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name} ({org.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  value={formData.locationId}
                  onChange={(e) => handleFormChange('locationId', e.target.value)}
                  label="Location"
                >
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Compensation Grade</InputLabel>
                <Select
                  value={formData.compensationGradeId}
                  onChange={(e) => handleFormChange('compensationGradeId', e.target.value)}
                  label="Compensation Grade"
                >
                  {compensationGrades.map((grade) => (
                    <MenuItem key={grade.id} value={grade.id}>
                      {grade.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleFormChange('isActive', e.target.checked)}
                  />
                }
                label="Employee Active"
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
            disabled={!formData.workerId || !formData.firstName || !formData.lastName || !formData.email}
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
        <MenuItem onClick={() => { setViewEmployee(selectedEmployee); handleMenuClose(); }}>
          <Visibility sx={{ mr: 1 }} />
          View Details
        </MenuItem>
      </Menu>

      {/* View Employee Modal */}
      <Dialog open={!!viewEmployee} onClose={() => setViewEmployee(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent dividers>
          {viewEmployee && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewEmployee.firstName} {viewEmployee.lastName}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Worker ID:</b> {viewEmployee.workerId}</Grid>
                <Grid item xs={6}><b>Email:</b> {viewEmployee.email}</Grid>
                <Grid item xs={6}><b>Work Email:</b> {viewEmployee.workEmail || '—'}</Grid>
                <Grid item xs={6}><b>Personal Email:</b> {viewEmployee.personalEmail || '—'}</Grid>
                <Grid item xs={6}><b>Phone:</b> {viewEmployee.phone || '—'}</Grid>
                <Grid item xs={6}><b>Work Phone:</b> {viewEmployee.workPhone || '—'}</Grid>
                <Grid item xs={6}><b>Date of Birth:</b> {viewEmployee.dateOfBirth ? new Date(viewEmployee.dateOfBirth).toLocaleDateString() : '—'}</Grid>
                <Grid item xs={6}><b>Gender:</b> {viewEmployee.gender || '—'}</Grid>
                <Grid item xs={6}><b>Ethnicity:</b> {viewEmployee.ethnicity || '—'}</Grid>
                <Grid item xs={6}><b>Marital Status:</b> {viewEmployee.maritalStatus || '—'}</Grid>
                <Grid item xs={6}><b>Hire Date:</b> {viewEmployee.hireDate ? new Date(viewEmployee.hireDate).toLocaleDateString() : '—'}</Grid>
                <Grid item xs={6}><b>Employment Type:</b> {viewEmployee.employmentType}</Grid>
                <Grid item xs={6}><b>Worker Type:</b> {viewEmployee.workerType}</Grid>
                <Grid item xs={6}><b>Status:</b> {viewEmployee.employmentStatus}</Grid>
                <Grid item xs={6}><b>Active:</b> {viewEmployee.isActive ? 'Yes' : 'No'}</Grid>
                <Grid item xs={6}><b>Position:</b> {viewEmployee.position ? `${viewEmployee.position.title} (${viewEmployee.position.positionId})` : '—'}</Grid>
                <Grid item xs={6}><b>Job Profile:</b> {viewEmployee.jobProfile ? viewEmployee.jobProfile.name : '—'}</Grid>
                <Grid item xs={6}><b>Organization:</b> {viewEmployee.organization ? `${viewEmployee.organization.name} (${viewEmployee.organization.code})` : '—'}</Grid>
                <Grid item xs={6}><b>Location:</b> {viewEmployee.location ? viewEmployee.location.name : '—'}</Grid>
                <Grid item xs={6}><b>Manager:</b> {viewEmployee.manager ? `${viewEmployee.manager.firstName} ${viewEmployee.manager.lastName}` : '—'}</Grid>
                <Grid item xs={6}><b>Compensation Grade:</b> {viewEmployee.compensationGrade ? viewEmployee.compensationGrade.name : '—'}</Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewEmployee(null)}>Close</Button>
        </DialogActions>
      </Dialog>

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

export default Employees; 