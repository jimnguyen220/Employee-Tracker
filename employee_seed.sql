INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("1", "Michael", "Scott", "1", null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("2", "Dwight", "Schrute", "2", "1");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("3", "Jim", "Halpert", "2", "1");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("4", "Andy", "Bernard", "3", null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("5", "Ryan", "Howard", "4", 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("6", "Angela", "Kinsey", "5", null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("7", "Pam", "Beesly", "6", null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("8", "Erin", "Hannon", "7", 7);

INSERT INTO role (role_id, title, salary, department_id)
VALUES ("1", "Sales Lead", "125000.00", "1");

INSERT INTO role (role_id, title, salary, department_id)
VALUES ("2", "Salesperson", "90000.00", "1");

INSERT INTO role (role_id, title, salary, department_id)
VALUES ("3", "Lead Engineer", "150000.00", "2");

INSERT INTO role (role_id, title, salary, department_id)
VALUES ("4", "Software Engineer", "110000.00", "2");

INSERT INTO role (role_id, title, salary, department_id)
VALUES ("5", "Accountant", "120000.00", "3");

INSERT INTO role (role_id, title, salary, department_id)
VALUES ("6", "Legal Team Lead", "200000.00", "4");

INSERT INTO role (role_id, title, salary, department_id)
VALUES ("7", "Lawyer", "150000.00", "4");

INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Finance");

INSERT INTO department (department_name)
VALUES ("Legal");