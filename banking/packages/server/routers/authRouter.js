const express = require('express');
const router = express.Router();
const yup = require("yup");

const formDataSchema = yup.object({
     username: yup.string()
          .required("Invalid username.")
          .min(6, "Invalid username.")
          .max(20, "Invalid username."),
     password: yup.string()
          .required("Invalid password.")
          .min(8, "Invalid password.")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invalid password."),
})

router.post("/login", (req, res) => {
     const formData = req.body;
     formDataSchema.validate(formData).catch(err => {
          res.status(422).send();
          console.log(err.errors);
     }).then(valid => {
          if (valid) {
               console.log("gooood");
          }
     })
})

module.exports = router;