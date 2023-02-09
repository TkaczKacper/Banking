const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/accounts", async (req, res) => {
   const accounts = await pool.query(
      "SELECT * FROM account WHERE ownerId = $1",
      [req.body.userId]
   );
   if (accounts) {
      res.json({ accounts: accounts.rows });
   } else {
      res.json({ details: "nie masz jeszcze konta" });
   }
});

module.exports = router;
