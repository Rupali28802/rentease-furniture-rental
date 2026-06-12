// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // ensure uploads folder exists
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// // storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },

//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // file filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only JPEG, JPG, PNG allowed"), false);
//   }
// };

// // multer config
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024, // ✅ 2MB limit
//   },
// });

// export default upload;


import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir;

    if (req.baseUrl.includes("hero-banners")) {
      dir = "uploads/hero";
    }else if(req.baseUrl.includes("promo-banners")){
      dir = "uploads/promo"
    }
     else if (req.baseUrl.includes("products")) {
      dir = "uploads/product";
    } else if (req.baseUrl.includes("blogs")) {
      dir = "uploads/blog";
    } else if (req.baseUrl.includes("users")) {
      dir = "uploads/users";
    } else if (req.baseUrl.includes("categories")) {
      dir = "uploads/categories";
    } else {
      // agar koi match na ho toh error throw kar do
      return cb(new Error("Upload folder not defined for this route"), null);
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg",];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, PNG allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

export default upload;
