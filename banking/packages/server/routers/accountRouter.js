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

module.exports = router;
