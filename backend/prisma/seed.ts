import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.payroll.deleteMany();
  await prisma.performanceReview.deleteMany();
  await prisma.timeEntry.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.benefitEnrollment.deleteMany();
  await prisma.emergencyContact.deleteMany();
  await prisma.address.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.position.deleteMany();
  await prisma.jobProfile.deleteMany();
  await prisma.jobFamily.deleteMany();
  await prisma.compensationGrade.deleteMany();
  await prisma.compensationPlan.deleteMany();
  await prisma.leaveType.deleteMany();
  await prisma.benefitPlan.deleteMany();
  await prisma.learningCourse.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.location.deleteMany();
  await prisma.securityRole.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.approvalProcess.deleteMany();
  await prisma.approvalStep.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.systemConfiguration.deleteMany();
  await prisma.report.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Create Locations
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        name: 'San Francisco Headquarters',
        type: 'Headquarters',
        address1: '123 Market Street',
        address2: 'Suite 1000',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        postalCode: '94105',
        timeZone: 'America/Los_Angeles',
        isActive: true
      }
    }),
    prisma.location.create({
      data: {
        name: 'New York Office',
        type: 'Branch',
        address1: '456 Broadway',
        address2: 'Floor 15',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10013',
        timeZone: 'America/New_York',
        isActive: true
      }
    }),
    prisma.location.create({
      data: {
        name: 'London Office',
        type: 'International',
        address1: '789 Oxford Street',
        city: 'London',
        state: 'England',
        country: 'UK',
        postalCode: 'W1D 1BS',
        timeZone: 'Europe/London',
        isActive: true
      }
    }),
    prisma.location.create({
      data: {
        name: 'Remote Workers',
        type: 'Remote',
        address1: 'Virtual Office',
        city: 'Remote',
        state: 'Various',
        country: 'Global',
        postalCode: '00000',
        timeZone: 'UTC',
        isActive: true
      }
    })
  ]);

  console.log('📍 Created locations');

  // Create Organizations
  const parentOrg = await prisma.organization.create({
    data: {
      name: 'Picarro Inc.',
      type: 'Company',
      code: 'PICARRO',
      description: 'Main corporate entity',
      costCenter: 'CC001',
      locationId: locations[0].id,
      isActive: true
    }
  });

  const organizations = await Promise.all([
    parentOrg,
    prisma.organization.create({
      data: {
        name: 'Engineering Division',
        type: 'Division',
        code: 'ENG',
        description: 'Software and hardware engineering',
        parentId: parentOrg.id,
        costCenter: 'CC002',
        locationId: locations[0].id,
        isActive: true
      }
    }),
    prisma.organization.create({
      data: {
        name: 'Human Resources',
        type: 'Department',
        code: 'HR',
        description: 'HR and People Operations',
        parentId: parentOrg.id,
        costCenter: 'CC003',
        locationId: locations[0].id,
        isActive: true
      }
    }),
    prisma.organization.create({
      data: {
        name: 'Finance & Accounting',
        type: 'Department',
        code: 'FIN',
        description: 'Financial operations and accounting',
        parentId: parentOrg.id,
        costCenter: 'CC004',
        locationId: locations[0].id,
        isActive: true
      }
    }),
    prisma.organization.create({
      data: {
        name: 'Sales & Marketing',
        type: 'Department',
        code: 'SALES',
        description: 'Sales and marketing operations',
        parentId: parentOrg.id,
        costCenter: 'CC005',
        locationId: locations[1].id,
        isActive: true
      }
    }),
    prisma.organization.create({
      data: {
        name: 'Product Management',
        type: 'Department',
        code: 'PROD',
        description: 'Product strategy and management',
        parentId: parentOrg.id,
        costCenter: 'CC006',
        locationId: locations[0].id,
        isActive: true
      }
    })
  ]);

  console.log('🏢 Created organizations');

  // Create Job Families
  const jobFamilies = await Promise.all([
    prisma.jobFamily.create({
      data: {
        name: 'Engineering',
        description: 'Software and hardware engineering roles',
        isActive: true
      }
    }),
    prisma.jobFamily.create({
      data: {
        name: 'Human Resources',
        description: 'HR and people operations roles',
        isActive: true
      }
    }),
    prisma.jobFamily.create({
      data: {
        name: 'Finance',
        description: 'Financial and accounting roles',
        isActive: true
      }
    }),
    prisma.jobFamily.create({
      data: {
        name: 'Sales & Marketing',
        description: 'Sales and marketing roles',
        isActive: true
      }
    }),
    prisma.jobFamily.create({
      data: {
        name: 'Product',
        description: 'Product management and strategy roles',
        isActive: true
      }
    }),
    prisma.jobFamily.create({
      data: {
        name: 'Operations',
        description: 'Business operations and support roles',
        isActive: true
      }
    })
  ]);

  console.log('👥 Created job families');

  // Create Compensation Grades
  const compensationGrades = await Promise.all([
    prisma.compensationGrade.create({
      data: {
        name: 'Grade 1 - Entry Level',
        description: 'Entry level positions',
        currency: 'USD',
        minSalary: 50000,
        midSalary: 60000,
        maxSalary: 70000,
        minHourly: 24,
        midHourly: 29,
        maxHourly: 34,
        isActive: true
      }
    }),
    prisma.compensationGrade.create({
      data: {
        name: 'Grade 2 - Mid Level',
        description: 'Mid level professional positions',
        currency: 'USD',
        minSalary: 70000,
        midSalary: 85000,
        maxSalary: 100000,
        minHourly: 34,
        midHourly: 41,
        maxHourly: 48,
        isActive: true
      }
    }),
    prisma.compensationGrade.create({
      data: {
        name: 'Grade 3 - Senior Level',
        description: 'Senior professional positions',
        currency: 'USD',
        minSalary: 100000,
        midSalary: 125000,
        maxSalary: 150000,
        minHourly: 48,
        midHourly: 60,
        maxHourly: 72,
        isActive: true
      }
    }),
    prisma.compensationGrade.create({
      data: {
        name: 'Grade 4 - Manager',
        description: 'Manager and team lead positions',
        currency: 'USD',
        minSalary: 120000,
        midSalary: 150000,
        maxSalary: 180000,
        minHourly: 58,
        midHourly: 72,
        maxHourly: 87,
        isActive: true
      }
    }),
    prisma.compensationGrade.create({
      data: {
        name: 'Grade 5 - Director',
        description: 'Director level positions',
        currency: 'USD',
        minSalary: 150000,
        midSalary: 200000,
        maxSalary: 250000,
        minHourly: 72,
        midHourly: 96,
        maxHourly: 120,
        isActive: true
      }
    }),
    prisma.compensationGrade.create({
      data: {
        name: 'Grade 6 - Executive',
        description: 'Executive level positions',
        currency: 'USD',
        minSalary: 200000,
        midSalary: 300000,
        maxSalary: 400000,
        minHourly: 96,
        midHourly: 144,
        maxHourly: 192,
        isActive: true
      }
    })
  ]);

  console.log('💰 Created compensation grades');

  // Create Job Profiles
  const jobProfiles = await Promise.all([
    prisma.jobProfile.create({
      data: {
        name: 'Software Engineer',
        description: 'Develops software applications and systems',
        jobFamilyId: jobFamilies[0].id,
        jobLevel: 'Mid',
        responsibilities: 'Design, develop, and maintain software applications',
        qualifications: 'Bachelor\'s degree in Computer Science or related field',
        skills: 'JavaScript, Python, React, Node.js, SQL',
        isActive: true
      }
    }),
    prisma.jobProfile.create({
      data: {
        name: 'Senior Software Engineer',
        description: 'Leads software development projects and mentors junior engineers',
        jobFamilyId: jobFamilies[0].id,
        jobLevel: 'Senior',
        responsibilities: 'Lead technical projects, mentor junior engineers, architect solutions',
        qualifications: 'Bachelor\'s degree + 5+ years experience',
        skills: 'System design, architecture, mentoring, advanced programming',
        isActive: true
      }
    }),
    prisma.jobProfile.create({
      data: {
        name: 'HR Business Partner',
        description: 'Provides HR support and guidance to business units',
        jobFamilyId: jobFamilies[1].id,
        jobLevel: 'Mid',
        responsibilities: 'Employee relations, performance management, HR strategy',
        qualifications: 'Bachelor\'s degree in HR or related field',
        skills: 'Employee relations, HRIS, compliance, communication',
        isActive: true
      }
    }),
    prisma.jobProfile.create({
      data: {
        name: 'Financial Analyst',
        description: 'Analyzes financial data and provides insights',
        jobFamilyId: jobFamilies[2].id,
        jobLevel: 'Mid',
        responsibilities: 'Financial analysis, budgeting, reporting',
        qualifications: 'Bachelor\'s degree in Finance or Accounting',
        skills: 'Excel, financial modeling, analysis, reporting',
        isActive: true
      }
    }),
    prisma.jobProfile.create({
      data: {
        name: 'Sales Manager',
        description: 'Manages sales team and drives revenue growth',
        jobFamilyId: jobFamilies[3].id,
        jobLevel: 'Manager',
        responsibilities: 'Lead sales team, develop strategies, meet targets',
        qualifications: 'Bachelor\'s degree + sales experience',
        skills: 'Sales management, CRM, negotiation, leadership',
        isActive: true
      }
    }),
    prisma.jobProfile.create({
      data: {
        name: 'Product Manager',
        description: 'Defines product strategy and roadmap',
        jobFamilyId: jobFamilies[4].id,
        jobLevel: 'Mid',
        responsibilities: 'Product strategy, roadmap, stakeholder management',
        qualifications: 'Bachelor\'s degree + product experience',
        skills: 'Product strategy, user research, agile, stakeholder management',
        isActive: true
      }
    })
  ]);

  console.log('👨‍💼 Created job profiles');

  // Create Positions
  const positions = await Promise.all([
    prisma.position.create({
      data: {
        positionId: 'POS001',
        title: 'Senior Software Engineer - Backend',
        jobProfileId: jobProfiles[1].id,
        organizationId: organizations[1].id,
        supervisoryOrg: 'Engineering',
        isManager: false,
        headcount: 1,
        isActive: true,
        employmentType: 'Full-time',
        positionType: 'Individual Contributor',
        businessTitle: 'Senior Backend Engineer',
        timeType: 'Salaried',
        standardHours: 40,
        compensationGradeId: compensationGrades[2].id
      }
    }),
    prisma.position.create({
      data: {
        positionId: 'POS002',
        title: 'HR Business Partner',
        jobProfileId: jobProfiles[2].id,
        organizationId: organizations[2].id,
        supervisoryOrg: 'Human Resources',
        isManager: false,
        headcount: 1,
        isActive: true,
        employmentType: 'Full-time',
        positionType: 'Individual Contributor',
        businessTitle: 'HR Business Partner',
        timeType: 'Salaried',
        standardHours: 40,
        compensationGradeId: compensationGrades[2].id
      }
    }),
    prisma.position.create({
      data: {
        positionId: 'POS003',
        title: 'Financial Analyst',
        jobProfileId: jobProfiles[3].id,
        organizationId: organizations[3].id,
        supervisoryOrg: 'Finance',
        isManager: false,
        headcount: 1,
        isActive: true,
        employmentType: 'Full-time',
        positionType: 'Individual Contributor',
        businessTitle: 'Financial Analyst',
        timeType: 'Salaried',
        standardHours: 40,
        compensationGradeId: compensationGrades[2].id
      }
    }),
    prisma.position.create({
      data: {
        positionId: 'POS004',
        title: 'Sales Manager - Enterprise',
        jobProfileId: jobProfiles[4].id,
        organizationId: organizations[4].id,
        supervisoryOrg: 'Sales',
        isManager: true,
        headcount: 1,
        isActive: true,
        employmentType: 'Full-time',
        positionType: 'Manager',
        businessTitle: 'Enterprise Sales Manager',
        timeType: 'Salaried',
        standardHours: 40,
        compensationGradeId: compensationGrades[3].id
      }
    }),
    prisma.position.create({
      data: {
        positionId: 'POS005',
        title: 'Product Manager',
        jobProfileId: jobProfiles[5].id,
        organizationId: organizations[5].id,
        supervisoryOrg: 'Product',
        isManager: false,
        headcount: 1,
        isActive: true,
        employmentType: 'Full-time',
        positionType: 'Individual Contributor',
        businessTitle: 'Product Manager',
        timeType: 'Salaried',
        standardHours: 40,
        compensationGradeId: compensationGrades[2].id
      }
    })
  ]);

  console.log('💼 Created positions');

  // Create Employees (step 1: without managerId)
  const employees = [];
  employees.push(await prisma.employee.create({
    data: {
      workerId: 'EMP001',
      firstName: 'John',
      lastName: 'Smith',
      middleName: 'Michael',
      preferredName: 'John',
      email: 'john.smith@picarro.com',
      workEmail: 'john.smith@picarro.com',
      personalEmail: 'john.smith.personal@gmail.com',
      phone: '+1-555-0101',
      workPhone: '+1-555-0102',
      emergencyContact: 'Jane Smith',
      emergencyPhone: '+1-555-0103',
      dateOfBirth: new Date('1985-03-15'),
      gender: 'Male',
      ethnicity: 'White',
      maritalStatus: 'Married',
      hireDate: new Date('2020-01-15'),
      originalHireDate: new Date('2020-01-15'),
      employmentType: 'Full-time',
      workerType: 'Regular',
      employmentStatus: 'Active',
      positionId: positions[0].id,
      jobProfileId: jobProfiles[1].id,
      organizationId: organizations[1].id,
      locationId: locations[0].id,
      compensationGradeId: compensationGrades[2].id,
      timeTrackingType: 'Salaried',
      standardHours: 40,
      isActive: true
    }
  }));
  employees.push(await prisma.employee.create({
    data: {
      workerId: 'EMP002',
      firstName: 'Sarah',
      lastName: 'Johnson',
      middleName: 'Elizabeth',
      preferredName: 'Sarah',
      email: 'sarah.johnson@picarro.com',
      workEmail: 'sarah.johnson@picarro.com',
      personalEmail: 'sarah.johnson.personal@gmail.com',
      phone: '+1-555-0201',
      workPhone: '+1-555-0202',
      emergencyContact: 'Mike Johnson',
      emergencyPhone: '+1-555-0203',
      dateOfBirth: new Date('1988-07-22'),
      gender: 'Female',
      ethnicity: 'Asian',
      maritalStatus: 'Single',
      hireDate: new Date('2021-03-01'),
      originalHireDate: new Date('2021-03-01'),
      employmentType: 'Full-time',
      workerType: 'Regular',
      employmentStatus: 'Active',
      positionId: positions[1].id,
      jobProfileId: jobProfiles[2].id,
      organizationId: organizations[2].id,
      locationId: locations[0].id,
      compensationGradeId: compensationGrades[2].id,
      timeTrackingType: 'Salaried',
      standardHours: 40,
      isActive: true
    }
  }));
  employees.push(await prisma.employee.create({
    data: {
      workerId: 'EMP003',
      firstName: 'Michael',
      lastName: 'Chen',
      middleName: 'David',
      preferredName: 'Mike',
      email: 'michael.chen@picarro.com',
      workEmail: 'michael.chen@picarro.com',
      personalEmail: 'michael.chen.personal@gmail.com',
      phone: '+1-555-0301',
      workPhone: '+1-555-0302',
      emergencyContact: 'Lisa Chen',
      emergencyPhone: '+1-555-0303',
      dateOfBirth: new Date('1982-11-08'),
      gender: 'Male',
      ethnicity: 'Asian',
      maritalStatus: 'Married',
      hireDate: new Date('2019-06-10'),
      originalHireDate: new Date('2019-06-10'),
      employmentType: 'Full-time',
      workerType: 'Regular',
      employmentStatus: 'Active',
      positionId: positions[2].id,
      jobProfileId: jobProfiles[3].id,
      organizationId: organizations[3].id,
      locationId: locations[0].id,
      compensationGradeId: compensationGrades[2].id,
      timeTrackingType: 'Salaried',
      standardHours: 40,
      isActive: true
    }
  }));
  employees.push(await prisma.employee.create({
    data: {
      workerId: 'EMP004',
      firstName: 'Emily',
      lastName: 'Davis',
      middleName: 'Grace',
      preferredName: 'Emily',
      email: 'emily.davis@picarro.com',
      workEmail: 'emily.davis@picarro.com',
      personalEmail: 'emily.davis.personal@gmail.com',
      phone: '+1-555-0401',
      workPhone: '+1-555-0402',
      emergencyContact: 'Robert Davis',
      emergencyPhone: '+1-555-0403',
      dateOfBirth: new Date('1990-04-12'),
      gender: 'Female',
      ethnicity: 'White',
      maritalStatus: 'Single',
      hireDate: new Date('2022-01-15'),
      originalHireDate: new Date('2022-01-15'),
      employmentType: 'Full-time',
      workerType: 'Regular',
      employmentStatus: 'Active',
      positionId: positions[3].id,
      jobProfileId: jobProfiles[4].id,
      organizationId: organizations[4].id,
      locationId: locations[1].id,
      compensationGradeId: compensationGrades[3].id,
      timeTrackingType: 'Salaried',
      standardHours: 40,
      isActive: true
    }
  }));
  employees.push(await prisma.employee.create({
    data: {
      workerId: 'EMP005',
      firstName: 'David',
      lastName: 'Wilson',
      middleName: 'Robert',
      preferredName: 'David',
      email: 'david.wilson@picarro.com',
      workEmail: 'david.wilson@picarro.com',
      personalEmail: 'david.wilson.personal@gmail.com',
      phone: '+1-555-0501',
      workPhone: '+1-555-0502',
      emergencyContact: 'Jennifer Wilson',
      emergencyPhone: '+1-555-0503',
      dateOfBirth: new Date('1987-09-25'),
      gender: 'Male',
      ethnicity: 'White',
      maritalStatus: 'Married',
      hireDate: new Date('2021-08-20'),
      originalHireDate: new Date('2021-08-20'),
      employmentType: 'Full-time',
      workerType: 'Regular',
      employmentStatus: 'Active',
      positionId: positions[4].id,
      jobProfileId: jobProfiles[5].id,
      organizationId: organizations[5].id,
      locationId: locations[0].id,
      compensationGradeId: compensationGrades[2].id,
      timeTrackingType: 'Salaried',
      standardHours: 40,
      isActive: true
    }
  }));

  // Now update employees to set managerId (step 2)
  await prisma.employee.update({
    where: { id: employees[1].id },
    data: { managerId: employees[0].id }
  });
  await prisma.employee.update({
    where: { id: employees[2].id },
    data: { managerId: employees[0].id }
  });
  await prisma.employee.update({
    where: { id: employees[3].id },
    data: { managerId: employees[0].id }
  });
  await prisma.employee.update({
    where: { id: employees[4].id },
    data: { managerId: employees[0].id }
  });

  console.log('👤 Created employees');

  // Create Payroll Records
  const payrolls = await Promise.all([
    prisma.payroll.create({
      data: {
        employeeId: employees[0].id,
        payPeriod: '2024-01',
        payDate: new Date('2024-01-31'),
        regularHours: 160,
        regularPay: 125000,
        grossPay: 125000,
        totalDeductions: 37500,
        netPay: 87500,
        status: 'Paid'
      }
    }),
    prisma.payroll.create({
      data: {
        employeeId: employees[1].id,
        payPeriod: '2024-01',
        payDate: new Date('2024-01-31'),
        regularHours: 160,
        regularPay: 95000,
        grossPay: 95000,
        totalDeductions: 28500,
        netPay: 66500,
        status: 'Paid'
      }
    }),
    prisma.payroll.create({
      data: {
        employeeId: employees[2].id,
        payPeriod: '2024-01',
        payDate: new Date('2024-01-31'),
        regularHours: 160,
        regularPay: 110000,
        grossPay: 110000,
        totalDeductions: 33000,
        netPay: 77000,
        status: 'Paid'
      }
    }),
    prisma.payroll.create({
      data: {
        employeeId: employees[3].id,
        payPeriod: '2024-01',
        payDate: new Date('2024-01-31'),
        regularHours: 160,
        regularPay: 140000,
        grossPay: 140000,
        totalDeductions: 42000,
        netPay: 98000,
        status: 'Paid'
      }
    }),
    prisma.payroll.create({
      data: {
        employeeId: employees[4].id,
        payPeriod: '2024-01',
        payDate: new Date('2024-01-31'),
        regularHours: 160,
        regularPay: 105000,
        grossPay: 105000,
        totalDeductions: 31500,
        netPay: 73500,
        status: 'Paid'
      }
    })
  ]);

  console.log('💰 Created payroll records');

  // Create Leave Types
  const leaveTypes = await Promise.all([
    prisma.leaveType.create({
      data: {
        name: 'Vacation',
        description: 'Annual vacation leave',
        category: 'Paid',
        accrualRate: 1.67,
        maxAccrual: 240,
        carryOverLimit: 40,
        minimumIncrement: 4,
        advanceNotice: 14,
        isActive: true
      }
    }),
    prisma.leaveType.create({
      data: {
        name: 'Sick Leave',
        description: 'Sick leave and medical appointments',
        category: 'Paid',
        accrualRate: 0.83,
        maxAccrual: 120,
        carryOverLimit: 0,
        minimumIncrement: 4,
        advanceNotice: 0,
        isActive: true
      }
    }),
    prisma.leaveType.create({
      data: {
        name: 'Personal Leave',
        description: 'Personal time off',
        category: 'Paid',
        accrualRate: 0.42,
        maxAccrual: 60,
        carryOverLimit: 0,
        minimumIncrement: 4,
        advanceNotice: 7,
        isActive: true
      }
    }),
    prisma.leaveType.create({
      data: {
        name: 'Bereavement',
        description: 'Bereavement leave',
        category: 'Paid',
        accrualRate: 0,
        maxAccrual: 24,
        carryOverLimit: 0,
        minimumIncrement: 8,
        advanceNotice: 0,
        isActive: true
      }
    })
  ]);

  console.log('🏖️  Created leave types');

  // Create Security Roles
  const securityRoles = await Promise.all([
    prisma.securityRole.create({
      data: {
        name: 'System Administrator',
        description: 'Full system access and administration',
        type: 'System',
        permissions: JSON.stringify(['read', 'write', 'delete', 'admin']),
        isActive: true
      }
    }),
    prisma.securityRole.create({
      data: {
        name: 'HR Manager',
        description: 'HR data access and management',
        type: 'Business Process',
        permissions: JSON.stringify(['read', 'write', 'hr_admin']),
        isActive: true
      }
    }),
    prisma.securityRole.create({
      data: {
        name: 'Employee',
        description: 'Basic employee access',
        type: 'Domain',
        permissions: JSON.stringify(['read_own', 'write_own']),
        isActive: true
      }
    }),
    prisma.securityRole.create({
      data: {
        name: 'Manager',
        description: 'Manager access to team data',
        type: 'Business Process',
        permissions: JSON.stringify(['read', 'write', 'team_access']),
        isActive: true
      }
    })
  ]);

  console.log('🔐 Created security roles');

  // Create Reports
  const reports = await Promise.all([
    prisma.report.create({
      data: {
        name: 'Employee Headcount Report',
        description: 'Monthly employee headcount by department',
        type: 'Standard',
        query: 'SELECT organization.name, COUNT(employee.id) as headcount FROM organization LEFT JOIN employee ON organization.id = employee.organizationId GROUP BY organization.id',
        isScheduled: true,
        scheduleFrequency: 'Monthly',
        createdBy: 'system',
        isPublic: true
      }
    }),
    prisma.report.create({
      data: {
        name: 'Payroll Summary Report',
        description: 'Monthly payroll summary and analysis',
        type: 'Standard',
        query: 'SELECT employee.firstName, employee.lastName, payroll.grossPay, payroll.netPay FROM employee JOIN payroll ON employee.id = payroll.employeeId WHERE payroll.payPeriod = :period',
        isScheduled: true,
        scheduleFrequency: 'Monthly',
        createdBy: 'system',
        isPublic: true
      }
    }),
    prisma.report.create({
      data: {
        name: 'Performance Review Report',
        description: 'Quarterly performance review summary',
        type: 'Standard',
        query: 'SELECT employee.firstName, employee.lastName, performanceReview.overallRating FROM employee JOIN performanceReview ON employee.id = performanceReview.employeeId WHERE performanceReview.reviewPeriod = :period',
        isScheduled: true,
        scheduleFrequency: 'Quarterly',
        createdBy: 'system',
        isPublic: true
      }
    }),
    prisma.report.create({
      data: {
        name: 'Budget vs Actual Report',
        description: 'Monthly budget vs actual spending',
        type: 'Standard',
        query: 'SELECT organization.name, budget.totalBudget, budget.spentBudget FROM organization JOIN budget ON organization.id = budget.organizationId WHERE budget.fiscalYear = :year',
        isScheduled: true,
        scheduleFrequency: 'Monthly',
        createdBy: 'system',
        isPublic: true
      }
    })
  ]);

  console.log('📊 Created reports');

  console.log('✅ Workday HCM seed data created successfully!');
  console.log(`📈 Created ${employees.length} employees, ${positions.length} positions, ${organizations.length} organizations`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 