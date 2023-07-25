CREATE DATABASE USERS;
\c USERS;

CREATE TABLE DELIVERY (
  type_of_merchandise VARCHAR(42),
  quantity VARCHAR(42),
  volume VARCHAR(42),
  length VARCHAR(42),
  width VARCHAR(42),
  height VARCHAR(42),
  weight VARCHAR(42),
  departure_address VARCHAR(42),
  zipcode VARCHAR(42),
  city VARCHAR(42),
  departure_phone_number VARCHAR(42),
  arrival_address VARCHAR(42),
  arrival_zipcode VARCHAR(42),
  arrival_city VARCHAR(42),
  arrival_phone_number VARCHAR(42),
  departure_date VARCHAR(42),
  arrival_date VARCHAR(42),
  price VARCHAR(42),
  image VARCHAR(42),
  creator_id VARCHAR(42),
  carrier_id VARCHAR(42),
  email VARCHAR(42),
  email_1 VARCHAR(42),
  PRIMARY KEY ()
);

CREATE TABLE USER (
  email VARCHAR(42),
  password VARCHAR(42),
  role VARCHAR(42),
  first_name VARCHAR(42),
  last_name VARCHAR(42),
  address VARCHAR(42),
  comp_address VARCHAR(42),
  zipcode VARCHAR(42),
  city VARCHAR(42),
  birth_date VARCHAR(42),
  phone_number VARCHAR(42),
  carrier VARCHAR(42),
  identity_verified VARCHAR(42),
  PRIMARY KEY (email)
);

ALTER TABLE DELIVERY ADD FOREIGN KEY (email_1) REFERENCES USER (email);
ALTER TABLE DELIVERY ADD FOREIGN KEY (email) REFERENCES USER (email);