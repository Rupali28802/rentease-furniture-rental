import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import cors from "cors";

const corsMiddleware = cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://rentease-furniture-rental-ukdn-one.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

let isConnected = false;

export default async function handler(req, res) {
  try {
    // Handle CORS before anything else
    await new Promise((resolve, reject) => {
      corsMiddleware(req, res, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    // Handle browser preflight request
    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    // Connect MongoDB
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
