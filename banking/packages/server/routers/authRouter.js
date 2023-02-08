const express = require("express");
const router = express.Router();
const yup = require("yup");
const pool = require("../db");
const bcrypt = require("bcrypt");

const formDataLoginSchema = yup.object({
   username: yup
      .string()
      .required("Invalid username.")
      .min(6, "Invalid username.")
      .max(20, "Invalid username."),
   password: yup
      .string()
      .required("Invalid password.")
      .min(8, "Invalid password.")
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
         "Invalid password."
      ),
});

const formDataRegisterSchema = yup.object({
   username: yup
      .string()
      .required("Username can't be blank.")
      .min(6, "Username too short.")
      .max(20, "Username too long."),
   email: yup
      .string()
      .matches(
         /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
         "Invalid email format."
      ),
   password: yup
      .string()
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
         "Password is too weak."
      ),
   password_conf: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match."),
});

router.post("/login", async (req, res) => {
   const formData = req.body;
   const loginData = await pool.query(
      `SELECT username, password FROM users u WHERE u.username='${req.body.username}'`
   );
   if (loginData.rowCount === 1) {
      formDataLoginSchema
         .validate(formData)
         .catch((err) => {
            res.json({
               loggedIn: false,
               status: "invalid credentials",
            });
            console.log(err.errors);
         })
         .then((valid) => {
            if (valid) {
               bcrypt
                  .compare(req.body.password, loginData.rows[0].password)
                  .then((res2) => {
                     if (res2) {
                        res.json({
                           loggedIn: true,
                           status: "success",
                        });
                     } else {
                        res.json({
                           loggedIn: false,
                           status: "invalid credentials",
                        });
                     }
                  })
                  .catch((err) => console.error(err.message));
            }
         });
   } else {
      res.json({ loggedIn: false, status: "invalid credentials" });
      console.log("siema");
   }
});

router.post("/register", async (req, res) => {
   const formData = req.body;
   const existingUser = await pool.query(
      "SELECT username FROM users WHERE username=$1",
      [req.body.username]
   );
   const existingEmail = await pool.query(
      "SELECT email FROM users WHERE email=$1",
      [req.body.email]
   );
   const passwordHashed = await bcrypt.hash(req.body.password, 8);
   if (existingUser.rowCount === 0 && existingEmail.rowCount === 0) {
      formDataRegisterSchema
         .validate(formData)
         .catch((err) => {
            res.status(422).send();
            console.log(err.errors);
         })
         .then((valid) => {
            if (valid) {
               res.status(200).send();
               pool.query(
                  "INSERT INTO users(username,email,password) VALUES ($1,$2,$3)",
                  [req.body.username, req.body.email, passwordHashed]
               );
            }
         });
      res.json({ loggedIn: true });
   } else {
      if (existingUser.rowCount === 1) {
         console.log("username taken");
         res.json({ loggedIn: false, status: "Username taken" });
      } else if (existingEmail.rowCount === 1) {
         console.log("email taken");
         res.json({ loggedIn: false, status: "Email address taken." });
      }
   }
});

module.exports = router;
