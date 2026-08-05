import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";
// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, age, email, password, mobile, role } = req.body;

    // VALIDATION
    if (!name) {
      return res.status(400).json({
        field: "name",
        message: "Name is required",
      });
    }

    if (!age) {
      return res.status(400).json({
        field: "age",
        message: "Age is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        field: "email",
        message: "Email is required",
      });
    }

    if (!mobile) {
      return res.status(400).json({
        field: "mobile",
        message: "Mobile number is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        field: "password",
        message: "Password is required",
      });
    }

    if (age && age < 18) {
      return res
        .status(400)
        .json({ field: "age", message: "Must be 18+ to register" });
    }

    if (mobile && !/^[0-9]{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ field: "mobile", message: "Invalid mobile number" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ field: "email", message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        field: "password",
        message: "Password must be 6+ characters",
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        field: "email",
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
      role: role || "user", //Default
      // Admin accounts get top-level adminRole instead of default "manager"
      adminRole: role === "admin" ? "superadmin" : undefined,
    });

    //  CREATE NOTIFICATION
    await Notification.create({
      user: user._id,

      title: "Welcome to RentEase ",

      message: "Your account created successfully",

      type: "SYSTEM",
    });

    //  SEND EMAIL
    await sendEmail({
      to: user.email,

      subject: "Welcome to RentEase",

      text: `Hello ${user.name},

Welcome to RentEase 

Your account has been created successfully.`,

      html: `
        <h2>Welcome to RentEase </h2>

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
      token: generateToken({ id: user._id, role: user.role }),
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
    if (!email) {
      return res.status(400).json({
        field: "email",
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        field: "password",
        message: "Password is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        field: "email",
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        field: "password",
        message: "Invalid credentials",
      });
    }

    const { password: _, ...safeUser } = user._doc;

    res.json({
      message: "Login successful",
      user: safeUser,
      token: generateToken(
        // { id: user._id, role: user.role }
        user,
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

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, email, mobile, age } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ field: "email", message: "Invalid email format" });
      }
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing && existing._id.toString() !== user._id.toString()) {
        return res
          .status(400)
          .json({ field: "email", message: "Email already in use" });
      }
      user.email = email.toLowerCase();
    }
    if (mobile !== undefined) {
      if (!/^[0-9]{10}$/.test(mobile)) {
        return res
          .status(400)
          .json({ field: "mobile", message: "Invalid mobile number" });
      }
      user.mobile = mobile;
    }
    if (age !== undefined) {
      if (age < 18) {
        return res.status(400).json({ field: "age", message: "Must be 18+" });
      }
      user.age = age;
    }

    await user.save();

    const { password: _, ...safeUser } = user._doc;
    res.json({ message: "Profile updated", user: safeUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be 6+ characters" });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGOUT USER
export const logoutUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id);
    // if (!user) return res.status(400).json({ message: "User not found" });

    // user.refreshToken = null;
    // await user.save();

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
    if (!user)
      return res
        .status(400)
        .json({ field: "email", message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
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
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const { password } = req.body;
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ field: "password", message: "Password must be 6+ characters" });
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
