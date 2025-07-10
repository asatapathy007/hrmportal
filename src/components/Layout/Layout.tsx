import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  People,
  AttachMoney,
  Work,
  Assessment,
  School,
  BarChart,
  Schedule,
  Settings,
  AccountCircle,
  Notifications,
  Person,
  Group,
  AdminPanelSettings,
  Build,
  Home,
  AccountTree,
  Assignment,
  MonetizationOn,
  Shield,
  BusinessCenter,
  SwapHoriz,
  FindInPage,
  SelfImprovement,
  Analytics,
  Apps,
  HelpOutline,
  InfoOutlined,
  GavelOutlined,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

interface LayoutProps {
  children: React.ReactNode;
  currentRole?: string;
}

const drawerWidth = 280;

const Layout: React.FC<LayoutProps> = ({ children, currentRole = 'Admin' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [appsAnchorEl, setAppsAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [helpAnchorEl, setHelpAnchorEl] = useState<null | HTMLElement>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Mock data for suggestions
  const mockData = [
    { type: 'Employee', label: 'John Doe', sub: 'Software Engineer', path: '/employees/1' },
    { type: 'Employee', label: 'Sarah Johnson', sub: 'HR Manager', path: '/employees/2' },
    { type: 'Job', label: 'Software Engineer', sub: 'Engineering', path: '/jobs-positions' },
    { type: 'Job', label: 'HR Manager', sub: 'Human Resources', path: '/jobs-positions' },
    { type: 'Department', label: 'Engineering', sub: 'Department', path: '/organization' },
    { type: 'Department', label: 'HR', sub: 'Department', path: '/organization' },
    { type: 'Position', label: 'Backend Developer', sub: 'Engineering', path: '/jobs-positions' },
    { type: 'Position', label: 'Recruiter', sub: 'HR', path: '/jobs-positions' },
  ];

  // Categorize suggestions
  const getSuggestions = (query: string) => {
    if (!query) return [];
    const lower = query.toLowerCase();
    const cats = ['Employee', 'Job', 'Department', 'Position'];
    return cats.map(cat => ({
      category: cat,
      items: mockData.filter(r => r.type === cat && (r.label.toLowerCase().includes(lower) || r.sub.toLowerCase().includes(lower)))
    })).filter(g => g.items.length > 0);
  };
  const suggestions = getSuggestions(debouncedQuery);
  const flatSuggestions = suggestions.flatMap(g => g.items);

  // Handle search input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchDropdown(true);
    setHighlightedIndex(-1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (item: any) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    setHighlightedIndex(-1);
    setRecentSearches(prev => [item.label, ...prev.filter(q => q !== item.label)].slice(0, 8));
    // In real app, use navigate(item.path)
    alert(`Navigate to ${item.type}: ${item.label}`);
  };

  // Handle search submit (Enter)
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (showSearchDropdown && highlightedIndex >= 0 && flatSuggestions.length > 0) {
        handleSuggestionClick(flatSuggestions[highlightedIndex]);
      } else if (debouncedQuery.trim()) {
        setRecentSearches(prev => [debouncedQuery, ...prev.filter(q => q !== debouncedQuery)].slice(0, 8));
        setShowSearchDropdown(false);
        setHighlightedIndex(-1);
        alert(`Search for: ${debouncedQuery}`);
      }
    } else if (e.key === 'ArrowDown') {
      setShowSearchDropdown(true);
      setHighlightedIndex(i => Math.min(i + 1, flatSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setShowSearchDropdown(true);
      setHighlightedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Escape') {
      setShowSearchDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  // Handle focus/blur
  const handleSearchFocus = () => setShowSearchDropdown(true);
  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Only close if not clicking inside dropdown
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setShowSearchDropdown(false);
        setHighlightedIndex(-1);
      }
    }, 120);
  };

  // Handle recent search click
  const handleRecentClick = (query: string) => {
    setSearchQuery(query);
    setShowSearchDropdown(true);
    setHighlightedIndex(-1);
    searchInputRef.current?.focus();
  };

  // Handle clear
  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    setHighlightedIndex(-1);
    searchInputRef.current?.focus();
  };

  // Keyboard navigation for dropdown
  useEffect(() => {
    if (!showSearchDropdown) setHighlightedIndex(-1);
    else if (highlightedIndex >= flatSuggestions.length) setHighlightedIndex(flatSuggestions.length - 1);
  }, [showSearchDropdown, flatSuggestions.length, highlightedIndex]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAppsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAppsAnchorEl(event.currentTarget);
  };
  const handleAppsMenuClose = () => {
    setAppsAnchorEl(null);
  };

  // Sidebar collapse/expand
  const handleSidebarCollapse = () => setSidebarCollapsed(c => !c);

  // Role-based navigation items
  const getNavigationItems = () => {
    switch (currentRole) {
      case 'Employee':
        return [
          { text: 'All About Me', icon: <Person />, path: '/employee' },
          { text: 'Personal Information', icon: <AccountCircle />, path: '/self-service' },
          { text: 'Time & Attendance', icon: <Schedule />, path: '/time-tracking' },
          { text: 'Benefits', icon: <Work />, path: '/benefits' },
          { text: 'Learning', icon: <School />, path: '/learning' },
          { text: 'Performance', icon: <Assessment />, path: '/performance' },
        ];
      case 'Manager':
        return [
          { text: 'My Team', icon: <Group />, path: '/manager' },
          { text: 'Team Management', icon: <People />, path: '/employees' },
          { text: 'Approvals', icon: <Assessment />, path: '/business-processes' },
          { text: 'Performance Reviews', icon: <Assessment />, path: '/performance' },
          { text: 'Recruiting', icon: <Work />, path: '/recruiting' },
          { text: 'Reports', icon: <BarChart />, path: '/reports-dashboards' },
        ];
      case 'Admin':
        return [
          { text: 'My Picarro 2.0', icon: <Home />, path: '/admin' },
          { text: 'Organization Management', icon: <AccountTree />, path: '/organization' },
          { text: 'Staffing Models', icon: <Assignment />, path: '/staffing' },
          { text: 'Jobs & Positions', icon: <Work />, path: '/jobs-positions' },
          { text: 'Compensation', icon: <MonetizationOn />, path: '/compensation' },
          { text: 'Security & Roles', icon: <Shield />, path: '/security' },
          { text: 'Business Processes', icon: <BusinessCenter />, path: '/business-processes' },
          { text: 'Transactions', icon: <SwapHoriz />, path: '/transactions' },
          { text: 'Search & Navigation', icon: <FindInPage />, path: '/search' },
          { text: 'Self Service', icon: <SelfImprovement />, path: '/self-service' },
          { text: 'Reports & Dashboards', icon: <Analytics />, path: '/reports-dashboards' },
        ];
      case 'Tech':
        return [
          { text: 'Workbench', icon: <Build />, path: '/tech' },
          { text: 'System Administration', icon: <Settings />, path: '/security' },
          { text: 'Technical Configuration', icon: <AdminPanelSettings />, path: '/organization' },
          { text: 'Integration Tools', icon: <Build />, path: '/transactions' },
          { text: 'System Reports', icon: <Analytics />, path: '/reports-dashboards' },
        ];
      default:
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
          { text: 'Employees', icon: <People />, path: '/employees' },
          { text: 'Payroll', icon: <AttachMoney />, path: '/payroll' },
          { text: 'Benefits', icon: <Work />, path: '/benefits' },
          { text: 'Time Tracking', icon: <Schedule />, path: '/time-tracking' },
          { text: 'Recruiting', icon: <Work />, path: '/recruiting' },
          { text: 'Performance', icon: <Assessment />, path: '/performance' },
          { text: 'Learning', icon: <School />, path: '/learning' },
          { text: 'Reports', icon: <BarChart />, path: '/reports' },
        ];
    }
  };

  // Ensure Home/Dashboard is always at top
  let navigationItems = getNavigationItems();
  if (!['Home', 'Dashboard', 'My Workday', 'My Picarro 2.0'].includes(navigationItems[0].text)) {
    const homeIdx = navigationItems.findIndex(item => /home|dashboard|my workday|my picarro/i.test(item.text));
    if (homeIdx > 0) {
      const [homeItem] = navigationItems.splice(homeIdx, 1);
      navigationItems.unshift(homeItem);
    }
  }

  const getPageTitle = () => {
    const currentItem = navigationItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.text : 'Picarro HCM';
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Picarro HCM
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentRole} Portal
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleSidebarCollapse} sx={{ ml: 1 }}>
          {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>
      <List sx={{ pt: 1 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                borderRadius: 1,
                minHeight: 48,
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                px: sidebarCollapsed ? 1 : 2.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'white' : 'inherit',
                  minWidth: 0,
                  mr: sidebarCollapsed ? 0 : 2,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!sidebarCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const picarroBlue = '#0073e6';

  const SearchBarContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(picarroBlue, 0.08),
    '&:hover': {
      backgroundColor: alpha(picarroBlue, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchBarIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    fontFamily: 'Source Sans Pro, sans-serif',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '32ch',
      },
    },
  }));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${sidebarCollapsed ? 64 : drawerWidth}px)` },
          ml: { sm: `${sidebarCollapsed ? 64 : drawerWidth}px` },
          backgroundColor: picarroBlue,
          color: 'white',
          fontFamily: 'Source Sans Pro, sans-serif',
          boxShadow: '0 2px 8px rgba(0,115,230,0.08)',
          zIndex: 1202,
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          {/* Picarro Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img
              src="/picarro-logo.png"
              alt="Picarro Logo"
              style={{ height: 36, width: 'auto', marginRight: 12 }}
            />
          </Box>
          {/* 9-dot Apps Menu */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="apps menu"
            sx={{ mr: 1 }}
            onClick={handleAppsMenuOpen}
          >
            <Apps />
          </IconButton>
          <Menu
            anchorEl={appsAnchorEl}
            open={Boolean(appsAnchorEl)}
            onClose={handleAppsMenuClose}
            MenuListProps={{ 'aria-labelledby': 'apps-menu-button' }}
          >
            <MenuItem onClick={() => { handleAppsMenuClose(); navigate('/admin'); }}>
              <Home sx={{ mr: 1 }} /> Home
            </MenuItem>
            <MenuItem onClick={() => { handleAppsMenuClose(); navigate('/reports-dashboards'); }}>
              <Analytics sx={{ mr: 1 }} /> Reports & Dashboards
            </MenuItem>
            <MenuItem onClick={() => { handleAppsMenuClose(); navigate('/security'); }}>
              <Shield sx={{ mr: 1 }} /> Security & Roles
            </MenuItem>
            <MenuItem onClick={() => { handleAppsMenuClose(); navigate('/business-processes'); }}>
              <BusinessCenter sx={{ mr: 1 }} /> Business Processes
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Box
          component="nav"
          sx={{ width: { sm: sidebarCollapsed ? 64 : drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarCollapsed ? 64 : drawerWidth, transition: 'width 0.2s' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${sidebarCollapsed ? 64 : drawerWidth}px)` },
            mt: 8,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{
        bgcolor: 'grey.100',
        color: 'text.secondary',
        py: 2,
        px: 3,
        borderTop: '1px solid #e0e0e0',
        fontSize: 14,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 'auto',
      }}>
        <Box>
          <a href="https://help.picarro.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', marginRight: 16 }}>
            <HelpOutline fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> Help
          </a>
          <a href="https://status.picarro.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', marginRight: 16 }}>
            <BarChart fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> System Status
          </a>
          <a href="https://picarro.com/legal" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            <GavelOutlined fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> Legal & Privacy
          </a>
        </Box>
        <Box>
          &copy; {new Date().getFullYear()} Picarro HCM
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 