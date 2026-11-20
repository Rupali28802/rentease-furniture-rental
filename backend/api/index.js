import app from "../src/app.js";
import connectDB from "../src/config/db.js";

const allowedOrigin = "https://rentease-furniture-rental-ukdn-one.vercel.app";

export default async function handler(req, res) {
  console.log("VERCEL API HIT:", req.method, req.url);

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // IMPORTANT: preflight request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    await connectDB();

    return app(req, res);
  } catch (error) {
    console.error("Vercel server error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
