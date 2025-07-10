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
  Badge,
  Stack,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
  History as HistoryIcon,
  Timeline as TimelineIcon,
  Approval as ApprovalIcon
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface BusinessProcess {
  id: string;
  name: string;
  type: 'Hire' | 'Terminate' | 'Job Change' | 'Transfer' | 'Compensation Change';
  status: 'Active' | 'Inactive' | 'Draft';
  description: string;
  steps: ProcessStep[];
  approvalCount: number;
  completionRate: number;
  lastModified: string;
}

interface ProcessStep {
  id: string;
  name: string;
  type: 'Initiate' | 'Enter Details' | 'HR Approval' | 'Manager Approval' | 'Complete';
  assignee: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Rejected';
  duration: string;
}

const BusinessProcesses: React.FC = () => {
  const [openProcessDialog, setOpenProcessDialog] = useState(false);
  const [openWorkflowDialog, setOpenWorkflowDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProcess, setSelectedProcess] = useState<BusinessProcess | null>(null);
  const [viewProcessHistory, setViewProcessHistory] = useState<any>(null);
  // Add state for multi-step wizard/modal
  const [openProcessWizard, setOpenProcessWizard] = useState(false);
  const [processWizardStep, setProcessWizardStep] = useState(0);
  const [processWizardMode, setProcessWizardMode] = useState<'create' | 'edit'>('create');
  const [processWizardForm, setProcessWizardForm] = useState({
    id: '',
    name: '',
    type: 'Hire' as 'Hire' | 'Terminate' | 'Job Change' | 'Transfer' | 'Compensation Change',
    status: 'Active' as 'Active' | 'Inactive' | 'Draft',
    description: '',
    steps: [] as ProcessStep[],
    approvalCount: 0,
    completionRate: 0,
    lastModified: ''
  });
  const [processWizardError, setProcessWizardError] = useState<string | null>(null);
  // Add state for deactivate confirmation
  const [deactivateProcessModal, setDeactivateProcessModal] = useState<BusinessProcess | null>(null);
  // Add state for workflow editor
  const [workflowSteps, setWorkflowSteps] = useState([
    { id: '1', name: 'Initiate', type: 'Initiate', assignee: 'Recruiter', duration: '1 day', color: '#4caf50' },
    { id: '2', name: 'Enter Details', type: 'Enter Details', assignee: 'HR Partner', duration: '2 days', color: '#2196f3' },
    { id: '3', name: 'HR Approval', type: 'HR Approval', assignee: 'HR Manager', duration: '1 day', color: '#ff9800' },
    { id: '4', name: 'Manager Approval', type: 'Manager Approval', assignee: 'Hiring Manager', duration: '1 day', color: '#9c27b0' },
    { id: '5', name: 'Complete', type: 'Complete', assignee: 'System', duration: '1 day', color: '#607d8b' }
  ]);

  const [availableSteps, setAvailableSteps] = useState([
    { id: 'initiate', name: 'Initiate', type: 'Initiate', color: '#4caf50' },
    { id: 'enter-details', name: 'Enter Details', type: 'Enter Details', color: '#2196f3' },
    { id: 'hr-approval', name: 'HR Approval', type: 'HR Approval', color: '#ff9800' },
    { id: 'manager-approval', name: 'Manager Approval', type: 'Manager Approval', color: '#9c27b0' },
    { id: 'complete', name: 'Complete', type: 'Complete', color: '#607d8b' },
    { id: 'notify', name: 'Notify', type: 'Notify', color: '#e91e63' },
    { id: 'review', name: 'Review', type: 'Review', color: '#795548' }
  ]);

  // Seed more demo data for processes and steps
  const seededSteps = [
    { id: '1', name: 'Initiate', type: 'Initiate', assignee: 'Recruiter', status: 'Completed', duration: '1 day' },
    { id: '2', name: 'Enter Details', type: 'Enter Details', assignee: 'HR Partner', status: 'In Progress', duration: '2 days' },
    { id: '3', name: 'HR Approval', type: 'HR Approval', assignee: 'HR Manager', status: 'Pending', duration: '1 day' },
    { id: '4', name: 'Manager Approval', type: 'Manager Approval', assignee: 'Hiring Manager', status: 'Pending', duration: '1 day' },
    { id: '5', name: 'Complete', type: 'Complete', assignee: 'System', status: 'Pending', duration: '1 day' }
  ];

  const [businessProcesses, setBusinessProcesses] = useState<BusinessProcess[]>([
    {
      id: '1',
      name: 'Hire Employee',
      type: 'Hire',
      status: 'Active',
      description: 'Complete process for hiring new employees',
      steps: [
        { id: '1', name: 'Initiate', type: 'Initiate', assignee: 'Recruiter', status: 'Completed', duration: '1 day' },
        { id: '2', name: 'Enter Details', type: 'Enter Details', assignee: 'HR Partner', status: 'In Progress', duration: '2 days' },
        { id: '3', name: 'HR Approval', type: 'HR Approval', assignee: 'HR Manager', status: 'Pending', duration: '1 day' },
        { id: '4', name: 'Manager Approval', type: 'Manager Approval', assignee: 'Hiring Manager', status: 'Pending', duration: '1 day' },
        { id: '5', name: 'Complete', type: 'Complete', assignee: 'System', status: 'Pending', duration: '1 day' }
      ],
      approvalCount: 2,
      completionRate: 40,
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'Job Change',
      type: 'Job Change',
      status: 'Active',
      description: 'Process for changing employee job details',
      steps: [
        { id: '1', name: 'Initiate', type: 'Initiate', assignee: 'Manager', status: 'Completed', duration: '1 day' },
        { id: '2', name: 'Enter Details', type: 'Enter Details', assignee: 'HR Partner', status: 'Completed', duration: '2 days' },
        { id: '3', name: 'HR Approval', type: 'HR Approval', assignee: 'HR Manager', status: 'In Progress', duration: '1 day' },
        { id: '4', name: 'Complete', type: 'Complete', assignee: 'System', status: 'Pending', duration: '1 day' }
      ],
      approvalCount: 1,
      completionRate: 75,
      lastModified: '2024-01-14'
    },
    {
      id: '3',
      name: 'Terminate Employee',
      type: 'Terminate',
      status: 'Active',
      description: 'Process for terminating employee employment',
      steps: [
        { id: '1', name: 'Initiate', type: 'Initiate', assignee: 'Manager', status: 'Completed', duration: '1 day' },
        { id: '2', name: 'Enter Details', type: 'Enter Details', assignee: 'HR Partner', status: 'Completed', duration: '2 days' },
        { id: '3', name: 'HR Approval', type: 'HR Approval', assignee: 'HR Manager', status: 'Completed', duration: '1 day' },
        { id: '4', name: 'Complete', type: 'Complete', assignee: 'System', status: 'In Progress', duration: '1 day' }
      ],
      approvalCount: 1,
      completionRate: 100,
      lastModified: '2024-01-13'
    }
  ]);

  // Add state for detailed audit trail
  const [auditTrail, setAuditTrail] = useState([
    {
      id: '1',
      step: 'Initiate',
      action: 'Process Started',
      user: 'Sarah Johnson',
      timestamp: '2024-01-15 09:30:00',
      status: 'Completed',
      details: 'Hire Employee process initiated for John Doe',
      duration: '5 minutes'
    },
    {
      id: '2',
      step: 'Enter Details',
      action: 'Details Entered',
      user: 'HR Partner',
      timestamp: '2024-01-15 10:15:00',
      status: 'Completed',
      details: 'Employee details, position, and compensation entered',
      duration: '45 minutes'
    },
    {
      id: '3',
      step: 'HR Approval',
      action: 'Approval Required',
      user: 'HR Manager',
      timestamp: '2024-01-15 11:00:00',
      status: 'In Progress',
      details: 'Awaiting HR Manager approval for hire request',
      duration: 'Pending'
    },
    {
      id: '4',
      step: 'Manager Approval',
      action: 'Pending',
      user: 'Hiring Manager',
      timestamp: '2024-01-15 12:00:00',
      status: 'Pending',
      details: 'Will be triggered after HR approval',
      duration: 'Not started'
    },
    {
      id: '5',
      step: 'Complete',
      action: 'Pending',
      user: 'System',
      timestamp: '2024-01-15 13:00:00',
      status: 'Pending',
      details: 'Will be triggered after all approvals',
      duration: 'Not started'
    }
  ]);

  const handleCreateProcess = () => {
    setOpenProcessDialog(true);
  };

  const handleViewWorkflow = (process: BusinessProcess) => {
    setSelectedProcess(process);
    setOpenWorkflowDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Draft': return 'warning';
      default: return 'default';
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const getProcessTypeIcon = (type: string) => {
    switch (type) {
      case 'Hire': return <PersonIcon />;
      case 'Terminate': return <CancelIcon />;
      case 'Job Change': return <WorkIcon />;
      case 'Transfer': return <AssignmentIcon />;
      case 'Compensation Change': return <BusinessIcon />;
      default: return <BusinessIcon />;
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      const items = Array.from(workflowSteps);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setWorkflowSteps(items);
    } else {
      // Moving between lists
      if (source.droppableId === 'available' && destination.droppableId === 'workflow') {
        const sourceItems = Array.from(availableSteps);
        const destItems = Array.from(workflowSteps);
        const [movedItem] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, {
          ...movedItem,
          id: Date.now().toString(),
          assignee: 'Unassigned',
          duration: '1 day'
        });
        setAvailableSteps(sourceItems);
        setWorkflowSteps(destItems);
      } else if (source.droppableId === 'workflow' && destination.droppableId === 'available') {
        const sourceItems = Array.from(workflowSteps);
        const destItems = Array.from(availableSteps);
        const [movedItem] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, {
          id: movedItem.id.replace(/\d+$/, ''),
          name: movedItem.name,
          type: movedItem.type,
          color: movedItem.color
        });
        setWorkflowSteps(sourceItems);
        setAvailableSteps(destItems);
      }
    }
  };

  // Add state for managing multiple workflows
  const [currentWorkflowName, setCurrentWorkflowName] = useState('New Workflow');
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState('');

  const handleSaveWorkflow = () => {
    if (workflowSteps.length === 0) {
      alert('Please add at least one step to the workflow');
      return;
    }
    
    // Create new business process from workflow
    const newProcess: BusinessProcess = {
      id: (businessProcesses.length + 1).toString(),
      name: currentWorkflowName,
      type: 'Hire' as any, // Default type, could be made configurable
      status: 'Active',
      description: `Workflow with ${workflowSteps.length} steps`,
      steps: workflowSteps.map((step, index) => ({
        id: (index + 1).toString(),
        name: step.name,
        type: step.type as any,
        assignee: step.assignee,
        status: index === 0 ? 'Completed' : index === 1 ? 'In Progress' : 'Pending',
        duration: step.duration
      })),
      approvalCount: workflowSteps.filter(s => s.type.includes('Approval')).length,
      completionRate: Math.round((workflowSteps.length > 0 ? 1 : 0) * 100 / workflowSteps.length),
      lastModified: new Date().toISOString().slice(0, 10)
    };
    
    setBusinessProcesses(prev => [...prev, newProcess]);
    alert(`Workflow "${currentWorkflowName}" saved successfully!`);
  };

  const handleCreateNewWorkflow = () => {
    setWorkflowSteps([]);
    setCurrentWorkflowName('New Workflow');
    setWorkflowDialogOpen(true);
  };

  const handleWorkflowNameSubmit = () => {
    if (workflowName.trim()) {
      setCurrentWorkflowName(workflowName);
      setWorkflowDialogOpen(false);
      setWorkflowName('');
    }
  };

  // Add state for approval rules
  const [approvalRules, setApprovalRules] = useState([
    {
      id: '1',
      name: 'Hire Process Rules',
      processType: 'Hire',
      rules: [
        {
          id: '1',
          condition: 'Location = India',
          action: 'Route to India HR',
          description: 'Condition: Location equals India',
          isActive: true
        },
        {
          id: '2',
          condition: 'Salary > $100K',
          action: 'Additional Approval',
          description: 'Condition: Salary greater than $100,000',
          isActive: true
        }
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'Job Change Rules',
      processType: 'Job Change',
      rules: [
        {
          id: '1',
          condition: 'Promotion',
          action: 'Manager + HR Approval',
          description: 'Condition: Job change type is Promotion',
          isActive: true
        },
        {
          id: '2',
          condition: 'Department Change',
          action: 'Additional HR Review',
          description: 'Condition: Department is changed',
          isActive: true
        }
      ],
      isActive: true
    }
  ]);

  const [openApprovalRuleDialog, setOpenApprovalRuleDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);
  const [approvalRuleForm, setApprovalRuleForm] = useState({
    name: '',
    processType: 'Hire',
    rules: [] as any[]
  });

  const handleCreateApprovalRule = () => {
    setEditingRule(null);
    setApprovalRuleForm({
      name: '',
      processType: 'Hire',
      rules: []
    });
    setOpenApprovalRuleDialog(true);
  };

  const handleEditApprovalRule = (rule: any) => {
    setEditingRule(rule);
    setApprovalRuleForm({
      name: rule.name,
      processType: rule.processType,
      rules: [...rule.rules]
    });
    setOpenApprovalRuleDialog(true);
  };

  const handleSaveApprovalRule = () => {
    if (!approvalRuleForm.name.trim()) {
      alert('Rule name is required');
      return;
    }
    
    if (approvalRuleForm.rules.length === 0) {
      alert('At least one rule is required');
      return;
    }
    
    if (editingRule) {
      setApprovalRules(prev => prev.map(r => 
        r.id === editingRule.id 
          ? { ...approvalRuleForm, id: editingRule.id, isActive: editingRule.isActive }
          : r
      ));
    } else {
      setApprovalRules(prev => [...prev, {
        ...approvalRuleForm,
        id: (prev.length + 1).toString(),
        isActive: true
      }]);
    }
    
    setOpenApprovalRuleDialog(false);
  };

  const handleToggleRuleStatus = (ruleId: string) => {
    setApprovalRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, isActive: !r.isActive } : r
    ));
  };

  // Add state for delete confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState<{open: boolean, ruleId: string | null}>({
    open: false,
    ruleId: null
  });

  const handleDeleteApprovalRule = (ruleId: string) => {
    setDeleteConfirmation({ open: true, ruleId });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.ruleId) {
      setApprovalRules(prev => prev.filter(r => r.id !== deleteConfirmation.ruleId));
      setDeleteConfirmation({ open: false, ruleId: null });
    }
  };

  const handleAddRuleCondition = () => {
    setApprovalRuleForm(prev => ({
      ...prev,
      rules: [...prev.rules, {
        id: Date.now().toString(),
        condition: '',
        action: '',
        description: '',
        isActive: true
      }]
    }));
  };

  const handleUpdateRuleCondition = (index: number, field: string, value: string) => {
    setApprovalRuleForm(prev => ({
      ...prev,
      rules: prev.rules.map((rule, i) => 
        i === index ? { ...rule, [field]: value } : rule
      )
    }));
  };

  const handleRemoveRuleCondition = (index: number) => {
    setApprovalRuleForm(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Business Processes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage business processes, workflows, and approval routing
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { setOpenProcessWizard(true); setProcessWizardMode('create'); setProcessWizardForm({ id: '', name: '', type: 'Hire', status: 'Active', description: '', steps: [], approvalCount: 0, completionRate: 0, lastModified: '' }); setProcessWizardStep(0); }}
          sx={{ borderRadius: 2 }}
        >
          Create Business Process
        </Button>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => { setSelectedTab(0); setOpenProcessWizard(true); setProcessWizardMode('create'); setProcessWizardForm({ id: '', name: '', type: 'Hire', status: 'Active', description: '', steps: [], approvalCount: 0, completionRate: 0, lastModified: '' }); setProcessWizardStep(0); }}>
            <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Create Process</Typography>
            <Typography variant="body2" color="text.secondary">
              Create new business process
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelectedTab(1)}>
            <TimelineIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Workflow Editor</Typography>
            <Typography variant="body2" color="text.secondary">
              Visual workflow editor
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelectedTab(2)}>
            <HistoryIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Process History</Typography>
            <Typography variant="body2" color="text.secondary">
              View process history
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelectedTab(3)}>
            <ApprovalIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">Approval Rules</Typography>
            <Typography variant="body2" color="text.secondary">
              Configure approval rules
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Business Processes" />
          <Tab label="Workflow Editor" />
          <Tab label="Process History" />
          <Tab label="Approval Rules" />
        </Tabs>
      </Box>

      {/* Business Processes Tab */}
      {selectedTab === 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Business Processes</Typography>
              <Button startIcon={<AddIcon />} onClick={() => { setOpenProcessWizard(true); setProcessWizardMode('create'); setProcessWizardForm({ id: '', name: '', type: 'Hire', status: 'Active', description: '', steps: [], approvalCount: 0, completionRate: 0, lastModified: '' }); setProcessWizardStep(0); }}>
                Create Business Process
              </Button>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Process Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Steps</TableCell>
                    <TableCell>Approvals</TableCell>
                    <TableCell>Completion Rate</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {businessProcesses.map((process) => (
                    <TableRow key={process.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getProcessTypeIcon(process.type)}
                          <Typography variant="body1" fontWeight="medium">
                            {process.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={process.type} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>{process.description}</TableCell>
                      <TableCell>
                        <Badge badgeContent={process.steps.length} color="primary">
                          <TimelineIcon />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge badgeContent={process.approvalCount} color="secondary">
                          <ApprovalIcon />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={process.completionRate} 
                            sx={{ width: 60, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2">{process.completionRate}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={process.status}
                          size="small"
                          color={getStatusColor(process.status)}
                          icon={process.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Workflow">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleViewWorkflow(process)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => { setOpenProcessWizard(true); setProcessWizardMode('edit'); setProcessWizardForm({ ...process }); setProcessWizardStep(0); }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Deactivate">
                            <IconButton size="small" color="warning" onClick={() => setDeactivateProcessModal(process)}>
                              <StopIcon />
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

      {/* Workflow Editor Tab */}
      {selectedTab === 1 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Workflow Editor</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  onClick={handleCreateNewWorkflow}
                >
                  Create New Workflow
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={handleSaveWorkflow}
                  disabled={workflowSteps.length === 0}
                >
                  Save Workflow
                </Button>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Current Workflow: <strong>{currentWorkflowName}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Drag and drop steps to create your business process workflow
            </Typography>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Grid container spacing={3}>
                {/* Available Steps */}
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Available Steps
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Drag steps to the workflow area
                      </Typography>
                      <Droppable droppableId="available">
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{ minHeight: 200 }}
                          >
                            {availableSteps.map((step, index) => (
                              <Draggable key={step.id} draggableId={step.id} index={index}>
                                {(provided, snapshot) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    sx={{
                                      mb: 1,
                                      cursor: 'grab',
                                      transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
                                      backgroundColor: step.color,
                                      color: 'white'
                                    }}
                                  >
                                    <CardContent sx={{ py: 1, px: 2 }}>
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <DragIndicatorIcon />
                                        <Typography variant="body2" fontWeight="medium">
                                          {step.name}
                                        </Typography>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Workflow Area */}
                <Grid item xs={12} md={8}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Workflow Steps ({workflowSteps.length})
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Your business process workflow
                      </Typography>
                      <Droppable droppableId="workflow">
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{
                              minHeight: 400,
                              border: '2px dashed #ccc',
                              borderRadius: 2,
                              p: 2,
                              backgroundColor: '#fafafa'
                            }}
                          >
                            {workflowSteps.length === 0 ? (
                              <Box sx={{ textAlign: 'center', py: 4 }}>
                                <TimelineIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                  Empty Workflow
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Drag steps from the left panel to build your workflow
                                </Typography>
                              </Box>
                            ) : (
                              workflowSteps.map((step, index) => (
                                <Draggable key={step.id} draggableId={step.id} index={index}>
                                  {(provided, snapshot) => (
                                    <Card
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      sx={{
                                        mb: 2,
                                        cursor: 'grab',
                                        transform: snapshot.isDragging ? 'rotate(5deg)' : 'none',
                                        backgroundColor: step.color,
                                        color: 'white'
                                      }}
                                    >
                                      <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <DragIndicatorIcon />
                                            <Box>
                                              <Typography variant="body1" fontWeight="medium">
                                                {step.name}
                                              </Typography>
                                              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                {step.assignee} • {step.duration}
                                              </Typography>
                                            </Box>
                                          </Box>
                                          <IconButton
                                            size="small"
                                            sx={{ color: 'white' }}
                                            onClick={() => {
                                              setWorkflowSteps(prev => prev.filter((_, i) => i !== index));
                                            }}
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                        </Box>
                                      </CardContent>
                                    </Card>
                                  )}
                                </Draggable>
                              ))
                            )}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DragDropContext>
          </CardContent>
        </Card>
      )}

      {/* Process History Tab */}
      {selectedTab === 2 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Process History
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              View history of business process executions
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Process</TableCell>
                    <TableCell>Initiator</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Current Step</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Hire Employee - John Doe</TableCell>
                    <TableCell>Sarah Johnson</TableCell>
                    <TableCell>2024-01-15</TableCell>
                    <TableCell>Enter Details</TableCell>
                    <TableCell>
                      <Chip label="In Progress" size="small" color="info" />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary" onClick={() => setViewProcessHistory({
                        process: 'Hire Employee - John Doe',
                        initiator: 'Sarah Johnson',
                        startDate: '2024-01-15',
                        currentStep: 'Enter Details',
                        status: 'In Progress'
                      })}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Job Change - Mike Chen</TableCell>
                    <TableCell>Lisa Rodriguez</TableCell>
                    <TableCell>2024-01-14</TableCell>
                    <TableCell>HR Approval</TableCell>
                    <TableCell>
                      <Chip label="In Progress" size="small" color="info" />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary" onClick={() => setViewProcessHistory({
                        process: 'Job Change - Mike Chen',
                        initiator: 'Lisa Rodriguez',
                        startDate: '2024-01-14',
                        currentStep: 'HR Approval',
                        status: 'In Progress'
                      })}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Approval Rules Tab */}
      {selectedTab === 3 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Approval Rules</Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleCreateApprovalRule}
              >
                Create Approval Rule
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Configure approval rules and routing conditions for business processes
            </Typography>
            
            <Grid container spacing={2}>
              {approvalRules.map((rule) => (
                <Grid item xs={12} md={6} key={rule.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {rule.name}
                          </Typography>
                          <Chip 
                            label={rule.processType} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                          <Chip 
                            label={rule.isActive ? 'Active' : 'Inactive'} 
                            size="small" 
                            color={rule.isActive ? 'success' : 'error'}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            color="info"
                            onClick={() => handleEditApprovalRule(rule)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color={rule.isActive ? 'warning' : 'success'}
                            onClick={() => handleToggleRuleStatus(rule.id)}
                          >
                            {rule.isActive ? <StopIcon /> : <PlayIcon />}
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteApprovalRule(rule.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <List dense>
                        {rule.rules.map((condition: any) => (
                          <ListItem key={condition.id} sx={{ px: 0 }}>
                            <ListItemIcon>
                              <CheckCircleIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={`${condition.condition} → ${condition.action}`}
                              secondary={condition.description}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Create Business Process Dialog */}
      <Dialog open={openProcessDialog} onClose={() => setOpenProcessDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Business Process</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Process Name"
                placeholder="e.g., Hire Employee"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Process Type</InputLabel>
                <Select label="Process Type">
                  <MenuItem value="Hire">Hire</MenuItem>
                  <MenuItem value="Terminate">Terminate</MenuItem>
                  <MenuItem value="Job Change">Job Change</MenuItem>
                  <MenuItem value="Transfer">Transfer</MenuItem>
                  <MenuItem value="Compensation Change">Compensation Change</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Description of the business process"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Process Steps
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><AssignmentIcon /></ListItemIcon>
                  <ListItemText primary="Initiate" secondary="Start the process" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><EditIcon /></ListItemIcon>
                  <ListItemText primary="Enter Details" secondary="Enter required information" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><ApprovalIcon /></ListItemIcon>
                  <ListItemText primary="HR Approval" secondary="HR review and approval" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                  <ListItemText primary="Complete" secondary="Process completion" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProcessDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenProcessDialog(false)}>
            Create Business Process
          </Button>
        </DialogActions>
      </Dialog>

      {/* Workflow View Dialog */}
      <Dialog open={openWorkflowDialog} onClose={() => setOpenWorkflowDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {selectedProcess?.name} - Workflow
        </DialogTitle>
        <DialogContent>
          {selectedProcess && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {selectedProcess.description}
              </Typography>
              <Stack spacing={2}>
                {selectedProcess.steps.map((step, index) => (
                  <Box key={step.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%', 
                      backgroundColor: getStepStatusColor(step.status) === 'success' ? 'success.main' : 
                                   getStepStatusColor(step.status) === 'info' ? 'info.main' : 
                                   getStepStatusColor(step.status) === 'warning' ? 'warning.main' : 'grey.300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      {index + 1}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {step.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.assignee} • {step.duration}
                      </Typography>
                    </Box>
                    <Chip
                      label={step.status}
                      size="small"
                      color={getStepStatusColor(step.status)}
                    />
                    {index < selectedProcess.steps.length - 1 && (
                      <ArrowForwardIcon color="action" />
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWorkflowDialog(false)}>Close</Button>
          <Button variant="contained">Edit Workflow</Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Process History Modal */}
      <Dialog open={!!viewProcessHistory} onClose={() => setViewProcessHistory(null)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <HistoryIcon color="primary" />
            Process History Details
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {viewProcessHistory && (
            <Box sx={{ p: 1 }}>
              {/* Process Summary */}
              <Card sx={{ mb: 3, backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{viewProcessHistory.process}</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}><b>Initiator:</b> {viewProcessHistory.initiator}</Grid>
                    <Grid item xs={6}><b>Start Date:</b> {viewProcessHistory.startDate}</Grid>
                    <Grid item xs={6}><b>Current Step:</b> {viewProcessHistory.currentStep}</Grid>
                    <Grid item xs={6}><b>Status:</b> 
                      <Chip 
                        label={viewProcessHistory.status} 
                        size="small" 
                        color={viewProcessHistory.status === 'In Progress' ? 'info' : 'success'} 
                        sx={{ ml: 1 }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Audit Trail */}
              <Typography variant="h6" gutterBottom>
                Audit Trail
              </Typography>
              <Stack spacing={2}>
                {auditTrail.map((entry, index) => (
                  <Card key={entry.id} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          backgroundColor: entry.status === 'Completed' ? 'success.main' : 
                                         entry.status === 'In Progress' ? 'info.main' : 
                                         entry.status === 'Pending' ? 'warning.main' : 'grey.300',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}>
                          {index + 1}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Typography variant="body1" fontWeight="medium">
                              {entry.step}
                            </Typography>
                            <Chip 
                              label={entry.status} 
                              size="small" 
                              color={entry.status === 'Completed' ? 'success' : 
                                     entry.status === 'In Progress' ? 'info' : 
                                     entry.status === 'Pending' ? 'warning' : 'default'}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <b>Action:</b> {entry.action}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <b>User:</b> {entry.user} • <b>Time:</b> {entry.timestamp} • <b>Duration:</b> {entry.duration}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {entry.details}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>

              {/* Process Statistics */}
              <Card sx={{ mt: 3, backgroundColor: '#f8f9fa' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Process Statistics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">2</Typography>
                        <Typography variant="body2" color="text.secondary">Steps Completed</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main">1</Typography>
                        <Typography variant="body2" color="text.secondary">In Progress</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main">2</Typography>
                        <Typography variant="body2" color="text.secondary">Pending</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main">3h 30m</Typography>
                        <Typography variant="body2" color="text.secondary">Total Duration</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewProcessHistory(null)}>Close</Button>
          <Button variant="outlined" startIcon={<EditIcon />}>Edit Process</Button>
        </DialogActions>
      </Dialog>

      {/* Multi-step wizard/modal for create/edit business process */}
      <Dialog open={openProcessWizard} onClose={() => setOpenProcessWizard(false)} maxWidth="md" fullWidth>
        <DialogTitle>{processWizardMode === 'create' ? 'Create Business Process' : 'Edit Business Process'}</DialogTitle>
        <DialogContent>
          <Stepper activeStep={processWizardStep} alternativeLabel sx={{ mb: 2 }}>
            <Step><StepLabel>Basic Info</StepLabel></Step>
            <Step><StepLabel>Steps & Approvals</StepLabel></Step>
            <Step><StepLabel>Notifications</StepLabel></Step>
            <Step><StepLabel>Review & Submit</StepLabel></Step>
          </Stepper>
          {processWizardStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Process Name"
                  value={processWizardForm.name}
                  onChange={e => setProcessWizardForm(f => ({ ...f, name: e.target.value }))}
                  error={!!processWizardError}
                  helperText={processWizardError}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Process Type</InputLabel>
                  <Select
                    label="Process Type"
                    value={processWizardForm.type}
                    onChange={e => setProcessWizardForm(f => ({ ...f, type: e.target.value as any }))}
                  >
                    <MenuItem value="Hire">Hire</MenuItem>
                    <MenuItem value="Terminate">Terminate</MenuItem>
                    <MenuItem value="Job Change">Job Change</MenuItem>
                    <MenuItem value="Transfer">Transfer</MenuItem>
                    <MenuItem value="Compensation Change">Compensation Change</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  value={processWizardForm.description}
                  onChange={e => setProcessWizardForm(f => ({ ...f, description: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography>Status:</Typography>
                  <Select
                    value={processWizardForm.status}
                    onChange={e => setProcessWizardForm(f => ({ ...f, status: e.target.value as any }))}
                    size="small"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                  </Select>
                  <Typography>{processWizardForm.status}</Typography>
                </Box>
              </Grid>
            </Grid>
          )}
          {processWizardStep === 1 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Steps & Approvals</Typography>
              <Stack spacing={1} sx={{ mb: 2 }}>
                {processWizardForm.steps.map((step, idx) => (
                  <Box key={step.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                      label="Step Name"
                      value={step.name}
                      onChange={e => setProcessWizardForm(f => ({
                        ...f,
                        steps: f.steps.map((s, i) => i === idx ? { ...s, name: e.target.value } : s)
                      }))}
                      size="small"
                      sx={{ width: 180 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Type</InputLabel>
                      <Select
                        label="Type"
                        value={step.type}
                        onChange={e => setProcessWizardForm(f => ({
                          ...f,
                          steps: f.steps.map((s, i) => i === idx ? { ...s, type: e.target.value as any } : s)
                        }))}
                      >
                        <MenuItem value="Initiate">Initiate</MenuItem>
                        <MenuItem value="Enter Details">Enter Details</MenuItem>
                        <MenuItem value="HR Approval">HR Approval</MenuItem>
                        <MenuItem value="Manager Approval">Manager Approval</MenuItem>
                        <MenuItem value="Complete">Complete</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Assignee"
                      value={step.assignee}
                      onChange={e => setProcessWizardForm(f => ({
                        ...f,
                        steps: f.steps.map((s, i) => i === idx ? { ...s, assignee: e.target.value } : s)
                      }))}
                      size="small"
                      sx={{ width: 140 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        value={step.status}
                        onChange={e => setProcessWizardForm(f => ({
                          ...f,
                          steps: f.steps.map((s, i) => i === idx ? { ...s, status: e.target.value as any } : s)
                        }))}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Duration"
                      value={step.duration}
                      onChange={e => setProcessWizardForm(f => ({
                        ...f,
                        steps: f.steps.map((s, i) => i === idx ? { ...s, duration: e.target.value } : s)
                      }))}
                      size="small"
                      sx={{ width: 100 }}
                    />
                    <Button color="error" size="small" onClick={() => setProcessWizardForm(f => ({ ...f, steps: f.steps.filter((_, i) => i !== idx) }))}>Remove</Button>
                  </Box>
                ))}
              </Stack>
              <Button variant="outlined" onClick={() => setProcessWizardForm(f => ({ ...f, steps: [...f.steps, { id: (f.steps.length + 1).toString(), name: '', type: 'Initiate', assignee: '', status: 'Pending', duration: '' }] }))}>
                Add Step
              </Button>
            </Box>
          )}
          {processWizardStep === 2 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Notifications & Alerts</Typography>
              <TextField
                fullWidth
                label="Notification Recipients (comma separated)"
                value={processWizardForm['notifications'] || ''}
                onChange={e => setProcessWizardForm(f => ({ ...f, notifications: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Alert Triggers (e.g., step completed, approval required)"
                value={processWizardForm['alerts'] || ''}
                onChange={e => setProcessWizardForm(f => ({ ...f, alerts: e.target.value }))}
                sx={{ mt: 2 }}
              />
            </Box>
          )}
          {processWizardStep === 3 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Review & Submit</Typography>
              <Typography><b>Process Name:</b> {processWizardForm.name}</Typography>
              <Typography><b>Type:</b> {processWizardForm.type}</Typography>
              <Typography><b>Description:</b> {processWizardForm.description}</Typography>
              <Typography><b>Status:</b> {processWizardForm.status}</Typography>
              <Typography><b>Steps:</b> {processWizardForm.steps.map(s => s.name).join(', ')}</Typography>
              <Typography><b>Notifications:</b> {processWizardForm['notifications']}</Typography>
              <Typography><b>Alerts:</b> {processWizardForm['alerts']}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProcessWizard(false)}>Cancel</Button>
          {processWizardStep > 0 && (
            <Button onClick={() => setProcessWizardStep(s => s - 1)}>Back</Button>
          )}
          {processWizardStep < 3 && (
            <Button
              variant="contained"
              onClick={() => {
                if (processWizardStep === 0 && !processWizardForm.name.trim()) {
                  setProcessWizardError('Process name is required');
                  return;
                }
                setProcessWizardStep(s => s + 1);
              }}
            >
              Next
            </Button>
          )}
          {processWizardStep === 3 && (
            <Button
              variant="contained"
              onClick={() => {
                if (processWizardMode === 'create') {
                  setBusinessProcesses(prev => [
                    ...prev,
                    {
                      ...processWizardForm,
                      id: (prev.length + 1).toString(),
                      approvalCount: processWizardForm.steps.filter(s => s.type.includes('Approval')).length,
                      completionRate: 0,
                      lastModified: new Date().toISOString().slice(0, 10)
                    }
                  ]);
                } else if (processWizardMode === 'edit') {
                  setBusinessProcesses(prev => prev.map(p =>
                    p.id === processWizardForm.id
                      ? {
                          ...processWizardForm,
                          approvalCount: processWizardForm.steps.filter(s => s.type.includes('Approval')).length,
                          lastModified: new Date().toISOString().slice(0, 10)
                        }
                      : p
                  ));
                }
                setOpenProcessWizard(false);
              }}
              disabled={!processWizardForm.name.trim()}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Deactivate/Activate confirmation dialog */}
      <Dialog open={!!deactivateProcessModal} onClose={() => setDeactivateProcessModal(null)}>
        <DialogTitle>{deactivateProcessModal?.status === 'Active' ? 'Deactivate Process' : 'Activate Process'}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {deactivateProcessModal?.status === 'Active' ? 'deactivate' : 'activate'} this process?
            <br />
            <b>Process:</b> {deactivateProcessModal?.name}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeactivateProcessModal(null)}>Cancel</Button>
          <Button color="warning" variant="contained" onClick={() => {
            setBusinessProcesses(prev => prev.map(p =>
              p.id === deactivateProcessModal?.id
                ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
                : p
            ));
            setDeactivateProcessModal(null);
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Workflow Name Dialog */}
      <Dialog open={workflowDialogOpen} onClose={() => setWorkflowDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Workflow</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Workflow Name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="Enter workflow name"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWorkflowDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleWorkflowNameSubmit}
            disabled={!workflowName.trim()}
          >
            Create Workflow
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approval Rule Dialog */}
      <Dialog open={openApprovalRuleDialog} onClose={() => setOpenApprovalRuleDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRule ? 'Edit Approval Rule' : 'Create Approval Rule'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Rule Name"
                value={approvalRuleForm.name}
                onChange={(e) => setApprovalRuleForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Hire Process Rules"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Process Type</InputLabel>
                <Select
                  label="Process Type"
                  value={approvalRuleForm.processType}
                  onChange={(e) => setApprovalRuleForm(prev => ({ ...prev, processType: e.target.value }))}
                >
                  <MenuItem value="Hire">Hire</MenuItem>
                  <MenuItem value="Terminate">Terminate</MenuItem>
                  <MenuItem value="Job Change">Job Change</MenuItem>
                  <MenuItem value="Transfer">Transfer</MenuItem>
                  <MenuItem value="Compensation Change">Compensation Change</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Approval Conditions</Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={handleAddRuleCondition}
                >
                  Add Condition
                </Button>
              </Box>
              
              <Stack spacing={2}>
                {approvalRuleForm.rules.map((rule, index) => (
                  <Card key={rule.id} variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="subtitle2">Condition {index + 1}</Typography>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleRemoveRuleCondition(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Condition"
                            value={rule.condition}
                            onChange={(e) => handleUpdateRuleCondition(index, 'condition', e.target.value)}
                            placeholder="e.g., Location = India"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Action"
                            value={rule.action}
                            onChange={(e) => handleUpdateRuleCondition(index, 'action', e.target.value)}
                            placeholder="e.g., Route to India HR"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Description"
                            value={rule.description}
                            onChange={(e) => handleUpdateRuleCondition(index, 'description', e.target.value)}
                            placeholder="Condition description"
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
              
              {approvalRuleForm.rules.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 3, border: '2px dashed #ccc', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    No conditions added yet. Click "Add Condition" to get started.
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApprovalRuleDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSaveApprovalRule}
            disabled={!approvalRuleForm.name.trim() || approvalRuleForm.rules.length === 0}
          >
            {editingRule ? 'Update Rule' : 'Create Rule'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmation.open} onClose={() => setDeleteConfirmation({ open: false, ruleId: null })}>
        <DialogTitle>Delete Approval Rule</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this approval rule? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation({ open: false, ruleId: null })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessProcesses; 