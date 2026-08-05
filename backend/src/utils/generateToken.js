import jwt from "jsonwebtoken";

// GENERATE TOKEN
// Accepts either a full user document or { id, role }
export const generateToken = (user) => {
  const id = user?._id || user?.id;
  const role = user?.role;
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
