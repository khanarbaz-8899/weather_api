const validate = (schema) => (req, res, next) => {
  console.log("📩 Incoming Data:", req.body); // 🟢 Debug log

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    console.log("❌ Joi Validation Error:", error.details); // 🟢 Debug log
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((d) => d.message), // 👈 Joi ke exact messages
    });
  }

  req.body = value;
  next();
};

module.exports = validate;
