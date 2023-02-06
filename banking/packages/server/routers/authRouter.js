const express = require('express');
const router = express.Router();
const yup = require("yup");
const pool = require("../db");

const formDataLoginSchema = yup.object({
     username: yup.string()
          .required("Invalid username.")
          .min(6, "Invalid username.")
          .max(20, "Invalid username."),
     password: yup.string()
          .required("Invalid password.")
          .min(8, "Invalid password.")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invalid password."),
})

const formDataRegisterSchema = yup.object({
     username: yup.string()
          .required("Username can't be blank.")
          .min(6, "Username too short.")
          .max(20, "Username too long."),
     email: yup.string()
          .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid email format."),
     password: yup.string()
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password is too weak."),
     password_conf: yup.string()
          .oneOf([yup.ref('password'), null], "Password must match.")
})

router.post("/login", (req, res) => {
     const formData = req.body;
     formDataLoginSchema.validate(formData).catch(err => {
          res.status(422).send();
          console.log(err.errors);
     }).then(valid => {
          if (valid) {
               res.status(200).send();
               console.log("gooood");
          }
     })
     // const loginData = await pool.query("SELECT id, username FROM users u WHERE u.username=$1", [req.body.username])

     // if (loginData === 0) {
     //      console.log('hi')
     // } else {
     //      console.log('siema')
     // }
})

router.post("/register", async (req, res) => {
     const formData = req.body; 
     const existingUser = await pool.query("SELECT username FROM users WHERE username=$1", [req.body.username])
     if (existingUser.rowCount === 0) { 
          formDataRegisterSchema.validate(formData).catch(err => {
               res.status(422).send();
               console.log(req.body.email);
               console.log(err.errors);
          }).then(valid => {
               if (valid) {
                    res.status(200).send();
                    pool.query("INSERT INTO users(username,email,password) VALUES ($1,$2,$3)", [req.body.username, req.body.email, req.body.password])
                    console.log("registered");
               }
          })

          res.json({ loggedIn: true })
     } else {
          console.log("username taken")
          res.json({ loggedIn: false, status: "Username taken" });
     }
})

module.exports = router;