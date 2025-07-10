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
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

import { API_BASE_URL } from '../../config/api';

interface Position {
  id: string;
  positionId: string;
  title: string;
  jobProfile: {
    id: string;
    name: string;
    jobFamily: {
      name: string;
    };
  };
  organization: {
    id: string;
    name: string;
    code: string;
  };
  supervisoryOrg: string;
  isManager: boolean;
  headcount: number;
  isActive: boolean;
  employmentType: string;
  positionType: string;
  businessTitle: string;
  timeType: string;
  standardHours: number;
  compensationGrade: {
    id: string;
    name: string;
  };
}

interface PositionFormData {
  positionId: string;
  title: string;
  jobProfileId: string;
  organizationId: string;
  supervisoryOrg: string;
  isManager: boolean;
  headcount: number;
  isActive: boolean;
  employmentType: string;
  positionType: string;
  businessTitle: string;
  timeType: string;
  standardHours: number;
  compensationGradeId: string;
}

const JobsPositions: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [jobProfiles, setJobProfiles] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [compensationGrades, setCompensationGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [viewPosition, setViewPosition] = useState<Position | null>(null);

  const [formData, setFormData] = useState<PositionFormData>({
    positionId: '',
    title: '',
    jobProfileId: '',
    organizationId: '',
    supervisoryOrg: '',
    isManager: false,
    headcount: 1,
    isActive: true,
    employmentType: 'Full-time',
    positionType: 'Individual Contributor',
    businessTitle: '',
    timeType: 'Salaried',
    standardHours: 40,
    compensationGradeId: ''
  });

  // Fetch positions from API
  const fetchPositions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/positions`);
      if (!response.ok) {
        throw 'Failed to fetch positions';
      }
      const data = await response.json();
      setPositions(data);
      setError(null);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch job profiles
  const fetchJobProfiles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/job-profiles`);
      if (response.ok) {
        const data = await response.json();
        setJobProfiles(data);
      }
    } catch (err) {
      console.error('Failed to fetch job profiles:', err);
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
    fetchPositions();
    fetchJobProfiles();
    fetchOrganizations();
    fetchCompensationGrades();
  }, []);

  const handleAddPosition = () => {
    setIsEditMode(false);
    setFormData({
      positionId: '',
      title: '',
      jobProfileId: '',
      organizationId: '',
      supervisoryOrg: '',
      isManager: false,
      headcount: 1,
      isActive: true,
      employmentType: 'Full-time',
      positionType: 'Individual Contributor',
      businessTitle: '',
      timeType: 'Salaried',
      standardHours: 40,
      compensationGradeId: ''
    });
    setOpenDialog(true);
  };

  const handleEdit = (position: Position) => {
    setIsEditMode(true);
    setSelectedPosition(position);
    setFormData({
      positionId: position.positionId,
      title: position.title,
      jobProfileId: position.jobProfile.id,
      organizationId: position.organization.id,
      supervisoryOrg: position.supervisoryOrg,
      isManager: position.isManager,
      headcount: position.headcount,
      isActive: position.isActive,
      employmentType: position.employmentType,
      positionType: position.positionType,
      businessTitle: position.businessTitle,
      timeType: position.timeType,
      standardHours: position.standardHours,
      compensationGradeId: position.compensationGrade.id
    });
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/positions/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw 'Failed to delete position';
      }
      setSnackbar({
        open: true,
        message: 'Position deleted successfully',
        severity: 'success'
      });
      fetchPositions();
    } catch (err) {
      setSnackbar({
        open: true,
        message: typeof err === 'string' ? err : 'Failed to delete position',
        severity: 'error'
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const url = isEditMode 
        ? `${API_BASE_URL}/positions/${selectedPosition?.id}`
        : `${API_BASE_URL}/positions`;
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw `Failed to ${isEditMode ? 'update' : 'create'} position`;
      }

      setSnackbar({
        open: true,
        message: `Position ${isEditMode ? 'updated' : 'created'} successfully`,
        severity: 'success'
      });
      
      setOpenDialog(false);
      fetchPositions();
    } catch (err) {
      setSnackbar({
        open: true,
        message: typeof err === 'string' ? err : `Failed to ${isEditMode ? 'update' : 'create'} position`,
        severity: 'error'
      });
    }
  };

  const handleFormChange = (field: keyof PositionFormData, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'error';
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
          Positions & Job Profiles
        </Typography>
        <Tooltip title="Add new position" arrow>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddPosition}
            aria-label="Add new position"
          >
            Add Position
          </Button>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Position ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Job Profile</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {positions.map((position) => (
                  <TableRow key={position.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {position.positionId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <WorkIcon color="action" />
                        <Box>
                          <Typography variant="subtitle2">
                            {position.title}
                          </Typography>
                          {position.businessTitle && (
                            <Typography variant="caption" color="text.secondary">
                              {position.businessTitle}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {position.jobProfile.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {position.jobProfile.jobFamily?.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BusinessIcon fontSize="small" color="action" />
                        <Box>
                          <Typography variant="body2">
                            {position.organization.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {position.organization.code}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Chip
                          label={position.positionType}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        {position.isManager && (
                          <Chip
                            label="Manager"
                            size="small"
                            color="secondary"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={position.isActive ? 'Active' : 'Inactive'}
                        color={getStatusColor(position.isActive) as any}
                        size="small"
                        icon={position.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="View details" arrow>
                          <IconButton size="small" onClick={() => setViewPosition(position)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit position" arrow>
                          <IconButton 
                            size="small"
                            onClick={() => handleEdit(position)}
                            aria-label={`Edit ${position.title}`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete position" arrow>
                          <IconButton 
                            size="small"
                            onClick={() => handleDelete(position.id)}
                            aria-label={`Delete ${position.title}`}
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

      {/* Position Form Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditMode ? 'Edit Position' : 'Add New Position'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Position ID"
                value={formData.positionId}
                onChange={(e) => handleFormChange('positionId', e.target.value)}
                required
                aria-label="Position ID"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Position Title"
                value={formData.title}
                onChange={(e) => handleFormChange('title', e.target.value)}
                required
                aria-label="Position title"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Job Profile</InputLabel>
                <Select
                  value={formData.jobProfileId}
                  onChange={(e) => handleFormChange('jobProfileId', e.target.value)}
                  label="Job Profile"
                  required
                >
                  {jobProfiles.map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.name} - {profile.jobFamily?.name}
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
                  required
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
              <TextField
                fullWidth
                label="Supervisory Organization"
                value={formData.supervisoryOrg}
                onChange={(e) => handleFormChange('supervisoryOrg', e.target.value)}
                aria-label="Supervisory organization"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Compensation Grade</InputLabel>
                <Select
                  value={formData.compensationGradeId}
                  onChange={(e) => handleFormChange('compensationGradeId', e.target.value)}
                  label="Compensation Grade"
                  required
                >
                  {compensationGrades.map((grade) => (
                    <MenuItem key={grade.id} value={grade.id}>
                      {grade.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Temporary">Temporary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Position Type</InputLabel>
                <Select
                  value={formData.positionType}
                  onChange={(e) => handleFormChange('positionType', e.target.value)}
                  label="Position Type"
                  required
                >
                  <MenuItem value="Individual Contributor">Individual Contributor</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Director">Director</MenuItem>
                  <MenuItem value="Executive">Executive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Business Title"
                value={formData.businessTitle}
                onChange={(e) => handleFormChange('businessTitle', e.target.value)}
                aria-label="Business title"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Standard Hours"
                type="number"
                value={formData.standardHours}
                onChange={(e) => handleFormChange('standardHours', parseFloat(e.target.value))}
                aria-label="Standard hours"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isManager}
                    onChange={(e) => handleFormChange('isManager', e.target.checked)}
                  />
                }
                label="Is Manager"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleFormChange('isActive', e.target.checked)}
                  />
                }
                label="Position Active"
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
            disabled={!formData.positionId || !formData.title || !formData.jobProfileId || !formData.organizationId}
          >
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Position Modal */}
      <Dialog open={!!viewPosition} onClose={() => setViewPosition(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Position Details</DialogTitle>
        <DialogContent dividers>
          {viewPosition && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewPosition.title}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Position ID:</b> {viewPosition.positionId}</Grid>
                <Grid item xs={6}><b>Business Title:</b> {viewPosition.businessTitle || '—'}</Grid>
                <Grid item xs={6}><b>Job Profile:</b> {viewPosition.jobProfile?.name || '—'}</Grid>
                <Grid item xs={6}><b>Job Family:</b> {viewPosition.jobProfile?.jobFamily?.name || '—'}</Grid>
                <Grid item xs={6}><b>Organization:</b> {viewPosition.organization ? `${viewPosition.organization.name} (${viewPosition.organization.code})` : '—'}</Grid>
                <Grid item xs={6}><b>Supervisory Org:</b> {viewPosition.supervisoryOrg || '—'}</Grid>
                <Grid item xs={6}><b>Manager:</b> {viewPosition.isManager ? 'Yes' : 'No'}</Grid>
                <Grid item xs={6}><b>Headcount:</b> {viewPosition.headcount}</Grid>
                <Grid item xs={6}><b>Status:</b> {viewPosition.isActive ? 'Active' : 'Inactive'}</Grid>
                <Grid item xs={6}><b>Employment Type:</b> {viewPosition.employmentType}</Grid>
                <Grid item xs={6}><b>Position Type:</b> {viewPosition.positionType}</Grid>
                <Grid item xs={6}><b>Time Type:</b> {viewPosition.timeType}</Grid>
                <Grid item xs={6}><b>Standard Hours:</b> {viewPosition.standardHours}</Grid>
                <Grid item xs={6}><b>Compensation Grade:</b> {viewPosition.compensationGrade?.name || '—'}</Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewPosition(null)}>Close</Button>
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

export default JobsPositions; 