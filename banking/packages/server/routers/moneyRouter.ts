import express from "express";
import pool from "../db";

const moneyRouter = express.Router();

moneyRouter.post("/transfer", async (req, res) => {
   try {
      const accountNumbers = await pool.query(
         "SELECT accountnumber, accountbalance FROM account WHERE ownerid != $1 AND currency = $2",
         [req.body.userId, req.body.currency]
      );
      const accounts: Array<number> = [];
      accountNumbers.rows.forEach((element: { accountnumber: number }) => {
         accounts.push(element.accountnumber);
      });
      if (accounts.includes(Number(req.body.receiverAccount))) {
         const transactionAmount: number = Number(req.body.amount);
         const sender: number = req.body.senderAccount;
         const receiver: number = req.body.receiverAccount;
         const preBalance = await pool.query(
            "SELECT accountbalance, accountnumber FROM account WHERE currency=$1 AND accountnumber=$2 OR accountnumber=$3",
            [req.body.currency, receiver, sender]
         );
         let senderBalance: number = 0;
         let receiverBalance: number = 0;
         if (preBalance.rows[0].accountnumber == sender) {
            senderBalance =
               Number(preBalance.rows[0].accountbalance) - transactionAmount;
            receiverBalance =
               Number(preBalance.rows[1].accountbalance) + transactionAmount;
         } else {
            senderBalance =
               Number(preBalance.rows[1].accountbalance) - transactionAmount;
            receiverBalance =
               Number(preBalance.rows[0].accountbalance) + transactionAmount;
         }
         if (senderBalance >= 0) {
            const receiverId = await pool.query(
               "SELECT ownerid FROM account WHERE accountnumber=$1",
               [receiver]
            );
            await pool.query(
               "UPDATE account SET accountbalance=$1 WHERE accountnumber=$2",
               [senderBalance, req.body.senderAccount]
            );
            await pool.query(
               "UPDATE account SET accountbalance=$1 WHERE accountnumber=$2",
               [receiverBalance, req.body.receiverAccount]
            );
            await pool.query(
               "INSERT INTO transactions(senderuser, receiveruser, senderaccount, receiveraccount, transactionamount, senderbalance, receiverbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)",
               [
                  req.body.userId,
                  receiverId.rows[0].ownerid,
                  sender,
                  receiver,
                  transactionAmount,
                  senderBalance,
                  receiverBalance,
               ]
            );
            res.json({ details: "sent" });
         } else {
            res.json({ details: "nie masz wystarczająco środkow" });
         }
      } else {
         res.json({ details: "zły numer konta" });
      }
   } catch (error) {
      console.log("error");
   }
});

moneyRouter.post("/exchange", async (req, res) => {
   try {
      const currencyFrom: string = req.body.currencyFrom;
      const currencyTo: string = req.body.currencyTo;
      const amount: number = Number(req.body.amount);
      const ownerid: number = req.body.userId;
      const userAccounts = await pool.query(
         "SELECT accountbalance, currency, accountnumber FROM account WHERE (currency=$1 OR currency=$2) AND ownerid=$3",
         [currencyFrom, currencyTo, ownerid]
      );
      let fromAccountnumber: number;
      let toAccountnumber: number;
      let fromCorrect = false;
      let toCorrect = false;
      let balanceFrom: number;
      let balanceTo: number;
      for (const row of userAccounts.rows) {
         if (
            row.currency === currencyFrom &&
            Number(row.accountbalance) >= amount
         ) {
            fromCorrect = true;
            fromAccountnumber = row.accountnumber;
            balanceFrom = Number(row.accountbalance);
         }
         if (row.currency === currencyTo) {
            toCorrect = true;
            toAccountnumber = row.accountnumber;
            balanceTo = Number(row.accountbalance);
         }
      }
      if (fromCorrect && toCorrect) {
         const currentRate = await fetch(
            `https://api.exchangerate.host/convert?from=${currencyFrom}&to=${currencyTo}`
         )
            .then((res) => res.json())
            .then((result) => {
               return result.result;
            });
         const result = Number((currentRate * amount).toFixed(2));
         const balanceFromAfter = balanceFrom - amount;
         const balanceToAfter = balanceTo + result;
         await pool.query(
            "UPDATE account SET accountbalance=$1 WHERE ownerid=$2 AND currency=$3",
            [balanceFromAfter, ownerid, currencyFrom]
         );
         await pool.query(
            "UPDATE account SET accountbalance=$1 WHERE ownerid=$2 AND currency=$3",
            [balanceToAfter, ownerid, currencyTo]
         );
         await pool.query(
            "INSERT INTO transactions(senderuser, receiveruser, senderaccount, receiveraccount, transactionamount, senderbalance, receiverbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
               ownerid,
               ownerid,
               fromAccountnumber,
               toAccountnumber,
               amount,
               balanceFromAfter,
               balanceToAfter,
            ]
         );
         res.json({ details: "przewalutowano!", status: "good" });
      } else {
         res.json({ details: "something went wrong :(", status: "bad" });
      }
   } catch (error) {
      console.log("error");
   }
});

export default moneyRouter;
