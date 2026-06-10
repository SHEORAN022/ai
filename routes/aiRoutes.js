
// // const express =
// //   require("express");

// // const router =
// //   express.Router();

// // const upload =
// //   require("../middleware/upload");

// // const {
// //   generateFashionModel,
// // } = require(
// //   "../controllers/aiController"
// // );

// // // ======================================
// // // GENERATE AI MODEL
// // // ======================================

// // router.post(
// //   "/generate",

// //   upload.array(
// //     "images",
// //     5
// //   ),

// //   generateFashionModel
// // );

// // module.exports =
// //   router;

// // // const express =
// // //   require("express");

// // // const router =
// // //   express.Router();

// // // const upload =
// // //   require("../middleware/upload");

// // // const {
// // //   generateFashionModel,
// // // } = require(
// // //   "../controllers/aiController"
// // // );

// // // router.post(
// // //   "/generate",

// // //   upload.array(
// // //     "images",
// // //     5
// // //   ),

// // //   generateFashionModel
// // // );

// // // module.exports =
// // //   router;
// const Product = require("../models/Product");
// const cloudinary = require("../config/cloudinary");
// const { generatePose } = require("../services/replicateService");
// const fs = require("fs");

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// exports.generateFashionModel = async (req, res) => {
//   try {
//     if (!req.files || !req.files.length) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload product images",
//       });
//     }

//     const gender = req.body.gender === "male" ? "Male" : req.body.gender === "kid" ? "Kids" : "Female";
//     const background = req.body.background === "lightgrey" ? "LightGrey" : req.body.background === "auto" ? "Auto" : "Cream";

//     // Upload original images
//     const uploadedImages = [];
//     for (const file of req.files) {
//       const uploaded = await cloudinary.uploader.upload(file.path, {
//         folder: "fashion-ai/original",
//       });
//       uploadedImages.push(uploaded.secure_url);
//       try { fs.unlinkSync(file.path); } catch (err) {}
//     }

//     const clothImageUrl = uploadedImages[0];
//     const seed = Math.floor(Math.random() * 999999);

//     const product = await Product.create({
//       originalImages: uploadedImages,
//       generatedPoses: [],
//       gender: gender,
//       backgroundType: background,
//       status: "Processing",
//       aiModelSeed: seed,
//     });

//     console.log("========================================");
//     console.log("🤖 AI GENERATION STARTED");
//     console.log("👕 Clothing:", clothImageUrl);
//     console.log("👤 Gender:", gender);
//     console.log("🎨 Background:", background);
//     console.log("========================================");

//     const poses = ["Front View", "Left Angle View", "Right Angle View", "Back View"];
//     const generatedPoses = [];

//     for (let i = 0; i < poses.length; i++) {
//       const pose = poses[i];
//       console.log(`\n📸 [${i + 1}/4] Generating ${pose}...`);
      
//       if (i > 0) await delay(5000);
      
//       try {
//         const generatedImage = await generatePose(clothImageUrl, pose, gender, background, seed);
        
//         let finalImageUrl = generatedImage;
//         try {
//           const cloudinaryUpload = await cloudinary.uploader.upload(generatedImage, {
//             folder: "fashion-ai/generated",
//           });
//           finalImageUrl = cloudinaryUpload.secure_url;
//           console.log(`✅ ${pose} uploaded to Cloudinary`);
//         } catch (uploadError) {
//           console.log("Cloudinary upload failed, using base64");
//         }
        
//         generatedPoses.push({ pose: pose, image: finalImageUrl });
//         console.log(`✅ ${pose} generated successfully!`);
//       } catch (error) {
//         console.error(`❌ Failed ${pose}:`, error.message);
//       }
//     }

//     product.generatedPoses = generatedPoses;
//     product.status = generatedPoses.length === 4 ? "Completed" : "Failed";
//     await product.save();

//     console.log("\n========================================");
//     console.log(`✅ AI GENERATION COMPLETED! Generated ${generatedPoses.length} out of 4 poses`);
//     console.log("========================================\n");

//     return res.status(200).json({
//       success: true,
//       message: "AI Fashion Generated Successfully",
//       productId: product._id,
//       originalImages: uploadedImages,
//       generatedPoses: generatedPoses,
//     });
//   } catch (error) {
//     console.error("AI ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "AI Generation Failed",
//       error: error.message,
//     });
//   }
// };
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { generateFashionModel } = require("../controllers/aiController");

router.post("/generate", upload.array("images", 5), generateFashionModel);

module.exports = router;