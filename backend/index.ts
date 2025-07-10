import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app-name.vercel.app', 'https://hrmportal.vercel.app', 'https://hrmportal-frontend.vercel.app'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Workday HCM API is running' });
});

// ================================
// ORGANIZATION ENDPOINTS
// ================================

app.get('/api/organizations', async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        parent: true,
        children: true,
        manager: true,
        location: true,
        employees: true,
        positions: true
      }
    });
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

app.post('/api/organizations', async (req, res) => {
  try {
    const { name, type, code, description, parentId, managerId, costCenter, locationId, isActive } = req.body;
    const organization = await prisma.organization.create({
      data: {
        name,
        type,
        code,
        description,
        parentId,
        managerId,
        costCenter,
        locationId,
        isActive: isActive ?? true
      }
    });
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create organization' });
  }
});

app.put('/api/organizations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const organization = await prisma.organization.update({
      where: { id },
      data: updateData
    });
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update organization' });
  }
});

app.delete('/api/organizations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.organization.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete organization' });
  }
});

// ================================
// LOCATION ENDPOINTS
// ================================

app.get('/api/locations', async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        organizations: true,
        employees: true
      }
    });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

app.post('/api/locations', async (req, res) => {
  try {
    const { name, type, address1, address2, city, state, country, postalCode, timeZone, isActive } = req.body;
    const location = await prisma.location.create({
      data: {
        name,
        type,
        address1,
        address2,
        city,
        state,
        country,
        postalCode,
        timeZone,
        isActive: isActive ?? true
      }
    });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create location' });
  }
});

// ================================
// EMPLOYEE ENDPOINTS
// ================================

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        position: true,
        jobProfile: true,
        organization: true,
        location: true,
        manager: true,
        compensationGrade: true,
        payrolls: true,
        emergencyContacts: true,
        addresses: true,
        performanceReviews: true,
        timeEntries: true,
        leaveRequests: true,
        benefitEnrollments: true
      }
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const {
      workerId, firstName, lastName, middleName, preferredName, email, workEmail, personalEmail,
      phone, workPhone, emergencyContact, emergencyPhone, dateOfBirth, gender, ethnicity,
      maritalStatus, hireDate, employmentType, workerType, employmentStatus, positionId,
      jobProfileId, organizationId, locationId, managerId, compensationGradeId, timeTrackingType,
      standardHours, isActive
    } = req.body;
    
    const employee = await prisma.employee.create({
      data: {
        workerId,
        firstName,
        lastName,
        middleName,
        preferredName,
        email,
        workEmail,
        personalEmail,
        phone,
        workPhone,
        emergencyContact,
        emergencyPhone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        ethnicity,
        maritalStatus,
        hireDate: new Date(hireDate),
        employmentType,
        workerType,
        employmentStatus,
        positionId,
        jobProfileId,
        organizationId,
        locationId,
        managerId,
        compensationGradeId,
        timeTrackingType,
        standardHours: standardHours ? parseFloat(standardHours) : null,
        isActive: isActive ?? true
      }
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Handle date fields
    if (updateData.dateOfBirth) updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    if (updateData.hireDate) updateData.hireDate = new Date(updateData.hireDate);
    if (updateData.standardHours) updateData.standardHours = parseFloat(updateData.standardHours);
    
    const employee = await prisma.employee.update({
      where: { id },
      data: updateData
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({
      where: { id }
    });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

// ================================
// POSITION ENDPOINTS
// ================================

app.get('/api/positions', async (req, res) => {
  try {
    const positions = await prisma.position.findMany({
      include: {
        jobProfile: true,
        organization: true,
        compensationGrade: true
      }
    });
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch positions' });
  }
});

app.post('/api/positions', async (req, res) => {
  try {
    const {
      positionId, title, jobProfileId, organizationId, supervisoryOrg, isManager, headcount,
      isActive, availabilityDate, employmentType, positionType, businessTitle, timeType,
      standardHours, compensationGradeId
    } = req.body;
    
    const position = await prisma.position.create({
      data: {
        positionId,
        title,
        jobProfileId,
        organizationId,
        supervisoryOrg,
        isManager: Boolean(isManager),
        headcount: parseInt(headcount) || 1,
        isActive: isActive ?? true,
        availabilityDate: availabilityDate ? new Date(availabilityDate) : null,
        employmentType,
        positionType,
        businessTitle,
        timeType,
        standardHours: standardHours ? parseFloat(standardHours) : null,
        compensationGradeId
      }
    });
    res.status(201).json(position);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create position' });
  }
});

app.put('/api/positions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Handle date and numeric fields
    if (updateData.availabilityDate) updateData.availabilityDate = new Date(updateData.availabilityDate);
    if (updateData.standardHours) updateData.standardHours = parseFloat(updateData.standardHours);
    if (updateData.headcount) updateData.headcount = parseInt(updateData.headcount);
    if (updateData.isManager !== undefined) updateData.isManager = Boolean(updateData.isManager);
    if (updateData.isActive !== undefined) updateData.isActive = Boolean(updateData.isActive);
    
    const position = await prisma.position.update({
      where: { id },
      data: updateData
    });
    res.json(position);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update position' });
  }
});

app.delete('/api/positions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.position.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete position' });
  }
});

