Part 1: API
 
PROJECT EXERCISE

Your Product Team has just started the next sprint, working on a new Pharmacy management system.

You pull the next feature story from your team’s backlog, assign it to yourself, and get to work on the following criteria:

The business needs an API that can update a single Pharmacy record.
The user can update any number of fields.
The user can select any one pharmacy to update, from a list of 5 existing pharmacies in the database.
 Each Pharmacy record has the following fields:

Name,
Address,
City,
State,
Zip,
Number of Filled Prescriptions (current month to date),
Created Date (date pharmacy was added to the system),
Updated Date (date pharmacy was last updated in the system)
 

SOLUTION

You must create a new C# .Net 7 Web API solution that contains the following:

Pharmacy API Controller that allows the following:
View a Pharmacy By ID,
View the entire Pharmacy List – all 5 pharmacies,
Update a Pharmacy By ID,
Business Service,
Provides logic and actions that support the Controller methods
Repository,
Provides the Business Service with read/write access to the database tables,
MS SQL Database (SQLExpress is fine),
Contains the tables necessary to support the entities mentioned above,
Tables contain the necessary data / records to support this exercise’s requirements
 

BONUS OBJECTIVES

Use a dependency injection pattern – leveraging interfaces and initial configuration injection
Use standard authentication, authorization and/or routing attributes
Setup of a SQL database using code-first migrations.
Incorporate Entity Framework
Create a UI that leverages these functions
Unit Test coverage - OR - Automated API Test Coverage (ex: using a Jasmine-like test harness).
