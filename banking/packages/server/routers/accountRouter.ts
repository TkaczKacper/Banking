import express from "express";
import pool from "../db";

const accountRouter = express.Router();

accountRouter.get("/:id", async (req, res) => {
   try {
      const accounts = await pool.query(
         "SELECT * FROM account WHERE ownerId = $1 ORDER BY accountnumber",
         [req.params.id]
      );
      if (accounts) {
         res.json({ accounts: accounts.rows });
      } else {
         res.json({ details: "nie masz jeszcze konta" });
      }
   } catch (error) {
      console.log("error");
   }
});

accountRouter.get("/new/:id", async (req, res) => {
   try {
      const accountsCurrencies = await pool.query(
         "SELECT currency FROM account WHERE ownerId=$1",
         [req.params.id]
      );
      let accounts = [];
      accountsCurrencies.rows.forEach((account: { currency: string }) => {
         accounts.push(account.currency);
      });
      res.json({ accounts: accounts });
   } catch (error) {
      console.log("error");
   }
});

accountRouter.post("/new", async (req, res) => {
   try {
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
   } catch (error) {
      console.log("error");
   }
});

accountRouter.get("/history/:username", async (req, res) => {
   try {
      const username = req.params.username;
      const transactions = await pool.query(
         "SELECT * FROM transactions WHERE senderuser=$1 or receiveruser=$1 ORDER BY transactiondate DESC",
         [username]
      );
      if (transactions.rowCount > 0) {
         res.json({
            transactions: transactions.rows,
            details: "transactions found",
         });
      } else {
         res.json({ transactions: transactions.rows, details: "not found" });
      }
   } catch (error) {
      console.log("error");
   }
});

export default accountRouter;
