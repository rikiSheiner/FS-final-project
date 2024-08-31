const connection = require("./db_connection");

// טבלה של התפקידים האפשריים של משתמש במערכת שלנו
const createRolesTable = `
CREATE TABLE Roles (
  RoleID INT PRIMARY KEY AUTO_INCREMENT,
  RoleName VARCHAR(50) NOT NULL
)`;

// טבלה של כל המשתמשים
// בשביל לתהחבר צריך להזין שם פרטי וסיסמה
const createUsersTable = `
CREATE TABLE Users (
  UserID INT PRIMARY KEY AUTO_INCREMENT,
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Password VARCHAR(10) UNIQUE NOT NULL,
  BirthDate DATE,
  Phone VARCHAR(15) UNIQUE NOT NULL,
  Email VARCHAR(100) UNIQUE NOT NULL,
  RoleID INT,    
  FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
)`;


// טבלה של מרפאות, כל מרפאה עם מזהה ייחודי וכתובת
const createClinicsTable = `
CREATE TABLE Clinics (
  ClinicID INT PRIMARY KEY AUTO_INCREMENT,
  Location VARCHAR(100) NOT NULL
);`;

// טבלה של כל הרופאים שהם סוג של משתמשים אבל משודרגים
const createDoctorsTable = `
CREATE TABLE Doctors (
  DoctorID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  Profession VARCHAR(100),
  ClinicID INT,
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (ClinicID) REFERENCES Clinics(ClinicID)
)`;


// טבלה של כל התרופות שניתן לקנות בחנות האונליין
const createMedicinesTable = `
CREATE TABLE Medicines (
  MedicineID INT PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(100),
  ImagePath VARCHAR(255),
  Price DECIMAL(10, 2),
  is_prescription_required TINYINT(1)
)`;

// טבלה של כל המרשמים לתרופות שניתנו למטופלים ע"י רופאים
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

// טבלה של כל ההפניות לבדיקות שניתנו למטופלים ע"י רופאים
// DATE מתי ההפניה ניתנה
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

// טבלה של הזמנות תרופות
// כלומר כל הזמנות תרופות בחנות האונליין
const createMedicineOrdersTable = `
CREATE TABLE medicineorders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT NOT NULL,
    CreationDate DATE NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    Completed TINYINT(1) NOT NULL DEFAULT 0,
    AddressID INT,
    AccountID INT,
    FOREIGN KEY (AddressID) REFERENCES addresses(AddressID),
    FOREIGN KEY (AccountID) REFERENCES accountdetails(AccountID)
)`;

const createOrderItemsTable = `
CREATE TABLE order_items (
    OrderItemID INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT NOT NULL,
    MedicineID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES medicineorders(OrderID),
    FOREIGN KEY (MedicineID) REFERENCES medicines(MedicineID)
)`;

// טבלה של כתובות המשתמשים
const createAddressesTable = `
CREATE TABLE Addresses (
  AddressID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  ApartmentNumber INT,
  BuildingNumber INT,
  Street VARCHAR(100),
  City VARCHAR(100),
  IsDefault BOOLEAN DEFAULT FALSE, -- שדה לסימון כתובת ברירת מחדל
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
)`;


// טבלה של פרטי החשבון של המשתמשים
const createAccountDetailsTable = `
CREATE TABLE AccountDetails (
  AccountID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  CardNumber VARCHAR(16) NOT NULL,
  ExpirationDate DATE NOT NULL,
  CVV VARCHAR(3) NOT NULL,
  IsDefault BOOLEAN DEFAULT FALSE, -- שדה לסימון שיטת תשלום ברירת מחדל
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
)`;

// טבלה של בקשת הזמנה לכרטיס קופת חולים חדש
// (במקרה של אובדן או גנבה)
const createNewCardRequestsTable = `
CREATE TABLE NewCardRequests (
  RequestID INT PRIMARY KEY AUTO_INCREMENT,
  PatientID INT,
  Completed BOOLEAN,
  CreatedAt DATE,
  FOREIGN KEY (PatientID) REFERENCES Users(UserID)
)`;

// טבלה של בקשת הפניות לתרופות
// כאשר מטופל מבקש הפניה לתרופה ההפניה נשלחת לרופא המשויך לו
const createPrescriptionRequestsTable = `
CREATE TABLE PrescriptionRequests (
  RequestID INT PRIMARY KEY AUTO_INCREMENT,
  PatientID INT,
  MedicineID INT,
  DoctorID INT,
  Approved BOOLEAN,
  FOREIGN KEY (PatientID) REFERENCES Users(UserID),
  FOREIGN KEY (MedicineID) REFERENCES Medicines(MedicineID),
  FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
)`;

// טבלה של זמנים פנויים לקבלת מטופלים עבור כל רופא
const createAvailableTimesTable = `
CREATE TABLE AvailableTimes (
  TimeID INT PRIMARY KEY AUTO_INCREMENT,
  DoctorID INT,
  Date DATE,
  StartTime TIME,
  EndTime TIME,
  FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
)`;

// טבלה של תורים שנקבעו עבור מטופלים אצל רופאים
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

const createPatientDoctorTable = `
CREATE TABLE PatientDoctor (
  PatientID INT,
  DoctorID INT,
  PRIMARY KEY (PatientID, DoctorID),
  FOREIGN KEY (PatientID) REFERENCES Users(UserID),
  FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
)`;

const queries = [
  createRolesTable,
  createUsersTable,
  createAddressesTable,
  createClinicsTable,
  createDoctorsTable,
  createMedicinesTable,
  createPrescriptionsTable,
  createReferralsTable,
  createMedicineOrdersTable,
  createOrderItemsTable,
  createAccountDetailsTable,
  createNewCardRequestsTable,
  createPrescriptionRequestsTable,
  createAvailableTimesTable,
  createAppointmentsTable,
  createPatientDoctorTable
];

// יצירה של כל הטבלאות בסדר הנכון לפי התלויות בין הטבלאות
queries.forEach((query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log("Table created successfully!");
  });
});
