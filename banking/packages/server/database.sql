CREATE TABLE users (
     id SERIAL NOT NULL UNIQUE,
     username VARCHAR(20) NOT NULL UNIQUE,
     email VARCHAR NOT NULL UNIQUE,
     password VARCHAR NOT NULL
);

CREATE TABLE account (
     accountNumber int(10) NOT NULL AUTO_INCREMENT,
     ownerId int,
     currency VARCHAR(3) NOT NULL,
     accountBalance NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
     PRIMARY KEY (accountNumber),
     FOREIGN KEY (ownerId) REFERENCES users(id)
)