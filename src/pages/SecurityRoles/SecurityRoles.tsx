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
  Stepper,
  Step,
  StepLabel,
  Switch,
  DialogContentText,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Group as GroupIcon,
  People as PeopleIcon,
  Lock as LockIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

interface SecurityGroup {
  id: string;
  name: string;
  type: 'Job-based' | 'Role-based' | 'User-based' | 'Location-based' | 'Department-based' | 'Custom';
  description: string;
  status: 'Active' | 'Inactive';
  userCount: number;
  permissions: string[];
}

interface SecurityRole {
  id: string;
  name: string;
  description: string;
  type: 'HRBP' | 'Manager' | 'Admin' | 'Compensation Partner';
  status: 'Active' | 'Inactive';
  userCount: number;
  permissions: string[];
}

interface UserSecurity {
  id: string;
  userId: string;
  userName: string;
  email: string;
  department: string;
  roles: string[];
  groups: string[];
  status: 'Active' | 'Inactive' | 'Pending';
  lastAccess: string;
  accessLevel: 'Full' | 'Limited' | 'Read-only';
}

interface PermissionMatrix {
  id: string;
  permission: string;
  category: string;
  roles: string[];
  groups: string[];
  users: string[];
  status: 'Active' | 'Inactive';
  lastModified: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

const SecurityRoles: React.FC = () => {
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewGroup, setViewGroup] = useState<SecurityGroup | null>(null);
  const [viewRole, setViewRole] = useState<SecurityRole | null>(null);
  const [editGroup, setEditGroup] = useState<SecurityGroup | null>(null);
  const [editRole, setEditRole] = useState<SecurityRole | null>(null);

  const [securityGroups, setSecurityGroups] = useState<SecurityGroup[]>([
    { id: '1', name: 'HR Business Partners', type: 'Job-based', description: 'Security group for HR Business Partners', status: 'Active', userCount: 12, permissions: ['View Employee Data', 'Edit Employee Data', 'View Compensation'] },
    { id: '2', name: 'Engineering Managers', type: 'Job-based', description: 'Security group for Engineering Managers', status: 'Active', userCount: 8, permissions: ['View Team Data', 'Approve Time Off', 'View Compensation'] },
    { id: '3', name: 'Finance Admins', type: 'Role-based', description: 'Finance admin group', status: 'Active', userCount: 5, permissions: ['View Payroll', 'Edit Payroll', 'Approve Expenses'] },
    { id: '4', name: 'IT Support', type: 'User-based', description: 'IT support group', status: 'Active', userCount: 6, permissions: ['Access System', 'Manage Accounts', 'Reset Passwords'] },
    { id: '5', name: 'Contractors', type: 'Custom', description: 'External contractors', status: 'Inactive', userCount: 3, permissions: ['View Employee Data'] }
  ]);

  const [securityRoles, setSecurityRoles] = useState<SecurityRole[]>([
    { id: '1', name: 'HR Business Partner', description: 'HR support and guidance for business units', type: 'HRBP', status: 'Active', userCount: 15, permissions: ['View Employee Data', 'Edit Employee Data', 'View Compensation', 'Approve Requests'] },
    { id: '2', name: 'Manager', description: 'Team management and oversight', type: 'Manager', status: 'Active', userCount: 25, permissions: ['View Team Data', 'Approve Time Off', 'View Compensation', 'Initiate Job Changes'] },
    { id: '3', name: 'Finance Admin', description: 'Finance system admin', type: 'Admin', status: 'Active', userCount: 7, permissions: ['View Payroll', 'Edit Payroll', 'Approve Expenses'] },
    { id: '4', name: 'IT Support', description: 'IT system support', type: 'Admin', status: 'Active', userCount: 6, permissions: ['Access System', 'Manage Accounts', 'Reset Passwords'] },
    { id: '5', name: 'Compensation Partner', description: 'Compensation planning', type: 'Compensation Partner', status: 'Inactive', userCount: 2, permissions: ['View Compensation', 'Edit Compensation'] }
  ]);

  const [userSecurity, setUserSecurity] = useState<UserSecurity[]>([
    {
      id: '1',
      userId: 'EMP001',
      userName: 'Alice Smith',
      email: 'alice.smith@company.com',
      department: 'Human Resources',
      roles: ['HR Business Partner'],
      groups: ['HR Business Partners'],
      status: 'Active',
      lastAccess: '2024-01-15 14:30',
      accessLevel: 'Full'
    },
    {
      id: '2',
      userId: 'EMP002',
      userName: 'Bob Johnson',
      email: 'bob.johnson@company.com',
      department: 'Engineering',
      roles: ['Manager'],
      groups: ['Engineering Managers'],
      status: 'Active',
      lastAccess: '2024-01-15 13:45',
      accessLevel: 'Limited'
    }
  ]);

  const [permissionsMatrix, setPermissionsMatrix] = useState<PermissionMatrix[]>([
    { id: '1', permission: 'View Employee Data', category: 'HR', roles: ['HR Business Partner', 'Manager'], groups: ['HR Business Partners', 'Engineering Managers'], users: ['Alice Smith', 'Bob Johnson', 'Carol Lee'], status: 'Active', lastModified: '2024-01-15 10:00' },
    { id: '2', permission: 'Edit Employee Data', category: 'HR', roles: ['HR Business Partner'], groups: ['HR Business Partners'], users: ['Alice Smith'], status: 'Active', lastModified: '2024-01-15 10:00' },
    { id: '3', permission: 'View Compensation', category: 'Finance', roles: ['HR Business Partner', 'Manager', 'Compensation Partner'], groups: ['HR Business Partners', 'Engineering Managers'], users: ['Alice Smith', 'Bob Johnson', 'Eva Brown'], status: 'Active', lastModified: '2024-01-15 10:00' },
    { id: '4', permission: 'Approve Time Off', category: 'HR', roles: ['Manager'], groups: ['Engineering Managers'], users: ['Bob Johnson', 'David Kim'], status: 'Active', lastModified: '2024-01-15 10:00' },
    { id: '5', permission: 'View Payroll', category: 'Finance', roles: ['Finance Admin'], groups: ['Finance Admins'], users: ['Frank Green'], status: 'Active', lastModified: '2024-01-15 10:00' },
    { id: '6', permission: 'Edit Payroll', category: 'Finance', roles: ['Finance Admin'], groups: ['Finance Admins'], users: ['Frank Green'], status: 'Inactive', lastModified: '2024-01-15 10:00' },
    { id: '7', permission: 'Access System', category: 'IT', roles: ['IT Support'], groups: ['IT Support'], users: ['Grace Lin', 'Henry White'], status: 'Active', lastModified: '2024-01-15 10:00' },
    { id: '8', permission: 'Manage Accounts', category: 'IT', roles: ['IT Support'], groups: ['IT Support'], users: ['Grace Lin'], status: 'Active', lastModified: '2024-01-15 10:00' },
    { id: '9', permission: 'Reset Passwords', category: 'IT', roles: ['IT Support'], groups: ['IT Support'], users: ['Henry White'], status: 'Active', lastModified: '2024-01-15 10:00' },
    { id: '10', permission: 'Approve Expenses', category: 'Finance', roles: ['Finance Admin'], groups: ['Finance Admins'], users: ['Frank Green'], status: 'Inactive', lastModified: '2024-01-15 10:00' }
  ]);

