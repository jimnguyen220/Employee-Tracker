DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	department_id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY(department_id)
);

CREATE TABLE role (
	role_id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT,
    PRIMARY KEY(role_id)
);

CREATE TABLE employee (
	id INT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
);