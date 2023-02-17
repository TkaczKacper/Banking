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
     senderUser int,
     receiverUser int,
     senderAccount int,
     receiverAccount int,
     transactionAmount NUMERIC(10, 2) NOT NULL,
     accountBalance NUMERIC(10, 2) NOT NULL,
     PRIMARY KEY (id),
     CONSTRAINT fk_sender
          FOREIGN KEY (senderUser) 
               REFERENCES users(id),
     CONSTRAINT fk_receiver
          FOREIGN KEY (receiverUser) 
               REFERENCES users(id),
     CONSTRAINT fk_account_sender
          FOREIGN KEY (senderAccount) 
               REFERENCES account(accountNumber),
     CONSTRAINT fk_account_receiver
          FOREIGN KEY (receiverAccount) 
               REFERENCES account(accountNumber)
);