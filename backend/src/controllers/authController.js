import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";
// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, age, email, password, mobile,role } = req.body;

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (age && age < 18) {
      return res.status(400).json({ message: "Must be 18+ to register" });
    }

    if (mobile && !/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be 6+ characters",
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER
    const user = await User.create({
      name,
      age,
      email: email.toLowerCase(),
      password: hashedPassword,
      mobile,
      role:role|| "user", // 🔒 force user
    });

    // 🔔 CREATE NOTIFICATION
    await Notification.create({
      user: user._id,

      title: "Welcome to RentEase 🎉",

      message: "Your account created successfully",

      type: "SYSTEM",
    });

     // 📧 SEND EMAIL
    await sendEmail({
      to: user.email,

      subject: "Welcome to RentEase",

      text: `Hello ${user.name},

Welcome to RentEase 🚀

Your account has been created successfully.`,

      html: `
        <h2>Welcome to RentEase 🚀</h2>

        <p>Hello ${user.name},</p>

        <p>Your account has been created successfully.</p>
   <p>Enjoy renting furniture & appliances with ease.</p>
      `,
    });

    // REMOVE PASSWORD
    const { password: _, ...safeUser } = user._doc;

    res.status(201).json({
      message: "User registered successfully",
      user: safeUser,
      token: generateToken(
      //   {
      //   id: user._id,
      //   role: user.role,
        
      // }
      user
    ),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const { password: _, ...safeUser } = user._doc;

    res.json({
      message: "Login successful",
      user: safeUser,
      token: generateToken(
      //   {
      //   id: user._id,
      //   role: user.role,
      // }
      user
    ),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//  LOGOUT USER
export const logoutUser = async (req, res) => {
  try {
    // Frontend se refreshToken ya accessToken bhejna hoga
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Agar aap refresh token use kar rahe ho toh DB se delete karo
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Refresh token ko null kar dena (invalidate)
    user.refreshToken = null;
    await user.save();

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `Click here to reset your password: ${resetUrl}`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be 6+ characters" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};