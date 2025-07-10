// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Environment check
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// API endpoints
export const API_ENDPOINTS = {
  organizations: `${API_BASE_URL}/organizations`,
  positions: `${API_BASE_URL}/positions`,
  employees: `${API_BASE_URL}/employees`,
  locations: `${API_BASE_URL}/locations`,
  jobProfiles: `${API_BASE_URL}/job-profiles`,
  compensationGrades: `${API_BASE_URL}/compensation-grades`,
  payroll: `${API_BASE_URL}/payroll`,
  securityRoles: `${API_BASE_URL}/security-roles`,
  staffingModels: `${API_BASE_URL}/staffing-models`,
  compensation: `${API_BASE_URL}/compensation`,
}; 