  // Permissions Matrix state
  const [permissionFilter, setPermissionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPermission, setSelectedPermission] = useState<PermissionMatrix | null>(null);
  const [permissionDetailsModal, setPermissionDetailsModal] = useState<PermissionMatrix | null>(null);

  // Wizard state for create/edit Security Group
  const [openGroupWizard, setOpenGroupWizard] = useState(false);
  const [groupWizardStep, setGroupWizardStep] = useState(0);
  const [groupWizardMode, setGroupWizardMode] = useState<'create' | 'edit'>('create');
  const [groupWizardError, setGroupWizardError] = useState<string | null>(null);
  const [groupWizardForm, setGroupWizardForm] = useState({
    id: '',
    name: '',
    type: 'Job-based' as 'Job-based' | 'Role-based' | 'User-based' | 'Location-based' | 'Department-based' | 'Custom',
    description: '',
    status: true,
    users: [] as string[], // user IDs
    permissions: [] as string[],
    autoAssignment: '',
    csvFile: null as File | null,
    permissionTemplate: '',
  });
  // Dummy user/permission data for now
  const allUsers = [
    { id: '1', name: 'Alice Smith' },
    { id: '2', name: 'Bob Johnson' },
    { id: '3', name: 'Carol Lee' },
    { id: '4', name: 'David Kim' },
    { id: '5', name: 'Eva Brown' },
    { id: '6', name: 'Frank Green' },
    { id: '7', name: 'Grace Lin' },
    { id: '8', name: 'Henry White' }
  ];
  const allPermissions = [
    { category: 'HR', perms: ['View Employee Data', 'Edit Employee Data'] },
    { category: 'Finance', perms: ['View Payroll', 'Edit Payroll'] },
    { category: 'IT', perms: ['Access System', 'Manage Accounts'] }
  ];
  const permissionTemplates = ['Manager', 'Employee', 'Admin'];

  // For status toggle confirmation
  const [statusToggleGroup, setStatusToggleGroup] = useState<SecurityGroup | null>(null);
  // For users/permissions modals
  const [groupUsersModal, setGroupUsersModal] = useState<SecurityGroup | null>(null);
  const [groupPermsModal, setGroupPermsModal] = useState<SecurityGroup | null>(null);
  // For delete confirmation
  const [deleteGroupModal, setDeleteGroupModal] = useState<{ group: SecurityGroup, reason: string }>({ group: null as any, reason: '' });
  // For status toggle confirmation
  const [statusToggleRole, setStatusToggleRole] = useState<SecurityRole | null>(null);
  // For users/permissions modals
  const [roleUsersModal, setRoleUsersModal] = useState<SecurityRole | null>(null);
  const [rolePermsModal, setRolePermsModal] = useState<SecurityRole | null>(null);
  // For delete confirmation
  const [deleteRoleModal, setDeleteRoleModal] = useState<{ role: SecurityRole, reason: string }>({ role: null as any, reason: '' });

  // Wizard state for create/edit Security Role
  const [openRoleWizard, setOpenRoleWizard] = useState(false);
  const [roleWizardStep, setRoleWizardStep] = useState(0);
  const [roleWizardMode, setRoleWizardMode] = useState<'create' | 'edit'>('create');
  const [roleWizardError, setRoleWizardError] = useState<string | null>(null);
  const [roleWizardForm, setRoleWizardForm] = useState({
    id: '',
    name: '',
    category: 'System' as 'System' | 'Business' | 'Technical',
    description: '',
    level: 'Employee' as 'Executive' | 'Manager' | 'Employee' | 'System',
    status: true,
    permissions: [] as string[],
    modules: [] as string[],
    dataAccess: [] as string[],
    functions: [] as string[],
    constraints: {
      time: '',
      location: '',
      dataSecurity: ''
    },
    assignmentRules: {
      auto: '',
      approval: false,
      expiration: ''
    }
  });
  // Dummy permission/module/function data
  const allModules = ['HR', 'Finance', 'IT'];
  const allDataAccess = ['View', 'Edit', 'Delete', 'Admin'];
  const allFunctions = ['Approve', 'Create', 'Manage'];
  // User Security state
  const [openUserSecurityDialog, setOpenUserSecurityDialog] = useState(false);
  const [userSecurityMode, setUserSecurityMode] = useState<'create' | 'edit'>('create');
  const [userSecurityForm, setUserSecurityForm] = useState({
    id: '',
    userId: '',
    userName: '',
    email: '',
    department: '',
    roles: [] as string[],
    groups: [] as string[],
    status: 'Active' as 'Active' | 'Inactive' | 'Pending',
    accessLevel: 'Limited' as 'Full' | 'Limited' | 'Read-only'
  });
  // For user security modals
  const [userRolesModal, setUserRolesModal] = useState<UserSecurity | null>(null);
  const [userGroupsModal, setUserGroupsModal] = useState<UserSecurity | null>(null);
  const [userAccessModal, setUserAccessModal] = useState<UserSecurity | null>(null);
  // For delete confirmation
  const [deleteUserModal, setDeleteUserModal] = useState<{ user: UserSecurity, reason: string }>({ user: null as any, reason: '' });

  // Add state to distinguish add/edit mode for permission modal
  const [permissionModalMode, setPermissionModalMode] = useState<'add' | 'edit'>('edit');

  const handleCreateGroup = () => {
    setOpenGroupDialog(true);
  };

  const handleCreateRole = () => {
    setOpenRoleDialog(true);
  };

  const handleEditGroup = (group: SecurityGroup) => {
    setEditGroup(group);
  };

  const handleEditRole = (role: SecurityRole) => {
    setEditRole(role);
  };

