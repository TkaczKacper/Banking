const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:id", async (req, res) => {
   console.log("get");
   console.log(req.params.id);
   const accounts = await pool.query(
      "SELECT * FROM account WHERE ownerId = $1",
      [req.params.id]
   );
   if (accounts) {
      res.json({ accounts: accounts.rows });
   } else {
      res.json({ details: "nie masz jeszcze konta" });
   }
});

router.get("/new/:id", async (req, res) => {
   const accountsCurrencies = await pool.query(
      "SELECT currency FROM account WHERE ownerId=$1",
      [req.params.id]
   );
   let accounts = [];
   accountsCurrencies.rows.forEach((account) => {
      accounts.push(account.currency);
   });
   res.json({ accounts: accounts });
});

router.post("/new", async (req, res) => {
   const accounts = await pool.query(
      "SELECT currency FROM account WHERE ownerid = $1",
      [req.body.userId]
   );
   let accountAvailable = true;
   for (let i = 0; i < accounts.rows.length; i++) {
      if (accounts.rows[i].currency === req.body.currency) {
         accountAvailable = false;
         break;
      }
   }
   if (accountAvailable) {
      await pool.query(
         "INSERT INTO account(ownerid, currency, accountbalance) VALUES ($1, $2, 400)",
         [req.body.userId, req.body.currency]
      );
      res.json({ details: "konto zalozone" });
   } else {
      res.json({ details: "masz juz konto w tej walucie" });
   }
});

module.exports = router;
