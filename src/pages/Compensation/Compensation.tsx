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
  Divider,
  Tabs,
  Tab,
  Slider,
  InputAdornment
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
  BusinessCenter as BusinessCenterIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Grade as GradeIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  MonetizationOn as MonetizationOnIcon
} from '@mui/icons-material';

interface CompensationGrade {
  id: string;
  name: string;
  description: string;
  minPay: number;
  maxPay: number;
  currency: string;
  status: 'Active' | 'Inactive';
  workerCount: number;
}

interface CompensationPlan {
  id: string;
  name: string;
  type: 'Salary' | 'Bonus' | 'Allowance';
  description: string;
  frequency: string;
  currency: string;
  status: 'Active' | 'Inactive';
  eligibilityRules: string[];
}

interface CompensationPackage {
  id: string;
  name: string;
  description: string;
  plans: string[];
  eligibilityRules: string[];
  status: 'Active' | 'Inactive';
  assignedTo: string[];
}

interface WorkerCompensation {
  id: string;
  workerName: string;
  jobProfile: string;
  compensationGrade: string;
  salary: number;
  bonus: number;
  allowances: number;
  totalCompensation: number;
  currency: string;
  effectiveDate: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

const API_BASE_URL = 'http://localhost:3001/api';

const Compensation: React.FC = () => {
  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const [openPlanDialog, setOpenPlanDialog] = useState(false);
  const [openPackageDialog, setOpenPackageDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewGrade, setViewGrade] = useState<CompensationGrade | null>(null);
  const [viewPlan, setViewPlan] = useState<CompensationPlan | null>(null);
  const [viewPackage, setViewPackage] = useState<CompensationPackage | null>(null);
  const [viewWorkerComp, setViewWorkerComp] = useState<WorkerCompensation | null>(null);
  // Edit dialog state for all entities
  const [editGradeForm, setEditGradeForm] = useState<CompensationGrade | null>(null);
  const [editPlanForm, setEditPlanForm] = useState<CompensationPlan | null>(null);
  const [editPackageForm, setEditPackageForm] = useState<CompensationPackage | null>(null);
  const [editWorkerCompForm, setEditWorkerCompForm] = useState<WorkerCompensation | null>(null);
  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState<{ type: string; id: string } | null>(null);

  // Mock data
  const [compensationGrades, setCompensationGrades] = useState<CompensationGrade[]>([
    {
      id: '1',
      name: 'Band 5',
      description: 'Senior level positions',
      minPay: 80000,
      maxPay: 120000,
      currency: 'USD',
      status: 'Active',
      workerCount: 45
    },
    {
      id: '2',
      name: 'Band 4',
      description: 'Mid-level positions',
      minPay: 60000,
      maxPay: 90000,
      currency: 'USD',
      status: 'Active',
      workerCount: 78
    },
    {
      id: '3',
      name: 'Band 3',
      description: 'Entry-level positions',
      minPay: 45000,
      maxPay: 65000,
      currency: 'USD',
      status: 'Active',
      workerCount: 120
    }
  ]);

  const [compensationPlans, setCompensationPlans] = useState<CompensationPlan[]>([
    {
      id: '1',
      name: 'Base Salary Plan',
      type: 'Salary',
      description: 'Annual base salary for all employees',
      frequency: 'Annual',
      currency: 'USD',
      status: 'Active',
      eligibilityRules: ['All employees', 'Full-time only']
    },
    {
      id: '2',
      name: 'Performance Bonus Plan',
      type: 'Bonus',
      description: 'Performance-based annual bonus',
      frequency: 'Annual',
      currency: 'USD',
      status: 'Active',
      eligibilityRules: ['Band 4 and above', 'Performance rating 3+']
    },
    {
      id: '3',
      name: 'Housing Allowance Plan',
      type: 'Allowance',
      description: 'Monthly housing allowance for eligible employees',
      frequency: 'Monthly',
      currency: 'USD',
      status: 'Active',
      eligibilityRules: ['Band 5 and above', 'Non-local employees']
    }
  ]);

  const [compensationPackages, setCompensationPackages] = useState<CompensationPackage[]>([
    {
      id: '1',
      name: 'Standard Employee Package',
      description: 'Standard compensation package for regular employees',
      plans: ['Base Salary Plan', 'Performance Bonus Plan'],
      eligibilityRules: ['All employees'],
      status: 'Active',
      assignedTo: ['Engineering', 'Sales', 'Marketing']
    },
    {
      id: '2',
      name: 'Executive Package',
      description: 'Enhanced compensation package for executives',
      plans: ['Base Salary Plan', 'Performance Bonus Plan', 'Housing Allowance Plan'],
      eligibilityRules: ['Band 5 and above', 'Management level'],
      status: 'Active',
      assignedTo: ['Executive', 'Senior Management']
    }
  ]);

  const [workerCompensations, setWorkerCompensations] = useState<WorkerCompensation[]>([
    {
      id: '1',
      workerName: 'Sarah Johnson',
      jobProfile: 'Senior Software Engineer',
      compensationGrade: 'Band 5',
      salary: 95000,
      bonus: 15000,
      allowances: 5000,
      totalCompensation: 115000,
      currency: 'USD',
      effectiveDate: '2024-01-01',
      status: 'Active'
    },
    {
      id: '2',
      workerName: 'Mike Chen',
      jobProfile: 'HR Business Partner',
      compensationGrade: 'Band 4',
      salary: 75000,
      bonus: 8000,
      allowances: 0,
      totalCompensation: 83000,
      currency: 'USD',
      effectiveDate: '2024-01-01',
      status: 'Active'
    },
    {
      id: '3',
      workerName: 'Lisa Rodriguez',
      jobProfile: 'Sales Representative',
      compensationGrade: 'Band 3',
      salary: 55000,
      bonus: 12000,
      allowances: 0,
      totalCompensation: 67000,
      currency: 'USD',
      effectiveDate: '2024-01-01',
      status: 'Active'
    }
  ]);

  const planTypes = ['Salary', 'Bonus', 'Allowance'];
  const frequencies = ['Annual', 'Monthly', 'Quarterly', 'One-time'];
  const currencies = ['USD', 'EUR', 'GBP', 'INR'];
  const statuses = ['Active', 'Inactive', 'Pending'];

  // State for Create Compensation Package dialog
  const [createPackageForm, setCreatePackageForm] = useState({
    name: '',
    status: 'Active',
    description: '',
    selectedPlans: [] as string[],
    selectedEligibilityRules: [] as string[],
  });

  const eligibilityRuleOptions = [
    'All employees',
    'Band 5 and above',
    'Management level',
    'Engineering department',
  ];

  const handleTogglePlan = (planName: string) => {
    setCreatePackageForm((prev) => ({
      ...prev,
      selectedPlans: prev.selectedPlans.includes(planName)
        ? prev.selectedPlans.filter((p) => p !== planName)
        : [...prev.selectedPlans, planName],
    }));
  };

  const handleToggleEligibilityRule = (rule: string) => {
    setCreatePackageForm((prev) => ({
      ...prev,
      selectedEligibilityRules: prev.selectedEligibilityRules.includes(rule)
        ? prev.selectedEligibilityRules.filter((r) => r !== rule)
        : [...prev.selectedEligibilityRules, rule],
    }));
  };

  const handleCreatePackageSubmit = () => {
    if (!createPackageForm.name || createPackageForm.selectedPlans.length === 0) return;
    setCompensationPackages((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        name: createPackageForm.name,
        description: createPackageForm.description,
        plans: createPackageForm.selectedPlans,
        eligibilityRules: createPackageForm.selectedEligibilityRules,
        status: createPackageForm.status as 'Active' | 'Inactive',
        assignedTo: [],
      },
    ]);
    setOpenPackageDialog(false);
    setCreatePackageForm({
      name: '',
      status: 'Active',
      description: '',
      selectedPlans: [],
      selectedEligibilityRules: [],
    });
  };

