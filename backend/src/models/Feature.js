// import mongoose from "mongoose";

// const featureSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     subtitle: {
//       type: String,
//       required: true,
//     },
//     icon: {
//       type: String,
//       required: true,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Feature", featureSchema);

import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Feature", featureSchema);
