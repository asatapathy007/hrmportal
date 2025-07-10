# Simulation HCM - Workday-like Human Capital Management Tool

A comprehensive Human Capital Management (HCM) application built with React, TypeScript, and Material-UI that mimics the look, feel, and navigation patterns of Workday HCM.

## Features

### 🏠 Dashboard
- Key HR metrics and KPIs
- Employee distribution charts
- Recent activities feed
- Performance indicators
- Interactive data visualizations

### 👥 Employee Management
- Comprehensive employee database
- Search and filter functionality
- Employee profiles and details
- Department and position management
- Status tracking (Active, On Leave, Terminated)

### 💰 Payroll Management
- Pay run creation and processing
- Salary tracking and management
- Payroll distribution analysis
- Monthly payroll trends
- Error handling and validation

### 🏥 Benefits Administration
- Benefit plan management
- Enrollment tracking
- Provider management
- Cost analysis
- Coverage distribution

### 📊 Additional Modules
- **Time Tracking**: Time sheets and attendance
- **Recruiting**: Job postings and candidate management
- **Performance**: Reviews and goal management
- **Learning**: Training and development
- **Reports**: Analytics and reporting

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Charts**: Recharts for data visualization
- **Routing**: React Router v6
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Simulation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/
│   └── Layout/
│       └── Layout.tsx          # Main layout with navigation
├── pages/
│   ├── Dashboard/
│   │   └── Dashboard.tsx       # Main dashboard with metrics
│   ├── Employees/
│   │   └── Employees.tsx       # Employee management
│   ├── Payroll/
│   │   └── Payroll.tsx         # Payroll processing
│   ├── Benefits/
│   │   └── Benefits.tsx        # Benefits administration
│   ├── TimeTracking/
│   │   └── TimeTracking.tsx    # Time and attendance
│   ├── Recruiting/
│   │   └── Recruiting.tsx      # Talent acquisition
│   ├── Performance/
│   │   └── Performance.tsx     # Performance management
│   ├── Learning/
│   │   └── Learning.tsx        # Learning and development
│   └── Reports/
│       └── Reports.tsx         # Analytics and reporting
├── App.tsx                     # Main app component
├── index.tsx                   # App entry point
└── index.css                   # Global styles
```

## Design System

The application follows Workday's design principles:

- **Color Scheme**: Primary blue (#0066cc) with supporting colors
- **Typography**: Roboto font family
- **Layout**: Responsive design with sidebar navigation
- **Components**: Material-UI components with custom styling
- **Navigation**: Left sidebar with main menu items
- **Cards**: Clean, elevated cards for content organization

## Key Features

### Responsive Design
- Mobile-friendly interface
- Adaptive layout for different screen sizes
- Touch-friendly interactions

### Data Visualization
- Interactive charts and graphs
- Real-time data updates
- Export capabilities

### User Experience
- Intuitive navigation
- Consistent design patterns
- Fast loading times
- Accessibility features

## Customization

### Adding New Modules
1. Create a new page component in `src/pages/`
2. Add the route to `App.tsx`
3. Add navigation item to `Layout.tsx`

### Styling
- Global styles in `src/index.css`
- Component-specific styles using Material-UI's `sx` prop
- Theme customization in `App.tsx`

### Data Management
- Currently uses mock data
- Can be easily connected to backend APIs
- Supports real-time data updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.

---

**Note**: This is a demonstration application built to showcase Workday-like HCM functionality. It uses mock data and is intended for educational and demonstration purposes. 