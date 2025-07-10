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
  Avatar,
  Stack,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  SwapHoriz as TransferIcon,
  ExitToApp as ExitIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  History as HistoryIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  LocationOn as LocationIcon,
  Grade as GradeIcon,
  MonetizationOn as MoneyIcon,
  Apartment as DepartmentIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Comment as CommentIcon,
  Timeline as TimelineIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

interface Transaction {
  id: string;
  type: 'Hire' | 'Terminate' | 'Promote' | 'Transfer' | 'Job Change' | 'Compensation Change';
  workerName: string;
  workerId: string;
  initiator: string;
  startDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Rejected' | 'Cancelled';
  currentStep: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate: string;
  estimatedDuration: string;
  actualDuration?: string;
  approvalCount: number;
  completedSteps: number;
  totalSteps: number;
  comments: string[];
  attachments: string[];
  isUrgent: boolean;
  requiresImmediateAttention: boolean;
}

interface TransactionStep {
  id: string;
  name: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Rejected';
  assignee: string;
  dueDate: string;
  completedDate?: string;
  comments?: string;
  isApproval: boolean;
  canApprove: boolean;
  canReject: boolean;
  requiresComment: boolean;
}

interface TransactionTemplate {
  id: string;
  name: string;
  type: 'Hire' | 'Terminate' | 'Promote' | 'Transfer' | 'Job Change' | 'Compensation Change';
  description: string;
  steps: string[];
  isDefault: boolean;
  isActive: boolean;
}

