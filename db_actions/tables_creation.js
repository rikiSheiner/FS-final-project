const connection = require('./db_connection');

const createRolesTable = `
CREATE TABLE Roles (
  RoleID INT PRIMARY KEY AUTO_INCREMENT,
  RoleName VARCHAR(50) NOT NULL
)`;

const createUsersTable = `
CREATE TABLE Users (
  UserID INT PRIMARY KEY AUTO_INCREMENT,
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Password VARCHAR(10) NOT NULL,
  BirthDate DATE,
  Phone VARCHAR(15) UNIQUE NOT NULL,
  Email VARCHAR(100) UNIQUE NOT NULL,
  RoleID INT,
  FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
)`;

const createDoctorsTable = `
CREATE TABLE Doctors (
  DoctorID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  Profession VARCHAR(100),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
)`;

const createMedicinesTable = `
CREATE TABLE Medicines (
  MedicineID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(100),
  ImagePath VARCHAR(255),
  Price DECIMAL(10, 2)
)`;

const createPrescriptionsTable = `
CREATE TABLE Prescriptions (
  PrescriptionID INT PRIMARY KEY AUTO_INCREMENT,
  PatientID INT,
  DoctorID INT,
  MedicineID INT,
  ExpirationDate DATE,
  CreationDate DATE,
  FOREIGN KEY (PatientID) REFERENCES Users(UserID),
  FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID),
  FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
)`;

const createReferralsTable = `
CREATE TABLE Referrals (
  ReferralID INT PRIMARY KEY AUTO_INCREMENT,
  PatientID INT,
  DoctorID INT,
  TestName VARCHAR(100),
  Date DATE,
  Location VARCHAR(255),
  Notes TEXT,
  FOREIGN KEY (PatientID) REFERENCES Users(UserID),
  FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
)`;

const createMedicineOrdersTable = `
CREATE TABLE MedicineOrders (
  OrderID INT PRIMARY KEY AUTO_INCREMENT,
  PatientID INT,
  MedicineID INT,
  Amount INT,
  CreationDate DATE,
  TotalPrice DECIMAL(10, 2),
  Completed BOOLEAN,
  FOREIGN KEY (PatientID) REFERENCES Users(UserID),
  FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
)`;

const createAddressesTable = `
CREATE TABLE Addresses (
  AddressID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  Street VARCHAR(100),
  City VARCHAR(100),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
)`;

const createAccountDetailsTable = `
CREATE TABLE AccountDetails (
  AccountID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  CardNumber VARCHAR(16) NOT NULL,
  ExpirationDate DATE NOT NULL,
  CVV VARCHAR(3) NOT NULL,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
)`;

const createNewCardRequestsTable = `
CREATE TABLE NewCardRequests (
  RequestID INT PRIMARY KEY AUTO_INCREMENT,
  PatientID INT,
  Completed BOOLEAN,
  FOREIGN KEY (PatientID) REFERENCES Users(UserID)
)`;

const createPrescriptionRequestsTable = `
CREATE TABLE PrescriptionRequests (
  RequestID INT PRIMARY KEY AUTO_INCREMENT,
  PatientID INT,
  MedicineID INT,
  Approved BOOLEAN,
  FOREIGN KEY (PatientID) REFERENCES Users(UserID),
  FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID)
)`;

const createAvailableTimesTable = `
CREATE TABLE AvailableTimes (
  TimeID INT PRIMARY KEY AUTO_INCREMENT,
  DoctorID INT,
  Date DATE,
  StartTime TIME,
  EndTime TIME,
  FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
)`;

const createAppointmentsTable = `
CREATE TABLE Appointments (
  AppointmentID INT PRIMARY KEY AUTO_INCREMENT,
  DoctorID INT,
  UserID INT,
  Date DATE,
  StartTime TIME,
  EndTime TIME,
  FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
)`;

const queries = [
/*  createRolesTable,
  createUsersTable,
  createDoctorsTable,
  createMedicinesTable,
  createPrescriptionsTable,
 createReferralsTable,
  createMedicineOrdersTable,
 */ createAddressesTable,
  createAccountDetailsTable,
  createNewCardRequestsTable,
  createPrescriptionRequestsTable,
  createAvailableTimesTable,
  createAppointmentsTable
];

queries.forEach(query => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log('Table created successfully!');
  });
});
