create database bamazon;
USE  bamazon;
CREATE TABLE products(
id_item INT NOT NULL AUTO_INCREMENT primary key ,
product_name VARCHAR(20)NOT NULL,
department_name VARCHAR(20)NOT NULL,
price decimal(10) NOT NULL,
stock_quantit INT (12)
);
  

   SELECT * FROM products ;
SET NAMES utf8mb4;
Insert into products values ( 1, 'devise', 'Administration', 9.99,
'434');
Insert into products values ( 2, 'iphones', 'Marketing', 8.99,
'452');
Insert into products values ( 3, 'office', 'Purchasing', 8.99,
'234');
Insert into products values ( 4, 'mac', 'IT', 12.99,
'654');
Insert into products values ( 5, 'cars', 'Sales', 23.99,
'122');
Insert into products values ( 6, 'trucks', 'Shipping', 34.99,
'223');
Insert into products values ( 7, 'windows', 'Human Resources  ', 45.99,
'541');
Insert into products values ( 8, 'samsong', 'office', 56.99,
'811');
Insert into products values ( 9, 'appstores', 'Finance', 67.99,
'623');
Insert into products values ( 10, 'clothes', 'Accounting', 78.99,
'77');
