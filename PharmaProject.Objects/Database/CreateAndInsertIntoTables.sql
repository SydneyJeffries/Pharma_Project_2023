--CREATE DATABASE PharmaProject;
USE PharmaProject

DECLARE @CurrentDate DATETIMEOFFSET = SYSDATETIMEOFFSET();

CREATE TABLE State (
    StateCode VARCHAR(2) NOT NULL,
    StateName VARCHAR(450) NOT NULL,
    CreatedDate DATETIMEOFFSET NOT NULL,
    UpdatedDate DATETIMEOFFSET NULL,
    CreatedBy VARCHAR(400) NOT NULL,
    UpdatedBy VARCHAR(400) NULL,
    Active BIT NOT NULL,
    PRIMARY KEY (StateCode)
);


CREATE TABLE Pharmacy (
    PharmacyId INT IDENTITY(1,1) NOT NULL,
    Name VARCHAR(250) NOT NULL,
    FilledPerscriptions INT NOT NULL,
    Address VARCHAR(250) NOT NULL,
    City VARCHAR(250) NOT NULL,
    StateCode VARCHAR(2) NOT NULL,
    Zip VARCHAR(5) NOT NULL,
    CreatedDate DATETIMEOFFSET NOT NULL,
    UpdatedDate DATETIMEOFFSET NULL,
    CreatedBy VARCHAR(400) NOT NULL,
    UpdatedBy VARCHAR(400) NULL,
    Active BIT NOT NULL,
    PRIMARY KEY (PharmacyId),
    FOREIGN KEY (StateCode) REFERENCES State(StateCode) ON DELETE NO ACTION
);

