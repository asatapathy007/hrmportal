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
  Switch,
  Rating,
  FormGroup
} from '@mui/material';
import {
  Add as AddIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Apartment as DepartmentIcon,
  Grade as GradeIcon,
  MonetizationOn as MoneyIcon,
  AccountCircle as AccountIcon,
  SupervisorAccount as ManagerIcon,
  WorkOutline as JobIcon,
  BusinessCenter as OrgIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
  HealthAndSafety as HealthIcon,
  Security as SecurityIcon,
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  Quiz as QuizIcon,
  EmojiEvents as CertificateIcon,
  TrendingUp as TrendingIcon,
  Group as GroupIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  PlayCircle as PlayCircleIcon,
  PauseCircle as PauseCircleIcon,
  StopCircle as StopCircleIcon,
  Timer as TimerIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';

interface Course {
  id: string;
  title: string;
  type: 'Online' | 'Instructor-led' | 'Blended' | 'Assessment';
  category: 'Compliance' | 'Leadership' | 'Technical' | 'Soft Skills' | 'Safety';
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Active' | 'Inactive' | 'Draft';
  enrollmentCount: number;
  rating: number;
  isRequired: boolean;
  isCertification: boolean;
}

interface LearningAssignment {
  id: string;
  courseId: string;
  courseTitle: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  progress: number;
  score?: number;
  completionDate?: string;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  courses: string[];
  targetAudience: string;
  estimatedDuration: string;
  status: 'Active' | 'Inactive';
  enrollmentCount: number;
}

const Learning: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [openPathDialog, setOpenPathDialog] = useState(false);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Workplace Safety Training',
      type: 'Online',
      category: 'Safety',
      description: 'Comprehensive workplace safety training covering OSHA guidelines',
      instructor: 'Safety Training Team',
      duration: '2 hours',
      difficulty: 'Beginner',
      status: 'Active',
      enrollmentCount: 1250,
      rating: 4.5,
      isRequired: true,
      isCertification: true
    },
    {
      id: '2',
      title: 'Leadership Fundamentals',
      type: 'Instructor-led',
      category: 'Leadership',
      description: 'Essential leadership skills for new managers',
      instructor: 'Sarah Johnson',
      duration: '8 hours',
      difficulty: 'Intermediate',
      status: 'Active',
      enrollmentCount: 85,
      rating: 4.8,
      isRequired: false,
      isCertification: false
    },
    {
      id: '3',
      title: 'Advanced Excel for HR',
      type: 'Online',
      category: 'Technical',
      description: 'Advanced Excel techniques for HR professionals',
      instructor: 'Mike Chen',
      duration: '4 hours',
      difficulty: 'Advanced',
      status: 'Active',
      enrollmentCount: 320,
      rating: 4.2,
      isRequired: false,
      isCertification: false
    },
    {
      id: '4',
      title: 'Diversity & Inclusion',
      type: 'Blended',
      category: 'Compliance',
      description: 'Understanding diversity and inclusion in the workplace',
      instructor: 'Lisa Rodriguez',
      duration: '3 hours',
      difficulty: 'Beginner',
      status: 'Active',
      enrollmentCount: 950,
      rating: 4.6,
      isRequired: true,
      isCertification: true
    }
  ]);

  const [assignments, setAssignments] = useState<LearningAssignment[]>([
    {
      id: '1',
      courseId: '1',
      courseTitle: 'Workplace Safety Training',
      assignedBy: 'HR Manager',
      assignedDate: '2024-01-10',
      dueDate: '2024-01-31',
      status: 'Completed',
      progress: 100,
      score: 95,
      completionDate: '2024-01-25'
    },
    {
      id: '2',
      courseId: '2',
      courseTitle: 'Leadership Fundamentals',
      assignedBy: 'Department Manager',
      assignedDate: '2024-01-15',
      dueDate: '2024-02-15',
      status: 'In Progress',
      progress: 60
    },
    {
      id: '3',
      courseId: '4',
      courseTitle: 'Diversity & Inclusion',
      assignedBy: 'HR Manager',
      assignedDate: '2024-01-05',
      dueDate: '2024-01-20',
      status: 'Overdue',
      progress: 30
    }
  ]);

  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      name: 'New Manager Development',
      description: 'Comprehensive learning path for new managers',
      courses: ['Leadership Fundamentals', 'Communication Skills', 'Performance Management'],
      targetAudience: 'New Managers',
      estimatedDuration: '20 hours',
      status: 'Active',
      enrollmentCount: 45
    },
    {
      id: '2',
      name: 'HR Professional Certification',
      description: 'Path to HR certification and professional development',
      courses: ['HR Fundamentals', 'Employment Law', 'Compensation Management'],
      targetAudience: 'HR Professionals',
      estimatedDuration: '30 hours',
      status: 'Active',
      enrollmentCount: 120
    }
  ]);

  const handleCreateCourse = () => {
    setOpenCourseDialog(true);
  };

  const handleAssignCourse = () => {
    setOpenAssignmentDialog(true);
  };

  const handleCreatePath = () => {
    setOpenPathDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Not Started': return 'warning';
      case 'Overdue': return 'error';
      case 'Inactive': return 'error';
      case 'Draft': return 'warning';
      default: return 'default';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const getCourseTypeIcon = (type: string) => {
    switch (type) {
      case 'Online': return <VideoIcon />;
      case 'Instructor-led': return <PersonIcon />;
      case 'Blended': return <SchoolIcon />;
      case 'Assessment': return <QuizIcon />;
      default: return <BookIcon />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Compliance': return 'error';
      case 'Leadership': return 'primary';
      case 'Technical': return 'info';
      case 'Soft Skills': return 'success';
      case 'Safety': return 'warning';
      default: return 'default';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Learning Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage courses, assignments, learning paths, and track completion
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<AssignmentIcon />} onClick={handleAssignCourse}>
            Assign Course
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateCourse}>
            Create Course
          </Button>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              {assignments.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              My Assignments
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="success.main" gutterBottom>
              {assignments.filter(a => a.status === 'Completed').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="info.main" gutterBottom>
              {assignments.filter(a => a.status === 'In Progress').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In Progress
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main" gutterBottom>
              {assignments.filter(a => a.status === 'Overdue').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Overdue
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
            <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Course Catalog</Typography>
            <Typography variant="body2" color="text.secondary">
              Browse available courses
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleAssignCourse}>
            <AssignmentIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Assign Learning</Typography>
            <Typography variant="body2" color="text.secondary">
              Assign courses to employees
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreatePath}>
            <TrendingIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Learning Paths</Typography>
            <Typography variant="body2" color="text.secondary">
              Create learning paths
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
            <CertificateIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">Certifications</Typography>
            <Typography variant="body2" color="text.secondary">
              View certifications
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="My Learning" />
          <Tab label="Course Catalog" />
          <Tab label="Learning Paths" />
          <Tab label="Assignments" />
        </Tabs>
      </Box>

      {/* My Learning Tab */}
      {selectedTab === 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              My Learning Assignments
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Assigned By</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <BookIcon color="primary" />
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {assignment.courseTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Assigned: {assignment.assignedDate}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{assignment.assignedBy}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={assignment.progress} 
                            color={getProgressColor(assignment.progress)}
                            sx={{ width: 60, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2">{assignment.progress}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={assignment.status}
                          size="small"
                          color={getStatusColor(assignment.status)}
                          icon={assignment.status === 'Completed' ? <CheckCircleIcon /> : 
                                assignment.status === 'In Progress' ? <PlayIcon /> : 
                                assignment.status === 'Not Started' ? <ScheduleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        {assignment.score ? (
                          <Typography variant="body2" fontWeight="medium">
                            {assignment.score}%
                          </Typography>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {assignment.status === 'Not Started' && (
                            <Tooltip title="Start Course">
                              <IconButton size="small" color="primary">
                                <PlayCircleIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {assignment.status === 'In Progress' && (
                            <Tooltip title="Continue Course">
                              <IconButton size="small" color="info">
                                <PlayIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="View Details">
                            <IconButton size="small" color="primary">
                              <VisibilityIcon />
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

      {/* Course Catalog Tab */}
      {selectedTab === 1 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Course Catalog</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button startIcon={<FilterIcon />} variant="outlined">
                  Filter
                </Button>
                <Button startIcon={<SearchIcon />} variant="outlined">
                  Search
                </Button>
                <Button startIcon={<AddIcon />} onClick={handleCreateCourse}>
                  Create Course
                </Button>
              </Box>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Difficulty</TableCell>
                    <TableCell>Enrollment</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {course.isRequired && <Badge badgeContent="Required" color="error" />}
                          {course.isCertification && <CertificateIcon color="warning" />}
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {course.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {course.description}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getCourseTypeIcon(course.type)}
                          <Typography variant="body2">
                            {course.type}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={course.category} 
                          size="small" 
                          color={getCategoryColor(course.category)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>
                        <Chip
                          label={course.difficulty}
                          size="small"
                          color={getDifficultyColor(course.difficulty)}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge badgeContent={course.enrollmentCount} color="primary">
                          <GroupIcon />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating value={course.rating} readOnly size="small" />
                          <Typography variant="body2">
                            {course.rating}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Enroll">
                            <IconButton size="small" color="primary">
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Preview">
                            <IconButton size="small" color="info">
                              <VisibilityIcon />
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

      {/* Learning Paths Tab */}
      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Learning Paths</Typography>
                  <Button startIcon={<AddIcon />} onClick={handleCreatePath}>
                    Create Learning Path
                  </Button>
                </Box>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Path Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Target Audience</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Enrollment</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {learningPaths.map((path) => (
                        <TableRow key={path.id}>
                          <TableCell>
                            <Typography variant="body1" fontWeight="medium">
                              {path.name}
                            </Typography>
                          </TableCell>
                          <TableCell>{path.description}</TableCell>
                          <TableCell>{path.targetAudience}</TableCell>
                          <TableCell>{path.estimatedDuration}</TableCell>
                          <TableCell>
                            <Badge badgeContent={path.enrollmentCount} color="primary">
                              <GroupIcon />
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={path.status}
                              size="small"
                              color={getStatusColor(path.status)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="View Path">
                                <IconButton size="small" color="primary">
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton size="small" color="info">
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Assign">
                                <IconButton size="small" color="warning">
                                  <AssignmentIcon />
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
                  Popular Categories
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><SecurityIcon color="error" /></ListItemIcon>
                    <ListItemText 
                      primary="Compliance Training" 
                      secondary="Required safety and compliance courses"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                    <ListItemText 
                      primary="Leadership Development" 
                      secondary="Management and leadership skills"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><WorkIcon color="info" /></ListItemIcon>
                    <ListItemText 
                      primary="Technical Skills" 
                      secondary="Software and technical training"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><SchoolIcon color="success" /></ListItemIcon>
                    <ListItemText 
                      primary="Soft Skills" 
                      secondary="Communication and interpersonal skills"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Assignments Tab */}
      {selectedTab === 3 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Learning Assignments
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Manage course assignments and track completion
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Assigned Date</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <AccountIcon />
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          John Doe
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>Workplace Safety Training</TableCell>
                    <TableCell>2024-01-10</TableCell>
                    <TableCell>2024-01-31</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={100} 
                          color="success"
                          sx={{ width: 60, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2">100%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label="Completed" size="small" color="success" icon={<CheckCircleIcon />} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          <AccountIcon />
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          Sarah Johnson
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>Leadership Fundamentals</TableCell>
                    <TableCell>2024-01-15</TableCell>
                    <TableCell>2024-02-15</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={60} 
                          color="warning"
                          sx={{ width: 60, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2">60%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label="In Progress" size="small" color="info" icon={<PlayIcon />} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton size="small" color="info">
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Create Course Dialog */}
      <Dialog open={openCourseDialog} onClose={() => setOpenCourseDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course Title"
                placeholder="Enter course title"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Course Type</InputLabel>
                <Select label="Course Type">
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Instructor-led">Instructor-led</MenuItem>
                  <MenuItem value="Blended">Blended</MenuItem>
                  <MenuItem value="Assessment">Assessment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="Compliance">Compliance</MenuItem>
                  <MenuItem value="Leadership">Leadership</MenuItem>
                  <MenuItem value="Technical">Technical</MenuItem>
                  <MenuItem value="Soft Skills">Soft Skills</MenuItem>
                  <MenuItem value="Safety">Safety</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Difficulty</InputLabel>
                <Select label="Difficulty">
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Course description"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duration"
                placeholder="e.g., 2 hours"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instructor"
                placeholder="Instructor name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Required Course"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Certification Course"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCourseDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenCourseDialog(false)}>
            Create Course
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Course Dialog */}
      <Dialog open={openAssignmentDialog} onClose={() => setOpenAssignmentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Assign Learning</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Course</InputLabel>
                <Select label="Select Course">
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.title}>{course.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Employees</InputLabel>
                <Select label="Select Employees" multiple>
                  <MenuItem value="john">John Doe</MenuItem>
                  <MenuItem value="sarah">Sarah Johnson</MenuItem>
                  <MenuItem value="mike">Mike Chen</MenuItem>
                  <MenuItem value="lisa">Lisa Rodriguez</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                defaultValue="2024-02-15"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Priority"
                select
                defaultValue="normal"
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Message"
                placeholder="Optional message to employees"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignmentDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenAssignmentDialog(false)}>
            Assign Course
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Learning Path Dialog */}
      <Dialog open={openPathDialog} onClose={() => setOpenPathDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Learning Path</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Path Name"
                placeholder="Enter path name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Target Audience"
                placeholder="e.g., New Managers"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Path description"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Select Courses
              </Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  {courses.map((course) => (
                    <Grid item xs={12} md={6} key={course.id}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label={course.title}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Estimated Duration"
                placeholder="e.g., 20 hours"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPathDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenPathDialog(false)}>
            Create Learning Path
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Learning; 