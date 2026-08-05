import Partner from "../models/Partner.js";
import Notification from "../models/Notification.js";

// SUBMIT PARTNER APPLICATION
export const applyPartner = async (req, res) => {
  try {
    const {
      businessName,
      ownerName,
      email,
      phone,
      businessType,
      city,
      message,
    } = req.body;

    if (
      !businessName ||
      !ownerName ||
      !email ||
      !phone ||
      !businessType ||
      !city
    ) {
      return res.status(400).json({
        message:
          "businessName, ownerName, email, phone, businessType and city are required",
      });
    }

    const application = await Partner.create({
      user: req.user?._id,
      businessName,
      ownerName,
      email,
      phone,
      businessType,
      city,
      message,
    });

    await Notification.create({
      user: req.user?._id,
      title: "Partner Application Submitted",
      message: `Your application for "${businessName}" has been received. We will contact you soon.`,
      type: "SYSTEM",
    });

    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY APPLICATIONS
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Partner.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL APPLICATIONS (admin)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Partner.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