INSERT INTO State (StateName, StateCode, CreatedDate, CreatedBy, Active)
VALUES
('Alabama', 'AL', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Alaska', 'AK', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Arizona', 'AZ', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Arkansas', 'AR', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('California', 'CA', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Colorado', 'CO', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Connecticut', 'CT', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Delaware', 'DE', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Florida', 'FL', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Georgia', 'GA', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Hawaii', 'HI', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Idaho', 'ID', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Illinois', 'IL', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Indiana', 'IN', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Iowa', 'IA', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Kansas', 'KS', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Kentucky', 'KY', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Louisiana', 'LA', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Maine', 'ME', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Maryland', 'MD', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Massachusetts', 'MA', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Michigan', 'MI', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Minnesota', 'MN', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Mississippi', 'MS', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Missouri', 'MO', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Montana', 'MT', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Nebraska', 'NE', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Nevada', 'NV', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('New Hampshire', 'NH', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('New Jersey', 'NJ', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('New Mexico', 'NM', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('New York', 'NY', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('North Carolina', 'NC', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('North Dakota', 'ND', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Ohio', 'OH', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Oklahoma', 'OK', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Oregon', 'OR', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Pennsylvania', 'PA', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Rhode Island', 'RI', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('South Carolina', 'SC', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('South Dakota', 'SD', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Tennessee', 'TN', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Texas', 'TX', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Utah', 'UT', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Vermont', 'VT', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Virginia', 'VA', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Washington', 'WA', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('West Virginia', 'WV', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Wisconsin', 'WI', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Wyoming', 'WY', SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1);


-- Insert data into Pharmacy table
INSERT INTO Pharmacy (Name, Address, City, StateCode, Zip, FilledPerscriptions, CreatedDate, CreatedBy, Active)
VALUES
('Walgreens', '123 Main St.', 'Dallas', 'TX', '75201', 43, SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Sydney''s Pharmacy', '123 Juniper Rd', 'Plano', 'TX', '75074',66, SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('CVS', '501 McAuthor Blvd.', 'Irving', 'TX', '75014', 78, SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Eckards', '123 7th St', 'Ft Worth', 'TX', '75050', 59, SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1),
('Target Pharmacy', 'Glade Rd', 'Colleyville', 'TX', '76001', 88, SYSDATETIMEOFFSET(), 'Sydney.Jeffriess@gmail.com', 1);



CREATE TABLE Drug
(
    DrugId INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
    DrugName VARCHAR(250) NOT NULL,
	Active BIT, 
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
);

INSERT INTO Drug (DrugName, Active, CreatedDate, CreatedBy, UpdatedDate, UpdatedBy)
VALUES
    ( 'Aspirin', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null ),
    ( 'Tylenol', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null),
    ( 'Advil', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null),
    ( 'Motrin', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null),
    ( 'Aleve', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null),
    ( 'Celebrex', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null),
    ( 'Zyrtec', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null),
    ( 'Claritin', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null),
    ( 'Allegra', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null),
    ( 'Benadryl', 1, @CurrentDate, 'Sydney.Jeffries@gmail.com', null, null);


CREATE TABLE Pharmacist
(
    PharmacistId INT PRIMARY KEY IDENTITY(1,1),
    PharmacyId INT FOREIGN KEY REFERENCES Pharmacy(PharmacyId) NOT NULL,
    FirstName VARCHAR(250)NOT NULL,
    LastName VARCHAR(250) NOT NULL,
    Age INT NOT NULL,
    DateOfHire DATETIMEOFFSET NOT NULL,
	Active BIT NOT NULL, 
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
);



INSERT INTO Pharmacist (PharmacyId, FirstName, LastName, Age,  DateOfHire, Active, CreatedDate, CreatedBy)
VALUES
    (1, 'John', 'Doe', 30, '2021-01-01', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (1, 'Jane', 'Smith', 35, '2020-02-15', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (2, 'Robert', 'Johnson', 54, '2019-03-10', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (2, 'Emily', 'Anderson', 32, '2018-04-20', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (3, 'Michael', 'Williams', 67, '2014-05-05', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (3, 'Sophia', 'Miller', 52, '2011-06-18', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (4, 'Christopher', 'Brown', 29, '2023-07-22', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (4, 'Olivia', 'Davis', 33, '2018-08-30', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (5, 'Daniel', 'Garcia', 26, '2023-09-10', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM'),
    (5, 'Ava', 'Wilson', 33, '2017-10-25', 1, @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM');

CREATE TABLE Warehouse
(
    WarehouseId INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(250) NOT NULL,
    Address VARCHAR(250) NOT NULL,
    City VARCHAR(250) NOT NULL,
    StateCode VARCHAR(2) NOT NULL,
    Zip VARCHAR(5) NOT NULL,
	Active BIT NOT NULL, 
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
);

INSERT INTO Warehouse (Name, Address, City, StateCode, Zip, CreatedDate, CreatedBy, Active)
VALUES
    ('DFW Supplies', '123 Main St', 'Dallas', 'TX', '75201', @CurrentDate, 'SYDNEY.JEFFRIESS@GMAIL.COM', 1),
    ('Metro Logistics', '789 Elm St', 'Plano', 'TX', '75023', @currentDate,'SYDNEY.JEFFRIESS@GMAIL.COM', 1 ),
    ('North Texas Storage', '456 Oak St', 'Arlington', 'TX', '76001', @currentDate,'SYDNEY.JEFFRIESS@GMAIL.COM', 1 );

	
CREATE TABLE Delivery
(
	DeliveryId INT PRIMARY KEY IDENTITY(1,1),
    WarehouseId INT FOREIGN KEY REFERENCES Warehouse(WarehouseId) NOT NULL,
    PharmacyId INT FOREIGN KEY REFERENCES Pharmacy(PharmacyId) NOT NULL,
    DrugId INT FOREIGN KEY REFERENCES Drug(DrugId) NOT NULL,
    UnitCount INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    DeliveryDate DATETIMEOFFSET NOT NULL,
	Active BIT NOT NULL, 
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
);

--DECLARE @CurrentDate DATETIMEOFFSET = SYSDATETIMEOFFSET();

INSERT INTO Delivery (WarehouseId, PharmacyId, DrugId, UnitCount, UnitPrice, TotalPrice, DeliveryDate, Active, CreatedDate, CreatedBy)
VALUES 
    ( 1, 1, 1, 4.0, 15, 40.0, @CurrentDate, 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 1, 1, 2, 6.0, 15, 15 * 6.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 2, 1, 2, 25, 6.0, 25 * 6.0, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 2, 1, 3, 8, 7.0, 8 * 7.0, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 3, 1, 3, 15, 7.0, 15 * 7.0, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 3, 1, 4, 3, 7.75, 3 * 7.75, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 1, 1, 4, 5, 7.75, 5 * 7.75, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 1, 1, 5, 10, 9.0, 10 * 9.0, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 2, 1, 5, 20, 9.0, 20 * 9.0, '2023-05-23', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 3, 2, 6, 28, 4.0, 28 * 4.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 3, 2, 7, 18, 5.0, 18 * 5.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 1, 2, 7, 12, 5.0, 12 * 5.0, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 1, 2, 8, 9, 4.5, 9 * 4.5, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 2, 2, 8, 7, 4.5, 7 * 4.5, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 2, 2, 9, 15, 3.75, 15 * 3.75, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 3, 2, 9, 30, 3.75, 30 * 3.75, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 3, 2, 10, 8, 6.75, 8 * 6.75, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 1, 2, 10, 18, 6.75, 18 * 6.75, '2023-05-23', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 2, 3, 1, 16, 4.0, 16 * 4.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 2, 3, 2, 4, 6.0, 4 * 6.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 3, 3, 2, 8, 6.0, 8 * 6.0, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 3, 3, 3, 11, 7.0, 11 * 7.0, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 1, 3, 3, 22, 7.0, 22 * 7.0, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 1, 3, 4, 5, 7.75, 5 * 7.75, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 2, 3, 4, 11, 7.75, 11 * 7.75, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 2, 3, 5, 13, 9.0, 13 * 9.0, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 3, 3, 5, 25, 9.0, 25 * 9.0, '2023-05-23', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 1, 4, 6, 3, 4.0, 3 * 4.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 1, 4, 7, 21, 5.0, 21 * 5.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 2, 4, 7, 29, 5.0, 29 * 5.0, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 2, 4, 8, 12, 4.5, 12 * 4.5, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 3, 4, 8, 14, 4.5, 14 * 4.5, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 3, 4, 9, 27, 3.75, 27 * 3.75, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 1, 4, 9, 19, 3.75, 19 * 3.75, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 1, 4, 10, 9, 6.75, 9 * 6.75, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 2, 4, 10, 9, 6.75, 9 * 6.75, '2023-05-23', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 3, 5, 1, 23, 4.0, 23 * 4.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 3, 5, 2, 8, 6.0, 8 * 6.0, '2023-01-03', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 1, 5, 2, 2, 6.0, 2 * 6.0, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),
    ( 1, 5, 3, 14, 7.0, 14 * 7.0, '2023-02-07', 1, @CurrentDate, 'sydney.jeffriess@gmail.com'),

    ( 2, 5, 3, 19, 7.0, 19 * 7.0, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail'),
    ( 2, 5, 4, 7, 7.75, 7 * 7.75, '2023-03-14', 1, @CurrentDate, 'sydney.jeffriess@gmail'),

    ( 3, 5, 4, 6, 7.75, 6 * 7.75, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail'),
    ( 3, 5, 4, 6, 7.75, 6 * 7.75, '2023-04-18', 1, @CurrentDate, 'sydney.jeffriess@gmail'),

    ( 1, 5, 5, 26, 9.0, 26 * 9.0, '2023-05-23', 1, @CurrentDate, 'sydney.jeffriess@gmail' );


CREATE TABLE Sale (
    SaleId INT PRIMARY KEY IDENTITY(1,1),
    PharmacistId INT,
    DrugId INT,
    SalePrice DECIMAL(10, 2),
    FOREIGN KEY (PharmacistId) REFERENCES Pharmacist(PharmacistId),
    FOREIGN KEY (DrugId) REFERENCES Drug(DrugId),
	Active BIT NOT NULL, 
	CreatedDate DATETIMEOFFSET NOT NULL, 
	CreatedBy VARCHAR(250) NOT NULL,
	UpdatedDate DATETIMEOFFSET NULL, 
	UpdatedBy VARCHAR(250) NULL
);



INSERT INTO Sale (PharmacistId, DrugId, SalePrice, Active, CreatedDate, CreatedBy)
VALUES
	(1, 1, 16.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
	(1, 1, 16.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
    (1, 1, 16.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
    (1, 1, 16.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
    (3, 5, 28.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (7, 8, 20.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (5, 4, 21.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (9, 2, 15.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (10, 5, 25.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (2, 9, 18.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (4, 3, 19.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (6, 7, 28.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (8, 10, 25.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
    (1, 6, 12.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (3, 4, 26.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (5, 7, 23.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (7, 9, 22.5, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (9, 3, 21.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (10, 8, 30.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (2, 1, 16.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
    (4, 6, 15.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (6, 10, 23.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (8, 2, 20.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (1, 5, 17.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (3, 1, 25.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (5, 8, 18.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (7, 3, 19.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (9, 9, 21.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
	(2, 7, 14.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
	(2, 7, 14.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
    (4, 4, 27.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
	(4, 4, 27.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
	(4, 4, 27.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (6, 9, 18.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (8, 1, 22.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (10, 6, 16.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (1, 2, 25.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (3, 8, 20.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (5, 3, 15.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (7, 6, 23.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
	(7, 6, 23.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
	(7, 6, 23.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
	(7, 6, 23.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (9, 10, 24.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),   
    (2, 5, 17.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (4, 1, 21.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (6, 8, 19.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (8, 3, 26.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (10, 7, 22.5, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
	(10, 7, 22.5, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (1, 9, 16.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (3, 2, 19.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (5, 5, 15.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
    (7, 10, 28.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (9, 4, 20.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
     (2, 7, 14.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com'),
    (4, 4, 27.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (6, 9, 18.0, 1, '2023-02-07', 'sydney.jeffriess@gmail.com'),
    (8, 1, 22.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (10, 6, 16.0, 1, '2023-03-14', 'sydney.jeffriess@gmail.com'),
    (1, 2, 25.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (3, 8, 20.0, 1, '2023-04-18', 'sydney.jeffriess@gmail.com'),
    (5, 3, 15.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (7, 6, 23.0, 1, '2023-05-23', 'sydney.jeffriess@gmail.com'),
    (9, 10, 24.0, 1, '2023-01-03', 'sydney.jeffriess@gmail.com');