// ================================
// JOB PROFILE ENDPOINTS
// ================================

app.get('/api/job-profiles', async (req, res) => {
  try {
    const jobProfiles = await prisma.jobProfile.findMany({
      include: {
        jobFamily: true,
        positions: true
      }
    });
    res.json(jobProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job profiles' });
  }
});

app.post('/api/job-profiles', async (req, res) => {
  try {
    const { name, description, jobFamilyId, jobLevel, responsibilities, qualifications, skills, isActive } = req.body;
    const jobProfile = await prisma.jobProfile.create({
      data: {
        name,
        description,
        jobFamilyId,
        jobLevel,
        responsibilities,
        qualifications,
        skills,
        isActive: isActive ?? true
      }
    });
    res.status(201).json(jobProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job profile' });
  }
});

app.put('/api/job-profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const jobProfile = await prisma.jobProfile.update({
      where: { id },
      data: updateData
    });
    res.json(jobProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job profile' });
  }
});

app.delete('/api/job-profiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.jobProfile.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job profile' });
  }
});

// ================================
// COMPENSATION ENDPOINTS
// ================================

app.get('/api/compensation-grades', async (req, res) => {
  try {
    const compensationGrades = await prisma.compensationGrade.findMany({
      include: {
        positions: true,
        employees: true
      }
    });
    res.json(compensationGrades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch compensation grades' });
  }
});

app.post('/api/compensation-grades', async (req, res) => {
  try {
    const {
      name, description, currency, minSalary, midSalary, maxSalary, minHourly, midHourly, maxHourly, isActive
    } = req.body;
    
    const compensationGrade = await prisma.compensationGrade.create({
      data: {
        name,
        description,
        currency: currency || 'USD',
        minSalary: minSalary ? parseFloat(minSalary) : null,
        midSalary: midSalary ? parseFloat(midSalary) : null,
        maxSalary: maxSalary ? parseFloat(maxSalary) : null,
        minHourly: minHourly ? parseFloat(minHourly) : null,
        midHourly: midHourly ? parseFloat(midHourly) : null,
        maxHourly: maxHourly ? parseFloat(maxHourly) : null,
        isActive: isActive ?? true
      }
    });
    res.status(201).json(compensationGrade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create compensation grade' });
  }
});

app.put('/api/compensation-grades/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Handle numeric fields
    if (updateData.minSalary) updateData.minSalary = parseFloat(updateData.minSalary);
    if (updateData.midSalary) updateData.midSalary = parseFloat(updateData.midSalary);
    if (updateData.maxSalary) updateData.maxSalary = parseFloat(updateData.maxSalary);
    if (updateData.minHourly) updateData.minHourly = parseFloat(updateData.minHourly);
    if (updateData.midHourly) updateData.midHourly = parseFloat(updateData.midHourly);
    if (updateData.maxHourly) updateData.maxHourly = parseFloat(updateData.maxHourly);
    if (updateData.isActive !== undefined) updateData.isActive = Boolean(updateData.isActive);
    
    const compensationGrade = await prisma.compensationGrade.update({
      where: { id },
      data: updateData
    });
    res.json(compensationGrade);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update compensation grade' });
  }
});

