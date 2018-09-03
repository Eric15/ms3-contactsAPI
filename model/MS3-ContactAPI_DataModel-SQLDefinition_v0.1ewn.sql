-- MS3-ContactAPI_DataModel-SQLDefinition_v0.1ewn.txt
-- Version: 0.1ewn

-- Create a database for MS3 Contact records
CREATE DATABASE IF NOT EXISTS MS3_Contacts;

-- Connect to the just-created database.
USE MS3_Contacts;

-- Identification table
CREATE TABLE IF NOT EXISTS Identification(
  contact_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  FirstName  VARCHAR(255) NOT NULL,
  LastName   VARCHAR(255) NOT NULL,
  DOB        DATE,
  Gender     CHAR(1),
  Title      VARCHAR(255)
);

-- Address table
CREATE TABLE IF NOT EXISTS Address(
  address_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  contact_id INTEGER NOT NULL REFERENCES Identification(contact_id),
  Type       VARCHAR(255) NOT NULL,
  Number     VARCHAR(255) NOT NULL,
  Street     VARCHAR(255) NOT NULL,
  Unit       VARCHAR(255),
  City       VARCHAR(255) NOT NULL,
  State      VARCHAR(2) NOT NULL,
  Zipcode    VARCHAR(10)  NOT NULL
);

-- Communication table
CREATE TABLE IF NOT EXISTS Communication(
  comm_id    INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  contact_id INTEGER NOT NULL REFERENCES Identification(contact_id),
  Type       VARCHAR(255) NOT NULL,
  Value      VARCHAR(255) NOT NULL,
  Preferred  BIT(1) NULL DEFAULT 0
);

-- Data loading
INSERT INTO Identification (FirstName, LastName, DOB, Gender, Title) VALUES ("Bob", "Frederick", "1980-06-21", "M", "Manager")
INSERT INTO Address (contact_id, Type, Number, Street, Unit, City, State, Zipcode) VALUES (1, "home", "1234", "blah blah St", "1 a", "Somewhere", "WV", "12345")
INSERT INTO Communication (contact_id, Type, Value, Preferred) VALUES (1, "email", "bfe@sample.com", 1)
INSERT INTO Communication (contact_id, Type, Value, Preferred) VALUES (1, "cell", "304-555-8282")