const mongoose = require("mongoose");
const User = require("./models/user"); // model already hash karega

const MONGO_URI = "mongodb+srv://arbazwasikhan:arpazi40999@cluster0.fxowetc.mongodb.net/weather_api?retryWrites=true&w=majority&appName=Cluster0";

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    const admin = new User({
      name: "arbaz",
      email: "arbaz@gmail.com",
      password: "arbaz@1",  // plain password
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin created:", admin.email);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
}

createAdmin();
