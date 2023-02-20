import express from "express";
import pool from "../db";

const accountRouter = express.Router();

accountRouter.get("/:id", async (req, res) => {
   const accounts = await pool.query(
      "SELECT * FROM account WHERE ownerId = $1 ORDER BY accountnumber",
      [req.params.id]
   );
   if (accounts) {
      res.json({ accounts: accounts.rows });
   } else {
      res.json({ details: "nie masz jeszcze konta" });
   }
});

accountRouter.get("/new/:id", async (req, res) => {
   const accountsCurrencies = await pool.query(
      "SELECT currency FROM account WHERE ownerId=$1",
      [req.params.id]
   );
   let accounts = [];
   accountsCurrencies.rows.forEach((account: { currency: string }) => {
      accounts.push(account.currency);
   });
   res.json({ accounts: accounts });
});

accountRouter.post("/new", async (req, res) => {
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
         "INSERT INTO account(ownerid, currency, accountbalance) VALUES ($1, $2, 0)",
         [req.body.userId, req.body.currency]
      );
      res.json({ details: "konto zalozone" });
   } else {
      res.json({ details: "masz juz konto w tej walucie" });
   }
});

accountRouter.get("/history/:id", async (req, res) => {
   const userId = req.params.id;
   const transactions = await pool.query(
      "SELECT * FROM transactions WHERE senderuser=$1 or receiveruser=$1",
      [userId]
   );
   if (transactions.rowCount > 0) {
      res.json({
         transactions: transactions.rows,
         details: "transactions found",
      });
   } else {
      res.json({ details: "not found" });
   }
});

export default accountRouter;