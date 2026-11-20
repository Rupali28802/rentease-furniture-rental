import app from "../src/app.js";
import connectDB from "../src/config/db.js";

let isConnected = false;

export default async function handler(req, res) {
  if (req.method === "GET" && req.url === "/api/test") {
    return res.status(200).json({
      success: true,
      message: "Vercel API is working",
    });
  }

  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("Vercel server error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
