DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	id INT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
	id INT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
);