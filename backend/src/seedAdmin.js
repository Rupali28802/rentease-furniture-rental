// ✅ Seed script — Superadmin account banane ke liye
// Run: node src/seedAdmin.js
import "./config/loadEnv.js";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const seedSuperAdmin = async () => {
  try {
    await connectDB();

    const name = process.env.ADMIN_NAME || "RentEase Admin";
    const email = (
      process.env.ADMIN_EMAIL || "admin@rentease.com"
    ).toLowerCase();
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const mobile = process.env.ADMIN_MOBILE || "9876543210";
    const age = process.env.ADMIN_AGE || 25;

    const existing = await User.findOne({ email });
    if (existing) {
      // Ensure existing superadmin has correct role/adminRole
      existing.role = "admin";
      existing.adminRole = "superadmin";
      await existing.save();
      console.log(`✅ Superadmin already exists: ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ${existing.role} / ${existing.adminRole}`);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      age,
      role: "admin",
      adminRole: "superadmin",
    });

    console.log(" Superadmin created successfully!");
    console.log("-----------------------------------------");
    console.log(`   Name:     ${admin.name}`);
    console.log(`   Email:    ${admin.email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role:     ${admin.role} / ${admin.adminRole}`);
    console.log("-----------------------------------------");
    console.log("Login at: http://localhost:5173/login");
    console.log("Admin panel: http://localhost:5173/admin");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedSuperAdmin();
