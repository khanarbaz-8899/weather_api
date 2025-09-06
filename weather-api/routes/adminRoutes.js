const express = require("express");
const { body } = require("express-validator");
const { getAllUsersForAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post(
  "/getAllUserData",
  [
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  getAllUsersForAdmin
);

module.exports = router;
