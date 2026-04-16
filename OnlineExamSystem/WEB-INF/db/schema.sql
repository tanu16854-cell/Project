CREATE DATABASE online_examination_system;
USE online_examination_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(100),
  fullname varchar(100)
);

