import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Avatar,
  Stack,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  AccountTree as AccountTreeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ExpandMore as ExpandMoreIcon,
  Group as GroupIcon,
  LocationOn as LocationIcon,
  SupervisorAccount as SupervisorIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

interface Organization {
  id: string;
  code: string;
  name: string;
  description?: string;
  type: 'Company' | 'Division' | 'Department' | 'Team' | 'Cost Center';
  parentId?: string;
  parent?: {
    id: string;
    name: string;
    code: string;
  };
  manager?: {
    id: string;
    firstName: string;
    lastName: string;
  };
  location?: {
    id: string;
    name: string;
  };
  isActive: boolean;
  effectiveDate: string;
  expirationDate?: string;
  employees?: any[];
  employeeCount: number;
  budget?: number;
  costCenter?: string;
}

interface OrganizationFormData {
  code: string;
  name: string;
  description: string;
  type: string;
  parentId: string;
  managerId: string;
  locationId: string;
  isActive: boolean;
  effectiveDate: string;
  expirationDate: string;
  budget: string;
  costCenter: string;
}

import { API_BASE_URL } from '../../config/api';

const OrganizationManagement: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [viewOrg, setViewOrg] = useState<Organization | null>(null);

  const [formData, setFormData] = useState<OrganizationFormData>({
    code: '',
    name: '',
    description: '',
    type: 'Department',
    parentId: '',
    managerId: '',
    locationId: '',
    isActive: true,
    effectiveDate: '',
    expirationDate: '',
    budget: '',
    costCenter: ''
  });

  const orgTypes = ['Company', 'Division', 'Department', 'Team', 'Cost Center'];

  // Fetch organizations from API
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/organizations`);
      if (!response.ok) {
        throw 'Failed to fetch organizations';
      }
      const data = await response.json();
      
      // Transform the data to match our interface
      const transformedData = data.map((org: any) => ({
        ...org,
        employeeCount: org.employees ? org.employees.length : 0,
        endDate: org.expirationDate || null
      }));
      
      setOrganizations(transformedData);
      setError(null);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An error occurred');
    } finally {
      setLoading(false);
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

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    fetchLocations();
    fetchEmployees();
  }, []);

  const handleCreateOrg = () => {
    setIsEditMode(false);
    setFormData({
      code: '',
      name: '',
      description: '',
      type: 'Department',
      parentId: '',
      managerId: '',
      locationId: '',
      isActive: true,
      effectiveDate: '',
      expirationDate: '',
      budget: '',
      costCenter: ''
    });
    setOpenCreateDialog(true);
  };

  const handleEdit = (org: Organization) => {
    setIsEditMode(true);
    setSelectedOrg(org);
    setFormData({
      code: org.code,
      name: org.name,
      description: org.description || '',
      type: org.type,
      parentId: org.parentId || '',
      managerId: org.manager?.id || '',
      locationId: org.location?.id || '',
      isActive: org.isActive,
      effectiveDate: org.effectiveDate.split('T')[0],
      expirationDate: org.expirationDate ? org.expirationDate.split('T')[0] : '',
      budget: org.budget?.toString() || '',
      costCenter: org.costCenter || ''
    });
    setOpenEditDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw 'Failed to delete organization';
      }
      setSnackbar({
        open: true,
        message: 'Organization deleted successfully',
        severity: 'success'
      });
      fetchOrganizations();
    } catch (err) {
      setSnackbar({
        open: true,
        message: typeof err === 'string' ? err : 'Failed to delete organization',
        severity: 'error'
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const url = isEditMode 
        ? `${API_BASE_URL}/organizations/${selectedOrg?.id}`
        : `${API_BASE_URL}/organizations`;
      
      const submitData = {
        ...formData,
        effectiveDate: new Date(formData.effectiveDate).toISOString(),
        expirationDate: formData.expirationDate ? new Date(formData.expirationDate).toISOString() : null,
        budget: formData.budget ? parseFloat(formData.budget) : null
      };
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData.message || `Failed to ${isEditMode ? 'update' : 'create'} organization`;
      }

      setSnackbar({
        open: true,
        message: `Organization ${isEditMode ? 'updated' : 'created'} successfully`,
        severity: 'success'
      });
      
      setOpenCreateDialog(false);
      setOpenEditDialog(false);
      fetchOrganizations();
    } catch (err) {
      setSnackbar({
        open: true,
        message: typeof err === 'string' ? err : `Failed to ${isEditMode ? 'update' : 'create'} organization`,
        severity: 'error'
      });
    }
  };

  const handleFormChange = (field: keyof OrganizationFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'error';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Company': return <BusinessIcon />;
      case 'Division': return <AccountTreeIcon />;
      case 'Department': return <WorkIcon />;
      case 'Team': return <GroupIcon />;
      case 'Cost Center': return <WorkIcon />;
      default: return <BusinessIcon />;
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Organization Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Define and manage organizational structure, hierarchies, and relationships
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateOrg}
        >
          Add Organization
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Organization Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BusinessIcon color="primary" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {organizations.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Organizations
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
                <PersonIcon color="success" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {organizations.reduce((sum, org) => sum + org.employeeCount, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Employees
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
                <CheckCircleIcon color="success" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {organizations.filter(org => org.isActive).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Organizations
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
                <AccountTreeIcon color="info" />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {organizations.filter(org => org.type === 'Company').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Companies
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Organizations Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Organization</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>Manager</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Employees</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organizations.map((org) => (
                  <TableRow key={org.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {getTypeIcon(org.type)}
                        <Box>
                          <Typography variant="subtitle2">
                            {org.name}
                          </Typography>
                          {org.description && (
                            <Typography variant="caption" color="text.secondary">
                              {org.description}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {org.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={org.type}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {org.parent ? (
                        <Box>
                          <Typography variant="body2">
                            {org.parent.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {org.parent.code}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No Parent
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {org.manager ? (
                        <Box>
                          <Typography variant="body2">
                            {org.manager.firstName} {org.manager.lastName}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No Manager
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {org.location ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {org.location.name}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No Location
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2" fontWeight="bold">
                          {org.employeeCount}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={org.isActive ? 'Active' : 'Inactive'}
                        color={getStatusColor(org.isActive) as any}
                        size="small"
                        icon={org.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View details" arrow>
                          <IconButton size="small" onClick={() => setViewOrg(org)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit organization" arrow>
                          <IconButton 
                            size="small"
                            onClick={() => handleEdit(org)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete organization" arrow>
                          <IconButton 
                            size="small"
                            onClick={() => handleDelete(org.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* View Organization Modal */}
      <Dialog open={!!viewOrg} onClose={() => setViewOrg(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Organization Details</DialogTitle>
        <DialogContent dividers>
          {viewOrg && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewOrg.name}</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Code:</b> {viewOrg.code}</Grid>
                <Grid item xs={6}><b>Type:</b> {viewOrg.type}</Grid>
                <Grid item xs={12}><b>Description:</b> {viewOrg.description || '—'}</Grid>
                <Grid item xs={6}><b>Status:</b> {viewOrg.isActive ? 'Active' : 'Inactive'}</Grid>
                <Grid item xs={6}><b>Employee Count:</b> {viewOrg.employeeCount}</Grid>
                <Grid item xs={6}><b>Parent:</b> {viewOrg.parent ? `${viewOrg.parent.name} (${viewOrg.parent.code})` : '—'}</Grid>
                <Grid item xs={6}><b>Manager:</b> {viewOrg.manager ? `${viewOrg.manager.firstName} ${viewOrg.manager.lastName}` : '—'}</Grid>
                <Grid item xs={6}><b>Location:</b> {viewOrg.location ? viewOrg.location.name : '—'}</Grid>
                <Grid item xs={6}><b>Cost Center:</b> {viewOrg.costCenter || '—'}</Grid>
                <Grid item xs={6}><b>Budget:</b> {viewOrg.budget ? `$${viewOrg.budget}` : '—'}</Grid>
                <Grid item xs={6}><b>Effective Date:</b> {viewOrg.effectiveDate ? new Date(viewOrg.effectiveDate).toLocaleDateString() : '—'}</Grid>
                <Grid item xs={6}><b>Expiration Date:</b> {viewOrg.expirationDate ? new Date(viewOrg.expirationDate).toLocaleDateString() : '—'}</Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOrg(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Create Organization Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Organization</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organization Code"
                value={formData.code}
                onChange={(e) => handleFormChange('code', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organization Name"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Organization Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => handleFormChange('type', e.target.value)}
                  label="Organization Type"
                  required
                >
                  {orgTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Parent Organization</InputLabel>
                <Select
                  value={formData.parentId}
                  onChange={(e) => handleFormChange('parentId', e.target.value)}
                  label="Parent Organization"
                >
                  <MenuItem value="">No Parent</MenuItem>
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
                <InputLabel>Manager</InputLabel>
                <Select
                  value={formData.managerId}
                  onChange={(e) => handleFormChange('managerId', e.target.value)}
                  label="Manager"
                >
                  <MenuItem value="">No Manager</MenuItem>
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName} ({employee.workerId})
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
                  <MenuItem value="">No Location</MenuItem>
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Effective Date"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => handleFormChange('effectiveDate', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expiration Date"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleFormChange('expirationDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Budget"
                type="number"
                value={formData.budget}
                onChange={(e) => handleFormChange('budget', e.target.value)}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cost Center"
                value={formData.costCenter}
                onChange={(e) => handleFormChange('costCenter', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.code || !formData.name || !formData.effectiveDate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Organization Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Organization</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organization Code"
                value={formData.code}
                onChange={(e) => handleFormChange('code', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organization Name"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Organization Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => handleFormChange('type', e.target.value)}
                  label="Organization Type"
                  required
                >
                  {orgTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Parent Organization</InputLabel>
                <Select
                  value={formData.parentId}
                  onChange={(e) => handleFormChange('parentId', e.target.value)}
                  label="Parent Organization"
                >
                  <MenuItem value="">No Parent</MenuItem>
                  {organizations.filter(org => org.id !== selectedOrg?.id).map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name} ({org.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Manager</InputLabel>
                <Select
                  value={formData.managerId}
                  onChange={(e) => handleFormChange('managerId', e.target.value)}
                  label="Manager"
                >
                  <MenuItem value="">No Manager</MenuItem>
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName} ({employee.workerId})
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
                  <MenuItem value="">No Location</MenuItem>
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Effective Date"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => handleFormChange('effectiveDate', e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expiration Date"
                type="date"
                value={formData.expirationDate}
                onChange={(e) => handleFormChange('expirationDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Budget"
                type="number"
                value={formData.budget}
                onChange={(e) => handleFormChange('budget', e.target.value)}
                InputProps={{
                  startAdornment: <Typography>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cost Center"
                value={formData.costCenter}
                onChange={(e) => handleFormChange('costCenter', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={!formData.code || !formData.name || !formData.effectiveDate}
          >
            Update
          </Button>
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

export default OrganizationManagement; 