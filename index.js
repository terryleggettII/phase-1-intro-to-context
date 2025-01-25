// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // Function to create a time-in event
  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date
    });
    return employeeRecord;
  }
  
  // Function to create a time-out event
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date
    });
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor(employeeRecord) {
    let eligibleDates = employeeRecord.timeInEvents.map(event => event.date);
    let payable = eligibleDates.reduce((memo, date) => memo + wagesEarnedOnDate(employeeRecord, date), 0);
    return payable;
  }
  
  // Function to calculate total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, record) => memo + allWagesFor(record), 0);
  }
  