  // State for Create Compensation Plan dialog
  const [createPlanForm, setCreatePlanForm] = useState({
    name: '',
    type: planTypes[0],
    frequency: frequencies[0],
    currency: currencies[0],
    description: '',
    selectedEligibilityRules: [] as string[],
  });

  const planEligibilityRuleOptions = [
    'All employees',
    'Full-time only',
    'Band 4 and above',
    'Performance rating 3+',
  ];

  const handleTogglePlanEligibilityRule = (rule: string) => {
    setCreatePlanForm((prev) => ({
      ...prev,
      selectedEligibilityRules: prev.selectedEligibilityRules.includes(rule)
        ? prev.selectedEligibilityRules.filter((r) => r !== rule)
        : [...prev.selectedEligibilityRules, rule],
    }));
  };

  const handleCreatePlanSubmit = () => {
    if (!createPlanForm.name) return;
    setCompensationPlans((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        name: createPlanForm.name,
        type: createPlanForm.type as 'Salary' | 'Bonus' | 'Allowance',
        description: createPlanForm.description,
        frequency: createPlanForm.frequency,
        currency: createPlanForm.currency,
        status: 'Active',
        eligibilityRules: createPlanForm.selectedEligibilityRules,
      },
    ]);
    setOpenPlanDialog(false);
    setCreatePlanForm({
      name: '',
      type: planTypes[0],
      frequency: frequencies[0],
      currency: currencies[0],
      description: '',
      selectedEligibilityRules: [],
    });
  };

  const handleCreateGrade = () => {
    setOpenGradeDialog(true);
  };

  const handleCreatePlan = () => {
    setOpenPlanDialog(true);
  };

  const handleCreatePackage = () => {
    setOpenPackageDialog(true);
  };

  const handleAssignCompensation = () => {
    setOpenAssignmentDialog(true);
  };

  // Edit handlers
  const handleEditGrade = (grade: CompensationGrade) => {
    setEditGradeForm({ ...grade });
  };
  const handleEditPlan = (plan: CompensationPlan) => {
    setEditPlanForm({ ...plan });
  };
  const handleEditPackage = (pkg: CompensationPackage) => {
    setEditPackageForm({ ...pkg });
  };
  const handleEditWorkerComp = (comp: WorkerCompensation) => {
    setEditWorkerCompForm({ ...comp });
  };

  // Save edit handlers
  const handleEditGradeSave = () => {
    if (!editGradeForm) return;
    setCompensationGrades((prev) =>
      prev.map((g) => (g.id === editGradeForm.id ? { ...editGradeForm } : g))
    );
    setEditGradeForm(null);
  };
  const handleEditPlanSave = () => {
    if (!editPlanForm) return;
    setCompensationPlans((prev) =>
      prev.map((p) => (p.id === editPlanForm.id ? { ...editPlanForm } : p))
    );
    setEditPlanForm(null);
  };
  const handleEditPackageSave = () => {
    if (!editPackageForm) return;
    setCompensationPackages((prev) =>
      prev.map((pkg) => (pkg.id === editPackageForm.id ? { ...editPackageForm } : pkg))
    );
    setEditPackageForm(null);
  };
  const handleEditWorkerCompSave = () => {
    if (!editWorkerCompForm) return;
    setWorkerCompensations((prev) =>
      prev.map((c) => (c.id === editWorkerCompForm.id ? { ...editWorkerCompForm } : c))
    );
    setEditWorkerCompForm(null);
  };

  // Delete handlers
  const handleDeleteGrade = (id: string) => setDeleteDialog({ type: 'grade', id });
  const handleDeletePlan = (id: string) => setDeleteDialog({ type: 'plan', id });
  const handleDeletePackage = (id: string) => setDeleteDialog({ type: 'package', id });
  const handleDeleteWorkerComp = (id: string) => setDeleteDialog({ type: 'workerComp', id });
  const handleDeleteConfirm = () => {
    if (!deleteDialog) return;
    if (deleteDialog.type === 'grade') {
      setCompensationGrades((prev) => prev.filter((g) => g.id !== deleteDialog.id));
    } else if (deleteDialog.type === 'plan') {
      setCompensationPlans((prev) => prev.filter((p) => p.id !== deleteDialog.id));
    } else if (deleteDialog.type === 'package') {
      setCompensationPackages((prev) => prev.filter((pkg) => pkg.id !== deleteDialog.id));
    } else if (deleteDialog.type === 'workerComp') {
      setWorkerCompensations((prev) => prev.filter((c) => c.id !== deleteDialog.id));
    }
    setDeleteDialog(null);
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' : 'error';
  };

  const getPlanTypeIcon = (type: string) => {
    switch (type) {
      case 'Salary': return <MoneyIcon />;
      case 'Bonus': return <TrendingUpIcon />;
      case 'Allowance': return <ReceiptIcon />;
      default: return <MonetizationOnIcon />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Filter state for tables
  const [packagePlanFilter, setPackagePlanFilter] = useState<string | null>(null);
  const [packageAssignedToFilter, setPackageAssignedToFilter] = useState<string | null>(null);
  const [planTypeFilter, setPlanTypeFilter] = useState<string | null>(null);
  const [workerGradeFilter, setWorkerGradeFilter] = useState<string | null>(null);

  // State for Create Compensation Grade dialog
  const [createGradeForm, setCreateGradeForm] = useState({
    name: '',
    currency: currencies[0],
    minPay: '',
    maxPay: '',
    description: '',
  });

  const handleCreateGradeSubmit = () => {
    if (!createGradeForm.name || !createGradeForm.minPay || !createGradeForm.maxPay) return;
    setCompensationGrades((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        name: createGradeForm.name,
        description: createGradeForm.description,
        minPay: parseFloat(createGradeForm.minPay),
        maxPay: parseFloat(createGradeForm.maxPay),
        currency: createGradeForm.currency,
        status: 'Active',
        workerCount: 0,
      },
    ]);
    setOpenGradeDialog(false);
    setCreateGradeForm({
      name: '',
      currency: currencies[0],
      minPay: '',
      maxPay: '',
      description: '',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Compensation
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage compensation plans, salary bands, compensation rules, and compensation assignments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreatePlan}
          sx={{ borderRadius: 2 }}
        >
          Create Compensation Plan
        </Button>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreateGrade}>
            <GradeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Compensation Grades</Typography>
            <Typography variant="body2" color="text.secondary">
              Create pay bands
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreatePlan}>
            <MonetizationOnIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Compensation Plans</Typography>
            <Typography variant="body2" color="text.secondary">
              Create salary/bonus plans
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreatePackage}>
            <PaymentIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Compensation Packages</Typography>
            <Typography variant="body2" color="text.secondary">
              Create packages
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleAssignCompensation}>
            <AssignmentIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">Assign Compensation</Typography>
            <Typography variant="body2" color="text.secondary">
              Assign to workers
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Compensation Grades" />
          <Tab label="Compensation Plans" />
          <Tab label="Compensation Packages" />
          <Tab label="Worker Compensation" />
          <Tab label="Reports" />
        </Tabs>
      </Box>

      {/* Compensation Grades Tab */}
      {selectedTab === 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Compensation Grades</Typography>
              <Button startIcon={<AddIcon />} onClick={handleCreateGrade}>
                Create Compensation Grade
              </Button>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Grade Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Pay Range</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Workers</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compensationGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <GradeIcon color="primary" />
                          <Typography variant="body1" fontWeight="medium">
                            {grade.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{grade.description}</TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatCurrency(grade.minPay, grade.currency)} - {formatCurrency(grade.maxPay, grade.currency)}
                        </Typography>
                      </TableCell>
                      <TableCell>{grade.currency}</TableCell>
                      <TableCell>
                        <Badge badgeContent={grade.workerCount} color="primary">
                          <PeopleIcon />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={grade.status}
                          size="small"
                          color={getStatusColor(grade.status)}
                          icon={grade.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View details">
                            <IconButton size="small" color="primary" onClick={() => setViewGrade(grade)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => handleEditGrade(grade)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="warning" onClick={() => handleDeleteGrade(grade.id)}>
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
      )}

      {/* Compensation Plans Tab */}
      {selectedTab === 1 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Compensation Plans</Typography>
              <Button startIcon={<AddIcon />} onClick={handleCreatePlan}>
                Create Compensation Plan
              </Button>
            </Box>
            {/* Filter chips for Plans */}
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
              {planTypeFilter && (
                <Chip
                  label={`Type: ${planTypeFilter}`}
                  color="primary"
                  onDelete={() => setPlanTypeFilter(null)}
                  clickable
                />
              )}
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Plan Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compensationPlans
                    .filter(plan => !planTypeFilter || plan.type === planTypeFilter)
                    .map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getPlanTypeIcon(plan.type)}
                          <Typography variant="body1" fontWeight="medium">
                            {plan.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={plan.type}
                          size="small"
                          color="primary"
                          variant="outlined"
                          clickable
                          onClick={() => setPlanTypeFilter(plan.type)}
                          sx={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                      <TableCell>{plan.description}</TableCell>
                      <TableCell>{plan.frequency}</TableCell>
                      <TableCell>{plan.currency}</TableCell>
                      <TableCell>
                        <Chip
                          label={plan.status}
                          size="small"
                          color={getStatusColor(plan.status)}
                          icon={plan.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View details">
                            <IconButton size="small" color="primary" onClick={() => setViewPlan(plan)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => handleEditPlan(plan)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="warning" onClick={() => handleDeletePlan(plan.id)}>
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
      )}

      {/* Compensation Packages Tab */}
      {selectedTab === 2 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Compensation Packages</Typography>
              <Button startIcon={<AddIcon />} onClick={handleCreatePackage}>
                Create Compensation Package
              </Button>
            </Box>
            {/* Filter chips for Packages */}
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
              {packagePlanFilter && (
                <Chip
                  label={`Plan: ${packagePlanFilter}`}
                  color="primary"
                  onDelete={() => setPackagePlanFilter(null)}
                  clickable
                />
              )}
              {packageAssignedToFilter && (
                <Chip
                  label={`Assigned: ${packageAssignedToFilter}`}
                  color="secondary"
                  onDelete={() => setPackageAssignedToFilter(null)}
                  clickable
                />
              )}
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Package Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Plans</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compensationPackages
                    .filter(pkg =>
                      !packagePlanFilter || pkg.plans.includes(packagePlanFilter)
                    )
                    .filter(pkg =>
                      !packageAssignedToFilter || pkg.assignedTo.includes(packageAssignedToFilter)
                    )
                    .map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {pkg.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{pkg.description}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {pkg.plans.map((plan) => (
                            <Chip
                              key={plan}
                              label={plan}
                              size="small"
                              color="secondary"
                              clickable
                              onClick={() => setPackagePlanFilter(plan)}
                              sx={{ cursor: 'pointer' }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {pkg.assignedTo.map((assignment) => (
                            <Chip
                              key={assignment}
                              label={assignment}
                              size="small"
                              variant="outlined"
                              clickable
                              onClick={() => setPackageAssignedToFilter(assignment)}
                              sx={{ cursor: 'pointer' }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={pkg.status}
                          size="small"
                          color={getStatusColor(pkg.status)}
                          icon={pkg.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View details">
                            <IconButton size="small" color="primary" onClick={() => setViewPackage(pkg)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => handleEditPackage(pkg)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="warning" onClick={() => handleDeletePackage(pkg.id)}>
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
      )}

      {/* Worker Compensation Tab */}
      {selectedTab === 3 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Worker Compensation</Typography>
              <Button startIcon={<AddIcon />} onClick={handleAssignCompensation}>
                Assign Compensation
              </Button>
            </Box>
            {/* Filter chips for Worker Compensation */}
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
              {workerGradeFilter && (
                <Chip
                  label={`Grade: ${workerGradeFilter}`}
                  color="primary"
                  onDelete={() => setWorkerGradeFilter(null)}
                  clickable
                />
              )}
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Worker</TableCell>
                    <TableCell>Job Profile</TableCell>
                    <TableCell>Compensation Grade</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Bonus</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workerCompensations
                    .filter(comp => !workerGradeFilter || comp.compensationGrade === workerGradeFilter)
                    .map((comp) => (
                    <TableRow key={comp.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            <PersonIcon />
                          </Avatar>
                          <Typography variant="body1" fontWeight="medium">
                            {comp.workerName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{comp.jobProfile}</TableCell>
                      <TableCell>
                        <Chip
                          label={comp.compensationGrade}
                          size="small"
                          color="primary"
                          clickable
                          onClick={() => setWorkerGradeFilter(comp.compensationGrade)}
                          sx={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(comp.salary, comp.currency)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="success.main">
                          {formatCurrency(comp.bonus, comp.currency)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold" color="primary">
                          {formatCurrency(comp.totalCompensation, comp.currency)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={comp.status}
                          size="small"
                          color={getStatusColor(comp.status)}
                          icon={comp.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View details">
                            <IconButton size="small" color="primary" onClick={() => setViewWorkerComp(comp)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => handleEditWorkerComp(comp)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="warning" onClick={() => handleDeleteWorkerComp(comp.id)}>
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
      )}

      {/* Reports Tab */}
      {selectedTab === 4 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Compensation Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Total Workers:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {workerCompensations.length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Average Salary:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    {formatCurrency(
                      workerCompensations.reduce((sum, w) => sum + w.salary, 0) / workerCompensations.length,
                      'USD'
                    )}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Total Compensation:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="primary">
                    {formatCurrency(
                      workerCompensations.reduce((sum, w) => sum + w.totalCompensation, 0),
                      'USD'
                    )}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Active Plans:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    {compensationPlans.filter(p => p.status === 'Active').length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Compensation Distribution
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Band 5 Workers:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {workerCompensations.filter(w => w.compensationGrade === 'Band 5').length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Band 4 Workers:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {workerCompensations.filter(w => w.compensationGrade === 'Band 4').length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">Band 3 Workers:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {workerCompensations.filter(w => w.compensationGrade === 'Band 3').length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Workers with Bonus:</Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    {workerCompensations.filter(w => w.bonus > 0).length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Create Compensation Grade Dialog */}
      <Dialog open={openGradeDialog} onClose={() => setOpenGradeDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Compensation Grade</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Grade Name"
                placeholder="e.g., Band 5"
                value={createGradeForm.name}
                onChange={e => setCreateGradeForm(f => ({ ...f, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  label="Currency"
                  value={createGradeForm.currency}
                  onChange={e => setCreateGradeForm(f => ({ ...f, currency: e.target.value }))}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Pay"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={createGradeForm.minPay}
                onChange={e => setCreateGradeForm(f => ({ ...f, minPay: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Maximum Pay"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                value={createGradeForm.maxPay}
                onChange={e => setCreateGradeForm(f => ({ ...f, maxPay: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Brief description of the compensation grade"
                value={createGradeForm.description}
                onChange={e => setCreateGradeForm(f => ({ ...f, description: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGradeDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateGradeSubmit}
            disabled={!createGradeForm.name || !createGradeForm.minPay || !createGradeForm.maxPay}
          >
            Create Grade
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Compensation Plan Dialog */}
      <Dialog open={openPlanDialog} onClose={() => setOpenPlanDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Compensation Plan</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Plan Name"
                placeholder="e.g., Base Salary Plan"
                value={createPlanForm.name}
                onChange={e => setCreatePlanForm(f => ({ ...f, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Plan Type</InputLabel>
                <Select
                  label="Plan Type"
                  value={createPlanForm.type}
                  onChange={e => setCreatePlanForm(f => ({ ...f, type: e.target.value as 'Salary' | 'Bonus' | 'Allowance' }))}
                >
                  {planTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  label="Frequency"
                  value={createPlanForm.frequency}
                  onChange={e => setCreatePlanForm(f => ({ ...f, frequency: e.target.value }))}
                >
                  {frequencies.map((frequency) => (
                    <MenuItem key={frequency} value={frequency}>{frequency}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  label="Currency"
                  value={createPlanForm.currency}
                  onChange={e => setCreatePlanForm(f => ({ ...f, currency: e.target.value }))}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Detailed description of the compensation plan"
                value={createPlanForm.description}
                onChange={e => setCreatePlanForm(f => ({ ...f, description: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Eligibility Rules
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {planEligibilityRuleOptions.map((rule) => (
                  <Chip
                    key={rule}
                    label={rule}
                    variant={createPlanForm.selectedEligibilityRules.includes(rule) ? 'filled' : 'outlined'}
                    color={createPlanForm.selectedEligibilityRules.includes(rule) ? 'primary' : 'default'}
                    clickable
                    onClick={() => handleTogglePlanEligibilityRule(rule)}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPlanDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreatePlanSubmit}
            disabled={!createPlanForm.name}
          >
            Create Plan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Compensation Package Dialog */}
      <Dialog open={openPackageDialog} onClose={() => setOpenPackageDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Compensation Package</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Package Name"
                placeholder="e.g., Standard Employee Package"
                value={createPackageForm.name}
                onChange={e => setCreatePackageForm(f => ({ ...f, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={createPackageForm.status}
                  onChange={e => setCreatePackageForm(f => ({ ...f, status: e.target.value as 'Active' | 'Inactive' }))}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Description of the compensation package"
                value={createPackageForm.description}
                onChange={e => setCreatePackageForm(f => ({ ...f, description: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Select Plans
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {compensationPlans.map((plan) => (
                  <Chip
                    key={plan.id}
                    label={plan.name}
                    variant={createPackageForm.selectedPlans.includes(plan.name) ? 'filled' : 'outlined'}
                    color={createPackageForm.selectedPlans.includes(plan.name) ? 'primary' : 'default'}
                    clickable
                    icon={getPlanTypeIcon(plan.type)}
                    onClick={() => handleTogglePlan(plan.name)}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Eligibility Rules
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {eligibilityRuleOptions.map((rule) => (
                  <Chip
                    key={rule}
                    label={rule}
                    variant={createPackageForm.selectedEligibilityRules.includes(rule) ? 'filled' : 'outlined'}
                    color={createPackageForm.selectedEligibilityRules.includes(rule) ? 'primary' : 'default'}
                    clickable
                    onClick={() => handleToggleEligibilityRule(rule)}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPackageDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreatePackageSubmit}
            disabled={!createPackageForm.name || createPackageForm.selectedPlans.length === 0}
          >
            Create Package
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Compensation Dialog */}
      <Dialog open={openAssignmentDialog} onClose={() => setOpenAssignmentDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Assign Compensation to Worker</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Worker</InputLabel>
                <Select label="Select Worker">
                  <MenuItem value="worker1">Sarah Johnson</MenuItem>
                  <MenuItem value="worker2">Mike Chen</MenuItem>
                  <MenuItem value="worker3">Lisa Rodriguez</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Compensation Grade</InputLabel>
                <Select label="Compensation Grade">
                  {compensationGrades.map((grade) => (
                    <MenuItem key={grade.id} value={grade.name}>{grade.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Annual Salary"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Annual Bonus"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Effective Date"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="Active">
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Compensation Summary
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="body2">
                  <strong>Total Annual Compensation:</strong> $95,000
                  <br />
                  <strong>Monthly Salary:</strong> $7,917
                  <br />
                  <strong>Bonus Percentage:</strong> 15.8%
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignmentDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenAssignmentDialog(false)}>
            Assign Compensation
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Compensation Grade Modal */}
      <Dialog open={!!viewGrade} onClose={() => setViewGrade(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Compensation Grade Details</DialogTitle>
        <DialogContent dividers>
          {viewGrade && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewGrade.name}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Status:</b> {viewGrade.status}</Grid>
                <Grid item xs={6}><b>Currency:</b> {viewGrade.currency}</Grid>
                <Grid item xs={6}><b>Worker Count:</b> {viewGrade.workerCount}</Grid>
                <Grid item xs={12}><b>Description:</b> {viewGrade.description}</Grid>
                <Grid item xs={6}><b>Min Pay:</b> {formatCurrency(viewGrade.minPay, viewGrade.currency)}</Grid>
                <Grid item xs={6}><b>Max Pay:</b> {formatCurrency(viewGrade.maxPay, viewGrade.currency)}</Grid>
                <Grid item xs={12}>
                  <b>Pay Range:</b> {formatCurrency(viewGrade.minPay, viewGrade.currency)} - {formatCurrency(viewGrade.maxPay, viewGrade.currency)}
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewGrade(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* View Compensation Plan Modal */}
      <Dialog open={!!viewPlan} onClose={() => setViewPlan(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Compensation Plan Details</DialogTitle>
        <DialogContent dividers>
          {viewPlan && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewPlan.name}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Type:</b> {viewPlan.type}</Grid>
                <Grid item xs={6}><b>Status:</b> {viewPlan.status}</Grid>
                <Grid item xs={6}><b>Frequency:</b> {viewPlan.frequency}</Grid>
                <Grid item xs={6}><b>Currency:</b> {viewPlan.currency}</Grid>
                <Grid item xs={12}><b>Description:</b> {viewPlan.description}</Grid>
                <Grid item xs={12}>
                  <b>Eligibility Rules:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewPlan.eligibilityRules.map((rule, index) => (
                      <Chip key={index} label={rule} size="small" color="primary" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewPlan(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* View Compensation Package Modal */}
      <Dialog open={!!viewPackage} onClose={() => setViewPackage(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Compensation Package Details</DialogTitle>
        <DialogContent dividers>
          {viewPackage && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewPackage.name}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Status:</b> {viewPackage.status}</Grid>
                <Grid item xs={12}><b>Description:</b> {viewPackage.description}</Grid>
                <Grid item xs={12}>
                  <b>Plans:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewPackage.plans.map((plan, index) => (
                      <Chip key={index} label={plan} size="small" color="secondary" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <b>Eligibility Rules:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewPackage.eligibilityRules.map((rule, index) => (
                      <Chip key={index} label={rule} size="small" color="warning" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <b>Assigned To:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewPackage.assignedTo.map((assignment, index) => (
                      <Chip key={index} label={assignment} size="small" variant="outlined" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewPackage(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* View Worker Compensation Modal */}
      <Dialog open={!!viewWorkerComp} onClose={() => setViewWorkerComp(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Worker Compensation Details</DialogTitle>
        <DialogContent dividers>
          {viewWorkerComp && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewWorkerComp.workerName}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Job Profile:</b> {viewWorkerComp.jobProfile}</Grid>
                <Grid item xs={6}><b>Status:</b> {viewWorkerComp.status}</Grid>
                <Grid item xs={6}><b>Compensation Grade:</b> {viewWorkerComp.compensationGrade}</Grid>
                <Grid item xs={6}><b>Currency:</b> {viewWorkerComp.currency}</Grid>
                <Grid item xs={6}><b>Effective Date:</b> {viewWorkerComp.effectiveDate}</Grid>
                <Grid item xs={6}><b>Salary:</b> {formatCurrency(viewWorkerComp.salary, viewWorkerComp.currency)}</Grid>
                <Grid item xs={6}><b>Bonus:</b> {formatCurrency(viewWorkerComp.bonus, viewWorkerComp.currency)}</Grid>
                <Grid item xs={6}><b>Allowances:</b> {formatCurrency(viewWorkerComp.allowances, viewWorkerComp.currency)}</Grid>
                <Grid item xs={6}><b>Total Compensation:</b> {formatCurrency(viewWorkerComp.totalCompensation, viewWorkerComp.currency)}</Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewWorkerComp(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Compensation Grade Dialog */}
      <Dialog open={!!editGradeForm} onClose={() => setEditGradeForm(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Compensation Grade</DialogTitle>
        <DialogContent>
          {editGradeForm && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Grade Name"
                  value={editGradeForm.name}
                  onChange={e => setEditGradeForm(f => f && { ...f, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    label="Currency"
                    value={editGradeForm.currency}
                    onChange={e => setEditGradeForm(f => f && { ...f, currency: e.target.value })}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum Pay"
                  type="number"
                  value={editGradeForm.minPay}
                  onChange={e => setEditGradeForm(f => f && { ...f, minPay: parseFloat(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maximum Pay"
                  type="number"
                  value={editGradeForm.maxPay}
                  onChange={e => setEditGradeForm(f => f && { ...f, maxPay: parseFloat(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={editGradeForm.description}
                  onChange={e => setEditGradeForm(f => f && { ...f, description: e.target.value })}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditGradeForm(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditGradeSave} disabled={!editGradeForm || !editGradeForm.name}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Compensation Plan Dialog */}
      <Dialog open={!!editPlanForm} onClose={() => setEditPlanForm(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Compensation Plan</DialogTitle>
        <DialogContent>
          {editPlanForm && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Plan Name"
                  value={editPlanForm.name}
                  onChange={e => setEditPlanForm(f => f && { ...f, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Plan Type</InputLabel>
                  <Select
                    label="Plan Type"
                    value={editPlanForm.type}
                    onChange={e => setEditPlanForm(f => f && { ...f, type: e.target.value as 'Salary' | 'Bonus' | 'Allowance' })}
                  >
                    {planTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    label="Frequency"
                    value={editPlanForm.frequency}
                    onChange={e => setEditPlanForm(f => f && { ...f, frequency: e.target.value })}
                  >
                    {frequencies.map((frequency) => (
                      <MenuItem key={frequency} value={frequency}>{frequency}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    label="Currency"
                    value={editPlanForm.currency}
                    onChange={e => setEditPlanForm(f => f && { ...f, currency: e.target.value })}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={editPlanForm.description}
                  onChange={e => setEditPlanForm(f => f && { ...f, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Eligibility Rules
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {planEligibilityRuleOptions.map((rule) => (
                    <Chip
                      key={rule}
                      label={rule}
                      variant={editPlanForm.eligibilityRules.includes(rule) ? 'filled' : 'outlined'}
                      color={editPlanForm.eligibilityRules.includes(rule) ? 'primary' : 'default'}
                      clickable
                      onClick={() => setEditPlanForm(f => f && {
                        ...f,
                        eligibilityRules: f.eligibilityRules.includes(rule)
                          ? f.eligibilityRules.filter((r) => r !== rule)
                          : [...f.eligibilityRules, rule],
                      })}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPlanForm(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditPlanSave} disabled={!editPlanForm || !editPlanForm.name}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Compensation Package Dialog */}
      <Dialog open={!!editPackageForm} onClose={() => setEditPackageForm(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Compensation Package</DialogTitle>
        <DialogContent>
          {editPackageForm && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Package Name"
                  value={editPackageForm.name}
                  onChange={e => setEditPackageForm(f => f && { ...f, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={editPackageForm.status}
                    onChange={e => setEditPackageForm(f => f && { ...f, status: e.target.value as 'Active' | 'Inactive' })}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={editPackageForm.description}
                  onChange={e => setEditPackageForm(f => f && { ...f, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Select Plans
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {compensationPlans.map((plan) => (
                    <Chip
                      key={plan.id}
                      label={plan.name}
                      variant={editPackageForm.plans.includes(plan.name) ? 'filled' : 'outlined'}
                      color={editPackageForm.plans.includes(plan.name) ? 'primary' : 'default'}
                      clickable
                      icon={getPlanTypeIcon(plan.type)}
                      onClick={() => setEditPackageForm(f => f && {
                        ...f,
                        plans: f.plans.includes(plan.name)
                          ? f.plans.filter((p) => p !== plan.name)
                          : [...f.plans, plan.name],
                      })}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Eligibility Rules
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {eligibilityRuleOptions.map((rule) => (
                    <Chip
                      key={rule}
                      label={rule}
                      variant={editPackageForm.eligibilityRules.includes(rule) ? 'filled' : 'outlined'}
                      color={editPackageForm.eligibilityRules.includes(rule) ? 'primary' : 'default'}
                      clickable
                      onClick={() => setEditPackageForm(f => f && {
                        ...f,
                        eligibilityRules: f.eligibilityRules.includes(rule)
                          ? f.eligibilityRules.filter((r) => r !== rule)
                          : [...f.eligibilityRules, rule],
                      })}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPackageForm(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditPackageSave} disabled={!editPackageForm || !editPackageForm.name || !editPackageForm.plans.length}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Worker Compensation Dialog */}
      <Dialog open={!!editWorkerCompForm} onClose={() => setEditWorkerCompForm(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Worker Compensation</DialogTitle>
        <DialogContent>
          {editWorkerCompForm && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Worker Name"
                  value={editWorkerCompForm.workerName}
                  onChange={e => setEditWorkerCompForm(f => f && { ...f, workerName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Job Profile"
                  value={editWorkerCompForm.jobProfile}
                  onChange={e => setEditWorkerCompForm(f => f && { ...f, jobProfile: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Compensation Grade</InputLabel>
                  <Select
                    label="Compensation Grade"
                    value={editWorkerCompForm.compensationGrade}
                    onChange={e => setEditWorkerCompForm(f => f && { ...f, compensationGrade: e.target.value })}
                  >
                    {compensationGrades.map((grade) => (
                      <MenuItem key={grade.id} value={grade.name}>{grade.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Salary"
                  type="number"
                  value={editWorkerCompForm.salary}
                  onChange={e => setEditWorkerCompForm(f => f && { ...f, salary: parseFloat(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bonus"
                  type="number"
                  value={editWorkerCompForm.bonus}
                  onChange={e => setEditWorkerCompForm(f => f && { ...f, bonus: parseFloat(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Allowances"
                  type="number"
                  value={editWorkerCompForm.allowances}
                  onChange={e => setEditWorkerCompForm(f => f && { ...f, allowances: parseFloat(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Total Compensation"
                  type="number"
                  value={editWorkerCompForm.totalCompensation}
                  onChange={e => setEditWorkerCompForm(f => f && { ...f, totalCompensation: parseFloat(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Currency"
                  value={editWorkerCompForm.currency}
                  onChange={e => setEditWorkerCompForm(f => f && { ...f, currency: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Effective Date"
                  type="date"
                  value={editWorkerCompForm.effectiveDate}
                  onChange={e => setEditWorkerCompForm(f => f && { ...f, effectiveDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={editWorkerCompForm.status}
                    onChange={e => setEditWorkerCompForm(f => f && { ...f, status: e.target.value as 'Active' | 'Inactive' | 'Pending' })}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditWorkerCompForm(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditWorkerCompSave} disabled={!editWorkerCompForm || !editWorkerCompForm.workerName}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Compensation; 