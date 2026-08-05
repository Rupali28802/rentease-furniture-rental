import SupportTicket from "../models/SupportTicket.js";
import Notification from "../models/Notification.js";

// GET FAQ / help meta (public info)
export const getHelpContent = async (req, res) => {
  try {
    const faqs = [
      {
        q: "How does furniture rental work?",
        a: "You browse furniture, choose a rental tenure, pay a security deposit plus monthly rent, and we deliver the furniture to your doorstep. At the end of the tenure you can renew, buy, or return the furniture.",
      },
      {
        q: "What are the payment options?",
        a: "We accept UPI, credit/debit cards, and net banking through our secure Razorpay gateway.",
      },
      {
        q: "Is the security deposit refundable?",
        a: "Yes. The refundable deposit is returned once the furniture is picked up in good condition at the end of your rental period.",
      },
      {
        q: "How long is the delivery?",
        a: "We typically deliver within 3-5 business days depending on your location and the furniture availability.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled before confirmation/shipping. Once shipped, cancellations are subject to our return policy.",
      },
      {
        q: "What if the furniture gets damaged?",
        a: "Minor wear and tear is expected. For significant damage, our team will assess and apply relevant charges from the refundable deposit.",
      },
    ];

    res.json({
      faqs,
      contact: {
        email: "support@rentease.com",
        phone: "+91 98765 43210",
        hours: "Mon - Sat, 9:00 AM - 7:00 PM",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SUBMIT CONTACT / SUPPORT TICKET
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: "name, email, subject and message are required" });
    }

    const ticket = await SupportTicket.create({
      user: req.user?._id,
      name,
      email,
      subject,
      message,
    });

    // Notify admins (via notification for the user too)
    await Notification.create({
      user: req.user?._id,
      title: "Support Ticket Submitted",
      message: `Your query "${subject}" has been received. We will get back to you soon.`,
      type: "SYSTEM",
    });

    res.status(201).json({ message: "Query submitted successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY TICKETS
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TICKETS (admin)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