  const handleDeleteGroup = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/security-groups/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw 'Failed to delete security group';
      }
      // Update local state
      setSecurityGroups(prev => prev.filter(group => group.id !== id));
    } catch (err) {
      console.error('Failed to delete security group:', err);
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/security-roles/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw 'Failed to delete security role';
      }
      // Update local state
      setSecurityRoles(prev => prev.filter(role => role.id !== id));
    } catch (err) {
      console.error('Failed to delete security role:', err);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' : 'error';
  };

  // Open wizard for create
  const handleOpenGroupWizardCreate = () => {
    setGroupWizardMode('create');
    setGroupWizardForm({
      id: '', name: '', type: 'Job-based', description: '', status: true, users: [], permissions: [], autoAssignment: '', csvFile: null, permissionTemplate: ''
    });
    setGroupWizardStep(0);
    setGroupWizardError(null);
    setOpenGroupWizard(true);
  };
  // Open wizard for edit (not yet wired)

  // Open wizard for edit
  const handleOpenGroupWizardEdit = (group: SecurityGroup) => {
    setGroupWizardMode('edit');
    setGroupWizardForm({
      id: group.id,
      name: group.name,
      type: group.type,
      description: group.description,
      status: group.status === 'Active',
      users: [], // TODO: wire real users
      permissions: group.permissions,
      autoAssignment: '',
      csvFile: null,
      permissionTemplate: '',
    });
    setGroupWizardStep(0);
    setGroupWizardError(null);
    setOpenGroupWizard(true);
  };

  // Save group (create or edit)
  const handleGroupWizardSubmit = () => {
    if (groupWizardMode === 'create') {
      setSecurityGroups(prev => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          name: groupWizardForm.name,
          type: groupWizardForm.type,
          description: groupWizardForm.description,
          status: groupWizardForm.status ? 'Active' : 'Inactive',
          userCount: groupWizardForm.users.length,
          permissions: groupWizardForm.permissions
        }
      ]);
    } else if (groupWizardMode === 'edit') {
      setSecurityGroups(prev => prev.map(g =>
        g.id === groupWizardForm.id
          ? {
              ...g,
              name: groupWizardForm.name,
              type: groupWizardForm.type,
              description: groupWizardForm.description,
              status: groupWizardForm.status ? 'Active' : 'Inactive',
              permissions: groupWizardForm.permissions
            }
          : g
      ));
    }
    setOpenGroupWizard(false);
  };

  // Status toggle handler
  const handleStatusToggle = (group: SecurityGroup) => setStatusToggleGroup(group);
  const confirmStatusToggle = () => {
    if (!statusToggleGroup) return;
    setSecurityGroups(prev => prev.map(g =>
      g.id === statusToggleGroup.id
        ? { ...g, status: g.status === 'Active' ? 'Inactive' : 'Active' }
        : g
    ));
    setStatusToggleGroup(null);
  };

  // Delete group handler with confirmation
  const handleDeleteGroupWithConfirm = (group: SecurityGroup) => setDeleteGroupModal({ group, reason: '' });
  const confirmDeleteGroup = () => {
    setSecurityGroups(prev => prev.filter(g => g.id !== deleteGroupModal.group.id));
    setDeleteGroupModal({ group: null as any, reason: '' });
  };

  // Status toggle handler for roles
  const handleStatusToggleRole = (role: SecurityRole) => setStatusToggleRole(role);
  const confirmStatusToggleRole = () => {
    if (!statusToggleRole) return;
    setSecurityRoles(prev => prev.map(r =>
      r.id === statusToggleRole.id
        ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' }
        : r
    ));
    setStatusToggleRole(null);
  };
  // Delete role handler with confirmation
  const handleDeleteRoleWithConfirm = (role: SecurityRole) => setDeleteRoleModal({ role, reason: '' });
  const confirmDeleteRole = () => {
    setSecurityRoles(prev => prev.filter(r => r.id !== deleteRoleModal.role.id));
    setDeleteRoleModal({ role: null as any, reason: '' });
  };

  // Unique name validation
  const isGroupNameUnique = (name: string) => !securityGroups.some(g => g.name.toLowerCase() === name.trim().toLowerCase());
  // Unique name validation
  const isRoleNameUnique = (name: string) => !securityRoles.some(r => r.name.toLowerCase() === name.trim().toLowerCase());

  // Open wizard for create
  const handleOpenRoleWizardCreate = () => {
    setRoleWizardMode('create');
    setRoleWizardForm({
      id: '', name: '', category: 'System', description: '', level: 'Employee', status: true, permissions: [], modules: [], dataAccess: [], functions: [], constraints: { time: '', location: '', dataSecurity: '' }, assignmentRules: { auto: '', approval: false, expiration: '' }
    });
    setRoleWizardStep(0);
    setRoleWizardError(null);
    setOpenRoleWizard(true);
  };
  // Open wizard for edit
  const handleOpenRoleWizardEdit = (role: SecurityRole) => {
    setRoleWizardMode('edit');
    setRoleWizardForm({
      id: role.id,
      name: role.name,
      category: 'System', // TODO: add category to SecurityRole interface
      description: role.description,
      level: 'Employee', // TODO: add level to SecurityRole interface
      status: role.status === 'Active',
      permissions: role.permissions,
      modules: [], // TODO: wire real modules
      dataAccess: [], // TODO: wire real data access
      functions: [], // TODO: wire real functions
      constraints: { time: '', location: '', dataSecurity: '' },
      assignmentRules: { auto: '', approval: false, expiration: '' }
    });
    setRoleWizardStep(0);
    setRoleWizardError(null);
    setOpenRoleWizard(true);
  };
  // Save role (create or edit)
  const handleRoleWizardSubmit = () => {
    if (roleWizardMode === 'create') {
      setSecurityRoles(prev => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          name: roleWizardForm.name,
          description: roleWizardForm.description,
          type: 'HRBP', // TODO: map from category/level
          status: roleWizardForm.status ? 'Active' : 'Inactive',
          userCount: 0,
          permissions: roleWizardForm.permissions
        }
      ]);
    } else if (roleWizardMode === 'edit') {
      setSecurityRoles(prev => prev.map(r =>
        r.id === roleWizardForm.id
          ? {
              ...r,
              name: roleWizardForm.name,
              description: roleWizardForm.description,
              status: roleWizardForm.status ? 'Active' : 'Inactive',
              permissions: roleWizardForm.permissions
            }
          : r
      ));
    }
    setOpenRoleWizard(false);
  };

  // User Security handlers
  const handleOpenUserSecurityCreate = () => {
    setUserSecurityMode('create');
    setUserSecurityForm({
      id: '', userId: '', userName: '', email: '', department: '', roles: [], groups: [], status: 'Active', accessLevel: 'Limited'
    });
    setOpenUserSecurityDialog(true);
  };

  const handleOpenUserSecurityEdit = (user: UserSecurity) => {
    setUserSecurityMode('edit');
    setUserSecurityForm({
      id: user.id,
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      department: user.department,
      roles: user.roles,
      groups: user.groups,
      status: user.status,
      accessLevel: user.accessLevel
    });
    setOpenUserSecurityDialog(true);
  };

  const handleUserSecuritySubmit = () => {
    if (userSecurityMode === 'create') {
      setUserSecurity(prev => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          userId: userSecurityForm.userId,
          userName: userSecurityForm.userName,
          email: userSecurityForm.email,
          department: userSecurityForm.department,
          roles: userSecurityForm.roles,
          groups: userSecurityForm.groups,
          status: userSecurityForm.status,
          lastAccess: new Date().toLocaleString(),
          accessLevel: userSecurityForm.accessLevel
        }
      ]);
    } else if (userSecurityMode === 'edit') {
      setUserSecurity(prev => prev.map(u =>
        u.id === userSecurityForm.id
          ? {
              ...u,
              userId: userSecurityForm.userId,
              userName: userSecurityForm.userName,
              email: userSecurityForm.email,
              department: userSecurityForm.department,
              roles: userSecurityForm.roles,
              groups: userSecurityForm.groups,
              status: userSecurityForm.status,
              accessLevel: userSecurityForm.accessLevel
            }
          : u
      ));
    }
    setOpenUserSecurityDialog(false);
  };

  const handleDeleteUser = (user: UserSecurity) => setDeleteUserModal({ user, reason: '' });
  const confirmDeleteUser = () => {
    setUserSecurity(prev => prev.filter(u => u.id !== deleteUserModal.user.id));
    setDeleteUserModal({ user: null as any, reason: '' });
  };

  // Permissions Matrix handlers
  const filteredPermissions = permissionsMatrix.filter(perm => {
    const matchesPermission = perm.permission.toLowerCase().includes(permissionFilter.toLowerCase());
    const matchesCategory = !categoryFilter || perm.category === categoryFilter;
    const matchesStatus = !statusFilter || perm.status === statusFilter;
    return matchesPermission && matchesCategory && matchesStatus;
  });

  const allCategories = [...new Set(permissionsMatrix.map(p => p.category))];

  // Edit Permission Modal state
  const [editPermissionModal, setEditPermissionModal] = useState<PermissionMatrix | null>(null);
  const [editPermissionForm, setEditPermissionForm] = useState({
    id: '',
    permission: '',
    category: '',
    roles: [] as string[],
    groups: [] as string[],
    users: [] as string[],
    status: 'Active' as 'Active' | 'Inactive',
    lastModified: ''
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Security & Roles
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage security roles, access controls, user permissions, and security groups
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenRoleWizardCreate}
          sx={{ borderRadius: 2 }}
        >
          Create Security Role
        </Button>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreateGroup}>
            <GroupIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">Security Groups</Typography>
            <Typography variant="body2" color="text.secondary">
              Create security groups
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={handleCreateRole}>
            <SecurityIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Security Roles</Typography>
            <Typography variant="body2" color="text.secondary">
              Create security roles
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelectedTab(2)}>
            <AssignmentIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h6">Assign Users</Typography>
            <Typography variant="body2" color="text.secondary">
              Assign users to roles
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelectedTab(3)}>
            <LockIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">Permissions</Typography>
            <Typography variant="body2" color="text.secondary">
              View permissions matrix
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Security Groups" />
          <Tab label="Security Roles" />
          <Tab label="User Security" />
          <Tab label="Permissions Matrix" />
        </Tabs>
      </Box>

      {/* Security Groups Tab */}
      {selectedTab === 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Security Groups</Typography>
              <Button startIcon={<AddIcon />} onClick={handleOpenGroupWizardCreate}>
                Create Security Group
              </Button>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Group Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Permissions</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {securityGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <GroupIcon color="primary" />
                          <Typography variant="body1" fontWeight="medium">
                            {group.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={group.type} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>{group.description}</TableCell>
                      <TableCell>
                        <Badge badgeContent={group.userCount} color="primary" sx={{ cursor: 'pointer' }} onClick={() => setGroupUsersModal(group)}>
                          <PeopleIcon />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {group.permissions.slice(0, 2).map((permission) => (
                            <Chip key={permission} label={permission} size="small" color="secondary" onClick={() => setGroupPermsModal(group)} clickable />
                          ))}
                          {group.permissions.length > 2 && (
                            <Chip label={`+${group.permissions.length - 2}`} size="small" variant="outlined" onClick={() => setGroupPermsModal(group)} clickable />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={group.status}
                          size="small"
                          color={getStatusColor(group.status)}
                          icon={group.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                          onClick={() => handleStatusToggle(group)}
                          clickable
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View details">
                            <IconButton size="small" color="primary" onClick={() => setViewGroup(group)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => handleOpenGroupWizardEdit(group)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="warning" onClick={() => handleDeleteGroupWithConfirm(group)}>
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

      {/* Security Roles Pill Row */}
      {selectedTab === 1 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Security Roles
          </Typography>
          <Stack direction="row" spacing={2}>
            {securityRoles.map((role) => (
              <Button
                key={role.id}
                variant="outlined"
                sx={{ borderRadius: 5, px: 3, fontWeight: 500 }}
                onClick={() => alert(`Clicked ${role.name}`)}
                aria-label={`Select security role: ${role.name}`}
              >
                {role.name}
              </Button>
            ))}
          </Stack>
        </Box>
      )}

      {/* Security Roles Tab */}
      {selectedTab === 1 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Security Roles</Typography>
              <Button startIcon={<AddIcon />} onClick={handleCreateRole}>
                Create Security Role
              </Button>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Permissions</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {securityRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SecurityIcon color="primary" />
                          <Typography variant="body1" fontWeight="medium">
                            {role.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={role.type} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <Badge badgeContent={role.userCount} color="primary" sx={{ cursor: 'pointer' }} onClick={() => setRoleUsersModal(role)}>
                          <PeopleIcon />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {role.permissions.slice(0, 2).map((permission) => (
                            <Chip key={permission} label={permission} size="small" color="secondary" onClick={() => setRolePermsModal(role)} clickable />
                          ))}
                          {role.permissions.length > 2 && (
                            <Chip label={`+${role.permissions.length - 2}`} size="small" variant="outlined" onClick={() => setRolePermsModal(role)} clickable />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={role.status}
                          size="small"
                          color={getStatusColor(role.status)}
                          icon={role.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                          onClick={() => handleStatusToggleRole(role)}
                          clickable
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View details">
                            <IconButton size="small" color="primary" onClick={() => setViewRole(role)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => handleOpenRoleWizardEdit(role)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="warning" onClick={() => handleDeleteRoleWithConfirm(role)}>
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

      {/* User Security Tab */}
      {selectedTab === 2 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">User Security</Typography>
              <Button startIcon={<AddIcon />} onClick={handleOpenUserSecurityCreate}>
                Assign User
              </Button>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Roles</TableCell>
                    <TableCell>Groups</TableCell>
                    <TableCell>Access Level</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Access</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userSecurity.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {user.userName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {user.userName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {user.roles.slice(0, 2).map((role) => (
                            <Chip key={role} label={role} size="small" color="primary" onClick={() => setUserRolesModal(user)} clickable />
                          ))}
                          {user.roles.length > 2 && (
                            <Chip label={`+${user.roles.length - 2}`} size="small" variant="outlined" onClick={() => setUserRolesModal(user)} clickable />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {user.groups.slice(0, 2).map((group) => (
                            <Chip key={group} label={group} size="small" color="secondary" onClick={() => setUserGroupsModal(user)} clickable />
                          ))}
                          {user.groups.length > 2 && (
                            <Chip label={`+${user.groups.length - 2}`} size="small" variant="outlined" onClick={() => setUserGroupsModal(user)} clickable />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.accessLevel}
                          size="small"
                          color={user.accessLevel === 'Full' ? 'success' : user.accessLevel === 'Limited' ? 'warning' : 'default'}
                          onClick={() => setUserAccessModal(user)}
                          clickable
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          size="small"
                          color={getStatusColor(user.status)}
                          icon={user.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {user.lastAccess}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View details">
                            <IconButton size="small" color="primary" onClick={() => setViewRole(user as any)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => handleOpenUserSecurityEdit(user)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="warning" onClick={() => handleDeleteUser(user)}>
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

      {/* Permissions Matrix Tab */}
      {selectedTab === 3 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Permissions Matrix</Typography>
              <Button startIcon={<AddIcon />} onClick={() => {
                setPermissionModalMode('add');
                setEditPermissionForm({
                  id: (permissionsMatrix.length + 1).toString(),
                  permission: '',
                  category: '',
                  roles: [],
                  groups: [],
                  users: [],
                  status: 'Active',
                  lastModified: new Date().toISOString().slice(0, 16).replace('T', ' ')
                });
                setEditPermissionModal({} as PermissionMatrix);
              }}>
                Add Permission
              </Button>
            </Box>
            
            {/* Filters */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Search Permissions"
                  value={permissionFilter}
                  onChange={e => setPermissionFilter(e.target.value)}
                  placeholder="Filter by permission name..."
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {allCategories.map(cat => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setPermissionFilter('');
                    setCategoryFilter('');
                    setStatusFilter('');
                  }}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Permission</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Roles</TableCell>
                    <TableCell>Groups</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Modified</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPermissions.map((permission) => (
                    <TableRow key={permission.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {permission.permission}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={permission.category} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {permission.roles.slice(0, 2).map((role) => (
                            <Chip key={role} label={role} size="small" color="secondary" />
                          ))}
                          {permission.roles.length > 2 && (
                            <Chip label={`+${permission.roles.length - 2}`} size="small" variant="outlined" />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {permission.groups.slice(0, 2).map((group) => (
                            <Chip key={group} label={group} size="small" color="info" />
                          ))}
                          {permission.groups.length > 2 && (
                            <Chip label={`+${permission.groups.length - 2}`} size="small" variant="outlined" />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {permission.users.slice(0, 2).map((user) => (
                            <Chip key={user} label={user} size="small" color="success" />
                          ))}
                          {permission.users.length > 2 && (
                            <Chip label={`+${permission.users.length - 2}`} size="small" variant="outlined" />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={permission.status}
                          size="small"
                          color={getStatusColor(permission.status)}
                          icon={permission.status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {permission.lastModified}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View details">
                            <IconButton size="small" color="primary" onClick={() => setPermissionDetailsModal(permission)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="info" onClick={() => {
                              setPermissionModalMode('edit');
                              setEditPermissionForm({ ...permission });
                              setEditPermissionModal(permission);
                            }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="warning" onClick={() => alert(`Delete ${permission.permission} - TODO`)}>
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

            {/* Summary Stats */}
            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>Summary</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">Total Permissions</Typography>
                  <Typography variant="h6">{permissionsMatrix.length}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">Active Permissions</Typography>
                  <Typography variant="h6">{permissionsMatrix.filter(p => p.status === 'Active').length}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">Categories</Typography>
                  <Typography variant="h6">{allCategories.length}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" color="text.secondary">Filtered Results</Typography>
                  <Typography variant="h6">{filteredPermissions.length}</Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Create Security Group Dialog */}
      <Dialog open={openGroupDialog} onClose={() => setOpenGroupDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Security Group</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Group Name"
                placeholder="e.g., HR Business Partners"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Group Type</InputLabel>
                <Select label="Group Type">
                  <MenuItem value="Job-based">Job-based</MenuItem>
                  <MenuItem value="Role-based">Role-based</MenuItem>
                  <MenuItem value="User-based">User-based</MenuItem>
                  <MenuItem value="Location-based">Location-based</MenuItem>
                  <MenuItem value="Department-based">Department-based</MenuItem>
                  <MenuItem value="Custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Description of the security group"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGroupDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenGroupDialog(false)}>
            Create Security Group
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Security Role Dialog */}
      <Dialog open={openRoleDialog} onClose={() => setOpenRoleDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Security Role</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Role Name"
                placeholder="e.g., HR Business Partner"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Role Type</InputLabel>
                <Select label="Role Type">
                  <MenuItem value="HRBP">HR Business Partner</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Admin">System Administrator</MenuItem>
                  <MenuItem value="Compensation Partner">Compensation Partner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                placeholder="Description of the security role"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenRoleDialog(false)}>
            Create Security Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Security Group Modal */}
      <Dialog open={!!viewGroup} onClose={() => setViewGroup(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Security Group Details</DialogTitle>
        <DialogContent dividers>
          {viewGroup && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewGroup.name}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Type:</b> {viewGroup.type}</Grid>
                <Grid item xs={6}><b>Status:</b> {viewGroup.status}</Grid>
                <Grid item xs={6}><b>User Count:</b> {viewGroup.userCount}</Grid>
                <Grid item xs={12}><b>Description:</b> {viewGroup.description}</Grid>
                <Grid item xs={12}>
                  <b>Permissions:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewGroup.permissions.map((permission, index) => (
                      <Chip key={index} label={permission} size="small" color="secondary" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewGroup(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* View Security Role Modal */}
      <Dialog open={!!viewRole} onClose={() => setViewRole(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Security Role Details</DialogTitle>
        <DialogContent dividers>
          {viewRole && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{viewRole.name}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Type:</b> {viewRole.type}</Grid>
                <Grid item xs={6}><b>Status:</b> {viewRole.status}</Grid>
                <Grid item xs={6}><b>User Count:</b> {viewRole.userCount}</Grid>
                <Grid item xs={12}><b>Description:</b> {viewRole.description}</Grid>
                <Grid item xs={12}>
                  <b>Permissions:</b>
                  <Box sx={{ mt: 1 }}>
                    {viewRole.permissions.map((permission, index) => (
                      <Chip key={index} label={permission} size="small" color="secondary" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewRole(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Security Group Multi-Step Wizard */}
      <Dialog open={openGroupWizard} onClose={() => setOpenGroupWizard(false)} maxWidth="md" fullWidth>
        <DialogTitle>{groupWizardMode === 'create' ? 'Create Security Group' : 'Edit Security Group'}</DialogTitle>
        <DialogContent>
          <Stepper activeStep={groupWizardStep} alternativeLabel sx={{ mb: 2 }}>
            <Step><StepLabel>Basic Information</StepLabel></Step>
            <Step><StepLabel>User Assignment</StepLabel></Step>
            <Step><StepLabel>Permissions</StepLabel></Step>
            <Step><StepLabel>Review & Submit</StepLabel></Step>
          </Stepper>
          {groupWizardStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Group Name"
                  value={groupWizardForm.name}
                  onChange={e => {
                    setGroupWizardForm(f => ({ ...f, name: e.target.value }));
                    setGroupWizardError(null);
                  }}
                  error={!!groupWizardError}
                  helperText={groupWizardError}
                  disabled={groupWizardMode === 'edit'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Group Type</InputLabel>
                  <Select
                    label="Group Type"
                    value={groupWizardForm.type}
                    onChange={e => setGroupWizardForm(f => ({ ...f, type: e.target.value as any }))}
                  >
                    <MenuItem value="Job-based">Job-based</MenuItem>
                    <MenuItem value="Role-based">Role-based</MenuItem>
                    <MenuItem value="User-based">User-based</MenuItem>
                    <MenuItem value="Location-based">Location-based</MenuItem>
                    <MenuItem value="Department-based">Department-based</MenuItem>
                    <MenuItem value="Custom">Custom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  value={groupWizardForm.description}
                  onChange={e => setGroupWizardForm(f => ({ ...f, description: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography>Status:</Typography>
                  <Switch
                    checked={groupWizardForm.status}
                    onChange={e => setGroupWizardForm(f => ({ ...f, status: e.target.checked }))}
                  />
                  <Typography>{groupWizardForm.status ? 'Active' : 'Inactive'}</Typography>
                </Box>
              </Grid>
            </Grid>
          )}
          {groupWizardStep === 1 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>User Assignment</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                {allUsers.map(user => (
                  <Chip
                    key={user.id}
                    label={user.name}
                    color={groupWizardForm.users.includes(user.id) ? 'primary' : 'default'}
                    variant={groupWizardForm.users.includes(user.id) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setGroupWizardForm(f => ({
                      ...f,
                      users: f.users.includes(user.id)
                        ? f.users.filter(u => u !== user.id)
                        : [...f.users, user.id]
                    }))}
                  />
                ))}
              </Stack>
              <Button variant="outlined" sx={{ mr: 2 }}>Bulk Import CSV (placeholder)</Button>
              <Button variant="outlined">Auto-Assignment Rules (placeholder)</Button>
            </Box>
          )}
          {groupWizardStep === 2 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Permissions</Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                {permissionTemplates.map(template => (
                  <Button
                    key={template}
                    variant={groupWizardForm.permissionTemplate === template ? 'contained' : 'outlined'}
                    onClick={() => setGroupWizardForm(f => ({ ...f, permissionTemplate: template }))}
                  >
                    {template}
                  </Button>
                ))}
              </Stack>
              {allPermissions.map(cat => (
                <Box key={cat.category} sx={{ mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold">{cat.category}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {cat.perms.map(perm => (
                      <Chip
                        key={perm}
                        label={perm}
                        color={groupWizardForm.permissions.includes(perm) ? 'primary' : 'default'}
                        variant={groupWizardForm.permissions.includes(perm) ? 'filled' : 'outlined'}
                        clickable
                        onClick={() => setGroupWizardForm(f => ({
                          ...f,
                          permissions: f.permissions.includes(perm)
                            ? f.permissions.filter(p => p !== perm)
                            : [...f.permissions, perm]
                        }))}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          )}
          {groupWizardStep === 3 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Review & Submit</Typography>
              <Typography><b>Group Name:</b> {groupWizardForm.name}</Typography>
              <Typography><b>Type:</b> {groupWizardForm.type}</Typography>
              <Typography><b>Description:</b> {groupWizardForm.description}</Typography>
              <Typography><b>Status:</b> {groupWizardForm.status ? 'Active' : 'Inactive'}</Typography>
              <Typography><b>Users:</b> {groupWizardForm.users.map(uid => allUsers.find(u => u.id === uid)?.name).join(', ')}</Typography>
              <Typography><b>Permissions:</b> {groupWizardForm.permissions.join(', ')}</Typography>
              <Typography><b>Permission Template:</b> {groupWizardForm.permissionTemplate}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGroupWizard(false)}>Cancel</Button>
          {groupWizardStep > 0 && (
            <Button onClick={() => setGroupWizardStep(s => s - 1)}>Back</Button>
          )}
          {groupWizardStep < 3 && (
            <Button
              variant="contained"
              onClick={() => {
                if (groupWizardStep === 0 && (!groupWizardForm.name.trim() || !isGroupNameUnique(groupWizardForm.name))) {
                  setGroupWizardError(!groupWizardForm.name.trim() ? 'Group name is required' : 'Group name must be unique');
                  return;
                }
                setGroupWizardStep(s => s + 1);
              }}
            >
              Next
            </Button>
          )}
          {groupWizardStep === 3 && (
            <Button
              variant="contained"
              onClick={handleGroupWizardSubmit}
              disabled={!groupWizardForm.name.trim() || (groupWizardMode === 'create' && !isGroupNameUnique(groupWizardForm.name))}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Security Role Multi-Step Wizard */}
      <Dialog open={openRoleWizard} onClose={() => setOpenRoleWizard(false)} maxWidth="md" fullWidth>
        <DialogTitle>{roleWizardMode === 'create' ? 'Create Security Role' : 'Edit Security Role'}</DialogTitle>
        <DialogContent>
          <Stepper activeStep={roleWizardStep} alternativeLabel sx={{ mb: 2 }}>
            <Step><StepLabel>Role Definition</StepLabel></Step>
            <Step><StepLabel>Permission Assignment</StepLabel></Step>
            <Step><StepLabel>Constraints</StepLabel></Step>
            <Step><StepLabel>Assignment Rules</StepLabel></Step>
          </Stepper>
          {roleWizardStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Role Name"
                  value={roleWizardForm.name}
                  onChange={e => {
                    setRoleWizardForm(f => ({ ...f, name: e.target.value }));
                    setRoleWizardError(null);
                  }}
                  error={!!roleWizardError}
                  helperText={roleWizardError}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    value={roleWizardForm.category}
                    onChange={e => setRoleWizardForm(f => ({ ...f, category: e.target.value as any }))}
                  >
                    <MenuItem value="System">System</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Technical">Technical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Level</InputLabel>
                  <Select
                    label="Level"
                    value={roleWizardForm.level}
                    onChange={e => setRoleWizardForm(f => ({ ...f, level: e.target.value as any }))}
                  >
                    <MenuItem value="Executive">Executive</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="System">System</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  value={roleWizardForm.description}
                  onChange={e => setRoleWizardForm(f => ({ ...f, description: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography>Status:</Typography>
                  <Switch
                    checked={roleWizardForm.status}
                    onChange={e => setRoleWizardForm(f => ({ ...f, status: e.target.checked }))}
                  />
                  <Typography>{roleWizardForm.status ? 'Active' : 'Inactive'}</Typography>
                </Box>
              </Grid>
            </Grid>
          )}
          {roleWizardStep === 1 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Permission Assignment</Typography>
              <Typography variant="body2">Modules:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                {allModules.map(module => (
                  <Chip
                    key={module}
                    label={module}
                    color={roleWizardForm.modules.includes(module) ? 'primary' : 'default'}
                    variant={roleWizardForm.modules.includes(module) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setRoleWizardForm(f => ({
                      ...f,
                      modules: f.modules.includes(module)
                        ? f.modules.filter(m => m !== module)
                        : [...f.modules, module]
                    }))}
                  />
                ))}
              </Stack>
              <Typography variant="body2">Data Access:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                {allDataAccess.map(access => (
                  <Chip
                    key={access}
                    label={access}
                    color={roleWizardForm.dataAccess.includes(access) ? 'primary' : 'default'}
                    variant={roleWizardForm.dataAccess.includes(access) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setRoleWizardForm(f => ({
                      ...f,
                      dataAccess: f.dataAccess.includes(access)
                        ? f.dataAccess.filter(a => a !== access)
                        : [...f.dataAccess, access]
                    }))}
                  />
                ))}
              </Stack>
              <Typography variant="body2">Functional Permissions:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {allFunctions.map(func => (
                  <Chip
                    key={func}
                    label={func}
                    color={roleWizardForm.functions.includes(func) ? 'primary' : 'default'}
                    variant={roleWizardForm.functions.includes(func) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setRoleWizardForm(f => ({
                      ...f,
                      functions: f.functions.includes(func)
                        ? f.functions.filter(fn => fn !== func)
                        : [...f.functions, func]
                    }))}
                  />
                ))}
              </Stack>
            </Box>
          )}
          {roleWizardStep === 2 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Constraints</Typography>
              <TextField
                fullWidth
                label="Time-based Access (e.g., business hours only)"
                value={roleWizardForm.constraints.time}
                onChange={e => setRoleWizardForm(f => ({ ...f, constraints: { ...f.constraints, time: e.target.value } }))}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Location Restrictions"
                value={roleWizardForm.constraints.location}
                onChange={e => setRoleWizardForm(f => ({ ...f, constraints: { ...f.constraints, location: e.target.value } }))}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Data Security Classifications"
                value={roleWizardForm.constraints.dataSecurity}
                onChange={e => setRoleWizardForm(f => ({ ...f, constraints: { ...f.constraints, dataSecurity: e.target.value } }))}
              />
            </Box>
          )}
          {roleWizardStep === 3 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Assignment Rules</Typography>
              <TextField
                fullWidth
                label="Auto-assignment Criteria"
                value={roleWizardForm.assignmentRules.auto}
                onChange={e => setRoleWizardForm(f => ({ ...f, assignmentRules: { ...f.assignmentRules, auto: e.target.value } }))}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={roleWizardForm.assignmentRules.approval}
                    onChange={e => setRoleWizardForm(f => ({ ...f, assignmentRules: { ...f.assignmentRules, approval: e.target.checked } }))}
                  />
                }
                label="Approval Required"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Expiration Settings"
                value={roleWizardForm.assignmentRules.expiration}
                onChange={e => setRoleWizardForm(f => ({ ...f, assignmentRules: { ...f.assignmentRules, expiration: e.target.value } }))}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleWizard(false)}>Cancel</Button>
          {roleWizardStep > 0 && (
            <Button onClick={() => setRoleWizardStep(s => s - 1)}>Back</Button>
          )}
          {roleWizardStep < 3 && (
            <Button
              variant="contained"
              onClick={() => {
                if (roleWizardStep === 0 && (!roleWizardForm.name.trim() || !isRoleNameUnique(roleWizardForm.name))) {
                  setRoleWizardError(!roleWizardForm.name.trim() ? 'Role name is required' : 'Role name must be unique');
                  return;
                }
                setRoleWizardStep(s => s + 1);
              }}
            >
              Next
            </Button>
          )}
          {roleWizardStep === 3 && (
            <Button
              variant="contained"
              onClick={handleRoleWizardSubmit}
              disabled={!roleWizardForm.name.trim() || (roleWizardMode === 'create' && !isRoleNameUnique(roleWizardForm.name))}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Status Toggle Confirmation Dialog */}
      <Dialog open={!!statusToggleGroup} onClose={() => setStatusToggleGroup(null)}>
        <DialogTitle>Change Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of this group?
            <br />
            <b>Group:</b> {statusToggleGroup?.name}
            <br />
            <b>Affected Users:</b> {statusToggleGroup?.userCount}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusToggleGroup(null)}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={confirmStatusToggle}>Confirm</Button>
        </DialogActions>
      </Dialog>
      {/* Status Toggle Confirmation Dialog for Roles */}
      <Dialog open={!!statusToggleRole} onClose={() => setStatusToggleRole(null)}>
        <DialogTitle>Change Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status of this role?
            <br />
            <b>Role:</b> {statusToggleRole?.name}
            <br />
            <b>Affected Users:</b> {statusToggleRole?.userCount}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusToggleRole(null)}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={confirmStatusToggleRole}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Group Users Modal */}
      <Dialog open={!!groupUsersModal} onClose={() => setGroupUsersModal(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Group Users</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Users in this group:</Typography>
          <ul>
            {groupUsersModal?.userCount ? (
              <li>Sample User List (implement real user data)</li>
            ) : (
              <li>No users assigned.</li>
            )}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGroupUsersModal(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Group Permissions Modal */}
      <Dialog open={!!groupPermsModal} onClose={() => setGroupPermsModal(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Group Permissions</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Permissions assigned to this group:</Typography>
          <ul>
            {groupPermsModal?.permissions.map((perm, idx) => (
              <li key={idx}>{perm}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGroupPermsModal(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Group Confirmation Modal */}
      <Dialog open={!!deleteGroupModal.group} onClose={() => setDeleteGroupModal({ group: null as any, reason: '' })}>
        <DialogTitle>Delete Security Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this group?
            <br />
            <b>Group:</b> {deleteGroupModal.group?.name}
            <br />
            <b>Affected Users:</b> {deleteGroupModal.group?.userCount}
            <br />
            <b>Critical permissions:</b> {deleteGroupModal.group?.permissions.join(', ')}
          </DialogContentText>
          <TextField
            fullWidth
            label="Reason for deletion (required)"
            value={deleteGroupModal.reason}
            onChange={e => setDeleteGroupModal(d => ({ ...d, reason: e.target.value }))}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteGroupModal({ group: null as any, reason: '' })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDeleteGroup} disabled={!deleteGroupModal.reason.trim()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Role Confirmation Modal */}
      <Dialog open={!!deleteRoleModal.role} onClose={() => setDeleteRoleModal({ role: null as any, reason: '' })}>
        <DialogTitle>Delete Security Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this role?
            <br />
            <b>Role:</b> {deleteRoleModal.role?.name}
            <br />
            <b>Affected Users:</b> {deleteRoleModal.role?.userCount}
            <br />
            <b>Critical permissions:</b> {deleteRoleModal.role?.permissions.join(', ')}
          </DialogContentText>
          <TextField
            fullWidth
            label="Reason for deletion (required)"
            value={deleteRoleModal.reason}
            onChange={e => setDeleteRoleModal(d => ({ ...d, reason: e.target.value }))}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteRoleModal({ role: null as any, reason: '' })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDeleteRole} disabled={!deleteRoleModal.reason.trim()}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Role Users Modal */}
      <Dialog open={!!roleUsersModal} onClose={() => setRoleUsersModal(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Role Users</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Users with this role:</Typography>
          <ul>
            {roleUsersModal?.userCount ? (
              <li>Sample User List (implement real user data)</li>
            ) : (
              <li>No users assigned.</li>
            )}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoleUsersModal(null)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Role Permissions Modal */}
      <Dialog open={!!rolePermsModal} onClose={() => setRolePermsModal(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Role Permissions</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Permissions assigned to this role:</Typography>
          <ul>
            {rolePermsModal?.permissions.map((perm, idx) => (
              <li key={idx}>{perm}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRolePermsModal(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* User Security Dialog */}
      <Dialog open={openUserSecurityDialog} onClose={() => setOpenUserSecurityDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{userSecurityMode === 'create' ? 'Assign User' : 'Edit User Security'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="User ID"
                value={userSecurityForm.userId}
                onChange={e => setUserSecurityForm(f => ({ ...f, userId: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="User Name"
                value={userSecurityForm.userName}
                onChange={e => setUserSecurityForm(f => ({ ...f, userName: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={userSecurityForm.email}
                onChange={e => setUserSecurityForm(f => ({ ...f, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Department"
                value={userSecurityForm.department}
                onChange={e => setUserSecurityForm(f => ({ ...f, department: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={userSecurityForm.status}
                  onChange={e => setUserSecurityForm(f => ({ ...f, status: e.target.value as any }))}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Access Level</InputLabel>
                <Select
                  label="Access Level"
                  value={userSecurityForm.accessLevel}
                  onChange={e => setUserSecurityForm(f => ({ ...f, accessLevel: e.target.value as any }))}
                >
                  <MenuItem value="Full">Full</MenuItem>
                  <MenuItem value="Limited">Limited</MenuItem>
                  <MenuItem value="Read-only">Read-only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Roles</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {securityRoles.map(role => (
                  <Chip
                    key={role.id}
                    label={role.name}
                    color={userSecurityForm.roles.includes(role.name) ? 'primary' : 'default'}
                    variant={userSecurityForm.roles.includes(role.name) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setUserSecurityForm(f => ({
                      ...f,
                      roles: f.roles.includes(role.name)
                        ? f.roles.filter(r => r !== role.name)
                        : [...f.roles, role.name]
                    }))}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Groups</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {securityGroups.map(group => (
                  <Chip
                    key={group.id}
                    label={group.name}
                    color={userSecurityForm.groups.includes(group.name) ? 'secondary' : 'default'}
                    variant={userSecurityForm.groups.includes(group.name) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setUserSecurityForm(f => ({
                      ...f,
                      groups: f.groups.includes(group.name)
                        ? f.groups.filter(g => g !== group.name)
                        : [...f.groups, group.name]
                    }))}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserSecurityDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUserSecuritySubmit}>
            {userSecurityMode === 'create' ? 'Assign User' : 'Update User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Roles Modal */}
      <Dialog open={!!userRolesModal} onClose={() => setUserRolesModal(null)} maxWidth="sm" fullWidth>
        <DialogTitle>User Roles</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Roles assigned to this user:</Typography>
          <ul>
            {userRolesModal?.roles.map((role, idx) => (
              <li key={idx}>{role}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserRolesModal(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* User Groups Modal */}
      <Dialog open={!!userGroupsModal} onClose={() => setUserGroupsModal(null)} maxWidth="sm" fullWidth>
        <DialogTitle>User Groups</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Groups this user belongs to:</Typography>
          <ul>
            {userGroupsModal?.groups.map((group, idx) => (
              <li key={idx}>{group}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserGroupsModal(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* User Access Modal */}
      <Dialog open={!!userAccessModal} onClose={() => setUserAccessModal(null)} maxWidth="sm" fullWidth>
        <DialogTitle>User Access Details</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Access level details for this user:</Typography>
          <Typography><b>Level:</b> {userAccessModal?.accessLevel}</Typography>
          <Typography><b>Last Access:</b> {userAccessModal?.lastAccess}</Typography>
          <Typography><b>Status:</b> {userAccessModal?.status}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserAccessModal(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Confirmation Modal */}
      <Dialog open={!!deleteUserModal.user} onClose={() => setDeleteUserModal({ user: null as any, reason: '' })}>
        <DialogTitle>Remove User Security</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this user's security assignments?
            <br />
            <b>User:</b> {deleteUserModal.user?.userName}
            <br />
            <b>Roles:</b> {deleteUserModal.user?.roles.join(', ')}
            <br />
            <b>Groups:</b> {deleteUserModal.user?.groups.join(', ')}
          </DialogContentText>
          <TextField
            fullWidth
            label="Reason for removal (required)"
            value={deleteUserModal.reason}
            onChange={e => setDeleteUserModal(d => ({ ...d, reason: e.target.value }))}
            required
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUserModal({ user: null as any, reason: '' })}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDeleteUser} disabled={!deleteUserModal.reason.trim()}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permission Details Modal */}
      <Dialog open={!!permissionDetailsModal} onClose={() => setPermissionDetailsModal(null)} maxWidth="md" fullWidth>
        <DialogTitle>Permission Details</DialogTitle>
        <DialogContent dividers>
          {permissionDetailsModal && (
            <Box sx={{ p: 1 }}>
              <Typography variant="h6" gutterBottom>{permissionDetailsModal.permission}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><b>Category:</b> {permissionDetailsModal.category}</Grid>
                <Grid item xs={6}><b>Status:</b> {permissionDetailsModal.status}</Grid>
                <Grid item xs={6}><b>Last Modified:</b> {permissionDetailsModal.lastModified}</Grid>
                <Grid item xs={12}>
                  <b>Assigned Roles:</b>
                  <Box sx={{ mt: 1 }}>
                    {permissionDetailsModal.roles.map((role, index) => (
                      <Chip key={index} label={role} size="small" color="secondary" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <b>Assigned Groups:</b>
                  <Box sx={{ mt: 1 }}>
                    {permissionDetailsModal.groups.map((group, index) => (
                      <Chip key={index} label={group} size="small" color="info" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <b>Assigned Users:</b>
                  <Box sx={{ mt: 1 }}>
                    {permissionDetailsModal.users.map((user, index) => (
                      <Chip key={index} label={user} size="small" color="success" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPermissionDetailsModal(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Permission Modal */}
      <Dialog open={!!editPermissionModal} onClose={() => setEditPermissionModal(null)} maxWidth="md" fullWidth>
        <DialogTitle>{permissionModalMode === 'add' ? 'Add Permission' : 'Edit Permission'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Permission Name"
                value={editPermissionForm.permission}
                onChange={e => setEditPermissionForm(f => ({ ...f, permission: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={editPermissionForm.category}
                  onChange={e => setEditPermissionForm(f => ({ ...f, category: e.target.value }))}
                >
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="IT">IT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={editPermissionForm.status}
                  onChange={e => setEditPermissionForm(f => ({ ...f, status: e.target.value as any }))}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Roles</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {securityRoles.map(role => (
                  <Chip
                    key={role.name}
                    label={role.name}
                    color={editPermissionForm.roles.includes(role.name) ? 'primary' : 'default'}
                    variant={editPermissionForm.roles.includes(role.name) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setEditPermissionForm(f => ({
                      ...f,
                      roles: f.roles.includes(role.name)
                        ? f.roles.filter(r => r !== role.name)
                        : [...f.roles, role.name]
                    }))}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Groups</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {securityGroups.map(group => (
                  <Chip
                    key={group.name}
                    label={group.name}
                    color={editPermissionForm.groups.includes(group.name) ? 'secondary' : 'default'}
                    variant={editPermissionForm.groups.includes(group.name) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setEditPermissionForm(f => ({
                      ...f,
                      groups: f.groups.includes(group.name)
                        ? f.groups.filter(g => g !== group.name)
                        : [...f.groups, group.name]
                    }))}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>Users</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {allUsers.map(user => (
                  <Chip
                    key={user.name}
                    label={user.name}
                    color={editPermissionForm.users.includes(user.name) ? 'success' : 'default'}
                    variant={editPermissionForm.users.includes(user.name) ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setEditPermissionForm(f => ({
                      ...f,
                      users: f.users.includes(user.name)
                        ? f.users.filter(u => u !== user.name)
                        : [...f.users, user.name]
                    }))}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPermissionModal(null)}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            if (permissionModalMode === 'add') {
              setPermissionsMatrix(prev => [
                ...prev,
                { ...editPermissionForm, lastModified: new Date().toISOString().slice(0, 16).replace('T', ' ') }
              ]);
            } else {
              setPermissionsMatrix(prev => prev.map(p =>
                p.id === editPermissionForm.id
                  ? { ...editPermissionForm, lastModified: new Date().toISOString().slice(0, 16).replace('T', ' ') }
                  : p
              ));
            }
            setEditPermissionModal(null);
          }}>
            {permissionModalMode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SecurityRoles; 