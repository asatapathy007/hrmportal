import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Security as SecurityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ExpandMore as ExpandMoreIcon,
  Group as GroupIcon,
  LocationOn as LocationIcon,
  SupervisorAccount as SupervisorIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  BusinessCenter as BusinessCenterIcon
} from '@mui/icons-material';

interface StaffingModel {
  id: string;
  name: string;
  type: 'Position Management' | 'Job Management' | 'Headcount Management';
  organization: string;
  description: string;
  status: 'Active' | 'Inactive';
  positions: number;
  filledPositions: number;
  headcountLimit?: number;
  hiringRestrictions: string[];
  jobFamilies: string[];
  locations: string[];
}

interface Position {
  id: string;
  title: string;
  jobProfile: string;
  organization: string;
  status: 'Open' | 'Filled' | 'Closed';
  worker?: string;
  openDate: string;
  location: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

const StaffingModels: React.FC = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openPositionDialog, setOpenPositionDialog] = useState(false);
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [openViewPositionsDialog, setOpenViewPositionsDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<StaffingModel | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewModel, setViewModel] = useState<StaffingModel | null>(null);
  const [editModel, setEditModel] = useState<StaffingModel | null>(null);

  // Mock data
  const [staffingModels, setStaffingModels] = useState<StaffingModel[]>([
    {
      id: '1',
      name: 'Engineering Staffing Model',
      type: 'Position Management',
      organization: 'Engineering Department',
      description: 'Position-based hiring for engineering roles',
      status: 'Active',
      positions: 15,
      filledPositions: 12,
      hiringRestrictions: ['Full-time only', 'US locations', 'Engineering job family'],
      jobFamilies: ['Software Engineering', 'Data Science', 'DevOps'],
      locations: ['San Francisco, CA', 'New York, NY', 'Remote']
    },
    {
      id: '2',
      name: 'Sales Staffing Model',
      type: 'Job Management',
      organization: 'Sales Department',
      description: 'Job-based hiring for sales roles',
      status: 'Active',
      positions: 25,
      filledPositions: 20,
      hiringRestrictions: ['Commission-based', 'All locations', 'Sales job family'],
      jobFamilies: ['Enterprise Sales', 'SMB Sales', 'Sales Development'],
      locations: ['All US Locations', 'Remote']
    },
    {
      id: '3',
      name: 'Marketing Staffing Model',
      type: 'Headcount Management',
      organization: 'Marketing Department',
      description: 'Headcount-based hiring for marketing roles',
      status: 'Active',
      positions: 10,
      filledPositions: 8,
      headcountLimit: 10,
      hiringRestrictions: ['Contract workers allowed', 'HQ locations', 'Marketing job family'],
      jobFamilies: ['Digital Marketing', 'Content Marketing', 'Brand Marketing'],
      locations: ['New York, NY', 'Los Angeles, CA']
    }
  ]);

  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      title: 'Senior Software Engineer',
      jobProfile: 'Software Engineer',
      organization: 'Engineering Department',
      status: 'Open',
      openDate: '2024-01-15',
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      title: 'Frontend Developer',
      jobProfile: 'Software Engineer',
      organization: 'Engineering Department',
      status: 'Filled',
      worker: 'John Smith',
      openDate: '2024-01-10',
      location: 'San Francisco, CA'
    },
    {
      id: '3',
      title: 'Sales Representative',
      jobProfile: 'Sales Representative',
      organization: 'Sales Department',
      status: 'Open',
      openDate: '2024-01-20',
      location: 'Chicago, IL'
    }
  ]);

  const modelTypes = ['Position Management', 'Job Management', 'Headcount Management'];
  const jobFamilies = ['Software Engineering', 'Data Science', 'DevOps', 'Enterprise Sales', 'SMB Sales', 'Digital Marketing', 'Content Marketing'];
  const locations = ['San Francisco, CA', 'New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'Remote'];

  // Add form state for creating a model
  const [createModelForm, setCreateModelForm] = useState({
    name: '',
    type: modelTypes[0],
    organization: '',
    description: '',
    hiringRestrictions: [] as string[],
    jobFamilies: [] as string[],
    locations: [] as string[],
  });

  // Add form state for creating a position
  const [createPositionForm, setCreatePositionForm] = useState({
    title: '',
    jobProfile: '',
    organization: '',
    location: '',
    openDate: '',
    status: 'Open' as 'Open' | 'Filled' | 'Closed'
  });

  // Add local state for editing in Configure dialog
  const [editConfig, setEditConfig] = useState<null | {
    id: string;
    type: StaffingModel['type'];
    hiringRestrictions: string[];
    jobFamilies: string[];
    locations: string[];
  }>(null);

  // Edit dialog state
  const [editDialog, setEditDialog] = useState<null | {
    id: string;
    name: string;
    type: StaffingModel['type'];
    organization: string;
    description: string;
    hiringRestrictions: string[];
    jobFamilies: string[];
    locations: string[];
  }>(null);
  // Delete dialog state
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null);

  const handleCreateModel = () => {
    setOpenCreateDialog(true);
  };

  const handleCreatePosition = () => {
    setOpenPositionDialog(true);
  };

  const handleViewPositions = () => {
    setOpenViewPositionsDialog(true);
  };

  const handleCreatePositionSubmit = () => {
    if (!createPositionForm.title || !createPositionForm.organization) return;
    
    const newPosition: Position = {
      id: (positions.length + 1).toString(),
      title: createPositionForm.title,
      jobProfile: createPositionForm.jobProfile,
      organization: createPositionForm.organization,
      status: createPositionForm.status,
      openDate: createPositionForm.openDate || new Date().toISOString().split('T')[0],
      location: createPositionForm.location
    };
    
    setPositions(prev => [...prev, newPosition]);
    setOpenPositionDialog(false);
    setCreatePositionForm({
      title: '',
      jobProfile: '',
      organization: '',
      location: '',
      openDate: '',
      status: 'Open'
    });
  };

  // When opening config dialog, initialize editConfig
  const handleConfigureModel = (model: StaffingModel) => {
    setSelectedModel(model);
    setEditConfig({
      id: model.id,
      type: model.type,
      hiringRestrictions: [...model.hiringRestrictions],
      jobFamilies: [...model.jobFamilies],
      locations: [...model.locations],
    });
    setOpenConfigDialog(true);
  };

  // Open edit dialog
  const handleEditModel = (model: StaffingModel) => {
    setEditDialog({
      id: model.id,
      name: model.name,
      type: model.type,
      organization: model.organization,
      description: model.description,
      hiringRestrictions: [...model.hiringRestrictions],
      jobFamilies: [...model.jobFamilies],
      locations: [...model.locations],
    });
  };
  // Save edit
  const handleEditModelSave = () => {
    if (!editDialog) return;
    setStaffingModels((prev) =>
      prev.map((model) =>
        model.id === editDialog.id
          ? {
              ...model,
              name: editDialog.name,
              type: editDialog.type,
              organization: editDialog.organization,
              description: editDialog.description,
              hiringRestrictions: editDialog.hiringRestrictions,
              jobFamilies: editDialog.jobFamilies,
              locations: editDialog.locations,
            }
          : model
      )
    );
    setEditDialog(null);
  };
  // Delete model
  const handleDeleteModel = (id: string) => {
    setDeleteDialogId(id);
  };
  const handleDeleteModelConfirm = () => {
    if (!deleteDialogId) return;
    setStaffingModels((prev) => prev.filter((model) => model.id !== deleteDialogId));
    setDeleteDialogId(null);
  };

  // Save changes from config dialog
  const handleSaveConfiguration = () => {
    if (!selectedModel || !editConfig) return;
    setStaffingModels((prev) =>
      prev.map((model) =>
        model.id === selectedModel.id
          ? {
              ...model,
              type: editConfig.type,
              hiringRestrictions: editConfig.hiringRestrictions,
              jobFamilies: editConfig.jobFamilies,
              locations: editConfig.locations,
            }
          : model
      )
    );
    setOpenConfigDialog(false);
    setSelectedModel(null);
    setEditConfig(null);
  };

  const handleUpdateModelType = (modelId: string, newType: 'Position Management' | 'Job Management' | 'Headcount Management') => {
    setStaffingModels(prev => 
      prev.map(model => 
        model.id === modelId 
          ? { ...model, type: newType }
          : model
      )
    );
  };

  const handleUpdateHiringRestrictions = (modelId: string, restrictions: string[]) => {
    setStaffingModels(prev => 
      prev.map(model => 
        model.id === modelId 
          ? { ...model, hiringRestrictions: restrictions }
          : model
      )
    );
  };

  const getModelTypeIcon = (type: string) => {
    switch (type) {
      case 'Position Management': return <AssignmentIcon />;
      case 'Job Management': return <WorkIcon />;
      case 'Headcount Management': return <PeopleIcon />;
      default: return <WorkIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' : 'error';
  };

  const getPositionStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'warning';
      case 'Filled': return 'success';
      case 'Closed': return 'error';
      default: return 'default';
    }
  };

  const getModelTypeDescription = (type: string) => {
    switch (type) {
      case 'Position Management': return 'Hire into unique, predefined positions';
      case 'Job Management': return 'Hire into job profiles without predefined positions';
      case 'Headcount Management': return 'Hire against a headcount limit';
      default: return '';
    }
  };

  // Helper for toggling chips
  const toggleChip = (field: 'hiringRestrictions' | 'jobFamilies' | 'locations', value: string) => {
    setCreateModelForm((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  // Toggle chips in config dialog
  const toggleEditChip = (field: 'hiringRestrictions' | 'jobFamilies' | 'locations', value: string) => {
    if (!editConfig) return;
    setEditConfig((prev) => {
      if (!prev) return prev;
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  // Toggle chips in edit dialog
  const toggleEditDialogChip = (field: 'hiringRestrictions' | 'jobFamilies' | 'locations', value: string) => {
    if (!editDialog) return;
    setEditDialog((prev) => {
      if (!prev) return prev;
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  // Add model handler
  const handleCreateModelSubmit = () => {
    if (!createModelForm.name || !createModelForm.organization) return;
    setStaffingModels((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        name: createModelForm.name,
        type: createModelForm.type as any,
        organization: createModelForm.organization,
        description: createModelForm.description,
        status: 'Active',
        positions: 0,
        filledPositions: 0,
        hiringRestrictions: createModelForm.hiringRestrictions,
        jobFamilies: createModelForm.jobFamilies,
        locations: createModelForm.locations,
      },
    ]);
    setOpenCreateDialog(false);
    setCreateModelForm({
      name: '',
      type: modelTypes[0],
      organization: '',
      description: '',
      hiringRestrictions: [],
      jobFamilies: [],
      locations: [],
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Staffing Models
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure position management, headcount planning, and job management strategies
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateModel}
          sx={{ borderRadius: 2 }}
        >
          Create Staffing Model
        </Button>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreateModel}>
            <AddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Create Model</Typography>
            <Typography variant="body2" color="text.secondary">
              New staffing configuration
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreatePosition}>
            <AssignmentIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Create Position</Typography>
            <Typography variant="body2" color="text.secondary">
              Add new positions
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => {
            if (staffingModels.length > 0) {
              handleConfigureModel(staffingModels[0]);
            }
          }}>
            <SettingsIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Configure</Typography>
            <Typography variant="body2" color="text.secondary">
              Model settings
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleViewPositions}>
            <VisibilityIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">View Positions</Typography>
            <Typography variant="body2" color="text.secondary">
              Open positions
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Staffing Models Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Staffing Models
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Model Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Positions</TableCell>
                  <TableCell>Filled</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffingModels.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getModelTypeIcon(model.type)}
                        <Typography variant="body1" fontWeight="medium">
                          {model.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={model.type} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        icon={getModelTypeIcon(model.type)}
                      />
                    </TableCell>
                    <TableCell>{model.organization}</TableCell>
                    <TableCell>
                      <Badge badgeContent={model.positions} color="primary">
                        <AssignmentIcon />
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">
                          {model.filledPositions}/{model.positions}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({Math.round((model.filledPositions / model.positions) * 100)}%)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={model.status}
                        size="small"
                        color={getStatusColor(model.status)}
                        icon={model.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Configure">
                          <IconButton size="small" color="primary" onClick={() => handleConfigureModel(model)}>
                            <SettingsIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="View details">
                          <IconButton size="small" color="secondary" onClick={() => setViewModel(model)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" color="info" onClick={() => handleEditModel(model)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="warning" onClick={() => handleDeleteModel(model.id)}>
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

      {/* Model Types and Positions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Staffing Model Types
              </Typography>
              <List>
                {modelTypes.map((type) => (
                  <ListItem key={type}>
                    <ListItemIcon>{getModelTypeIcon(type)}</ListItemIcon>
                    <ListItemText
                      primary={type}
                      secondary={getModelTypeDescription(type)}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Open Positions
              </Typography>
              <List>
                {positions.filter(p => p.status === 'Open').map((position) => (
                  <ListItem key={position.id}>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={position.title}
                      secondary={`${position.organization} • ${position.location}`}
                    />
                    <Chip label={position.status} size="small" color="warning" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Create Staffing Model Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Staffing Model</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Model Name"
                placeholder="e.g., Engineering Staffing Model"
                value={createModelForm.name}
                onChange={e => setCreateModelForm(f => ({ ...f, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Model Type</InputLabel>
                <Select
                  label="Model Type"
                  value={createModelForm.type}
                  onChange={e => setCreateModelForm(f => ({ ...f, type: e.target.value }))}
                >
                  {modelTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Organization"
                placeholder="e.g., Engineering Department"
                value={createModelForm.organization}
                onChange={e => setCreateModelForm(f => ({ ...f, organization: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Brief description of the model"
                value={createModelForm.description}
                onChange={e => setCreateModelForm(f => ({ ...f, description: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Hiring Restrictions
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {['Full-time only', 'US locations', 'Specific job family', 'Contract workers allowed'].map((restriction) => (
                  <Chip
                    key={restriction}
                    label={restriction}
                    variant={createModelForm.hiringRestrictions.includes(restriction) ? 'filled' : 'outlined'}
                    color={createModelForm.hiringRestrictions.includes(restriction) ? 'primary' : 'default'}
                    clickable
                    onClick={() => toggleChip('hiringRestrictions', restriction)}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Job Families
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {jobFamilies.slice(0, 4).map((family) => (
                  <Chip
                    key={family}
                    label={family}
                    variant={createModelForm.jobFamilies.includes(family) ? 'filled' : 'outlined'}
                    color={createModelForm.jobFamilies.includes(family) ? 'primary' : 'default'}
                    clickable
                    onClick={() => toggleChip('jobFamilies', family)}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Locations
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {locations.slice(0, 3).map((location) => (
                  <Chip
                    key={location}
                    label={location}
                    variant={createModelForm.locations.includes(location) ? 'filled' : 'outlined'}
                    color={createModelForm.locations.includes(location) ? 'primary' : 'default'}
                    clickable
                    onClick={() => toggleChip('locations', location)}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateModelSubmit} disabled={!createModelForm.name || !createModelForm.organization}>
            Create Model
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Position Dialog */}
      <Dialog open={openPositionDialog} onClose={() => setOpenPositionDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Position</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Position Title"
                placeholder="e.g., Senior Software Engineer"
                value={createPositionForm.title}
                onChange={e => setCreatePositionForm(f => ({ ...f, title: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Profile"
                placeholder="e.g., Software Engineer"
                value={createPositionForm.jobProfile}
                onChange={e => setCreatePositionForm(f => ({ ...f, jobProfile: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Organization</InputLabel>
                <Select 
                  label="Organization"
                  value={createPositionForm.organization}
                  onChange={e => setCreatePositionForm(f => ({ ...f, organization: e.target.value }))}
                >
                  <MenuItem value="Engineering Department">Engineering Department</MenuItem>
                  <MenuItem value="Sales Department">Sales Department</MenuItem>
                  <MenuItem value="Marketing Department">Marketing Department</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                placeholder="e.g., San Francisco, CA"
                value={createPositionForm.location}
                onChange={e => setCreatePositionForm(f => ({ ...f, location: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Open Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={createPositionForm.openDate}
                onChange={e => setCreatePositionForm(f => ({ ...f, openDate: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select 
                  label="Status" 
                  value={createPositionForm.status}
                  onChange={e => setCreatePositionForm(f => ({ ...f, status: e.target.value as 'Open' | 'Filled' | 'Closed' }))}
                >
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Filled">Filled</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPositionDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleCreatePositionSubmit}
            disabled={!createPositionForm.title || !createPositionForm.organization}
          >
            Create Position
          </Button>
        </DialogActions>
      </Dialog>

      {/* Configure Model Dialog */}
      <Dialog open={openConfigDialog} onClose={() => { setOpenConfigDialog(false); setEditConfig(null); }} maxWidth="lg" fullWidth>
        <DialogTitle>
          Configure Staffing Model - {selectedModel?.name}
        </DialogTitle>
        <DialogContent>
          {selectedModel && editConfig && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Model Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Type:</strong> {editConfig.type}
                      </Typography>
                      <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                        <InputLabel>Change Model Type</InputLabel>
                        <Select
                          label="Change Model Type"
                          value={editConfig.type}
                          onChange={(e) => setEditConfig((prev) => prev && { ...prev, type: e.target.value as any })}
                        >
                          {modelTypes.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Typography variant="body2" gutterBottom>
                      <strong>Organization:</strong> {selectedModel.organization}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Positions:</strong> {selectedModel.filledPositions}/{selectedModel.positions}
                    </Typography>
                    {selectedModel.headcountLimit && (
                      <Typography variant="body2" gutterBottom>
                        <strong>Headcount Limit:</strong> {selectedModel.headcountLimit}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Hiring Restrictions
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Configure hiring restrictions for this model
                    </Typography>
                    <Stack spacing={1} direction="row" flexWrap="wrap">
                      {['Full-time only', 'US locations', 'Contract workers allowed', 'Specific job family'].map((restriction) => (
                        <Chip
                          key={restriction}
                          label={restriction}
                          size="small"
                          variant={editConfig.hiringRestrictions.includes(restriction) ? 'filled' : 'outlined'}
                          color={editConfig.hiringRestrictions.includes(restriction) ? 'primary' : 'default'}
                          clickable
                          onClick={() => toggleEditChip('hiringRestrictions', restriction)}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Job Families & Locations
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                          Job Families:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {jobFamilies.slice(0, 4).map((family) => (
                            <Chip
                              key={family}
                              label={family}
                              size="small"
                              variant={editConfig.jobFamilies.includes(family) ? 'filled' : 'outlined'}
                              color={editConfig.jobFamilies.includes(family) ? 'primary' : 'default'}
                              clickable
                              onClick={() => toggleEditChip('jobFamilies', family)}
                            />
                          ))}
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                          Locations:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {locations.slice(0, 3).map((location) => (
                            <Chip
                              key={location}
                              label={location}
                              size="small"
                              variant={editConfig.locations.includes(location) ? 'filled' : 'outlined'}
                              color={editConfig.locations.includes(location) ? 'primary' : 'default'}
                              clickable
                              onClick={() => toggleEditChip('locations', location)}
                            />
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              {editConfig.type === 'Position Management' && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    <Typography variant="body2">
                      <strong>Position Management:</strong> Workers must be hired into specific, predefined positions. 
                      Each position can only be filled by one worker.
                    </Typography>
                  </Alert>
                </Grid>
              )}
              {editConfig.type === 'Job Management' && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    <Typography variant="body2">
                      <strong>Job Management:</strong> Workers are hired into job profiles without predefined positions. 
                      Multiple workers can be assigned to the same job.
                    </Typography>
                  </Alert>
                </Grid>
              )}
              {editConfig.type === 'Headcount Management' && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    <Typography variant="body2">
                      <strong>Headcount Management:</strong> Workers are hired against a headcount limit instead of 
                      individual positions. Flexible hiring within the limit.
                    </Typography>
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenConfigDialog(false); setEditConfig(null); }}>Close</Button>
          <Button variant="contained" onClick={handleSaveConfiguration}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* View Staffing Model Modal */}
      <Dialog open={!!viewModel} onClose={() => setViewModel(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Staffing Model Details</DialogTitle>
        <DialogContent dividers>
          {viewModel && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewModel.name}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Type:</b> {viewModel.type}</Grid>
                <Grid item xs={6}><b>Status:</b> {viewModel.status}</Grid>
                <Grid item xs={6}><b>Organization:</b> {viewModel.organization}</Grid>
                <Grid item xs={6}><b>Positions:</b> {viewModel.filledPositions}/{viewModel.positions}</Grid>
                {viewModel.headcountLimit && (
                  <Grid item xs={6}><b>Headcount Limit:</b> {viewModel.headcountLimit}</Grid>
                )}
                <Grid item xs={12}><b>Description:</b> {viewModel.description}</Grid>
                <Grid item xs={12}>
                  <b>Hiring Restrictions:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewModel.hiringRestrictions.map((restriction, index) => (
                      <Chip key={index} label={restriction} size="small" color="warning" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <b>Job Families:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewModel.jobFamilies.map((family, index) => (
                      <Chip key={index} label={family} size="small" color="primary" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <b>Locations:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewModel.locations.map((location, index) => (
                      <Chip key={index} label={location} size="small" color="secondary" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewModel(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Staffing Model Dialog */}
      <Dialog open={!!editDialog} onClose={() => setEditDialog(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Staffing Model</DialogTitle>
        <DialogContent>
          {editDialog && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Model Name"
                  value={editDialog.name}
                  onChange={e => setEditDialog(f => f && { ...f, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Model Type</InputLabel>
                  <Select
                    label="Model Type"
                    value={editDialog.type}
                    onChange={e => setEditDialog(f => f && { ...f, type: e.target.value as any })}
                  >
                    {modelTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Organization"
                  value={editDialog.organization}
                  onChange={e => setEditDialog(f => f && { ...f, organization: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description"
                  value={editDialog.description}
                  onChange={e => setEditDialog(f => f && { ...f, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Hiring Restrictions
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {['Full-time only', 'US locations', 'Specific job family', 'Contract workers allowed'].map((restriction) => (
                    <Chip
                      key={restriction}
                      label={restriction}
                      variant={editDialog.hiringRestrictions.includes(restriction) ? 'filled' : 'outlined'}
                      color={editDialog.hiringRestrictions.includes(restriction) ? 'primary' : 'default'}
                      clickable
                      onClick={() => toggleEditDialogChip('hiringRestrictions', restriction)}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Job Families
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {jobFamilies.slice(0, 4).map((family) => (
                    <Chip
                      key={family}
                      label={family}
                      variant={editDialog.jobFamilies.includes(family) ? 'filled' : 'outlined'}
                      color={editDialog.jobFamilies.includes(family) ? 'primary' : 'default'}
                      clickable
                      onClick={() => toggleEditDialogChip('jobFamilies', family)}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Locations
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {locations.slice(0, 3).map((location) => (
                    <Chip
                      key={location}
                      label={location}
                      variant={editDialog.locations.includes(location) ? 'filled' : 'outlined'}
                      color={editDialog.locations.includes(location) ? 'primary' : 'default'}
                      clickable
                      onClick={() => toggleEditDialogChip('locations', location)}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditModelSave} disabled={!editDialog || !editDialog.name || !editDialog.organization}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialogId} onClose={() => setDeleteDialogId(null)}>
        <DialogTitle>Delete Staffing Model</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this staffing model?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteModelConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Positions Dialog */}
      <Dialog open={openViewPositionsDialog} onClose={() => setOpenViewPositionsDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>All Positions</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Position Title</TableCell>
                  <TableCell>Job Profile</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Open Date</TableCell>
                  <TableCell>Worker</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {positions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {position.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{position.jobProfile}</TableCell>
                    <TableCell>{position.organization}</TableCell>
                    <TableCell>{position.location}</TableCell>
                    <TableCell>
                      <Chip
                        label={position.status}
                        size="small"
                        color={getPositionStatusColor(position.status)}
                      />
                    </TableCell>
                    <TableCell>{position.openDate}</TableCell>
                    <TableCell>
                      {position.worker ? (
                        <Typography variant="body2" color="primary">
                          {position.worker}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          -
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewPositionsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffingModels; 