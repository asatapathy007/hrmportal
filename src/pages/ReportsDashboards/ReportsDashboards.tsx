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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge,
  Snackbar,
  Tabs,
  Tab,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp as TrendingIcon,
  TrendingDown as TrendingDownIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Share as ShareIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  TableChart as TableChartIcon,
  ShowChart as ShowChartIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  GetApp as GetAppIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';

interface Report {
  id: string;
  name: string;
  type: 'Custom Report' | 'Dashboard' | 'Worklet' | 'Matrix Report' | 'Trending Report';
  category: 'Compensation' | 'Headcount' | 'Job History' | 'Performance' | 'Time Tracking';
  description: string;
  createdBy: string;
  lastRun: string;
  status: 'Active' | 'Inactive' | 'Draft';
  isFavorite: boolean;
  schedule: string;
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: number;
  lastUpdated: string;
  createdBy: string;
  isPublic: boolean;
  isFavorite: boolean;
}

interface ReportData {
  category: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

const ReportsDashboards: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [openCreateDashboardDialog, setOpenCreateDashboardDialog] = useState(false);
  const [createDashboardForm, setCreateDashboardForm] = useState<Partial<Dashboard>>({ name: '', description: '', widgets: 1, isPublic: false });

  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Headcount by Department',
      type: 'Custom Report',
      category: 'Headcount',
      description: 'Detailed headcount analysis by department and location',
      createdBy: 'Sarah Johnson',
      lastRun: '2024-01-15 14:30',
      status: 'Active',
      isFavorite: true,
      schedule: 'Monthly'
    },
    {
      id: '2',
      name: 'Compensation Analysis',
      type: 'Matrix Report',
      category: 'Compensation',
      description: 'Compensation analysis by job level and location',
      createdBy: 'Lisa Rodriguez',
      lastRun: '2024-01-14 16:45',
      status: 'Active',
      isFavorite: false,
      schedule: 'Quarterly'
    },
    {
      id: '3',
      name: 'Employee Performance Dashboard',
      type: 'Dashboard',
      category: 'Performance',
      description: 'Real-time performance metrics and KPIs',
      createdBy: 'David Brown',
      lastRun: '2024-01-15 09:15',
      status: 'Active',
      isFavorite: true,
      schedule: 'Daily'
    },
    {
      id: '4',
      name: 'Time Tracking Summary',
      type: 'Worklet',
      category: 'Time Tracking',
      description: 'Weekly time tracking summary for managers',
      createdBy: 'Mike Chen',
      lastRun: '2024-01-13 17:20',
      status: 'Active',
      isFavorite: false,
      schedule: 'Weekly'
    }
  ]);

  const [dashboards, setDashboards] = useState<Dashboard[]>([
    {
      id: '1',
      name: 'HR Executive Dashboard',
      description: 'High-level HR metrics and KPIs for executives',
      widgets: 8,
      lastUpdated: '2024-01-15',
      createdBy: 'Sarah Johnson',
      isPublic: true,
      isFavorite: true
    },
    {
      id: '2',
      name: 'Recruitment Analytics',
      description: 'Recruitment metrics and pipeline analysis',
      widgets: 6,
      lastUpdated: '2024-01-14',
      createdBy: 'Lisa Rodriguez',
      isPublic: false,
      isFavorite: false
    },
    {
      id: '3',
      name: 'Compensation Overview',
      description: 'Compensation trends and analysis',
      widgets: 5,
      lastUpdated: '2024-01-13',
      createdBy: 'David Brown',
      isPublic: true,
      isFavorite: true
    }
  ]);

  const [reportData, setReportData] = useState<ReportData[]>([
    { category: 'Total Employees', value: 1250, change: 5.2, trend: 'up' },
    { category: 'Active Recruitments', value: 45, change: -2.1, trend: 'down' },
    { category: 'Average Salary', value: 85000, change: 3.8, trend: 'up' },
    { category: 'Turnover Rate', value: 8.5, change: -1.2, trend: 'down' },
    { category: 'Performance Rating', value: 4.2, change: 0.3, trend: 'up' },
    { category: 'Training Completion', value: 92, change: 4.1, trend: 'up' }
  ]);

  const [openViewReportDialog, setOpenViewReportDialog] = useState(false);
  const [openEditReportDialog, setOpenEditReportDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [editReportForm, setEditReportForm] = useState<Partial<Report>>({});

  const [openViewDashboardDialog, setOpenViewDashboardDialog] = useState(false);
  const [openEditDashboardDialog, setOpenEditDashboardDialog] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
  const [editDashboardForm, setEditDashboardForm] = useState<Partial<Dashboard>>({});

  const [openDeleteReportDialog, setOpenDeleteReportDialog] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [openDeleteDashboardDialog, setOpenDeleteDashboardDialog] = useState(false);
  const [dashboardToDelete, setDashboardToDelete] = useState<Dashboard | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const [createReportForm, setCreateReportForm] = useState<Partial<Report>>({ name: '', type: 'Custom Report', category: 'Headcount', description: '' });

  const [scheduledReports, setScheduledReports] = useState([
    {
      id: '1',
      name: 'Monthly Headcount Report',
      schedule: 'Monthly (1st of month)',
      recipients: 'HR Managers, Executives',
      nextRun: '2024-02-01 09:00',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Weekly Performance Summary',
      schedule: 'Weekly (Monday)',
      recipients: 'Department Managers',
      nextRun: '2024-01-22 08:00',
      status: 'Active'
    }
  ]);
  const [openEditScheduledDialog, setOpenEditScheduledDialog] = useState(false);
  const [editScheduledForm, setEditScheduledForm] = useState<any>({});
  const [scheduledToEdit, setScheduledToEdit] = useState<any>(null);

  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ type?: string; category?: string; status?: string; schedule?: string }>({});

  // Filtered reports
  const filteredReports = reports.filter(r => {
    // Search
    const matchesSearch = !searchTerm || [r.name, r.type, r.category, r.description].some(val => val.toLowerCase().includes(searchTerm.toLowerCase()));
    // Filters
    const matchesType = !activeFilters.type || r.type === activeFilters.type;
    const matchesCategory = !activeFilters.category || r.category === activeFilters.category;
    const matchesStatus = !activeFilters.status || r.status === activeFilters.status;
    const matchesSchedule = !activeFilters.schedule || r.schedule === activeFilters.schedule;
    return matchesSearch && matchesType && matchesCategory && matchesStatus && matchesSchedule;
  });

  // Handler for Use Template
  const handleUseTemplate = (template: { name: string; type: Report['type']; category: Report['category']; description: string }) => {
    setCreateReportForm({
      name: template.name,
      type: template.type,
      category: template.category,
      description: template.description
    });
    setOpenCreateDialog(true);
  };

  const handleCreateReport = () => {
    setOpenCreateDialog(true);
  };

  const handleScheduleReport = () => {
    setOpenScheduleDialog(true);
  };

  const handleShareReport = () => {
    setOpenShareDialog(true);
  };

  // Handlers for Reports
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setOpenViewReportDialog(true);
  };
  const handleEditReport = (report: Report) => {
    setSelectedReport(report);
    setEditReportForm({ ...report });
    setOpenEditReportDialog(true);
  };
  const handleSaveEditReport = () => {
    if (!editReportForm.name || !editReportForm.type || !editReportForm.category) {
      alert('Name, Type, and Category are required');
      return;
    }
    setReports(prev => prev.map(r =>
      r.id === selectedReport?.id ? { ...r, ...editReportForm } as Report : r
    ));
    setOpenEditReportDialog(false);
    setSelectedReport(null);
    setEditReportForm({});
  };

  // Handlers for Dashboards
  const handleViewDashboard = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard);
    setOpenViewDashboardDialog(true);
  };
  const handleEditDashboard = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard);
    setEditDashboardForm({ ...dashboard });
    setOpenEditDashboardDialog(true);
  };
  const handleSaveEditDashboard = () => {
    if (!editDashboardForm.name || !editDashboardForm.description) {
      alert('Name and Description are required');
      return;
    }
    setDashboards(prev => prev.map(d =>
      d.id === selectedDashboard?.id ? { ...d, ...editDashboardForm } as Dashboard : d
    ));
    setOpenEditDashboardDialog(false);
    setSelectedDashboard(null);
    setEditDashboardForm({});
  };

  // Handler for Create Dashboard
  const handleCreateDashboard = () => {
    setOpenCreateDashboardDialog(true);
    setCreateDashboardForm({ name: '', description: '', widgets: 1, isPublic: false });
  };
  const handleSaveCreateDashboard = () => {
    if (!createDashboardForm.name || !createDashboardForm.description) {
      alert('Name and Description are required');
      return;
    }
    const newId = (Math.max(...dashboards.map(d => Number(d.id))) + 1).toString();
    setDashboards(prev => [
      ...prev,
      {
        id: newId,
        name: createDashboardForm.name!,
        description: createDashboardForm.description!,
        widgets: createDashboardForm.widgets || 1,
        lastUpdated: new Date().toISOString().slice(0, 10),
        createdBy: 'Current User',
        isPublic: !!createDashboardForm.isPublic,
        isFavorite: false
      }
    ]);
    setOpenCreateDashboardDialog(false);
    setSnackbar({ open: true, message: 'Dashboard created.' });
  };

  // Delete handlers
  const handleDeleteReport = (report: Report) => {
    setReportToDelete(report);
    setOpenDeleteReportDialog(true);
  };
  const confirmDeleteReport = () => {
    if (reportToDelete) {
      setReports(prev => prev.filter(r => r.id !== reportToDelete.id));
      setSnackbar({ open: true, message: 'Report deleted.' });
    }
    setOpenDeleteReportDialog(false);
    setReportToDelete(null);
  };
  const handleDeleteDashboard = (dashboard: Dashboard) => {
    setDashboardToDelete(dashboard);
    setOpenDeleteDashboardDialog(true);
  };
  const confirmDeleteDashboard = () => {
    if (dashboardToDelete) {
      setDashboards(prev => prev.filter(d => d.id !== dashboardToDelete.id));
      setSnackbar({ open: true, message: 'Dashboard deleted.' });
    }
    setOpenDeleteDashboardDialog(false);
    setDashboardToDelete(null);
  };
  // Duplicate handlers
  const handleDuplicateReport = (report: Report) => {
    const newId = (Math.max(...reports.map(r => Number(r.id))) + 1).toString();
    setReports(prev => [
      ...prev,
      { ...report, id: newId, name: report.name + ' (Copy)', isFavorite: false }
    ]);
    setSnackbar({ open: true, message: 'Report duplicated.' });
  };
  const handleDuplicateDashboard = (dashboard: Dashboard) => {
    const newId = (Math.max(...dashboards.map(d => Number(d.id))) + 1).toString();
    setDashboards(prev => [
      ...prev,
      { ...dashboard, id: newId, name: dashboard.name + ' (Copy)', isFavorite: false }
    ]);
    setSnackbar({ open: true, message: 'Dashboard duplicated.' });
  };
  // Export handlers
  const handleExportReport = (report: Report) => {
    setSnackbar({ open: true, message: `Exported '${report.name}' as PDF.` });
  };
  const handleExportDashboard = (dashboard: Dashboard) => {
    setSnackbar({ open: true, message: `Exported dashboard '${dashboard.name}' as PDF.` });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Draft': return 'warning';
      default: return 'default';
    }
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'Custom Report': return <AssessmentIcon />;
      case 'Dashboard': return <DashboardIcon />;
      case 'Worklet': return <BarChartIcon />;
      case 'Matrix Report': return <TableChartIcon />;
      case 'Trending Report': return <ShowChartIcon />;
      default: return <AssessmentIcon />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Compensation': return 'success';
      case 'Headcount': return 'primary';
      case 'Job History': return 'secondary';
      case 'Performance': return 'info';
      case 'Time Tracking': return 'warning';
      default: return 'default';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingIcon color="success" />;
      case 'down': return <TrendingDownIcon color="error" />;
      case 'stable': return <TrendingIcon color="action" />;
      default: return <TrendingIcon />;
    }
  };

  // Edit handler
  const handleEditScheduled = (report: any) => {
    setScheduledToEdit(report);
    setEditScheduledForm({ ...report });
    setOpenEditScheduledDialog(true);
  };
  const handleSaveEditScheduled = () => {
    setScheduledReports(prev => prev.map(r =>
      r.id === scheduledToEdit.id ? { ...r, ...editScheduledForm } : r
    ));
    setOpenEditScheduledDialog(false);
    setScheduledToEdit(null);
    setSnackbar({ open: true, message: 'Scheduled report updated.' });
  };
  // Pause handler
  const handlePauseScheduled = (report: any) => {
    setScheduledReports(prev => prev.map(r =>
      r.id === report.id ? { ...r, status: 'Paused' } : r
    ));
    setSnackbar({ open: true, message: 'Scheduled report paused.' });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Reports & Dashboards
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create, manage, and view reports, dashboards, and analytics
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<BarChartIcon />} onClick={handleScheduleReport}>
            Schedule Report
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateReport}>
            Create Report
          </Button>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {reportData.map((data, index) => (
          <Grid item xs={12} md={2} key={index}>
            <Card sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="primary" gutterBottom>
                {data.value.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {data.category}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                {getTrendIcon(data.trend)}
                <Typography variant="body2" color={data.trend === 'up' ? 'success.main' : 'error.main'}>
                  {data.change > 0 ? '+' : ''}{data.change}%
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreateReport}>
            <AssessmentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Create Report</Typography>
            <Typography variant="body2" color="text.secondary">
              Build custom reports
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreateDashboard}>
            <DashboardIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Build Dashboard</Typography>
            <Typography variant="body2" color="text.secondary">
              Create interactive dashboards
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSnackbar({ open: true, message: 'Analytics tools coming soon!' })}>
            <BarChartIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Analytics</Typography>
            <Typography variant="body2" color="text.secondary">
              Advanced analytics tools
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleShareReport}>
            <ShareIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">Share Reports</Typography>
            <Typography variant="body2" color="text.secondary">
              Share with stakeholders
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="My Reports" />
          <Tab label="Dashboards" />
          <Tab label="Scheduled Reports" />
          <Tab label="Report Templates" />
        </Tabs>
      </Box>

      {/* My Reports Tab */}
      {selectedTab === 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">My Reports</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button startIcon={<FilterIcon />} variant="outlined" onClick={() => setFilterDialogOpen(true)}>
                  Filter
                </Button>
                <Button startIcon={<SearchIcon />} variant="outlined" onClick={() => setSearchDialogOpen(true)}>
                  Search
                </Button>
                <Button startIcon={<AddIcon />} onClick={handleCreateReport}>
                  Create Report
                </Button>
              </Box>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Last Run</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {report.isFavorite && <StarIcon color="warning" />}
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {report.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {report.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getReportTypeIcon(report.type)}
                          <Typography variant="body2">
                            {report.type}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={report.category} 
                          size="small" 
                          color={getCategoryColor(report.category)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{report.createdBy}</TableCell>
                      <TableCell>{report.lastRun}</TableCell>
                      <TableCell>{report.schedule}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          size="small"
                          color={getStatusColor(report.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Run Report">
                            <IconButton size="small" color="primary">
                              <BarChartIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View">
                            <IconButton size="small" color="info" onClick={() => handleViewReport(report)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="warning" onClick={() => handleEditReport(report)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Duplicate">
                            <IconButton size="small" color="secondary" onClick={() => handleDuplicateReport(report)}>
                              <FileCopyIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Export">
                            <IconButton size="small" color="success" onClick={() => handleExportReport(report)}>
                              <GetAppIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error" onClick={() => handleDeleteReport(report)}>
                              <DeleteIcon />
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

      {/* Dashboards Tab */}
      {selectedTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Dashboards</Typography>
                  <Button startIcon={<AddIcon />}>
                    Create Dashboard
                  </Button>
                </Box>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Dashboard Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Widgets</TableCell>
                        <TableCell>Last Updated</TableCell>
                        <TableCell>Created By</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dashboards.map((dashboard) => (
                        <TableRow key={dashboard.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {dashboard.isFavorite && <StarIcon color="warning" />}
                              <Typography variant="body1" fontWeight="medium">
                                {dashboard.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{dashboard.description}</TableCell>
                          <TableCell>
                            <Badge badgeContent={dashboard.widgets} color="primary">
                              <DashboardIcon />
                            </Badge>
                          </TableCell>
                          <TableCell>{dashboard.lastUpdated}</TableCell>
                          <TableCell>{dashboard.createdBy}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="View Dashboard">
                                <IconButton size="small" color="primary" onClick={() => handleViewDashboard(dashboard)}>
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton size="small" color="info" onClick={() => handleEditDashboard(dashboard)}>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Duplicate">
                                <IconButton size="small" color="secondary" onClick={() => handleDuplicateDashboard(dashboard)}>
                                  <FileCopyIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Export">
                                <IconButton size="small" color="success" onClick={() => handleExportDashboard(dashboard)}>
                                  <GetAppIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" color="error" onClick={() => handleDeleteDashboard(dashboard)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Share">
                                <IconButton size="small" color="warning" onClick={handleShareReport}>
                                  <ShareIcon />
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
                  Popular Widgets
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><BarChartIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Headcount Chart" 
                      secondary="Employee count by department"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PieChartIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Compensation Distribution" 
                      secondary="Salary ranges and distribution"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><TrendingIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Performance Trends" 
                      secondary="Performance metrics over time"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><TableChartIcon /></ListItemIcon>
                    <ListItemText 
                      primary="Recruitment Pipeline" 
                      secondary="Open positions and candidates"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Scheduled Reports Tab */}
      {selectedTab === 2 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Scheduled Reports
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Reports that are automatically generated and distributed
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Name</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Recipients</TableCell>
                    <TableCell>Next Run</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduledReports.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.schedule}</TableCell>
                      <TableCell>{row.recipients}</TableCell>
                      <TableCell>{row.nextRun}</TableCell>
                      <TableCell>
                        <Chip label={row.status} size="small" color={row.status === 'Active' ? 'success' : 'warning'} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="primary" onClick={() => handleEditScheduled(row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="warning" onClick={() => handlePauseScheduled(row)}>
                            <BarChartIcon />
                          </IconButton>
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

      {/* Report Templates Tab */}
      {selectedTab === 3 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Report Templates
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Pre-configured report templates for common scenarios
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ p: 2, cursor: 'pointer' }} onClick={() => handleUseTemplate({
                  name: 'Headcount Report',
                  type: 'Custom Report',
                  category: 'Headcount',
                  description: 'Standard headcount analysis by department and location'
                })}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AssessmentIcon color="primary" />
                    <Typography variant="h6">Headcount Report</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Standard headcount analysis by department and location
                  </Typography>
                  <Button size="small" variant="outlined">
                    Use Template
                  </Button>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ p: 2, cursor: 'pointer' }} onClick={() => handleUseTemplate({
                  name: 'Compensation Report',
                  type: 'Matrix Report',
                  category: 'Compensation',
                  description: 'Compensation analysis by job level and location'
                })}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <BarChartIcon color="primary" />
                    <Typography variant="h6">Compensation Report</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Compensation analysis by job level and location
                  </Typography>
                  <Button size="small" variant="outlined">
                    Use Template
                  </Button>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ p: 2, cursor: 'pointer' }} onClick={() => handleUseTemplate({
                  name: 'Performance Report',
                  type: 'Trending Report',
                  category: 'Performance',
                  description: 'Performance metrics and employee ratings'
                })}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TrendingIcon color="primary" />
                    <Typography variant="h6">Performance Report</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Performance metrics and employee ratings
                  </Typography>
                  <Button size="small" variant="outlined">
                    Use Template
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Create Report Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Report Name"
                placeholder="Enter report name"
                value={createReportForm.name || ''}
                onChange={e => setCreateReportForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  label="Report Type"
                  value={createReportForm.type || ''}
                  onChange={e => setCreateReportForm(prev => ({ ...prev, type: e.target.value as Report['type'] }))}
                >
                  <MenuItem value="Custom Report">Custom Report</MenuItem>
                  <MenuItem value="Dashboard">Dashboard</MenuItem>
                  <MenuItem value="Worklet">Worklet</MenuItem>
                  <MenuItem value="Matrix Report">Matrix Report</MenuItem>
                  <MenuItem value="Trending Report">Trending Report</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={createReportForm.category || ''}
                  onChange={e => setCreateReportForm(prev => ({ ...prev, category: e.target.value as Report['category'] }))}
                >
                  <MenuItem value="Compensation">Compensation</MenuItem>
                  <MenuItem value="Headcount">Headcount</MenuItem>
                  <MenuItem value="Job History">Job History</MenuItem>
                  <MenuItem value="Performance">Performance</MenuItem>
                  <MenuItem value="Time Tracking">Time Tracking</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Report description"
                value={createReportForm.description || ''}
                onChange={e => setCreateReportForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Select Data Fields
              </Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Employee Name"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Job Title"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Department"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Location"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Salary"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Performance Rating"
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            if (!createReportForm.name || !createReportForm.type || !createReportForm.category) {
              alert('Name, Type, and Category are required');
              return;
            }
            const newId = (Math.max(...reports.map(r => Number(r.id))) + 1).toString();
            setReports(prev => [
              ...prev,
              {
                id: newId,
                name: createReportForm.name!,
                type: createReportForm.type as Report['type'],
                category: createReportForm.category as Report['category'],
                description: createReportForm.description || '',
                createdBy: 'Current User',
                lastRun: new Date().toISOString().slice(0, 16).replace('T', ' '),
                status: 'Draft',
                isFavorite: false,
                schedule: 'None'
              }
            ]);
            setOpenCreateDialog(false);
            setCreateReportForm({ name: '', type: 'Custom Report', category: 'Headcount', description: '' });
            setSnackbar({ open: true, message: 'Report created.' });
          }}>
            Create Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Schedule Report Dialog */}
      <Dialog open={openScheduleDialog} onClose={() => setOpenScheduleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Report</InputLabel>
                <Select label="Select Report">
                  {reports.map((report) => (
                    <MenuItem key={report.id} value={report.name}>{report.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select label="Frequency">
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Quarterly">Quarterly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                defaultValue="09:00"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Recipients"
                placeholder="Enter email addresses separated by commas"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScheduleDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenScheduleDialog(false)}>
            Schedule Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Report Dialog */}
      <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Share Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipients"
                placeholder="Enter email addresses"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                defaultValue="Shared Report: HR Executive Dashboard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Message"
                placeholder="Optional message"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Include as attachment"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Allow recipients to view online"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenShareDialog(false)}>
            Share Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Report Dialog */}
      <Dialog open={openViewReportDialog} onClose={() => setOpenViewReportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Report Details</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box>
              <Typography variant="h6" gutterBottom>{selectedReport.name}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>{selectedReport.description}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography><b>Type:</b> {selectedReport.type}</Typography>
              <Typography><b>Category:</b> {selectedReport.category}</Typography>
              <Typography><b>Created By:</b> {selectedReport.createdBy}</Typography>
              <Typography><b>Last Run:</b> {selectedReport.lastRun}</Typography>
              <Typography><b>Status:</b> {selectedReport.status}</Typography>
              <Typography><b>Schedule:</b> {selectedReport.schedule}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewReportDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Report Dialog */}
      <Dialog open={openEditReportDialog} onClose={() => setOpenEditReportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Report</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Report Name"
            value={editReportForm.name || ''}
            onChange={e => setEditReportForm(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              value={editReportForm.type || ''}
              onChange={e => setEditReportForm(prev => ({ ...prev, type: e.target.value as Report['type'] }))}
            >
              <MenuItem value="Custom Report">Custom Report</MenuItem>
              <MenuItem value="Dashboard">Dashboard</MenuItem>
              <MenuItem value="Worklet">Worklet</MenuItem>
              <MenuItem value="Matrix Report">Matrix Report</MenuItem>
              <MenuItem value="Trending Report">Trending Report</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={editReportForm.category || ''}
              onChange={e => setEditReportForm(prev => ({ ...prev, category: e.target.value as Report['category'] }))}
            >
              <MenuItem value="Compensation">Compensation</MenuItem>
              <MenuItem value="Headcount">Headcount</MenuItem>
              <MenuItem value="Job History">Job History</MenuItem>
              <MenuItem value="Performance">Performance</MenuItem>
              <MenuItem value="Time Tracking">Time Tracking</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Description"
            value={editReportForm.description || ''}
            onChange={e => setEditReportForm(prev => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditReportDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEditReport}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* View Dashboard Dialog */}
      <Dialog open={openViewDashboardDialog} onClose={() => setOpenViewDashboardDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Dashboard Details</DialogTitle>
        <DialogContent>
          {selectedDashboard && (
            <Box>
              <Typography variant="h6" gutterBottom>{selectedDashboard.name}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>{selectedDashboard.description}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography><b>Widgets:</b> {selectedDashboard.widgets}</Typography>
              <Typography><b>Last Updated:</b> {selectedDashboard.lastUpdated}</Typography>
              <Typography><b>Created By:</b> {selectedDashboard.createdBy}</Typography>
              <Typography><b>Public:</b> {selectedDashboard.isPublic ? 'Yes' : 'No'}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDashboardDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dashboard Dialog */}
      <Dialog open={openEditDashboardDialog} onClose={() => setOpenEditDashboardDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Dashboard</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Dashboard Name"
            value={editDashboardForm.name || ''}
            onChange={e => setEditDashboardForm(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={editDashboardForm.description || ''}
            onChange={e => setEditDashboardForm(prev => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Widgets"
            type="number"
            value={editDashboardForm.widgets || 0}
            onChange={e => setEditDashboardForm(prev => ({ ...prev, widgets: Number(e.target.value) }))}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Checkbox checked={!!editDashboardForm.isPublic} onChange={e => setEditDashboardForm(prev => ({ ...prev, isPublic: e.target.checked }))} />}
            label="Public"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDashboardDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEditDashboard}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Create Dashboard Dialog */}
      <Dialog open={openCreateDashboardDialog} onClose={() => setOpenCreateDashboardDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Dashboard</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Dashboard Name"
            value={createDashboardForm.name || ''}
            onChange={e => setCreateDashboardForm(prev => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={createDashboardForm.description || ''}
            onChange={e => setCreateDashboardForm(prev => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Widgets"
            type="number"
            value={createDashboardForm.widgets || 1}
            onChange={e => setCreateDashboardForm(prev => ({ ...prev, widgets: Number(e.target.value) }))}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Checkbox checked={!!createDashboardForm.isPublic} onChange={e => setCreateDashboardForm(prev => ({ ...prev, isPublic: e.target.checked }))} />}
            label="Public"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDashboardDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCreateDashboard}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Report Dialog */}
      <Dialog open={openDeleteReportDialog} onClose={() => setOpenDeleteReportDialog(false)}>
        <DialogTitle>Delete Report</DialogTitle>
        <DialogContent>
          {reportToDelete && (
            <Typography>Are you sure you want to delete the report <b>{reportToDelete.name}</b>? This action cannot be undone.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteReportDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDeleteReport}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dashboard Dialog */}
      <Dialog open={openDeleteDashboardDialog} onClose={() => setOpenDeleteDashboardDialog(false)}>
        <DialogTitle>Delete Dashboard</DialogTitle>
        <DialogContent>
          {dashboardToDelete && (
            <Typography>Are you sure you want to delete the dashboard <b>{dashboardToDelete.name}</b>? This action cannot be undone.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDashboardDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDeleteDashboard}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Scheduled Report Dialog */}
      <Dialog open={openEditScheduledDialog} onClose={() => setOpenEditScheduledDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Scheduled Report</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Report Name"
            value={editScheduledForm.name || ''}
            onChange={e => setEditScheduledForm((prev: any) => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Schedule"
            value={editScheduledForm.schedule || ''}
            onChange={e => setEditScheduledForm((prev: any) => ({ ...prev, schedule: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Recipients"
            value={editScheduledForm.recipients || ''}
            onChange={e => setEditScheduledForm((prev: any) => ({ ...prev, recipients: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Next Run"
            value={editScheduledForm.nextRun || ''}
            onChange={e => setEditScheduledForm((prev: any) => ({ ...prev, nextRun: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={editScheduledForm.status || ''}
              onChange={e => setEditScheduledForm((prev: any) => ({ ...prev, status: e.target.value }))}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Paused">Paused</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditScheduledDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEditScheduled}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Search Dialog */}
      <Dialog open={searchDialogOpen} onClose={() => setSearchDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Search Reports</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Search by name, type, category, or description"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
          {searchTerm && (
            <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSearchDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Filter Reports</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              value={activeFilters.type || ''}
              onChange={e => setActiveFilters(prev => ({ ...prev, type: e.target.value || undefined }))}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Custom Report">Custom Report</MenuItem>
              <MenuItem value="Dashboard">Dashboard</MenuItem>
              <MenuItem value="Worklet">Worklet</MenuItem>
              <MenuItem value="Matrix Report">Matrix Report</MenuItem>
              <MenuItem value="Trending Report">Trending Report</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={activeFilters.category || ''}
              onChange={e => setActiveFilters(prev => ({ ...prev, category: e.target.value || undefined }))}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Compensation">Compensation</MenuItem>
              <MenuItem value="Headcount">Headcount</MenuItem>
              <MenuItem value="Job History">Job History</MenuItem>
              <MenuItem value="Performance">Performance</MenuItem>
              <MenuItem value="Time Tracking">Time Tracking</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={activeFilters.status || ''}
              onChange={e => setActiveFilters(prev => ({ ...prev, status: e.target.value || undefined }))}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Schedule</InputLabel>
            <Select
              label="Schedule"
              value={activeFilters.schedule || ''}
              onChange={e => setActiveFilters(prev => ({ ...prev, schedule: e.target.value || undefined }))}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
              <MenuItem value="Quarterly">Quarterly</MenuItem>
            </Select>
          </FormControl>
          {(activeFilters.type || activeFilters.category || activeFilters.status || activeFilters.schedule) && (
            <Button onClick={() => setActiveFilters({})}>Clear Filters</Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default ReportsDashboards; 