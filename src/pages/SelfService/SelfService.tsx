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
  Avatar,
  Stack,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Divider,
  Alert,
  Badge,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Switch
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Assignment as AssignmentIcon,
  SupervisorAccount as ManagerIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  MonetizationOn as MoneyIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  CalendarToday as CalendarIcon,
  AccountCircle as AccountIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  HealthAndSafety as HealthIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';

interface EmployeeInfo {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  manager: string;
  location: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  startDate: string;
  status: 'Active' | 'Inactive';
}

interface PayrollInfo {
  id: string;
  period: string;
  grossPay: number;
  netPay: number;
  deductions: number;
  taxes: number;
  status: 'Paid' | 'Pending' | 'Processing';
}

interface TimeOffRequest {
  id: string;
  type: 'Vacation' | 'Sick' | 'Personal' | 'Bereavement';
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  manager: string;
  reason: string;
}

interface TeamMember {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  location: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  performance: 'Exceeds' | 'Meets' | 'Below';
  lastReview: string;
}

const SelfService: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openTimeOffDialog, setOpenTimeOffDialog] = useState(false);
  const [openTeamDialog, setOpenTeamDialog] = useState(false);

  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo>({
    id: 'EMP001',
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    manager: 'Sarah Johnson',
    location: 'San Francisco',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94102',
    emergencyContact: 'Jane Doe (Spouse) - +1 (555) 987-6543',
    startDate: '2023-01-15',
    status: 'Active'
  });

  const [payrollHistory, setPayrollHistory] = useState<PayrollInfo[]>([
    {
      id: '1',
      period: 'January 2024',
      grossPay: 8500,
      netPay: 6800,
      deductions: 1200,
      taxes: 500,
      status: 'Paid'
    },
    {
      id: '2',
      period: 'December 2023',
      grossPay: 8500,
      netPay: 6800,
      deductions: 1200,
      taxes: 500,
      status: 'Paid'
    },
    {
      id: '3',
      period: 'November 2023',
      grossPay: 8500,
      netPay: 6800,
      deductions: 1200,
      taxes: 500,
      status: 'Paid'
    }
  ]);

  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([
    {
      id: '1',
      type: 'Vacation',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      days: 5,
      status: 'Approved',
      manager: 'Sarah Johnson',
      reason: 'Family vacation'
    },
    {
      id: '2',
      type: 'Sick',
      startDate: '2024-01-10',
      endDate: '2024-01-10',
      days: 1,
      status: 'Approved',
      manager: 'Sarah Johnson',
      reason: 'Not feeling well'
    }
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Mike Chen',
      jobTitle: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco',
      status: 'Active',
      performance: 'Exceeds',
      lastReview: '2023-12-15'
    },
    {
      id: '2',
      name: 'Emily Wilson',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      location: 'San Francisco',
      status: 'Active',
      performance: 'Meets',
      lastReview: '2023-12-10'
    },
    {
      id: '3',
      name: 'Alex Johnson',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      status: 'On Leave',
      performance: 'Meets',
      lastReview: '2023-12-05'
    }
  ]);

  const handleEditInfo = () => {
    setOpenEditDialog(true);
  };

  const handleRequestTimeOff = () => {
    setOpenTimeOffDialog(true);
  };

  const handleViewTeam = () => {
    setOpenTeamDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Approved': return 'success';
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Processing': return 'info';
      case 'Rejected': return 'error';
      case 'On Leave': return 'warning';
      case 'Terminated': return 'error';
      default: return 'default';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Exceeds': return 'success';
      case 'Meets': return 'info';
      case 'Below': return 'error';
      default: return 'default';
    }
  };

  const getTimeOffTypeIcon = (type: string) => {
    switch (type) {
      case 'Vacation': return <CalendarIcon />;
      case 'Sick': return <HealthIcon />;
      case 'Personal': return <PersonIcon />;
      case 'Bereavement': return <InfoIcon />;
      default: return <CalendarIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Self Service
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your personal information, view pay, request time off, and more
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<NotificationsIcon />}>
            Notifications
          </Button>
          <Button variant="outlined" startIcon={<HelpIcon />}>
            Help
          </Button>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleEditInfo}>
            <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">My Information</Typography>
            <Typography variant="body2" color="text.secondary">
              View and edit personal info
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleRequestTimeOff}>
            <CalendarIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Time Off</Typography>
            <Typography variant="body2" color="text.secondary">
              Request time off
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
            <PaymentIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Pay & Benefits</Typography>
            <Typography variant="body2" color="text.secondary">
              View pay and benefits
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleViewTeam}>
            <PeopleIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">My Team</Typography>
            <Typography variant="body2" color="text.secondary">
              View team information
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="My Information" />
          <Tab label="Time Off" />
          <Tab label="Pay & Benefits" />
          <Tab label="My Team" />
        </Tabs>
      </Box>

      {/* My Information Tab */}
      {selectedTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Personal Information</Typography>
                  <Button startIcon={<EditIcon />} onClick={handleEditInfo}>
                    Edit Information
                  </Button>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ width: 64, height: 64 }}>
                        <AccountIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{employeeInfo.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {employeeInfo.jobTitle}
                        </Typography>
                        <Chip 
                          label={employeeInfo.status} 
                          size="small" 
                          color={getStatusColor(employeeInfo.status)}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WorkIcon color="action" />
                        <Typography variant="body2">
                          <strong>Department:</strong> {employeeInfo.department}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ManagerIcon color="action" />
                        <Typography variant="body2">
                          <strong>Manager:</strong> {employeeInfo.manager}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon color="action" />
                        <Typography variant="body2">
                          <strong>Location:</strong> {employeeInfo.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon color="action" />
                        <Typography variant="body2">
                          <strong>Email:</strong> {employeeInfo.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon color="action" />
                        <Typography variant="body2">
                          <strong>Phone:</strong> {employeeInfo.phone}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <List>
                  <ListItem button>
                    <ListItemIcon><EditIcon /></ListItemIcon>
                    <ListItemText primary="Update Personal Info" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Change Address" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><PhoneIcon /></ListItemIcon>
                    <ListItemText primary="Update Contact Info" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><SecurityIcon /></ListItemIcon>
                    <ListItemText primary="Change Password" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Time Off Tab */}
      {selectedTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Time Off Requests</Typography>
                  <Button startIcon={<AddIcon />} onClick={handleRequestTimeOff}>
                    Request Time Off
                  </Button>
                </Box>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Dates</TableCell>
                        <TableCell>Days</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Manager</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {timeOffRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getTimeOffTypeIcon(request.type)}
                              <Typography variant="body2">
                                {request.type}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {request.startDate} - {request.endDate}
                          </TableCell>
                          <TableCell>{request.days}</TableCell>
                          <TableCell>
                            <Chip
                              label={request.status}
                              size="small"
                              color={getStatusColor(request.status)}
                            />
                          </TableCell>
                          <TableCell>{request.manager}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="View Details">
                                <IconButton size="small" color="primary">
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Cancel">
                                <IconButton size="small" color="warning">
                                  <CancelIcon />
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
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Time Off Balance
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Vacation</Typography>
                      <Typography variant="body2">15 days remaining</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={60} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Sick Leave</Typography>
                      <Typography variant="body2">8 days remaining</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={80} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Personal Days</Typography>
                      <Typography variant="body2">3 days remaining</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={70} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Pay & Benefits Tab */}
      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Pay History
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Period</TableCell>
                        <TableCell>Gross Pay</TableCell>
                        <TableCell>Net Pay</TableCell>
                        <TableCell>Deductions</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payrollHistory.map((payroll) => (
                        <TableRow key={payroll.id}>
                          <TableCell>{payroll.period}</TableCell>
                          <TableCell>${payroll.grossPay.toLocaleString()}</TableCell>
                          <TableCell>${payroll.netPay.toLocaleString()}</TableCell>
                          <TableCell>${payroll.deductions.toLocaleString()}</TableCell>
                          <TableCell>
                            <Chip
                              label={payroll.status}
                              size="small"
                              color={getStatusColor(payroll.status)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="View Payslip">
                                <IconButton size="small" color="primary">
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Download">
                                <IconButton size="small" color="info">
                                  <DownloadIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Print">
                                <IconButton size="small">
                                  <PrintIcon />
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
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Benefits Summary
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Health Insurance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Blue Cross Blue Shield - Family Plan
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      401(k) Retirement
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      6% contribution + 3% match
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Life Insurance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      2x annual salary coverage
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* My Team Tab */}
      {selectedTab === 3 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">My Team</Typography>
              <Button startIcon={<AddIcon />}>
                Add Team Member
              </Button>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Team Member</TableCell>
                    <TableCell>Job Title</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell>Last Review</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            <AccountIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {member.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {member.department}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{member.jobTitle}</TableCell>
                      <TableCell>{member.location}</TableCell>
                      <TableCell>
                        <Chip
                          label={member.status}
                          size="small"
                          color={getStatusColor(member.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={member.performance}
                          size="small"
                          color={getPerformanceColor(member.performance)}
                        />
                      </TableCell>
                      <TableCell>{member.lastReview}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Profile">
                            <IconButton size="small" color="primary">
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Performance Review">
                            <IconButton size="small" color="info">
                              <TrendingIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="More Actions">
                            <IconButton size="small">
                              <MoreIcon />
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

      {/* Edit Information Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue="John"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                defaultValue="Doe"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                defaultValue="john.doe@company.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue="+1 (555) 123-4567"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                defaultValue="123 Main St, San Francisco, CA 94102"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact"
                defaultValue="Jane Doe (Spouse) - +1 (555) 987-6543"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={() => setOpenEditDialog(false)}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request Time Off Dialog */}
      <Dialog open={openTimeOffDialog} onClose={() => setOpenTimeOffDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Request Time Off</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Time Off Type</InputLabel>
                <Select label="Time Off Type">
                  <MenuItem value="Vacation">Vacation</MenuItem>
                  <MenuItem value="Sick">Sick Leave</MenuItem>
                  <MenuItem value="Personal">Personal Day</MenuItem>
                  <MenuItem value="Bereavement">Bereavement</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Days"
                type="number"
                defaultValue="1"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                defaultValue="2024-02-15"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                defaultValue="2024-02-15"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Reason"
                placeholder="Please provide a reason for your time off request"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTimeOffDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenTimeOffDialog(false)}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Team View Dialog */}
      <Dialog open={openTeamDialog} onClose={() => setOpenTeamDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>My Team</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Manage your team members and their performance
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Team Member</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <AccountIcon />
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {member.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{member.jobTitle}</TableCell>
                    <TableCell>
                      <Chip
                        label={member.status}
                        size="small"
                        color={getStatusColor(member.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={member.performance}
                        size="small"
                        color={getPerformanceColor(member.performance)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" variant="outlined">
                          View Profile
                        </Button>
                        <Button size="small" variant="outlined">
                          Performance Review
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTeamDialog(false)}>Close</Button>
          <Button variant="contained">Add Team Member</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SelfService; 