const Transactions: React.FC = () => {
  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedStep, setSelectedStep] = useState<TransactionStep | null>(null);
  
  // Multi-step wizard state
  const [wizardStep, setWizardStep] = useState(0);
  const [transactionForm, setTransactionForm] = useState({
    type: 'Hire' as any,
    workerId: '',
    workerName: '',
    priority: 'Medium' as any,
    description: '',
    dueDate: '',
    estimatedDuration: '',
    isUrgent: false,
    requiresImmediateAttention: false,
    comments: '',
    templateId: ''
  });

  // Enhanced transactions with more Workday-like data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'Hire',
      workerName: 'John Doe',
      workerId: 'EMP001',
      initiator: 'Sarah Johnson',
      startDate: '2024-01-15',
      status: 'In Progress',
      currentStep: 'HR Approval',
      description: 'Hiring John Doe as Software Engineer - Backend Development Team',
      priority: 'High',
      dueDate: '2024-01-20',
      estimatedDuration: '5 days',
      approvalCount: 3,
      completedSteps: 2,
      totalSteps: 5,
      comments: ['Initial screening completed', 'Background check in progress'],
      attachments: ['Resume.pdf', 'Offer_Letter.docx'],
      isUrgent: true,
      requiresImmediateAttention: false
    },
    {
      id: '2',
      type: 'Promote',
      workerName: 'Mike Chen',
      workerId: 'EMP002',
      initiator: 'Lisa Rodriguez',
      startDate: '2024-01-14',
      status: 'Completed',
      currentStep: 'Complete',
      description: 'Promoting Mike Chen to Senior Software Engineer - Full Stack Team',
      priority: 'Medium',
      dueDate: '2024-01-18',
      estimatedDuration: '4 days',
      actualDuration: '3 days',
      approvalCount: 2,
      completedSteps: 4,
      totalSteps: 4,
      comments: ['Performance review completed', 'Manager approval received'],
      attachments: ['Performance_Review.pdf', 'Promotion_Letter.docx'],
      isUrgent: false,
      requiresImmediateAttention: false
    },
    {
      id: '3',
      type: 'Transfer',
      workerName: 'Emily Wilson',
      workerId: 'EMP003',
      initiator: 'David Brown',
      startDate: '2024-01-13',
      status: 'Pending',
      currentStep: 'Manager Approval',
      description: 'Transferring Emily Wilson from Marketing to Product Management',
      priority: 'Low',
      dueDate: '2024-01-25',
      estimatedDuration: '7 days',
      approvalCount: 2,
      completedSteps: 1,
      totalSteps: 4,
      comments: ['Transfer request submitted'],
      attachments: ['Transfer_Request.pdf'],
      isUrgent: false,
      requiresImmediateAttention: false
    },
    {
      id: '4',
      type: 'Terminate',
      workerName: 'Alex Johnson',
      workerId: 'EMP004',
      initiator: 'HR Manager',
      startDate: '2024-01-12',
      status: 'In Progress',
      currentStep: 'HR Review',
      description: 'Termination of Alex Johnson - Performance Issues',
      priority: 'Critical',
      dueDate: '2024-01-15',
      estimatedDuration: '3 days',
      approvalCount: 2,
      completedSteps: 1,
      totalSteps: 3,
      comments: ['Performance improvement plan failed', 'Final warning issued'],
      attachments: ['PIP_Report.pdf', 'Final_Warning.pdf'],
      isUrgent: true,
      requiresImmediateAttention: true
    }
  ]);

  // Enhanced transaction steps with approval workflow
  const [transactionSteps, setTransactionSteps] = useState<TransactionStep[]>([
    {
      id: '1',
      name: 'Initiate Transaction',
      status: 'Completed',
      assignee: 'Sarah Johnson',
      dueDate: '2024-01-15',
      completedDate: '2024-01-15',
      comments: 'Transaction initiated successfully',
      isApproval: false,
      canApprove: false,
      canReject: false,
      requiresComment: false
    },
    {
      id: '2',
      name: 'Enter Details',
      status: 'Completed',
      assignee: 'HR Partner',
      dueDate: '2024-01-16',
      completedDate: '2024-01-16',
      comments: 'All required details entered and verified',
      isApproval: false,
      canApprove: false,
      canReject: false,
      requiresComment: false
    },
    {
      id: '3',
      name: 'HR Approval',
      status: 'In Progress',
      assignee: 'HR Manager',
      dueDate: '2024-01-17',
      comments: 'Pending HR review and approval',
      isApproval: true,
      canApprove: true,
      canReject: true,
      requiresComment: true
    },
    {
      id: '4',
      name: 'Manager Approval',
      status: 'Pending',
      assignee: 'Hiring Manager',
      dueDate: '2024-01-18',
      isApproval: true,
      canApprove: true,
      canReject: true,
      requiresComment: true
    },
    {
      id: '5',
      name: 'Complete',
      status: 'Pending',
      assignee: 'System',
      dueDate: '2024-01-19',
      isApproval: false,
      canApprove: false,
      canReject: false,
      requiresComment: false
    }
  ]);

  // Transaction templates
  const [transactionTemplates, setTransactionTemplates] = useState<TransactionTemplate[]>([
    {
      id: '1',
      name: 'Standard Hire',
      type: 'Hire',
      description: 'Standard hiring process for regular employees with HR and manager approval',
      steps: ['Initiate', 'Enter Details', 'HR Approval', 'Manager Approval', 'Complete'],
      isDefault: true,
      isActive: true
    },
    {
      id: '2',
      name: 'Executive Hire',
      type: 'Hire',
      description: 'Hiring process for executive positions with additional approvals',
      steps: ['Initiate', 'Enter Details', 'HR Approval', 'Manager Approval', 'Executive Approval', 'Complete'],
      isDefault: false,
      isActive: true
    },
    {
      id: '3',
      name: 'Standard Promotion',
      type: 'Promote',
      description: 'Standard promotion process with manager and HR approval',
      steps: ['Initiate', 'Performance Review', 'Manager Approval', 'HR Approval', 'Complete'],
      isDefault: true,
      isActive: true
    },
    {
      id: '4',
      name: 'Department Transfer',
      type: 'Transfer',
      description: 'Transfer employee to different department with manager approvals',
      steps: ['Initiate', 'Current Manager Approval', 'New Manager Approval', 'HR Approval', 'Complete'],
      isDefault: true,
      isActive: true
    }
  ]);

  // Add state for edit and delete functionality
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openTemplateDeleteDialog, setOpenTemplateDeleteDialog] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [rejectingTransaction, setRejectingTransaction] = useState<Transaction | null>(null);
  const [deletingTemplate, setDeletingTemplate] = useState<TransactionTemplate | null>(null);

  // Template dialog state
  const [templateForm, setTemplateForm] = useState({
    name: '',
    type: '',
    description: ''
  });
  const [editingTemplate, setEditingTemplate] = useState<TransactionTemplate | null>(null);
  const [openEditTemplateDialog, setOpenEditTemplateDialog] = useState(false);

  const handleCreateTransaction = () => {
    setWizardStep(0);
    setTransactionForm({
      type: 'Hire',
      workerId: '',
      workerName: '',
      priority: 'Medium',
      description: '',
      dueDate: '',
      estimatedDuration: '',
      isUrgent: false,
      requiresImmediateAttention: false,
      comments: '',
      templateId: ''
    });
    setOpenTransactionDialog(true);
  };

  const handleViewHistory = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenHistoryDialog(true);
  };

  const handleApproveStep = (step: TransactionStep) => {
    setSelectedStep(step);
    setOpenApprovalDialog(true);
  };

  const handleSaveTransaction = () => {
    if (!transactionForm.workerName.trim() || !transactionForm.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      type: transactionForm.type,
      workerName: transactionForm.workerName,
      workerId: transactionForm.workerId,
      initiator: 'Current User', // In real app, get from auth
      startDate: new Date().toISOString().slice(0, 10),
      status: 'Pending',
      currentStep: 'Initiate',
      description: transactionForm.description,
      priority: transactionForm.priority,
      dueDate: transactionForm.dueDate,
      estimatedDuration: transactionForm.estimatedDuration,
      approvalCount: 2, // Default
      completedSteps: 0,
      totalSteps: 5, // Default
      comments: transactionForm.comments ? [transactionForm.comments] : [],
      attachments: [],
      isUrgent: transactionForm.isUrgent,
      requiresImmediateAttention: transactionForm.requiresImmediateAttention
    };

    setTransactions(prev => [...prev, newTransaction]);
    setOpenTransactionDialog(false);
    alert('Transaction created successfully!');
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenHistoryDialog(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setTransactionForm({
      type: transaction.type,
      workerId: transaction.workerId,
      workerName: transaction.workerName,
      priority: transaction.priority,
      description: transaction.description,
      dueDate: transaction.dueDate,
      estimatedDuration: transaction.estimatedDuration,
      isUrgent: transaction.isUrgent,
      requiresImmediateAttention: transaction.requiresImmediateAttention,
      comments: transaction.comments.join('\n'),
      templateId: ''
    });
    setWizardStep(0);
    setOpenEditDialog(true);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setDeletingTransaction(transaction);
    setOpenDeleteDialog(true);
  };

  const handleSaveEdit = () => {
    if (!transactionForm.workerName.trim() || !transactionForm.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingTransaction) {
      setTransactions(prev => prev.map(t => 
        t.id === editingTransaction.id 
          ? {
              ...t,
              type: transactionForm.type,
              workerName: transactionForm.workerName,
              workerId: transactionForm.workerId,
              description: transactionForm.description,
              priority: transactionForm.priority,
              dueDate: transactionForm.dueDate,
              estimatedDuration: transactionForm.estimatedDuration,
              isUrgent: transactionForm.isUrgent,
              requiresImmediateAttention: transactionForm.requiresImmediateAttention,
              comments: transactionForm.comments ? [transactionForm.comments] : []
            }
          : t
      ));
      setOpenEditDialog(false);
      setEditingTransaction(null);
      alert('Transaction updated successfully!');
    }
  };

  const handleConfirmDelete = () => {
    if (deletingTransaction) {
      setTransactions(prev => prev.filter(t => t.id !== deletingTransaction.id));
      setOpenDeleteDialog(false);
      setDeletingTransaction(null);
      alert('Transaction deleted successfully!');
    }
  };

  const handleConfirmReject = () => {
    if (rejectingTransaction) {
      setOpenRejectDialog(false);
      setRejectingTransaction(null);
      alert('Transaction rejected successfully!');
    }
  };

  const handleConfirmTemplateDelete = () => {
    if (deletingTemplate) {
      setTransactionTemplates(prev => prev.filter(t => t.id !== deletingTemplate.id));
      setOpenTemplateDeleteDialog(false);
      setDeletingTemplate(null);
      alert('Template deleted successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      case 'Cancelled': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'Hire': return <PersonIcon />;
      case 'Terminate': return <ExitIcon />;
      case 'Promote': return <TrendingUpIcon />;
      case 'Transfer': return <TransferIcon />;
      case 'Job Change': return <WorkIcon />;
      case 'Compensation Change': return <MoneyIcon />;
      default: return <BusinessIcon />;
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircleIcon />;
      case 'In Progress': return <PlayIcon />;
      case 'Pending': return <ScheduleIcon />;
      case 'Rejected': return <CancelIcon />;
      default: return <ScheduleIcon />;
    }
  };

  const getCompletionPercentage = (transaction: Transaction) => {
    return Math.round((transaction.completedSteps / transaction.totalSteps) * 100);
  };

  // Create Template handler
  const handleCreateTemplate = () => {
    if (!templateForm.name.trim() || !templateForm.type.trim()) {
      alert('Template Name and Type are required');
      return;
    }
    setTransactionTemplates(prev => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        name: templateForm.name,
        type: templateForm.type as any,
        description: templateForm.description,
        steps: [],
        isDefault: false,
        isActive: true
      }
    ]);
    setOpenTemplateDialog(false);
    setTemplateForm({ name: '', type: '', description: '' });
    alert('Template created successfully!');
  };

  // Edit Template handlers
  const handleOpenEditTemplate = (template: TransactionTemplate) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      type: template.type,
      description: template.description
    });
    setOpenEditTemplateDialog(true);
  };
  const handleSaveEditTemplate = () => {
    if (!templateForm.name.trim() || !templateForm.type.trim()) {
      alert('Template Name and Type are required');
      return;
    }
    if (editingTemplate) {
      setTransactionTemplates(prev => prev.map(t =>
        t.id === editingTemplate.id
          ? { ...t, name: templateForm.name, type: templateForm.type as any, description: templateForm.description }
          : t
      ));
      setOpenEditTemplateDialog(false);
      setEditingTemplate(null);
      setTemplateForm({ name: '', type: '', description: '' });
      alert('Template updated successfully!');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Transactions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage employee lifecycle transactions and approvals with automated workflows
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateTransaction}
          sx={{ borderRadius: 2 }}
        >
          Create Transaction
        </Button>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreateTransaction}>
            <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Hire Employee</Typography>
            <Typography variant="body2" color="text.secondary">
              Create hire transaction
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => {
            setTransactionForm({
              type: 'Promote',
              workerId: '',
              workerName: '',
              priority: 'Medium',
              description: '',
              dueDate: '',
              estimatedDuration: '',
              isUrgent: false,
              requiresImmediateAttention: false,
              comments: '',
              templateId: ''
            });
            setWizardStep(0);
            setOpenTransactionDialog(true);
          }}>
            <TrendingUpIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Promote Employee</Typography>
            <Typography variant="body2" color="text.secondary">
              Create promotion transaction
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => {
            setTransactionForm({
              type: 'Transfer',
              workerId: '',
              workerName: '',
              priority: 'Medium',
              description: '',
              dueDate: '',
              estimatedDuration: '',
              isUrgent: false,
              requiresImmediateAttention: false,
              comments: '',
              templateId: ''
            });
            setWizardStep(0);
            setOpenTransactionDialog(true);
          }}>
            <TransferIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Transfer Employee</Typography>
            <Typography variant="body2" color="text.secondary">
              Create transfer transaction
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => {
            setTransactionForm({
              type: 'Terminate',
              workerId: '',
              workerName: '',
              priority: 'Medium',
              description: '',
              dueDate: '',
              estimatedDuration: '',
              isUrgent: false,
              requiresImmediateAttention: false,
              comments: '',
              templateId: ''
            });
            setWizardStep(0);
            setOpenTransactionDialog(true);
          }}>
            <ExitIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">Terminate Employee</Typography>
            <Typography variant="body2" color="text.secondary">
              Create termination transaction
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Active Transactions" />
          <Tab label="Transaction History" />
          <Tab label="Pending Approvals" />
          <Tab label="Transaction Templates" />
          <Tab label="Transaction Monitoring" />
        </Tabs>
      </Box>

      {/* Active Transactions Tab */}
      {selectedTab === 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Active Transactions</Typography>
              <Button startIcon={<AddIcon />} onClick={handleCreateTransaction}>
                Create Transaction
              </Button>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction</TableCell>
                    <TableCell>Worker</TableCell>
                    <TableCell>Initiator</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTransactionTypeIcon(transaction.type)}
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {transaction.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {transaction.description}
                            </Typography>
                            {transaction.isUrgent && (
                              <Chip label="Urgent" size="small" color="error" sx={{ mt: 0.5 }} />
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            <AccountIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {transaction.workerName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {transaction.workerId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{transaction.initiator}</TableCell>
                      <TableCell>
                        <Box sx={{ width: 200 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">
                              {transaction.completedSteps}/{transaction.totalSteps} steps
                            </Typography>
                            <Typography variant="body2">
                              {getCompletionPercentage(transaction)}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={getCompletionPercentage(transaction)}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {transaction.dueDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {transaction.estimatedDuration}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.priority}
                          size="small"
                          color={getPriorityColor(transaction.priority)}
                          icon={transaction.priority === 'Critical' ? <ErrorIcon /> : undefined}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          size="small"
                          color={getStatusColor(transaction.status)}
                          icon={transaction.status === 'Completed' ? <CheckCircleIcon /> : 
                                transaction.status === 'In Progress' ? <PlayIcon /> : 
                                transaction.status === 'Pending' ? <ScheduleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View History">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleViewHistory(transaction)}
                            >
                              <HistoryIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton 
                              size="small" 
                              color="info"
                              onClick={() => handleEditTransaction(transaction)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteTransaction(transaction)}
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
      )}

      {/* Transaction History Tab */}
      {selectedTab === 1 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              View completed and historical transactions
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction</TableCell>
                    <TableCell>Worker</TableCell>
                    <TableCell>Completed Date</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUpIcon color="primary" />
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            Promote
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Promoting Mike Chen to Senior Engineer
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>Mike Chen (EMP002)</TableCell>
                    <TableCell>2024-01-16</TableCell>
                    <TableCell>3 days</TableCell>
                    <TableCell>
                      <Chip label="Completed" size="small" color="success" icon={<CheckCircleIcon />} />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleViewTransaction({
                          id: '2',
                          type: 'Promote',
                          workerName: 'Mike Chen',
                          workerId: 'EMP002',
                          initiator: 'Lisa Rodriguez',
                          startDate: '2024-01-14',
                          status: 'Completed',
                          currentStep: 'Complete',
                          description: 'Promoting Mike Chen to Senior Software Engineer - Full Stack Team',
                          priority: 'Medium',
                          dueDate: '2024-01-18',
                          estimatedDuration: '4 days',
                          actualDuration: '3 days',
                          approvalCount: 2,
                          completedSteps: 4,
                          totalSteps: 4,
                          comments: ['Performance review completed', 'Manager approval received'],
                          attachments: ['Performance_Review.pdf', 'Promotion_Letter.docx'],
                          isUrgent: false,
                          requiresImmediateAttention: false
                        })}
                      >
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

      {/* Pending Approvals Tab */}
      {selectedTab === 2 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Pending Approvals
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Transactions awaiting your approval
            </Typography>
            <List>
              {transactionSteps.filter(step => step.isApproval && step.status === 'In Progress').map((step) => (
                <React.Fragment key={step.id}>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Hire Employee - John Doe`}
                      secondary={`${step.name} • Due: ${step.dueDate}`}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleApproveStep(step)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={() => {
                          setRejectingTransaction({
                            id: '1',
                            type: 'Hire',
                            workerName: 'John Doe',
                            workerId: 'EMP001',
                            initiator: 'Sarah Johnson',
                            startDate: '2024-01-15',
                            status: 'In Progress',
                            currentStep: 'HR Approval',
                            description: 'Hiring John Doe as Software Engineer',
                            priority: 'High',
                            dueDate: '2024-01-20',
                            estimatedDuration: '5 days',
                            approvalCount: 3,
                            completedSteps: 2,
                            totalSteps: 5,
                            comments: ['Initial screening completed'],
                            attachments: ['Resume.pdf'],
                            isUrgent: true,
                            requiresImmediateAttention: false
                          });
                          setOpenRejectDialog(true);
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Transaction Templates Tab */}
      {selectedTab === 3 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Transaction Templates</Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setOpenTemplateDialog(true)}
              >
                Create Template
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Pre-configured transaction templates for common scenarios
            </Typography>
            <Grid container spacing={2}>
              {transactionTemplates.map((template) => (
                <Grid item xs={12} md={4} key={template.id}>
                  <Card variant="outlined" sx={{ p: 2, cursor: 'pointer' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <AssignmentIcon color="primary" />
                      <Typography variant="h6">{template.name}</Typography>
                      {template.isDefault && (
                        <Chip label="Default" size="small" color="primary" />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {template.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight="medium" gutterBottom>
                        Steps:
                      </Typography>
                      <Stack spacing={0.5}>
                        {template.steps.map((step, index) => (
                          <Typography key={index} variant="body2" color="text.secondary">
                            {index + 1}. {step}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => {
                          // Use template to create new transaction
                          setTransactionForm({
                            type: template.type,
                            workerId: '',
                            workerName: '',
                            priority: 'Medium',
                            description: '',
                            dueDate: '',
                            estimatedDuration: '',
                            isUrgent: false,
                            requiresImmediateAttention: false,
                            comments: '',
                            templateId: template.id
                          });
                          setWizardStep(0);
                          setOpenTransactionDialog(true);
                        }}
                      >
                        Use Template
                      </Button>
                      <IconButton 
                        size="small" 
                        color="info"
                        onClick={() => handleOpenEditTemplate(template)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => {
                          setDeletingTemplate(template);
                          setOpenTemplateDeleteDialog(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Transaction Monitoring Tab */}
      {selectedTab === 4 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Transaction Monitoring
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Real-time monitoring and analytics for transaction processing
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Transaction Status Overview
                    </Typography>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>In Progress</Typography>
                        <Chip label="2" color="info" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Pending</Typography>
                        <Chip label="1" color="warning" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Completed</Typography>
                        <Chip label="1" color="success" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Urgent</Typography>
                        <Chip label="2" color="error" />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Average Processing Time
                    </Typography>
                    <Typography variant="h4" color="primary" gutterBottom>
                      4.2 days
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last 30 days average
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Multi-step Transaction Creation Dialog */}
      <Dialog open={openTransactionDialog} onClose={() => setOpenTransactionDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Transaction</DialogTitle>
        <DialogContent>
          <Stepper activeStep={wizardStep} alternativeLabel sx={{ mb: 3 }}>
            <Step><StepLabel>Basic Info</StepLabel></Step>
            <Step><StepLabel>Worker Details</StepLabel></Step>
            <Step><StepLabel>Process Settings</StepLabel></Step>
            <Step><StepLabel>Review & Submit</StepLabel></Step>
          </Stepper>
          
          {wizardStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Transaction Type</InputLabel>
                  <Select
                    label="Transaction Type"
                    value={transactionForm.type}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <MenuItem value="Hire">Hire Employee</MenuItem>
                    <MenuItem value="Terminate">Terminate Employee</MenuItem>
                    <MenuItem value="Promote">Promote Employee</MenuItem>
                    <MenuItem value="Transfer">Transfer Employee</MenuItem>
                    <MenuItem value="Job Change">Job Change</MenuItem>
                    <MenuItem value="Compensation Change">Compensation Change</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    label="Priority"
                    value={transactionForm.priority}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={transactionForm.description}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the transaction details"
                />
              </Grid>
            </Grid>
          )}
          
          {wizardStep === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Worker ID"
                  value={transactionForm.workerId}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, workerId: e.target.value }))}
                  placeholder="Enter worker ID"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Worker Name"
                  value={transactionForm.workerName}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, workerName: e.target.value }))}
                  placeholder="Enter worker name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  value={transactionForm.dueDate}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Estimated Duration"
                  value={transactionForm.estimatedDuration}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                  placeholder="e.g., 5 days"
                />
              </Grid>
            </Grid>
          )}
          
          {wizardStep === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={transactionForm.isUrgent}
                      onChange={(e) => setTransactionForm(prev => ({ ...prev, isUrgent: e.target.checked }))}
                    />
                  }
                  label="Mark as Urgent"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={transactionForm.requiresImmediateAttention}
                      onChange={(e) => setTransactionForm(prev => ({ ...prev, requiresImmediateAttention: e.target.checked }))}
                    />
                  }
                  label="Requires Immediate Attention"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Comments"
                  value={transactionForm.comments}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, comments: e.target.value }))}
                  placeholder="Additional comments or notes"
                />
              </Grid>
            </Grid>
          )}
          
          {wizardStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>Review Transaction Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Type:</Typography>
                  <Typography variant="body1">{transactionForm.type}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Priority:</Typography>
                  <Typography variant="body1">{transactionForm.priority}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Worker:</Typography>
                  <Typography variant="body1">{transactionForm.workerName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Due Date:</Typography>
                  <Typography variant="body1">{transactionForm.dueDate}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Description:</Typography>
                  <Typography variant="body1">{transactionForm.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTransactionDialog(false)}>Cancel</Button>
          {wizardStep > 0 && (
            <Button onClick={() => setWizardStep(prev => prev - 1)}>Back</Button>
          )}
          {wizardStep < 3 ? (
            <Button variant="contained" onClick={() => setWizardStep(prev => prev + 1)}>
              Next
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSaveTransaction}>
              Create Transaction
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Edit Transaction Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <Stepper activeStep={wizardStep} alternativeLabel sx={{ mb: 3 }}>
            <Step><StepLabel>Basic Info</StepLabel></Step>
            <Step><StepLabel>Worker Details</StepLabel></Step>
            <Step><StepLabel>Process Settings</StepLabel></Step>
            <Step><StepLabel>Review & Submit</StepLabel></Step>
          </Stepper>
          
          {wizardStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Transaction Type</InputLabel>
                  <Select
                    label="Transaction Type"
                    value={transactionForm.type}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <MenuItem value="Hire">Hire Employee</MenuItem>
                    <MenuItem value="Terminate">Terminate Employee</MenuItem>
                    <MenuItem value="Promote">Promote Employee</MenuItem>
                    <MenuItem value="Transfer">Transfer Employee</MenuItem>
                    <MenuItem value="Job Change">Job Change</MenuItem>
                    <MenuItem value="Compensation Change">Compensation Change</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    label="Priority"
                    value={transactionForm.priority}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={transactionForm.description}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the transaction details"
                />
              </Grid>
            </Grid>
          )}
          
          {wizardStep === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Worker ID"
                  value={transactionForm.workerId}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, workerId: e.target.value }))}
                  placeholder="Enter worker ID"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Worker Name"
                  value={transactionForm.workerName}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, workerName: e.target.value }))}
                  placeholder="Enter worker name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  value={transactionForm.dueDate}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Estimated Duration"
                  value={transactionForm.estimatedDuration}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                  placeholder="e.g., 5 days"
                />
              </Grid>
            </Grid>
          )}
          
          {wizardStep === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={transactionForm.isUrgent}
                      onChange={(e) => setTransactionForm(prev => ({ ...prev, isUrgent: e.target.checked }))}
                    />
                  }
                  label="Mark as Urgent"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={transactionForm.requiresImmediateAttention}
                      onChange={(e) => setTransactionForm(prev => ({ ...prev, requiresImmediateAttention: e.target.checked }))}
                    />
                  }
                  label="Requires Immediate Attention"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Comments"
                  value={transactionForm.comments}
                  onChange={(e) => setTransactionForm(prev => ({ ...prev, comments: e.target.value }))}
                  placeholder="Additional comments or notes"
                />
              </Grid>
            </Grid>
          )}
          
          {wizardStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>Review Transaction Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Type:</Typography>
                  <Typography variant="body1">{transactionForm.type}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Priority:</Typography>
                  <Typography variant="body1">{transactionForm.priority}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Worker:</Typography>
                  <Typography variant="body1">{transactionForm.workerName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Due Date:</Typography>
                  <Typography variant="body1">{transactionForm.dueDate}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Description:</Typography>
                  <Typography variant="body1">{transactionForm.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          {wizardStep > 0 && (
            <Button onClick={() => setWizardStep(prev => prev - 1)}>Back</Button>
          )}
          {wizardStep < 3 ? (
            <Button variant="contained" onClick={() => setWizardStep(prev => prev + 1)}>
              Next
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSaveEdit}>
              Update Transaction
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Transaction</DialogTitle>
        <DialogContent>
          {deletingTransaction && (
            <Typography>
              Are you sure you want to delete this transaction?
              <br />
              <b>Transaction:</b> {deletingTransaction.type} - {deletingTransaction.workerName}
              <br />
              <b>Description:</b> {deletingTransaction.description}
              <br />
              This action cannot be undone.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transaction History Dialog */}
      <Dialog open={openHistoryDialog} onClose={() => setOpenHistoryDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTransaction?.type} - {selectedTransaction?.workerName}
        </DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {selectedTransaction.description}
              </Typography>
              
              {/* Transaction Details */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Initiator:</Typography>
                  <Typography variant="body1">{selectedTransaction.initiator}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Start Date:</Typography>
                  <Typography variant="body1">{selectedTransaction.startDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Due Date:</Typography>
                  <Typography variant="body1">{selectedTransaction.dueDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Priority:</Typography>
                  <Chip label={selectedTransaction.priority} size="small" color={getPriorityColor(selectedTransaction.priority)} />
                </Grid>
              </Grid>
              
              {/* Progress */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Progress</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="body2">
                    {selectedTransaction.completedSteps}/{selectedTransaction.totalSteps} steps completed
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {getCompletionPercentage(selectedTransaction)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={getCompletionPercentage(selectedTransaction)}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              
              {/* Steps Timeline */}
              <Box sx={{ position: 'relative' }}>
                <Typography variant="h6" gutterBottom>Process Steps</Typography>
                {transactionSteps.map((step, index) => (
                  <Box key={step.id} sx={{ display: 'flex', mb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: getStatusColor(step.status),
                          width: 40,
                          height: 40,
                          mb: 1
                        }}
                      >
                        {getStepStatusIcon(step.status)}
                      </Avatar>
                      {index < transactionSteps.length - 1 && (
                        <Box
                          sx={{
                            width: 2,
                            height: 40,
                            bgcolor: 'divider',
                            my: 1
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" component="span">
                          {step.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.dueDate}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {step.assignee}
                      </Typography>
                      {step.comments && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {step.comments}
                        </Typography>
                      )}
                      {step.isApproval && step.status === 'In Progress' && (
                        <Box sx={{ mt: 1 }}>
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="success" 
                            sx={{ mr: 1 }}
                            onClick={() => handleApproveStep(step)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error"
                            onClick={() => {
                              alert('Step rejected successfully!');
                            }}
                          >
                            Reject
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
              
              {/* Comments */}
              {selectedTransaction.comments.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>Comments</Typography>
                  <Stack spacing={1}>
                    {selectedTransaction.comments.map((comment, index) => (
                      <Typography key={index} variant="body2" sx={{ p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                        {comment}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHistoryDialog(false)}>Close</Button>
          <Button 
            variant="contained"
            onClick={() => {
              if (selectedTransaction) {
                handleEditTransaction(selectedTransaction);
                setOpenHistoryDialog(false);
              }
            }}
          >
            Take Action
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={openApprovalDialog} onClose={() => setOpenApprovalDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Approve Transaction Step</DialogTitle>
        <DialogContent>
          {selectedStep && (
            <Box>
              <Typography variant="h6" gutterBottom>{selectedStep.name}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Assignee: {selectedStep.assignee}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Comments (Required)"
                placeholder="Enter your approval comments"
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenApprovalDialog(false)}>Cancel</Button>
          <Button variant="contained" color="success">
            Approve
          </Button>
          <Button variant="outlined" color="error">
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* Template Dialog */}
      <Dialog open={openTemplateDialog} onClose={() => setOpenTemplateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Transaction Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Template Name"
                placeholder="e.g., Standard Hire"
                value={templateForm.name}
                onChange={e => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  label="Transaction Type"
                  value={templateForm.type}
                  onChange={e => setTemplateForm(prev => ({ ...prev, type: e.target.value }))}
                >
                  <MenuItem value="Hire">Hire</MenuItem>
                  <MenuItem value="Promote">Promote</MenuItem>
                  <MenuItem value="Transfer">Transfer</MenuItem>
                  <MenuItem value="Terminate">Terminate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Template description"
                value={templateForm.description}
                onChange={e => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateTemplate}>Create Template</Button>
        </DialogActions>
      </Dialog>

      {/* Reject Transaction Dialog */}
      <Dialog open={openRejectDialog} onClose={() => setOpenRejectDialog(false)}>
        <DialogTitle>Reject Transaction</DialogTitle>
        <DialogContent>
          {rejectingTransaction && (
            <Typography>
              Are you sure you want to reject this transaction?
              <br />
              <b>Transaction:</b> {rejectingTransaction.type} - {rejectingTransaction.workerName}
              <br />
              <b>Description:</b> {rejectingTransaction.description}
              <br />
              This action will stop the transaction process.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmReject}>
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Template Dialog */}
      <Dialog open={openTemplateDeleteDialog} onClose={() => setOpenTemplateDeleteDialog(false)}>
        <DialogTitle>Delete Template</DialogTitle>
        <DialogContent>
          {deletingTemplate && (
            <Typography>
              Are you sure you want to delete this template?
              <br />
              <b>Template:</b> {deletingTemplate.name}
              <br />
              <b>Type:</b> {deletingTemplate.type}
              <br />
              <b>Description:</b> {deletingTemplate.description}
              <br />
              This action cannot be undone.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDeleteDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmTemplateDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={openEditTemplateDialog} onClose={() => setOpenEditTemplateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Transaction Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Template Name"
                value={templateForm.name}
                onChange={e => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  label="Transaction Type"
                  value={templateForm.type}
                  onChange={e => setTemplateForm(prev => ({ ...prev, type: e.target.value }))}
                >
                  <MenuItem value="Hire">Hire</MenuItem>
                  <MenuItem value="Promote">Promote</MenuItem>
                  <MenuItem value="Transfer">Transfer</MenuItem>
                  <MenuItem value="Terminate">Terminate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={templateForm.description}
                onChange={e => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditTemplateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEditTemplate}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transactions; 