app.delete('/api/compensation-grades/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.compensationGrade.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete compensation grade' });
  }
});

// ================================
// PAYROLL ENDPOINTS
// ================================

app.get('/api/payrolls', async (req, res) => {
  try {
    const payrolls = await prisma.payroll.findMany({
      include: {
        employee: true
      }
    });
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payrolls' });
  }
});

app.post('/api/payrolls', async (req, res) => {
  try {
    const { 
      employeeId, 
      payPeriod, 
      payDate,
      regularHours,
      overtimeHours,
      ptoHours,
      regularPay,
      overtimePay,
      bonusPay,
      commissionPay,
      otherEarnings,
      grossPay,
      federalTax,
      stateTax,
      socialSecurityTax,
      medicareTax,
      healthInsurance,
      dentalInsurance,
      visionInsurance,
      retirement401k,
      otherDeductions,
      totalDeductions,
      netPay,
      status,
      notes
    } = req.body;
    
    const payroll = await prisma.payroll.create({
      data: {
        employeeId,
        payPeriod,
        payDate: new Date(payDate),
        regularHours: regularHours ? parseFloat(regularHours) : null,
        overtimeHours: overtimeHours ? parseFloat(overtimeHours) : null,
        ptoHours: ptoHours ? parseFloat(ptoHours) : null,
        regularPay: parseFloat(regularPay),
        overtimePay: overtimePay ? parseFloat(overtimePay) : null,
        bonusPay: bonusPay ? parseFloat(bonusPay) : null,
        commissionPay: commissionPay ? parseFloat(commissionPay) : null,
        otherEarnings: otherEarnings ? parseFloat(otherEarnings) : null,
        grossPay: parseFloat(grossPay),
        federalTax: federalTax ? parseFloat(federalTax) : null,
        stateTax: stateTax ? parseFloat(stateTax) : null,
        socialSecurityTax: socialSecurityTax ? parseFloat(socialSecurityTax) : null,
        medicareTax: medicareTax ? parseFloat(medicareTax) : null,
        healthInsurance: healthInsurance ? parseFloat(healthInsurance) : null,
        dentalInsurance: dentalInsurance ? parseFloat(dentalInsurance) : null,
        visionInsurance: visionInsurance ? parseFloat(visionInsurance) : null,
        retirement401k: retirement401k ? parseFloat(retirement401k) : null,
        otherDeductions: otherDeductions ? parseFloat(otherDeductions) : null,
        totalDeductions: parseFloat(totalDeductions),
        netPay: parseFloat(netPay),
        status
      }
    });
    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payroll' });
  }
});

app.put('/api/payrolls/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Handle date and numeric fields
    if (updateData.payDate) updateData.payDate = new Date(updateData.payDate);
    if (updateData.regularHours) updateData.regularHours = parseFloat(updateData.regularHours);
    if (updateData.overtimeHours) updateData.overtimeHours = parseFloat(updateData.overtimeHours);
    if (updateData.ptoHours) updateData.ptoHours = parseFloat(updateData.ptoHours);
    if (updateData.regularPay) updateData.regularPay = parseFloat(updateData.regularPay);
    if (updateData.overtimePay) updateData.overtimePay = parseFloat(updateData.overtimePay);
    if (updateData.bonusPay) updateData.bonusPay = parseFloat(updateData.bonusPay);
    if (updateData.commissionPay) updateData.commissionPay = parseFloat(updateData.commissionPay);
    if (updateData.otherEarnings) updateData.otherEarnings = parseFloat(updateData.otherEarnings);
    if (updateData.grossPay) updateData.grossPay = parseFloat(updateData.grossPay);
    if (updateData.federalTax) updateData.federalTax = parseFloat(updateData.federalTax);
    if (updateData.stateTax) updateData.stateTax = parseFloat(updateData.stateTax);
    if (updateData.socialSecurityTax) updateData.socialSecurityTax = parseFloat(updateData.socialSecurityTax);
    if (updateData.medicareTax) updateData.medicareTax = parseFloat(updateData.medicareTax);
    if (updateData.healthInsurance) updateData.healthInsurance = parseFloat(updateData.healthInsurance);
    if (updateData.dentalInsurance) updateData.dentalInsurance = parseFloat(updateData.dentalInsurance);
    if (updateData.visionInsurance) updateData.visionInsurance = parseFloat(updateData.visionInsurance);
    if (updateData.retirement401k) updateData.retirement401k = parseFloat(updateData.retirement401k);
    if (updateData.otherDeductions) updateData.otherDeductions = parseFloat(updateData.otherDeductions);
    if (updateData.totalDeductions) updateData.totalDeductions = parseFloat(updateData.totalDeductions);
    if (updateData.netPay) updateData.netPay = parseFloat(updateData.netPay);
    
    const payroll = await prisma.payroll.update({
      where: { id },
      data: updateData
    });
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payroll' });
  }
});

