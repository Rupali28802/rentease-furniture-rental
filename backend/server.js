// ✅ FIRST import: load environment variables before anything else.
// Side-effect imports execute in source order in ES modules, so this
// runs before `app.js` (which imports razorpay.js) is evaluated.
// This guarantees RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are available
// when the Razorpay client is instantiated.
import "./src/config/loadEnv.js";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
