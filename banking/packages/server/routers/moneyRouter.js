const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/transfer", async (req, res) => {
   const accountNumbers = await pool.query("SELECT accountnumber FROM account");
   const accounts = [];
   accountNumbers.rows.forEach((element) => {
      accounts.push(element.accountnumber);
   });
   console.log(accounts);
   if (accounts.includes(Number(req.body.receiverAccount)) === true) {
      console.log(accountNumbers.rows);
      console.log("hi");
      res.json({ details: "hi" });
   } else {
      res.json({ details: "takie konto nie istnieje" });
   }
   console.log(req.body);
   console.log(req.body.receiverAccount);
   console.log(req.body.amount);
   console.log(req.body.senderAccount);
});

module.exports = router;
