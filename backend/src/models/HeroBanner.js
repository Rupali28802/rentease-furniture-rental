import mongoose from "mongoose";

const heroBannerSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  buttonText: String,
  link: String,
  imageUrl: String, 
});

export default mongoose.model("HeroBanner", heroBannerSchema);