app.delete('/api/payrolls/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.payroll.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete payroll' });
  }
});

// ================================
// TIME TRACKING ENDPOINTS
// ================================

app.get('/api/time-entries', async (req, res) => {
  try {
    const timeEntries = await prisma.timeEntry.findMany({
      include: {
        employee: true
      }
    });
    res.json(timeEntries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch time entries' });
  }
});

app.post('/api/time-entries', async (req, res) => {
  try {
    const { employeeId, date, timeType, hours, project, task, description, status } = req.body;
    
    const timeEntry = await prisma.timeEntry.create({
      data: {
        employeeId,
        date: new Date(date),
        timeType,
        hours: parseFloat(hours),
        project,
        task,
        description,
        status
      }
    });
    res.status(201).json(timeEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create time entry' });
  }
});

app.put('/api/time-entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Handle date and numeric fields
    if (updateData.date) updateData.date = new Date(updateData.date);
    if (updateData.hours) updateData.hours = parseFloat(updateData.hours);
    
    const timeEntry = await prisma.timeEntry.update({
      where: { id },
      data: updateData
    });
    res.json(timeEntry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update time entry' });
  }
});

app.delete('/api/time-entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.timeEntry.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete time entry' });
  }
});

// ================================
// LEAVE MANAGEMENT ENDPOINTS
// ================================

app.get('/api/leave-types', async (req, res) => {
  try {
    const leaveTypes = await prisma.leaveType.findMany();
    res.json(leaveTypes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave types' });
  }
});

app.post('/api/leave-types', async (req, res) => {
  try {
    const { name, description, category, accrualRate, maxAccrual, carryOverLimit, minimumIncrement, advanceNotice, isActive } = req.body;
    
    const leaveType = await prisma.leaveType.create({
      data: {
        name,
        description,
        category,
        accrualRate: accrualRate ? parseFloat(accrualRate) : null,
        maxAccrual: maxAccrual ? parseFloat(maxAccrual) : null,
        carryOverLimit: carryOverLimit ? parseFloat(carryOverLimit) : null,
        minimumIncrement: minimumIncrement ? parseFloat(minimumIncrement) : null,
        advanceNotice: advanceNotice ? parseInt(advanceNotice) : null,
        isActive: isActive ?? true
      }
    });
    res.status(201).json(leaveType);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create leave type' });
  }
});

app.get('/api/leave-requests', async (req, res) => {
  try {
    const leaveRequests = await prisma.leaveRequest.findMany({
      include: {
        employee: true,
        leaveType: true
      }
    });
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
});

app.post('/api/leave-requests', async (req, res) => {
  try {
    const { employeeId, leaveTypeId, startDate, endDate, hours, reason, status } = req.body;
    
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId,
        leaveTypeId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        hours: parseFloat(hours),
        reason,
        status
      }
    });
    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create leave request' });
  }
});

