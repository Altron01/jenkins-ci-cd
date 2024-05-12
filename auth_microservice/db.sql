DROP DATABASE IF EXISTS msdemo;
CREATE DATABASE msdemo;
USE msdemo;
CREATE TABLE users (username varchar(255),password varchar(255));
INSERT INTO users (username, password) VALUES ('test_user', 'abc123!');
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'abc123!';
FLUSH PRIVILEGES;
