CREATE TABLE users (
     id SERIAL NOT NULL UNIQUE,
     username VARCHAR(20) NOT NULL UNIQUE,
     email VARCHAR NOT NULL UNIQUE,
     password VARCHAR NOT NULL
);

CREATE TABLE account (
     accountNumber int NOT NULL AUTO_INCREMENT,
     ownerId int,
     currency VARCHAR(3) NOT NULL,
     accountBalance NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
     PRIMARY KEY (accountNumber),
     FOREIGN KEY (ownerId) REFERENCES users(id)
);

CREATE TABLE transactions (
     id SERIAL NOT NULL UNIQUE,
     senderUser VARCHAR(20),
     receiverUser VARCHAR(20),
     senderAccount int,
     receiverAccount int,
     senderCurrency VARCHAR(3),
     receiverCurrency VARCHAR(3),
     transactionAmount NUMERIC(10, 2) NOT NULL,
     senderAccountBalance NUMERIC(10, 2) NOT NULL,
     receiverAccountBalance NUMERIC(10, 2) NOT NULL,
     PRIMARY KEY (id),
     CONSTRAINT fk_sender
          FOREIGN KEY (senderUser) 
               REFERENCES users(username),
     CONSTRAINT fk_receiver
          FOREIGN KEY (receiverUser) 
               REFERENCES users(username),
     CONSTRAINT fk_account_sender
          FOREIGN KEY (senderAccount) 
               REFERENCES account(accountNumber),
     CONSTRAINT fk_account_receiver
          FOREIGN KEY (receiverAccount) 
               REFERENCES account(accountNumber)
);