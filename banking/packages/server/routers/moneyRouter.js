const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/transfer", async (req, res) => {
   const accountNumbers = await pool.query(
      "SELECT accountnumber, accountbalance FROM account WHERE ownerid != $1 AND currency = $2",
      [req.body.userId, req.body.currency]
   );
   const accounts = [];
   accountNumbers.rows.forEach((element) => {
      accounts.push(element.accountnumber);
   });
   if (accounts.includes(Number(req.body.receiverAccount))) {
      const transactionAmount = Number(req.body.amount);
      const sender = req.body.senderAccount;
      const receiver = req.body.receiverAccount;
      const preBalance = await pool.query(
         "SELECT accountbalance, accountnumber FROM account WHERE currency=$1 AND accountnumber=$2 OR accountnumber=$3",
         [req.body.currency, receiver, sender]
      );
      let senderBalance = 0;
      let receiverBalance = 0;
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
         await pool.query(
            "UPDATE account SET accountbalance=$1 WHERE accountnumber=$2",
            [senderBalance, req.body.senderAccount]
         );
         await pool.query(
            "UPDATE account SET accountbalance=$1 WHERE accountnumber=$2",
            [receiverBalance, req.body.receiverAccount]
         );
         res.json({ details: "sent" });
      } else {
         res.json({ details: "nie masz wystarczajaco srodkow" });
      }
   } else {
      res.json({ details: "zły numer konta" });
   }
});

module.exports = router;
