import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Work,
  Person,
  CheckCircle,
  Schedule,
  Error,
  Download,
  Upload,
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  status: 'Open' | 'Closed' | 'Draft';
  applications: number;
  postedDate: string;
  hiringManager: string;
}

interface Candidate {
  id: number;
  name: string;
  position: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  experience: string;
  appliedDate: string;
  lastContact: string;
}

const Recruiting: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const jobPostings: JobPosting[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco',
      status: 'Open',
      applications: 45,
      postedDate: '2024-12-01',
      hiringManager: 'John Smith',
    },
    {
      id: 2,
      title: 'Sales Manager',
      department: 'Sales',
      location: 'New York',
      status: 'Open',
      applications: 23,
      postedDate: '2024-12-05',
      hiringManager: 'Lisa Wang',
    },
    {
      id: 3,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Chicago',
      status: 'Closed',
      applications: 67,
      postedDate: '2024-11-20',
      hiringManager: 'David Wilson',
    },
  ];

  const candidates: Candidate[] = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      position: 'Senior Software Engineer',
      status: 'Interview',
      experience: '5 years',
      appliedDate: '2024-12-10',
      lastContact: '2024-12-14',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      position: 'Sales Manager',
      status: 'Screening',
      experience: '7 years',
      appliedDate: '2024-12-12',
      lastContact: '2024-12-13',
    },
    {
      id: 3,
      name: 'James Chen',
      position: 'Marketing Specialist',
      status: 'Offer',
      experience: '3 years',
      appliedDate: '2024-12-08',
      lastContact: '2024-12-15',
    },
  ];

  const pipelineData = [
    { stage: 'Applied', count: 120, color: '#6c757d' },
    { stage: 'Screening', count: 45, color: '#ffc107' },
    { stage: 'Interview', count: 23, color: '#0066cc' },
    { stage: 'Offer', count: 8, color: '#28a745' },
    { stage: 'Hired', count: 5, color: '#20c997' },
  ];

  const monthlyHires = [
    { month: 'Aug', hires: 12 },
    { month: 'Sep', hires: 15 },
    { month: 'Oct', hires: 18 },
    { month: 'Nov', hires: 22 },
    { month: 'Dec', hires: 8 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
      case 'Interview':
        return 'primary';
      case 'Closed':
      case 'Rejected':
        return 'error';
      case 'Draft':
      case 'Applied':
        return 'default';
      case 'Screening':
        return 'warning';
      case 'Offer':
      case 'Hired':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setAnchorEl(event.currentTarget);
    if ('department' in item) {
      setSelectedJob(item);
      setSelectedCandidate(null);
    } else {
      setSelectedCandidate(item);
      setSelectedJob(null);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
    setSelectedCandidate(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Recruiting
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" startIcon={<Upload />} size="small">
            Import
          </Button>
          <Button variant="outlined" startIcon={<Download />} size="small">
            Export
          </Button>
          <Button variant="contained" startIcon={<Add />} size="small">
            Post Job
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Open Positions
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                8
              </Typography>
              <Typography variant="body2" color="success.main">
                +2 this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Candidates
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                156
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In pipeline
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Time to Hire
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                23 days
              </Typography>
              <Typography variant="body2" color="success.main">
                -5 days vs target
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Hires This Month
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target: 12
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recruitment Pipeline
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pipelineData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ stage, count }) => `${stage}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {pipelineData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Hires
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyHires}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hires" fill="#0066cc" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Job Postings Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Job Postings
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell>Position</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Applications</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Posted Date</TableCell>
                  <TableCell>Hiring Manager</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobPostings.map((job) => (
                  <TableRow key={job.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {job.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.applications}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        size="small"
                        color={getStatusColor(job.status) as any}
                      />
                    </TableCell>
                    <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{job.hiringManager}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, job)}
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

      {/* Candidates Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Top Candidates
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell>Candidate</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Applied Date</TableCell>
                  <TableCell>Last Contact</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {candidate.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>{candidate.experience}</TableCell>
                    <TableCell>
                      <Chip
                        label={candidate.status}
                        size="small"
                        color={getStatusColor(candidate.status) as any}
                      />
                    </TableCell>
                    <TableCell>{new Date(candidate.appliedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(candidate.lastContact).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, candidate)}
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

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Visibility sx={{ mr: 1 }} fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Recruiting; 