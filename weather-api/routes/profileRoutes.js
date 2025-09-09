const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const { userValidation } = require("../validators/joiSchemas");
const validate = require("../middlewares/validate");
const {authMiddleware} = require("../middlewares/auth-middleware");


const router = express.Router();



// Then update your routes to use authMiddleware instead of protect
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, validate(userValidation.updateProfile), updateProfile);



module.exports = router;
