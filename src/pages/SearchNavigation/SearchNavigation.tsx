import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  InputAdornment,
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Checkbox
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  MoreVert as MoreIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  History as HistoryIcon,
  TrendingUp as TrendingIcon,
  Assignment as AssignmentIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  WorkOutline as JobIcon,
  Search as SearchIcon
} from '@mui/icons-material';

interface SearchResult {
  id: string;
  type: 'Worker' | 'Job' | 'Organization' | 'Position' | 'Compensation';
  name: string;
  description: string;
  details: Record<string, string>;
  relevance: number;
  lastModified: string;
}

interface SearchFilter {
  category: string;
  options: string[];
  selected: string[];
}

const SearchNavigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SearchFilter[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{ category: string; items: SearchResult[] }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mock data for search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'Worker',
      name: 'John Doe',
      description: 'Software Engineer',
      details: {
        'Employee ID': 'EMP001',
        'Department': 'Engineering',
        'Location': 'San Francisco',
        'Manager': 'Sarah Johnson',
        'Job Profile': 'Software Engineer',
        'Status': 'Active'
      },
      relevance: 95,
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      type: 'Worker',
      name: 'Sarah Johnson',
      description: 'Engineering Manager',
      details: {
        'Employee ID': 'EMP002',
        'Department': 'Engineering',
        'Location': 'San Francisco',
        'Manager': 'David Brown',
        'Job Profile': 'Engineering Manager',
        'Status': 'Active'
      },
      relevance: 85,
      lastModified: '2024-01-14'
    },
    {
      id: '3',
      type: 'Job',
      name: 'Software Engineer',
      description: 'Engineering Department',
      details: {
        'Job Family': 'Engineering',
        'Job Level': 'Individual Contributor',
        'Location': 'San Francisco',
        'Status': 'Active',
        'Open Positions': '3'
      },
      relevance: 80,
      lastModified: '2024-01-13'
    },
    {
      id: '4',
      type: 'Organization',
      name: 'Engineering Department',
      description: 'Technology Division',
      details: {
        'Supervisory Organization': 'Technology Division',
        'Manager': 'Sarah Johnson',
        'Location': 'San Francisco',
        'Headcount': '45',
        'Status': 'Active'
      },
      relevance: 75,
      lastModified: '2024-01-12'
    }
  ];

  const filters: SearchFilter[] = [
    {
      category: 'Worker Type',
      options: ['Employee', 'Contingent Worker', 'Contractor'],
      selected: []
    },
    {
      category: 'Department',
      options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'],
      selected: []
    },
    {
      category: 'Location',
      options: ['San Francisco', 'New York', 'London', 'Tokyo', 'Remote'],
      selected: []
    },
    {
      category: 'Job Level',
      options: ['Individual Contributor', 'Manager', 'Director', 'VP', 'C-Level'],
      selected: []
    },
    {
      category: 'Status',
      options: ['Active', 'Inactive', 'Terminated', 'On Leave'],
      selected: []
    }
  ];

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const existing = prev.find(f => f.category === category);
      if (existing) {
        if (checked) {
          existing.selected.push(value);
        } else {
          existing.selected = existing.selected.filter(v => v !== value);
        }
        return [...prev];
      } else {
        return [...prev, { category, options: [], selected: checked ? [value] : [] }];
      }
    });
  };

  const getResultTypeIcon = (type: string) => {
    switch (type) {
      case 'Worker': return <PersonIcon />;
      case 'Job': return <WorkIcon />;
      case 'Organization': return <BusinessIcon />;
      case 'Position': return <AssignmentIcon />;
      case 'Compensation': return <WorkIcon />; // Changed from MoneyIcon to WorkIcon as MoneyIcon was removed
      default: return <BusinessIcon />;
    }
  };

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case 'Worker': return 'primary';
      case 'Job': return 'secondary';
      case 'Organization': return 'info';
      case 'Position': return 'warning';
      case 'Compensation': return 'success';
      default: return 'default';
    }
  };

  const quickActions = [
    { name: 'Find Worker', icon: <PersonIcon />, color: 'primary' },
    { name: 'Find Job', icon: <WorkIcon />, color: 'secondary' },
    { name: 'Find Organization', icon: <BusinessIcon />, color: 'info' },
    { name: 'Find Position', icon: <AssignmentIcon />, color: 'warning' }
  ];

  // Helper: group results by type
  const groupResultsByType = (results: SearchResult[]) => {
    const groups: { [key: string]: SearchResult[] } = {};
    results.forEach(r => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    });
    return groups;
  };

  // Typeahead suggestions
  const getSuggestions = (query: string) => {
    if (!query) return [];
    const lower = query.toLowerCase();
    const cats = ['Worker', 'Job', 'Organization', 'Position'];
    return cats.map(cat => ({
      category: cat,
      items: mockResults.filter(r => r.type === cat && (r.name.toLowerCase().includes(lower) || r.description.toLowerCase().includes(lower)))
    })).filter(g => g.items.length > 0);
  };

  // Main search handler
  const handleSearch = (query: string, fromSuggestion = false) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Save to recent searches
      setRecentSearches(prev => [query, ...prev.filter(q => q !== query)].slice(0, 8));
      // Filter results
      let filtered = mockResults.filter(result =>
        (activeCategory === 'All' || result.type === activeCategory) &&
        (result.name.toLowerCase().includes(query.toLowerCase()) ||
         result.description.toLowerCase().includes(query.toLowerCase()))
      );
      // Apply filters
      selectedFilters.forEach(f => {
        filtered = filtered.filter(r =>
          f.selected.length === 0 ||
          f.selected.some(val => Object.values(r.details).includes(val))
        );
      });
      setSearchResults(filtered);
      setShowSuggestions(!fromSuggestion && query.length > 0);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };

  // On input change, update suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSuggestions(getSuggestions(val));
    setShowSuggestions(val.length > 0);
    handleSearch(val);
  };

  // Quick Actions
  const handleQuickAction = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery('');
    setShowSuggestions(false);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  // Save/Unsave search
  const toggleSaveSearch = (query: string) => {
    setSavedSearches(prev => prev.includes(query) ? prev.filter(q => q !== query) : [query, ...prev]);
  };

  // Remove filter chip
  const removeFilterChip = (cat: string, val: string) => {
    setSelectedFilters(prev => prev.map(f =>
      f.category === cat ? { ...f, selected: f.selected.filter(v => v !== val) } : f
    ));
    // Re-run search
    handleSearch(searchQuery);
  };

  // On suggestion click
  const handleSuggestionClick = (item: SearchResult) => {
    setSearchQuery(item.name);
    setShowSuggestions(false);
    handleSearch(item.name, true);
    // In real app, route to detail page
    alert(`Navigate to ${item.type} detail: ${item.name}`);
  };

  // On chip click (popular/saved/recent)
  const handleChipClick = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    handleSearch(query);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          Search & Navigation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Global search and navigation for workers, jobs, organizations, and more
        </Typography>
      </Box>

      {/* Global Search Bar with Typeahead */}
      <Card sx={{ mb: 3, position: 'relative' }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder={`Search for ${activeCategory === 'All' ? 'workers, jobs, organizations...' : activeCategory.toLowerCase() + 's...'}`}
              value={searchQuery}
              inputRef={searchInputRef}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            {searchQuery && (
              <IconButton onClick={() => toggleSaveSearch(searchQuery)} color={savedSearches.includes(searchQuery) ? 'warning' : 'default'}>
                <StarIcon />
              </IconButton>
            )}
          </Box>
          {/* Typeahead Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <Paper sx={{ position: 'absolute', zIndex: 10, left: 0, right: 0, mt: 1, maxHeight: 320, overflowY: 'auto' }}>
              {suggestions.map(group => (
                <Box key={group.category}>
                  <Typography variant="subtitle2" sx={{ pl: 2, pt: 1 }}>{group.category}</Typography>
                  {group.items.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1, cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }} onClick={() => handleSuggestionClick(item)}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: `${getResultTypeColor(item.type)}.main`, mr: 1 }}>{getResultTypeIcon(item.type)}</Avatar>
                      <Box>
                        <Typography variant="body2">{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.description}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))}
            </Paper>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => handleQuickAction(action.name.replace('Find ', ''))}>
              <Box sx={{ color: `${action.color}.main`, mb: 1 }}>
                {action.icon}
              </Box>
              <Typography variant="h6">{action.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters Drawer */}
      <Drawer
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
        sx={{ '& .MuiDrawer-paper': { width: 320 } }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Search Filters</Typography>
            <IconButton onClick={() => setShowFilters(false)}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Stack spacing={2}>
            {filters.map((filter) => (
              <Accordion key={filter.category}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{filter.category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {filter.options.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={selectedFilters.find(f => f.category === filter.category)?.selected.includes(option) || false}
                            onChange={(e) => handleFilterChange(filter.category, option, e.target.checked)}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Box>
      </Drawer>

      {/* Active Filters as Chips */}
      {selectedFilters.some(f => f.selected.length > 0) && (
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {selectedFilters.flatMap(f => f.selected.map(val => (
            <Chip key={f.category + val} label={`${f.category}: ${val}`} onDelete={() => removeFilterChip(f.category, val)} />
          )))}
        </Box>
      )}

      {/* Search Results - Grouped by Type */}
      {searchQuery && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Search Results ({searchResults.length})
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Relevance" size="small" />
                <Chip label="Date" size="small" />
                <Chip label="Type" size="small" />
              </Box>
            </Box>
            {searchResults.length > 0 ? (
              Object.entries(groupResultsByType(searchResults)).map(([type, results]) => (
                <Box key={type} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>{type}s</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Result</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Details</TableCell>
                          <TableCell>Relevance</TableCell>
                          <TableCell>Last Modified</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {results.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: `${getResultTypeColor(result.type)}.main` }}>
                                  {getResultTypeIcon(result.type)}
                                </Avatar>
                                <Box>
                                  <Typography variant="body1" fontWeight="medium">
                                    {result.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {result.description}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={result.type} 
                                size="small" 
                                color={getResultTypeColor(result.type)}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={1} flexWrap="wrap">
                                {Object.entries(result.details).slice(0, 2).map(([key, value]) => (
                                  <Chip 
                                    key={key} 
                                    label={`${key}: ${value}`} 
                                    size="small" 
                                    variant="outlined"
                                  />
                                ))}
                                {Object.keys(result.details).length > 2 && (
                                  <Chip 
                                    label={`+${Object.keys(result.details).length - 2} more`} 
                                    size="small" 
                                    variant="outlined"
                                  />
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2">{result.relevance}%</Typography>
                                <Box sx={{ 
                                  width: 60, 
                                  height: 4, 
                                  bgcolor: 'grey.200', 
                                  borderRadius: 2,
                                  overflow: 'hidden'
                                }}>
                                  <Box sx={{ 
                                    width: `${result.relevance}%`, 
                                    height: '100%', 
                                    bgcolor: 'primary.main' 
                                  }} />
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>{result.lastModified}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="View Details">
                                  <IconButton size="small" color="primary" onClick={() => alert(`Navigate to ${result.type} detail: ${result.name}`)}>
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <IconButton size="small" color="info">
                                    <EditIcon />
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
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No results found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search terms or filters
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent & Saved Searches */}
      {!searchQuery && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Searches
                </Typography>
                <List>
                  {recentSearches.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ pl: 2, pt: 1 }}>
                      No recent searches
                    </Typography>
                  )}
                  {recentSearches.map((search, index) => (
                    <ListItem key={index} sx={{ cursor: 'pointer' }} onClick={() => handleChipClick(search)}>
                      <ListItemIcon>
                        <HistoryIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={search}
                        secondary={index === 0 ? 'Just now' : `${index * 2} hours ago`}
                      />
                      <IconButton size="small" onClick={() => handleChipClick(search)}>
                        <SearchIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => toggleSaveSearch(search)} color={savedSearches.includes(search) ? 'warning' : 'default'}>
                        <StarIcon />
                      </IconButton>
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
                  Saved Searches
                </Typography>
                <List>
                  {savedSearches.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ pl: 2, pt: 1 }}>
                      No saved searches
                    </Typography>
                  )}
                  {savedSearches.map((search, index) => (
                    <ListItem key={index} sx={{ cursor: 'pointer' }} onClick={() => handleChipClick(search)}>
                      <ListItemIcon>
                        <StarIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={search}
                        secondary="Saved search"
                      />
                      <IconButton size="small" onClick={() => handleChipClick(search)}>
                        <SearchIcon />
                      </IconButton>
                      <IconButton size="small" onClick={() => toggleSaveSearch(search)} color="error">
                        <ClearIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Popular Searches */}
      {!searchQuery && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Popular Searches
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['Active Employees', 'Managers', 'Open Jobs', 'Engineering Team', 'High Salary', 'Remote Workers'].map((search, index) => (
                <Chip
                  key={index}
                  label={search}
                  variant="outlined"
                  clickable
                  onClick={() => handleChipClick(search)}
                  icon={<TrendingIcon />}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SearchNavigation; 