app.put('/api/leave-requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Handle date and numeric fields
    if (updateData.startDate) updateData.startDate = new Date(updateData.startDate);
    if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);
    if (updateData.hours) updateData.hours = parseFloat(updateData.hours);
    
    const leaveRequest = await prisma.leaveRequest.update({
      where: { id },
      data: updateData
    });
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leave request' });
  }
});

app.delete('/api/leave-requests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.leaveRequest.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete leave request' });
  }
});

// ================================
// PERFORMANCE MANAGEMENT ENDPOINTS
// ================================

app.get('/api/performance-reviews', async (req, res) => {
  try {
    const performanceReviews = await prisma.performanceReview.findMany({
      include: {
        employee: true
      }
    });
    res.json(performanceReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch performance reviews' });
  }
});

app.post('/api/performance-reviews', async (req, res) => {
  try {
    const { 
      employeeId, 
      reviewType, 
      reviewPeriod, 
      overallRating, 
      performanceRating, 
      potentialRating,
      selfReview,
      managerReview,
      peerReview,
      goalsAchieved,
      areasForImprovement,
      developmentPlan,
      status,
      dueDate,
      completedDate
    } = req.body;
    
    const performanceReview = await prisma.performanceReview.create({
      data: {
        employeeId,
        reviewType,
        reviewPeriod,
        overallRating: overallRating ? parseFloat(overallRating) : null,
        performanceRating: performanceRating ? parseFloat(performanceRating) : null,
        potentialRating: potentialRating ? parseFloat(potentialRating) : null,
        selfReview,
        managerReview,
        peerReview,
        goalsAchieved,
        areasForImprovement,
        developmentPlan,
        status,
        dueDate: new Date(dueDate),
        completedDate: completedDate ? new Date(completedDate) : null
      }
    });
    res.status(201).json(performanceReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create performance review' });
  }
});

app.put('/api/performance-reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Handle date and numeric fields
    if (updateData.dueDate) updateData.dueDate = new Date(updateData.dueDate);
    if (updateData.completedDate) updateData.completedDate = new Date(updateData.completedDate);
    if (updateData.overallRating) updateData.overallRating = parseFloat(updateData.overallRating);
    if (updateData.performanceRating) updateData.performanceRating = parseFloat(updateData.performanceRating);
    if (updateData.potentialRating) updateData.potentialRating = parseFloat(updateData.potentialRating);
    
    const performanceReview = await prisma.performanceReview.update({
      where: { id },
      data: updateData
    });
    res.json(performanceReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update performance review' });
  }
});

app.delete('/api/performance-reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.performanceReview.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete performance review' });
  }
});

// ================================
// SECURITY ROLES ENDPOINTS
// ================================

app.get('/api/security-roles', async (req, res) => {
  try {
    const securityRoles = await prisma.securityRole.findMany({
      include: {
        userRoles: true
      }
    });
    res.json(securityRoles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security roles' });
  }
});

app.post('/api/security-roles', async (req, res) => {
  try {
    const { name, description, type, permissions, isActive } = req.body;
    
    const securityRole = await prisma.securityRole.create({
      data: {
        name,
        description,
        type,
        permissions,
        isActive: isActive ?? true
      }
    });
    res.status(201).json(securityRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create security role' });
  }
});

app.put('/api/security-roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (updateData.isActive !== undefined) updateData.isActive = Boolean(updateData.isActive);
    
    const securityRole = await prisma.securityRole.update({
      where: { id },
      data: updateData
    });
    res.json(securityRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update security role' });
  }
});

app.delete('/api/security-roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.securityRole.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete security role' });
  }
});

// ================================
// REPORTS ENDPOINTS
// ================================

app.get('/api/reports', async (req, res) => {
  try {
    const reports = await prisma.report.findMany();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// ================================
// DASHBOARD DATA ENDPOINTS
// ================================

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [totalEmployees, activeEmployees, totalOrganizations, totalPositions] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { isActive: true } }),
      prisma.organization.count(),
      prisma.position.count()
    ]);
    
    res.json({
      totalEmployees,
      activeEmployees,
      totalOrganizations,
      totalPositions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Workday HCM API Server running on port ${PORT}`);
}); 