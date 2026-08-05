import Settings from "../models/Settings.js";

// Ensure settings doc exists for a user
const getOrCreateSettings = async (userId, user) => {
  let settings = await Settings.findOne({ userId });
  if (!settings) {
    settings = await Settings.create({
      userId,
      profile: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        age: user.age,
      },
    });
  }
  return settings;
};

// GET /api/settings/:userId
export const getSettings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Only the owner can access their settings
    if (req.user._id.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const settings = await getOrCreateSettings(userId, req.user);
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/settings/:userId  -> update profile / preferences
export const updateSettings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const settings = await getOrCreateSettings(userId, req.user);

    if (req.body.profile) {
      settings.profile = { ...settings.profile, ...req.body.profile };
    }
    if (req.body.preferences) {
      settings.preferences = {
        ...settings.preferences,
        ...req.body.preferences,
      };
    }

    await settings.save();
    res.json({ message: "Settings updated", settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/settings/address
export const addSettingsAddress = async (req, res) => {
  try {
    const settings = await Settings.findOne({ userId: req.user._id });
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res
      .status(400)
      .json({ message: "Use /api/address for address management" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Payment methods
export const addPaymentMethod = async (req, res) => {
  try {
    const settings = await Settings.findOne({ userId: req.user._id });
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    if (req.body.isDefault) {
      settings.paymentMethods.forEach((m) => (m.isDefault = false));
    }
    if (settings.paymentMethods.length === 0) req.body.isDefault = true;

    settings.paymentMethods.push(req.body);
    await settings.save();
    res.status(201).json({ settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePaymentMethod = async (req, res) => {
  try {
    const settings = await Settings.findOne({ userId: req.user._id });
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    settings.paymentMethods.pull(req.params.id);
    await settings.save();
    res.json({ message: "Payment method removed", settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/settings/notifications/:userId
export const updateNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const settings = await getOrCreateSettings(userId, req.user);
    settings.notifications = { ...settings.notifications, ...req.body };
    await settings.save();
    res.json({ message: "Notifications updated", settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/settings/password  -> change password (uses auth route separately)
