
DROP DATABASE IF EXISTS HR;
CREATE DATABASE HR;
USE HR;
CREATE TABLE employee (
	employee_id int NOT NULL PRIMARY KEY, 
    employee_name varchar(45),
    city varchar(45),
    employee_email varchar(45),
    UNIQUE KEY unique_id (employee_id) 
);


INSERT INTO employee (employee_id, employee_name, city, employee_email)
VALUES (2, "Valmir", "Lund", "valmir123@gmail.com");
INSERT INTO employee (employee_id, employee_name, city, employee_email)
VALUES (3, "Zeeshan Saeed", "Kristianstad", "zee@gmail.com");
INSERT INTO employee (employee_id, employee_name, city, employee_email)
VALUES (5, "Srdjan", "Helsingborg", "sd@gmail.com");
INSERT INTO employee (employee_id, employee_name, city, employee_email)
VALUES (7, "Christopher Versland", "Helsingborg", "chrisland@gmail.com");
INSERT INTO employee (employee_id, employee_name, city, employee_email)
VALUES (8, "Jonas",  "Kristianstad", "jonas12@gmail.com");
INSERT INTO employee (employee_id, employee_name, city, employee_email)
VALUES (10, "Miqdad Askari", "Lund", "mick@gmail.com");
CREATE TABLE locations (
location_id int not null PRIMARY KEY,
 city varchar(45),
 postal_code int not null,
 UNIQUE KEY unique_id (location_id) 
);
INSERT INTO locations (location_id, city, postal_code)
VALUES (2, "Lund", 25676);
INSERT INTO locations (location_id, city, postal_code)
VALUES (3, "Uppsala", 21562);
INSERT INTO locations (location_id, city, postal_code)
VALUES (4, "Kristianstad", 25672);
INSERT INTO locations (location_id, city, postal_code)
VALUES (6, "Helsingborg", 21892);
INSERT INTO locations (location_id, city, postal_code)
VALUES (7, "Gothenborg", 56192);
INSERT INTO locations (location_id, city, postal_code)
VALUES (8, "Kavlinge", 28190);
INSERT INTO locations (location_id, city, postal_code)
VALUES (9, "Hjargup", 12098);
INSERT INTO locations (location_id, city, postal_code)
VALUES (10, "Arlov", 26232);
