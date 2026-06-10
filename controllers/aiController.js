

// // // // // // const Product =
// // // // // //   require("../models/Product");

// // // // // // const cloudinary =
// // // // // //   require("../config/cloudinary");

// // // // // // const {
// // // // // //   generatePose,
// // // // // // } = require(
// // // // // //   "../services/replicateService"
// // // // // // );

// // // // // // // ==============================
// // // // // // // DELAY FUNCTION
// // // // // // // ==============================

// // // // // // const delay = (ms) =>
// // // // // //   new Promise((resolve) =>
// // // // // //     setTimeout(resolve, ms)
// // // // // //   );

// // // // // // // ==============================
// // // // // // // GENERATE AI FASHION MODEL
// // // // // // // ==============================

// // // // // // exports.generateFashionModel =
// // // // // //   async (req, res) => {
// // // // // //     try {
// // // // // //       // ==============================
// // // // // //       // CHECK FILES
// // // // // //       // ==============================

// // // // // //       if (
// // // // // //         !req.files ||
// // // // // //         !req.files.length
// // // // // //       ) {
// // // // // //         return res
// // // // // //           .status(400)
// // // // // //           .json({
// // // // // //             success: false,
// // // // // //             message:
// // // // // //               "Please upload product images",
// // // // // //           });
// // // // // //       }

// // // // // //       // ==============================
// // // // // //       // FORMAT GENDER
// // // // // //       // ==============================

// // // // // //       const gender =
// // // // // //         req.body.gender ===
// // // // // //         "male"
// // // // // //           ? "Male"
// // // // // //           : req.body.gender ===
// // // // // //             "kid"
// // // // // //           ? "Kids"
// // // // // //           : "Female";

// // // // // //       // ==============================
// // // // // //       // FORMAT BACKGROUND
// // // // // //       // ==============================

// // // // // //       const background =
// // // // // //         req.body.background ===
// // // // // //         "lightgrey"
// // // // // //           ? "LightGrey"
// // // // // //           : req.body
// // // // // //               .background ===
// // // // // //             "auto"
// // // // // //           ? "Auto"
// // // // // //           : "Cream";

// // // // // //       // ==============================
// // // // // //       // UPLOAD ORIGINAL IMAGES
// // // // // //       // ==============================

// // // // // //       const uploadedImages =
// // // // // //         [];

// // // // // //       for (const file of req.files) {
// // // // // //         const uploaded =
// // // // // //           await cloudinary.uploader.upload(
// // // // // //             file.path,
// // // // // //             {
// // // // // //               folder:
// // // // // //                 "fashion-ai/original",
// // // // // //             }
// // // // // //           );

// // // // // //         uploadedImages.push(
// // // // // //           uploaded.secure_url
// // // // // //         );
// // // // // //       }

// // // // // //       // ==============================
// // // // // //       // SAME MODEL SEED
// // // // // //       // ==============================

// // // // // //       const seed =
// // // // // //         Math.floor(
// // // // // //           Math.random() *
// // // // // //             999999
// // // // // //         );

// // // // // //       // ==============================
// // // // // //       // CREATE PRODUCT
// // // // // //       // ==============================

// // // // // //       const product =
// // // // // //         await Product.create({
// // // // // //           originalImages:
// // // // // //             uploadedImages,

// // // // // //           generatedPoses:
// // // // // //             [],

// // // // // //           gender,

// // // // // //           backgroundType:
// // // // // //             background,

// // // // // //           status:
// // // // // //             "Processing",

// // // // // //           aiModelSeed:
// // // // // //             seed,
// // // // // //         });

// // // // // //       console.log(
// // // // // //         "AI GENERATION STARTED"
// // // // // //       );

// // // // // //       // ==============================
// // // // // //       // POSES
// // // // // //       // ==============================

// // // // // //       const poses = [
// // // // // //         "Front View",
// // // // // //         "Left Angle View",
// // // // // //         "Right Angle View",
// // // // // //         "Back View",
// // // // // //       ];

// // // // // //       const generatedPoses =
// // // // // //         [];
// // // // // // let modelImage =
// // // // // // "https://raw.githubusercontent.com/yisol/IDM-VTON/main/example/human/men/model_1.png";

// // // // // // if (gender === "Female") {

// // // // // //   modelImage =
// // // // // // "https://raw.githubusercontent.com/yisol/IDM-VTON/main/example/human/women/model_1.png";

// // // // // // }
// // // // // //       // ==============================
// // // // // //       // GENERATE POSES
// // // // // //       // ==============================
// // // // // // for (const pose of poses) {

// // // // // //   console.log(
// // // // // //     `Generating ${pose}`
// // // // // //   );

// // // // // //   await delay(7000);

// // // // // //   const generatedImage =
// // // // // //     await generatePose(
// // // // // //       modelImage,
// // // // // //       uploadedImages[0]
// // // // // //     );

// // // // // //   generatedPoses.push({
// // // // // //     pose,
// // // // // //     image:
// // // // // //       generatedImage,
// // // // // //   });
// // // // // // }
// // // // // //       // for (const pose of poses) {
// // // // // //       //   console.log(
// // // // // //       //     `Generating ${pose}`
// // // // // //       //   );

// // // // // //       //   // ==========================
// // // // // //       //   // RATE LIMIT FIX
// // // // // //       //   // ==========================

// // // // // //       //   await delay(7000);
        

// // // // // //       //   const generatedImage =
// // // // // //       //     await generatePose(
// // // // // //       //       uploadedImages[0],
// // // // // //       //       gender,
// // // // // //       //       pose,
// // // // // //       //       background,
// // // // // //       //       seed
// // // // // //       //     );

// // // // // //       //   generatedPoses.push({
// // // // // //       //     pose,
// // // // // //       //     image:
// // // // // //       //       generatedImage,
// // // // // //       //   });
// // // // // //       // }

// // // // // //       // ==============================
// // // // // //       // SAVE GENERATED IMAGES
// // // // // //       // ==============================

// // // // // //       product.generatedPoses =
// // // // // //         generatedPoses;

// // // // // //       product.status =
// // // // // //         "Completed";

// // // // // //       await product.save();

// // // // // //       console.log(
// // // // // //         "AI GENERATION COMPLETED"
// // // // // //       );

// // // // // //       // ==============================
// // // // // //       // SUCCESS RESPONSE
// // // // // //       // ==============================

// // // // // //       return res.status(200).json({
// // // // // //         success: true,

// // // // // //         message:
// // // // // //           "AI Fashion Generated Successfully",

// // // // // //         productId:
// // // // // //           product._id,

// // // // // //         gender,

// // // // // //         background,

// // // // // //         originalImages:
// // // // // //           uploadedImages,

// // // // // //         generatedPoses,

// // // // // //         totalPoses:
// // // // // //           generatedPoses.length,

// // // // // //         status:
// // // // // //           product.status,
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.log(
// // // // // //         "AI ERROR:",
// // // // // //         error
// // // // // //       );

// // // // // //       return res.status(500).json({
// // // // // //         success: false,

// // // // // //         message:
// // // // // //           "AI Generation Failed",

// // // // // //         error:
// // // // // //           error.message,
// // // // // //       });
// // // // // //     }
// // // // // //   };
// // // // // const Product = require("../models/Product");
// // // // // const cloudinary = require("../config/cloudinary");
// // // // // const { generatePose } = require("../services/replicateService");
// // // // // const fs = require("fs");

// // // // // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // // // // exports.generateFashionModel = async (req, res) => {
// // // // //   try {
// // // // //     if (!req.files || !req.files.length) {
// // // // //       return res.status(400).json({
// // // // //         success: false,
// // // // //         message: "Please upload product images",
// // // // //       });
// // // // //     }

// // // // //     const gender = req.body.gender === "male" ? "Male" : req.body.gender === "kid" ? "Kids" : "Female";
// // // // //     const background = req.body.background === "lightgrey" ? "LightGrey" : req.body.background === "auto" ? "Auto" : "Cream";

// // // // //     // Upload original images
// // // // //     const uploadedImages = [];
// // // // //     for (const file of req.files) {
// // // // //       const uploaded = await cloudinary.uploader.upload(file.path, {
// // // // //         folder: "fashion-ai/original",
// // // // //       });
// // // // //       uploadedImages.push(uploaded.secure_url);
// // // // //       try { fs.unlinkSync(file.path); } catch (err) {}
// // // // //     }

// // // // //     const clothImageUrl = uploadedImages[0];
// // // // //     const seed = Math.floor(Math.random() * 999999);

// // // // //     const product = await Product.create({
// // // // //       originalImages: uploadedImages,
// // // // //       generatedPoses: [],
// // // // //       gender: gender,
// // // // //       backgroundType: background,
// // // // //       status: "Processing",
// // // // //       aiModelSeed: seed,
// // // // //     });

// // // // //     console.log("========================================");
// // // // //     console.log("🤖 AI GENERATION STARTED");
// // // // //     console.log("👕 Clothing:", clothImageUrl);
// // // // //     console.log("👤 Gender:", gender);
// // // // //     console.log("🎨 Background:", background);
// // // // //     console.log("========================================");

// // // // //     const poses = ["Front View", "Left Angle View", "Right Angle View", "Back View"];
// // // // //     const generatedPoses = [];

// // // // //     for (let i = 0; i < poses.length; i++) {
// // // // //       const pose = poses[i];
// // // // //       console.log(`\n📸 [${i + 1}/4] Generating ${pose}...`);
      
// // // // //       if (i > 0) await delay(5000);
      
// // // // //       try {
// // // // //         const generatedImage = await generatePose(clothImageUrl, pose, gender, background, seed);
        
// // // // //         // Upload to cloudinary
// // // // //         let finalImageUrl = generatedImage;
// // // // //         try {
// // // // //           const cloudinaryUpload = await cloudinary.uploader.upload(generatedImage, {
// // // // //             folder: "fashion-ai/generated",
// // // // //           });
// // // // //           finalImageUrl = cloudinaryUpload.secure_url;
// // // // //           console.log(`✅ ${pose} uploaded to Cloudinary`);
// // // // //         } catch (uploadError) {
// // // // //           console.log("Cloudinary upload failed, using base64");
// // // // //         }
        
// // // // //         generatedPoses.push({ pose: pose, image: finalImageUrl });
// // // // //         console.log(`✅ ${pose} generated successfully!`);
// // // // //       } catch (error) {
// // // // //         console.error(`❌ Failed ${pose}:`, error.message);
// // // // //       }
// // // // //     }

// // // // //     product.generatedPoses = generatedPoses;
// // // // //     product.status = generatedPoses.length === 4 ? "Completed" : "Partial";
// // // // //     await product.save();

// // // // //     console.log("\n========================================");
// // // // //     console.log(`✅ AI GENERATION COMPLETED! Generated ${generatedPoses.length} out of 4 poses`);
// // // // //     console.log("========================================\n");

// // // // //     return res.status(200).json({
// // // // //       success: true,
// // // // //       message: "AI Fashion Generated Successfully",
// // // // //       productId: product._id,
// // // // //       originalImages: uploadedImages,
// // // // //       generatedPoses: generatedPoses,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("AI ERROR:", error);
// // // // //     return res.status(500).json({
// // // // //       success: false,
// // // // //       message: "AI Generation Failed",
// // // // //       error: error.message,
// // // // //     });
// // // // //   }
// // // // // };



// // // // const Product = require("../models/Product");
// // // // const cloudinary = require("../config/cloudinary");
// // // // const fs = require("fs");

// // // // exports.generateFashionModel = async (req, res) => {
// // // //   try {
// // // //     console.log("Request received");
// // // //     console.log("Files:", req.files);
// // // //     console.log("Body:", req.body);
    
// // // //     if (!req.files || !req.files.length) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "Please upload product images",
// // // //       });
// // // //     }

// // // //     const gender = req.body.gender === "male" ? "Male" : req.body.gender === "kid" ? "Kids" : "Female";
// // // //     const background = req.body.background === "lightgrey" ? "LightGrey" : req.body.background === "auto" ? "Auto" : "Cream";

// // // //     // Upload original images to Cloudinary
// // // //     const uploadedImages = [];
// // // //     for (const file of req.files) {
// // // //       const uploaded = await cloudinary.uploader.upload(file.path, {
// // // //         folder: "fashion-ai/original",
// // // //       });
// // // //       uploadedImages.push(uploaded.secure_url);
// // // //       try { fs.unlinkSync(file.path); } catch (err) {}
// // // //     }

// // // //     // Create demo poses (since Replicate API is giving issues)
// // // //     const poses = ["Front View", "Left Angle View", "Right Angle View", "Back View"];
// // // //     const generatedPoses = [];
    
// // // //     // Use a placeholder image
// // // //     const placeholderImage = "https://placehold.co/1024x1024/6366f1/white?text=AI+Generated+Model";
    
// // // //     for (let i = 0; i < poses.length; i++) {
// // // //       generatedPoses.push({
// // // //         pose: poses[i],
// // // //         image: placeholderImage
// // // //       });
// // // //     }

// // // //     const product = await Product.create({
// // // //       originalImages: uploadedImages,
// // // //       generatedPoses: generatedPoses,
// // // //       gender: gender,
// // // //       backgroundType: background,
// // // //       status: "Completed",
// // // //       aiModelSeed: Math.floor(Math.random() * 999999),
// // // //     });

// // // //     console.log("Product saved:", product._id);

// // // //     return res.status(200).json({
// // // //       success: true,
// // // //       message: "AI Fashion Generated Successfully",
// // // //       productId: product._id,
// // // //       originalImages: uploadedImages,
// // // //       generatedPoses: generatedPoses,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("AI ERROR:", error);
// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       message: "AI Generation Failed",
// // // //       error: error.message,
// // // //     });
// // // //   }
// // // // };

// // // const Product = require("../models/Product");
// // // const cloudinary = require("../config/cloudinary");
// // // const fs = require("fs");
// // // const axios = require("axios");

// // // const MODEL_IMAGES = {
// // //   female: {
// // //     front: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
// // //     left:  "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
// // //     right: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
// // //     back:  "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
// // //   },
// // //   male: {
// // //     front: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
// // //     left:  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
// // //     right: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
// // //     back:  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
// // //   },
// // //   kid: {
// // //     front: "https://images.pexels.com/photos/2253871/pexels-photo-2253871.jpeg",
// // //     left:  "https://images.pexels.com/photos/2253871/pexels-photo-2253871.jpeg",
// // //     right: "https://images.pexels.com/photos/2253871/pexels-photo-2253871.jpeg",
// // //     back:  "https://images.pexels.com/photos/2253871/pexels-photo-2253871.jpeg",
// // //   },
// // // };

// // // // Poll Replicate prediction until done
// // // async function pollReplicate(predictionUrl) {
// // //   const maxAttempts = 60; // 60 x 5s = 5 minutes max
// // //   for (let i = 0; i < maxAttempts; i++) {
// // //     await new Promise((r) => setTimeout(r, 5000));
// // //     const { data } = await axios.get(predictionUrl, {
// // //       headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
// // //     });
// // //     console.log(`  Poll ${i + 1}: ${data.status}`);
// // //     if (data.status === "succeeded") return data.output;
// // //     if (data.status === "failed") throw new Error("Replicate failed: " + (data.error || "unknown"));
// // //   }
// // //   throw new Error("Replicate polling timeout");
// // // }

// // // // Run IDM-VTON virtual try-on
// // // async function runTryOn(modelImageUrl, garmentImageUrl) {
// // //   console.log("  → Calling Replicate IDM-VTON...");

// // //   const response = await axios.post(
// // //     "https://api.replicate.com/v1/predictions",
// // //     {
// // //       version: "c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
// // //       input: {
// // //         human_img:       modelImageUrl,
// // //         garm_img:        garmentImageUrl,
// // //         garment_des:     "clothing garment",
// // //         is_checked:      true,
// // //         is_checked_crop: false,
// // //         denoise_steps:   30,
// // //         seed:            42,
// // //       },
// // //     },
// // //     {
// // //       headers: {
// // //         Authorization:  `Token ${process.env.REPLICATE_API_TOKEN}`,
// // //         "Content-Type": "application/json",
// // //       },
// // //     }
// // //   );

// // //   const data = response.data;
// // //   console.log("  → Prediction ID:", data.id, "| Status:", data.status);

// // //   if (!data?.urls?.get) throw new Error("No polling URL from Replicate: " + JSON.stringify(data));

// // //   const output = await pollReplicate(data.urls.get);
// // //   const resultUrl = Array.isArray(output) ? output[0] : output;
// // //   if (!resultUrl) throw new Error("Replicate returned empty output");
// // //   return resultUrl;
// // // }

// // // exports.generateFashionModel = async (req, res) => {
// // //   console.log("\n====== generateFashionModel START ======");

// // //   try {
// // //     // 1. Validate
// // //     if (!req.files || !req.files.length) {
// // //       return res.status(400).json({ success: false, message: "Please upload a dress image" });
// // //     }
// // //     if (!process.env.REPLICATE_API_TOKEN) {
// // //       return res.status(500).json({ success: false, message: "REPLICATE_API_TOKEN missing in .env" });
// // //     }

// // //     const genderKey  = ["female", "male", "kid"].includes(req.body.gender) ? req.body.gender : "female";
// // //     const background = req.body.background || "cream";
// // //     console.log("Gender:", genderKey, "| Background:", background);

// // //     // 2. Upload garment to Cloudinary
// // //     const uploadedImages = [];
// // //     for (const file of req.files) {
// // //       console.log("Uploading to Cloudinary:", file.originalname);
// // //       const uploaded = await cloudinary.uploader.upload(file.path, {
// // //         folder: "fashion-ai/original",
// // //         resource_type: "image",
// // //       });
// // //       uploadedImages.push(uploaded.secure_url);
// // //       try { fs.unlinkSync(file.path); } catch (_) {}
// // //     }
// // //     const garmentUrl = uploadedImages[0];
// // //     console.log("Garment URL:", garmentUrl);

// // //     // 3. Generate 4 poses
// // //     const poses = [
// // //       { key: "front", name: "Front View" },
// // //       { key: "left",  name: "Left Angle View" },
// // //       { key: "right", name: "Right Angle View" },
// // //       { key: "back",  name: "Back View" },
// // //     ];

// // //     const modelUrls = MODEL_IMAGES[genderKey];
// // //     const generatedPoses = [];

// // //     for (const pose of poses) {
// // //       console.log(`\n[${pose.name}]`);
// // //       try {
// // //         const resultUrl = await runTryOn(modelUrls[pose.key], garmentUrl);
// // //         generatedPoses.push({ pose: pose.name, image: resultUrl });
// // //         console.log(`  ✓ Done: ${resultUrl}`);
// // //       } catch (err) {
// // //         console.error(`  ✗ Failed: ${err.message}`);
// // //         // Fallback: show garment image so UI doesn't break
// // //         generatedPoses.push({ pose: pose.name, image: garmentUrl });
// // //       }
// // //     }

// // //     // 4. Save to DB
// // //     const product = await Product.create({
// // //       originalImages: uploadedImages,
// // //       generatedPoses,
// // //       gender:         genderKey.charAt(0).toUpperCase() + genderKey.slice(1),
// // //       backgroundType: background.charAt(0).toUpperCase() + background.slice(1),
// // //       status:         "Completed",
// // //       aiModelSeed:    Math.floor(Math.random() * 999999),
// // //     });
// // //     console.log("\nProduct saved:", product._id);
// // //     console.log("====== generateFashionModel END ======\n");

// // //     return res.status(200).json({
// // //       success:        true,
// // //       message:        "AI Fashion Generated Successfully",
// // //       productId:      product._id,
// // //       originalImages: uploadedImages,
// // //       generatedPoses,
// // //     });

// // //   } catch (error) {
// // //     console.error("====== FATAL ERROR ======\n", error.message);
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: "AI Generation Failed",
// // //       error:   error.message,
// // //     });
// // //   }
// // // };

// // const Product = require("../models/Product");
// // const cloudinary = require("../config/cloudinary");
// // const fs = require("fs");
// // const axios = require("axios");

// // // ─────────────────────────────────────────────────────────────────────────────
// // //  MODEL IMAGES — IDM-VTON ke official test dataset se liye gaye images
// // //  Yeh images specifically virtual try-on ke liye test ki gayi hain
// // //  Source: huggingface.co/datasets/yisol/IDM-VTON
// // // ─────────────────────────────────────────────────────────────────────────────
// // const MODEL_IMAGES = {
// //   female: {
// //     front: "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00891_00.jpg",
// //     left:  "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00907_00.jpg",
// //     right: "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00916_00.jpg",
// //     back:  "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00925_00.jpg",
// //   },
// //   male: {
// //     front: "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00001_00.jpg",
// //     left:  "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00013_00.jpg",
// //     right: "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00025_00.jpg",
// //     back:  "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00037_00.jpg",
// //   },
// //   kid: {
// //     front: "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00875_00.jpg",
// //     left:  "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00880_00.jpg",
// //     right: "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00885_00.jpg",
// //     back:  "https://huggingface.co/datasets/yisol/IDM-VTON/resolve/main/test/image/00890_00.jpg",
// //   },
// // };

// // // ─────────────────────────────────────────────────────────────────────────────
// // //  Replicate Polling
// // // ─────────────────────────────────────────────────────────────────────────────
// // async function pollReplicate(predictionUrl) {
// //   const maxAttempts = 80;
// //   for (let i = 0; i < maxAttempts; i++) {
// //     await new Promise((r) => setTimeout(r, 5000));
// //     const { data } = await axios.get(predictionUrl, {
// //       headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
// //     });
// //     console.log(`  Poll ${i + 1}: ${data.status}`);
// //     if (data.status === "succeeded") return data.output;
// //     if (data.status === "failed")
// //       throw new Error("Replicate failed: " + (data.error || "unknown"));
// //   }
// //   throw new Error("Timeout: 6 minutes exceed ho gaye");
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // //  IDM-VTON Try-On Call
// // // ─────────────────────────────────────────────────────────────────────────────
// // async function runTryOn(modelImageUrl, garmentImageUrl, garmentDesc) {
// //   console.log("  → IDM-VTON call kar raha hai...");

// //   const response = await axios.post(
// //     "https://api.replicate.com/v1/predictions",
// //     {
// //       version: "c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
// //       input: {
// //         human_img:       modelImageUrl,
// //         garm_img:        garmentImageUrl,
// //         garment_des:     garmentDesc,
// //         is_checked:      true,
// //         is_checked_crop: true,
// //         denoise_steps:   40,
// //         seed:            42,
// //       },
// //     },
// //     {
// //       headers: {
// //         Authorization:  `Token ${process.env.REPLICATE_API_TOKEN}`,
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );

// //   const data = response.data;
// //   console.log("  Prediction ID:", data.id, "| Status:", data.status);

// //   if (!data?.urls?.get)
// //     throw new Error("Polling URL nahi mila: " + JSON.stringify(data));

// //   const output = await pollReplicate(data.urls.get);
// //   const resultUrl = Array.isArray(output) ? output[0] : output;
// //   if (!resultUrl) throw new Error("Replicate ne empty output diya");
// //   return resultUrl;
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // //  Garment Description Auto-Detect
// // // ─────────────────────────────────────────────────────────────────────────────
// // function buildGarmentDesc(filename = "", bodyDesc = "") {
// //   if (bodyDesc && bodyDesc.trim().length > 3) return bodyDesc.trim();
// //   const f = filename.toLowerCase();
// //   if (f.includes("kurta"))                                         return "kurta, traditional Indian upper body ethnic wear";
// //   if (f.includes("shirt") || f.includes("tshirt"))                return "shirt, upper body casual clothing";
// //   if (f.includes("dress"))                                         return "dress, full body women clothing";
// //   if (f.includes("saree") || f.includes("sari"))                  return "saree, traditional Indian women full body clothing";
// //   if (f.includes("jacket") || f.includes("coat"))                 return "jacket, upper body outerwear";
// //   if (f.includes("pant") || f.includes("jeans") || f.includes("trouser")) return "pants, lower body clothing";
// //   if (f.includes("skirt"))                                         return "skirt, lower body clothing";
// //   if (f.includes("blouse"))                                        return "blouse, upper body women clothing";
// //   if (f.includes("hoodie") || f.includes("sweat"))                return "hoodie, upper body casual wear";
// //   return "upper body clothing garment";
// // }

// // // ─────────────────────────────────────────────────────────────────────────────
// // //  MAIN CONTROLLER
// // // ─────────────────────────────────────────────────────────────────────────────
// // exports.generateFashionModel = async (req, res) => {
// //   console.log("\n====== generateFashionModel START ======");

// //   try {
// //     // 1. Validate
// //     if (!req.files || !req.files.length) {
// //       return res.status(400).json({ success: false, message: "Garment ka image upload karein" });
// //     }
// //     if (!process.env.REPLICATE_API_TOKEN) {
// //       return res.status(500).json({ success: false, message: ".env mein REPLICATE_API_TOKEN nahi hai" });
// //     }

// //     const genderKey  = ["female", "male", "kid"].includes(req.body.gender) ? req.body.gender : "female";
// //     const background = req.body.background || "cream";
// //     const bodyDesc   = req.body.garment_desc || "";
// //     console.log("Gender:", genderKey, "| Background:", background);

// //     // 2. Garment Cloudinary pe upload
// //     const uploadedImages = [];
// //     for (const file of req.files) {
// //       console.log("Cloudinary upload:", file.originalname);
// //       const uploaded = await cloudinary.uploader.upload(file.path, {
// //         folder:        "fashion-ai/original",
// //         resource_type: "image",
// //       });
// //       uploadedImages.push(uploaded.secure_url);
// //       try { fs.unlinkSync(file.path); } catch (_) {}
// //     }

// //     const garmentUrl  = uploadedImages[0];
// //     const garmentDesc = buildGarmentDesc(req.files[0]?.originalname || "", bodyDesc);
// //     console.log("Garment URL:", garmentUrl);
// //     console.log("Garment Desc:", garmentDesc);

// //     // 3. 4 Poses generate karo
// //     const poses = [
// //       { key: "front", name: "Front View"       },
// //       { key: "left",  name: "Left Angle View"  },
// //       { key: "right", name: "Right Angle View" },
// //       { key: "back",  name: "Back View"        },
// //     ];

// //     const modelUrls      = MODEL_IMAGES[genderKey];
// //     const generatedPoses = [];
// //     let   successCount   = 0;

// //     for (const pose of poses) {
// //       console.log(`\n━━━ [${pose.name}] ━━━`);
// //       try {
// //         const resultUrl = await runTryOn(modelUrls[pose.key], garmentUrl, garmentDesc);
// //         generatedPoses.push({ pose: pose.name, image: resultUrl, success: true });
// //         successCount++;
// //         console.log(`  ✅ Done: ${resultUrl}`);
// //       } catch (err) {
// //         console.error(`  ❌ Failed (${pose.name}): ${err.message}`);
// //         generatedPoses.push({ pose: pose.name, image: garmentUrl, success: false, error: err.message });
// //       }
// //     }

// //     // 4. DB mein save
// //     const product = await Product.create({
// //       originalImages: uploadedImages,
// //       generatedPoses,
// //       gender:         genderKey.charAt(0).toUpperCase() + genderKey.slice(1),
// //       backgroundType: background.charAt(0).toUpperCase() + background.slice(1),
// //       status:         successCount > 0 ? "Completed" : "Failed",
// //       aiModelSeed:    Math.floor(Math.random() * 999999),
// //     });

// //     console.log(`\nProduct saved: ${product._id} | ${successCount}/4 poses success`);
// //     console.log("====== generateFashionModel END ======\n");

// //     return res.status(200).json({
// //       success:        true,
// //       message:        `${successCount}/4 poses successfully generate hue!`,
// //       productId:      product._id,
// //       originalImages: uploadedImages,
// //       generatedPoses,
// //     });

// //   } catch (error) {
// //     console.error("====== FATAL ERROR ======\n", error.message);
// //     return res.status(500).json({
// //       success: false,
// //       message: "AI Generation fail ho gayi",
// //       error:   error.message,
// //     });
// //   }
// // };


// const Product    = require('../models/Product');
// const cloudinary = require('../config/cloudinary');
// const fs         = require('fs');
// const axios      = require('axios');

// // ─────────────────────────────────────────────────────────────────────────────
// //  MODEL IMAGES
// //  Pehle "node uploadModelImages.js" chalao — woh Cloudinary pe upload karega
// //  aur .env ke liye lines dega. Uske baad yeh sab env vars se aayenge.
// //
// //  Agar .env mein set nahi hain toh controller error return karega (no bad fallback).
// // ─────────────────────────────────────────────────────────────────────────────
// const MODEL_IMAGES = {
//   female: {
//     front: process.env.MODEL_FEMALE_FRONT,
//     left:  process.env.MODEL_FEMALE_LEFT,
//     right: process.env.MODEL_FEMALE_RIGHT,
//     back:  process.env.MODEL_FEMALE_BACK,
//   },
//   male: {
//     front: process.env.MODEL_MALE_FRONT,
//     left:  process.env.MODEL_MALE_LEFT,
//     right: process.env.MODEL_MALE_RIGHT,
//     back:  process.env.MODEL_MALE_BACK,
//   },
//   kid: {
//     front: process.env.MODEL_KID_FRONT,
//     left:  process.env.MODEL_KID_LEFT,
//     right: process.env.MODEL_KID_RIGHT,
//     back:  process.env.MODEL_KID_BACK,
//   },
// };

// const POSE_SEEDS  = { front: 42, left: 123, right: 456, back: 789 };
// const BG_TYPE_MAP = { cream: 'Cream', lightgrey: 'Light Grey', auto: 'Auto' };

// // ─────────────────────────────────────────────────────────────────────────────
// //  Helpers
// // ─────────────────────────────────────────────────────────────────────────────
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// // ─────────────────────────────────────────────────────────────────────────────
// //  Replicate — poll until done
// // ─────────────────────────────────────────────────────────────────────────────
// async function pollReplicate(pollUrl) {
//   for (let i = 0; i < 60; i++) {
//     await sleep(5000);
//     const { data } = await axios.get(pollUrl, {
//       headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
//     });
//     console.log(`    poll ${i + 1}: ${data.status}`);
//     if (data.status === 'succeeded') return data.output;
//     if (data.status === 'failed')
//       throw new Error('Replicate failed: ' + (data.error || 'unknown'));
//   }
//   throw new Error('Replicate polling timed out');
// }

// // ─────────────────────────────────────────────────────────────────────────────
// //  IDM-VTON — with auto-retry on 429 rate limit
// // ─────────────────────────────────────────────────────────────────────────────
// async function runTryOn(humanImgUrl, garmentImgUrl, garmentDesc, seed = 42) {
//   const MAX_RETRIES = 3;

//   for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
//     try {
//       console.log(`  → IDM-VTON attempt ${attempt}/${MAX_RETRIES} | seed: ${seed}`);
//       console.log(`    human_img : ${humanImgUrl}`);
//       console.log(`    garment   : ${garmentImgUrl}`);

//       const { data } = await axios.post(
//         'https://api.replicate.com/v1/predictions',
//         {
//           version: 'c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4',
//           input: {
//             human_img:       humanImgUrl,
//             garm_img:        garmentImgUrl,
//             garment_des:     garmentDesc,
//             is_checked:      true,
//             is_checked_crop: true,
//             denoise_steps:   40,
//             seed,
//           },
//         },
//         {
//           headers: {
//             Authorization:  `Token ${process.env.REPLICATE_API_TOKEN}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log(`  → Prediction ID: ${data.id} | status: ${data.status}`);
//       if (!data?.urls?.get) throw new Error('No polling URL from Replicate: ' + JSON.stringify(data));

//       const output = await pollReplicate(data.urls.get);
//       const url    = Array.isArray(output) ? output[0] : output;
//       if (!url) throw new Error('Empty output from Replicate');

//       return url;

//     } catch (err) {
//       const is429 = err.response?.status === 429 || err.message?.includes('429');

//       if (is429 && attempt < MAX_RETRIES) {
//         const waitSec = attempt * 20; // 20s phir 40s
//         console.warn(`  ⚠ 429 Rate limit — ${waitSec}s wait before retry ${attempt + 1}/${MAX_RETRIES}...`);
//         await sleep(waitSec * 1000);
//         continue;
//       }

//       // Not a 429, or retries exhausted — re-throw
//       throw err;
//     }
//   }
// }

// // ─────────────────────────────────────────────────────────────────────────────
// //  Garment description builder
// // ─────────────────────────────────────────────────────────────────────────────
// function buildGarmentDesc(filename = '', bodyDesc = '') {
//   if (bodyDesc?.trim().length > 3) return bodyDesc.trim();

//   const f = filename.toLowerCase();
//   if (f.includes('kurta'))                                               return 'kurta, traditional Indian upper body ethnic wear';
//   if (f.includes('shirt') || f.includes('tshirt') || f.includes('top')) return 'shirt, upper body clothing';
//   if (f.includes('dress'))                                               return 'dress, full body women clothing';
//   if (f.includes('saree'))                                               return 'saree, traditional Indian women clothing';
//   if (f.includes('jacket') || f.includes('coat'))                       return 'jacket, upper body outerwear';
//   if (f.includes('pant') || f.includes('jeans'))                        return 'pants, lower body clothing';
//   if (f.includes('skirt'))                                               return 'skirt, lower body clothing';
//   if (f.includes('blouse'))                                              return 'blouse, upper body women clothing';
//   if (f.includes('hoodie'))                                              return 'hoodie, upper body casual wear';
//   if (f.includes('dungaree') || f.includes('overall'))                  return 'dungaree overalls, kids full body clothing';
//   return 'upper body clothing garment';
// }

// // ─────────────────────────────────────────────────────────────────────────────
// //  MAIN CONTROLLER
// // ─────────────────────────────────────────────────────────────────────────────
// exports.generateFashionModel = async (req, res) => {
//   console.log('\n========== generateFashionModel START ==========');

//   try {
//     // ── Basic validation ───────────────────────────────────────────────────
//     if (!req.files?.length)
//       return res.status(400).json({ success: false, message: 'Please upload a garment image' });

//     if (!process.env.REPLICATE_API_TOKEN)
//       return res.status(500).json({ success: false, message: 'REPLICATE_API_TOKEN missing in .env' });

//     const genderKey      = ['female', 'male', 'kid'].includes(req.body.gender) ? req.body.gender : 'female';
//     const bgRaw          = (req.body.background || 'cream').toLowerCase().trim();
//     const backgroundType = BG_TYPE_MAP[bgRaw] || 'Cream';
//     console.log(`Gender: ${genderKey} | BG: ${backgroundType}`);

//     // ── Check model images are configured ─────────────────────────────────
//     const modelSet  = MODEL_IMAGES[genderKey];
//     const missingEnv = Object.entries(modelSet)
//       .filter(([, v]) => !v)
//       .map(([k]) => `MODEL_${genderKey.toUpperCase()}_${k.toUpperCase()}`);

//     if (missingEnv.length > 0) {
//       const msg = `Model images not set up. Run "node uploadModelImages.js" first. Missing: ${missingEnv.join(', ')}`;
//       console.error(msg);
//       return res.status(500).json({ success: false, message: msg });
//     }

//     // ── Upload garment to Cloudinary ───────────────────────────────────────
//     const uploadedImages = [];
//     for (const file of req.files) {
//       const uploaded = await cloudinary.uploader.upload(file.path, {
//         folder:        'fashion-ai/original',
//         resource_type: 'image',
//       });
//       uploadedImages.push(uploaded.secure_url);
//       try { fs.unlinkSync(file.path); } catch (_) {}
//     }

//     const garmentUrl  = uploadedImages[0];
//     const garmentDesc = buildGarmentDesc(req.files[0]?.originalname || '', req.body.garment_desc || '');
//     console.log('Garment :', garmentUrl);
//     console.log('Desc    :', garmentDesc);

//     // ── Generate 4 poses ───────────────────────────────────────────────────
//     const POSES = [
//       { key: 'front', name: 'Front View'       },
//       { key: 'left',  name: 'Left Angle View'  },
//       { key: 'right', name: 'Right Angle View' },
//       { key: 'back',  name: 'Back View'        },
//     ];

//     const generatedPoses = [];

//     for (let i = 0; i < POSES.length; i++) {
//       const pose = POSES[i];
//       console.log(`\n── [${pose.name}] ──`);

//       // Wait between poses to avoid Replicate 429 rate limit
//       if (i > 0) {
//         console.log('  ⏳ Waiting 10s before next pose...');
//         await sleep(10000);
//       }

//       try {
//         const url = await runTryOn(
//           modelSet[pose.key],
//           garmentUrl,
//           garmentDesc,
//           POSE_SEEDS[pose.key]
//         );
//         generatedPoses.push({ pose: pose.name, image: url });
//         console.log(`  ✓ Done: ${url}`);

//       } catch (err) {
//         console.error(`  ✗ Failed for ${pose.name}: ${err.message}`);
//         // Fallback: show original garment so UI doesn't break
//         generatedPoses.push({ pose: pose.name, image: garmentUrl });
//       }
//     }

//     // ── Save to MongoDB ────────────────────────────────────────────────────
//     const product = await Product.create({
//       originalImages: uploadedImages,
//       generatedPoses,
//       gender:         genderKey.charAt(0).toUpperCase() + genderKey.slice(1),
//       backgroundType,
//       status:         'Completed',
//       aiModelSeed:    Math.floor(Math.random() * 999999),
//     });

//     console.log('\nSaved to DB:', product._id);
//     console.log('========== generateFashionModel DONE ==========\n');

//     return res.status(200).json({
//       success:        true,
//       message:        'AI Fashion Generated Successfully',
//       productId:      product._id,
//       originalImages: uploadedImages,
//       generatedPoses,
//     });

//   } catch (error) {
//     console.error('FATAL:', error.message);
//     return res.status(500).json({
//       success: false,
//       message: 'AI Generation Failed: ' + error.message,
//     });
//   }
// };


const Product    = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const fs         = require('fs');
const axios      = require('axios');

const MODEL_IMAGES = {
  female: {
    front: process.env.MODEL_FEMALE_FRONT,
    left:  process.env.MODEL_FEMALE_LEFT,
    right: process.env.MODEL_FEMALE_RIGHT,
    back:  process.env.MODEL_FEMALE_BACK,
  },
  male: {
    front: process.env.MODEL_MALE_FRONT,
    left:  process.env.MODEL_MALE_LEFT,
    right: process.env.MODEL_MALE_RIGHT,
    back:  process.env.MODEL_MALE_BACK,
  },
  kid: {
    front: process.env.MODEL_KID_FRONT,
    left:  process.env.MODEL_KID_LEFT,
    right: process.env.MODEL_KID_RIGHT,
    back:  process.env.MODEL_KID_BACK,
  },
};

const POSE_SEEDS  = { front: 42, left: 123, right: 456, back: 789 };
const BG_TYPE_MAP = { cream: 'Cream', lightgrey: 'Light Grey', auto: 'Auto' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Replicate poll ────────────────────────────────────────────────────────────
async function pollReplicate(pollUrl) {
  for (let i = 0; i < 60; i++) {
    await sleep(5000);
    const { data } = await axios.get(pollUrl, {
      headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
    });
    console.log(`    poll ${i + 1}: ${data.status}`);
    if (data.status === 'succeeded') return data.output;
    if (data.status === 'failed')
      throw new Error('Replicate failed: ' + (data.error || 'unknown'));
  }
  throw new Error('Replicate polling timed out');
}

// ─── IDM-VTON with retry ───────────────────────────────────────────────────────
async function runTryOn(humanImgUrl, garmentImgUrl, garmentDesc, seed = 42) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`  → IDM-VTON attempt ${attempt}/${MAX_RETRIES} | seed: ${seed}`);
      console.log(`    human_img : ${humanImgUrl}`);
      console.log(`    garment   : ${garmentImgUrl}`);

      const { data } = await axios.post(
        'https://api.replicate.com/v1/predictions',
        {
          version: 'c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4',
          input: {
            human_img:       humanImgUrl,
            garm_img:        garmentImgUrl,
            garment_des:     garmentDesc,
            is_checked:      true,
            is_checked_crop: true,
            denoise_steps:   40,
            seed,
          },
        },
        {
          headers: {
            Authorization:  `Token ${process.env.REPLICATE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(`  → Prediction ID: ${data.id} | status: ${data.status}`);
      if (!data?.urls?.get) throw new Error('No polling URL from Replicate: ' + JSON.stringify(data));

      const output = await pollReplicate(data.urls.get);
      const url    = Array.isArray(output) ? output[0] : output;
      if (!url) throw new Error('Empty output from Replicate');

      return url;

    } catch (err) {
      const is429 = err.response?.status === 429 || err.message?.includes('429');
      if (is429 && attempt < MAX_RETRIES) {
        const waitSec = attempt * 20;
        console.warn(`  ⚠ 429 Rate limit — ${waitSec}s wait...`);
        await sleep(waitSec * 1000);
        continue;
      }
      throw err;
    }
  }
}

// ─── Garment description ───────────────────────────────────────────────────────
function buildGarmentDesc(filename = '', bodyDesc = '') {
  if (bodyDesc?.trim().length > 3) return bodyDesc.trim();
  const f = filename.toLowerCase();
  if (f.includes('kurta'))                                               return 'kurta, traditional Indian upper body ethnic wear';
  if (f.includes('shirt') || f.includes('tshirt') || f.includes('top')) return 'shirt, upper body clothing';
  if (f.includes('dress'))                                               return 'dress, full body women clothing';
  if (f.includes('saree'))                                               return 'saree, traditional Indian women clothing';
  if (f.includes('jacket') || f.includes('coat'))                       return 'jacket, upper body outerwear';
  if (f.includes('pant') || f.includes('jeans'))                        return 'pants, lower body clothing';
  if (f.includes('skirt'))                                               return 'skirt, lower body clothing';
  if (f.includes('blouse'))                                              return 'blouse, upper body women clothing';
  if (f.includes('hoodie'))                                              return 'hoodie, upper body casual wear';
  if (f.includes('dungaree') || f.includes('overall'))                  return 'dungaree overalls, kids full body clothing';
  return 'upper body clothing garment';
}

// ─── MAIN CONTROLLER ──────────────────────────────────────────────────────────
exports.generateFashionModel = async (req, res) => {
  console.log('\n========== generateFashionModel START ==========');

  try {
    if (!req.files?.length)
      return res.status(400).json({ success: false, message: 'Please upload a garment image' });

    if (!process.env.REPLICATE_API_TOKEN)
      return res.status(500).json({ success: false, message: 'REPLICATE_API_TOKEN missing in .env' });

    const genderKey      = ['female', 'male', 'kid'].includes(req.body.gender) ? req.body.gender : 'female';
    const bgRaw          = (req.body.background || 'cream').toLowerCase().trim();
    const backgroundType = BG_TYPE_MAP[bgRaw] || 'Cream';
    console.log(`Gender: ${genderKey} | BG: ${backgroundType}`);

    // ── Check model images configured ─────────────────────────────────────
    const modelSet   = MODEL_IMAGES[genderKey];
    const missingEnv = Object.entries(modelSet)
      .filter(([, v]) => !v)
      .map(([k]) => `MODEL_${genderKey.toUpperCase()}_${k.toUpperCase()}`);

    if (missingEnv.length > 0) {
      const msg = `Model images not set up. Missing: ${missingEnv.join(', ')}`;
      console.error(msg);
      return res.status(500).json({ success: false, message: msg });
    }

    // ── Upload garment to Cloudinary ───────────────────────────────────────
    const uploadedImages = [];
    for (const file of req.files) {
      const uploaded = await cloudinary.uploader.upload(file.path, {
        folder:        'fashion-ai/original',
        resource_type: 'image',
      });
      uploadedImages.push(uploaded.secure_url);
      try { fs.unlinkSync(file.path); } catch (_) {}
    }

    const garmentUrl  = uploadedImages[0];
    const garmentDesc = buildGarmentDesc(req.files[0]?.originalname || '', req.body.garment_desc || '');
    console.log('Garment :', garmentUrl);
    console.log('Desc    :', garmentDesc);

    // ── ✅ FIX: Har pose ki APNI model image use hogi ─────────────────────
    const POSES = [
      { key: 'front', name: 'Front View',       modelImg: modelSet['front'] },
      { key: 'left',  name: 'Left Angle View',  modelImg: modelSet['left']  },
      { key: 'right', name: 'Right Angle View', modelImg: modelSet['right'] },
      { key: 'back',  name: 'Back View',        modelImg: modelSet['back']  },
    ];

    const generatedPoses = [];

    for (let i = 0; i < POSES.length; i++) {
      const pose = POSES[i];
      console.log(`\n── [${pose.name}] ──`);
      console.log(`  Model Image: ${pose.modelImg}`);

      if (i > 0) {
        console.log('  ⏳ Waiting 10s before next pose...');
        await sleep(10000);
      }

      try {
        const url = await runTryOn(
          pose.modelImg,           // ✅ har pose ki alag model image
          garmentUrl,
          garmentDesc,
          POSE_SEEDS[pose.key]
        );
        generatedPoses.push({ pose: pose.name, image: url });
        console.log(`  ✓ Done: ${url}`);

      } catch (err) {
        console.error(`  ✗ Failed for ${pose.name}: ${err.message}`);
        generatedPoses.push({ pose: pose.name, image: garmentUrl });
      }
    }

    // ── Save to MongoDB ────────────────────────────────────────────────────
    const product = await Product.create({
      originalImages: uploadedImages,
      generatedPoses,
      gender:         genderKey.charAt(0).toUpperCase() + genderKey.slice(1),
      backgroundType,
      status:         'Completed',
      aiModelSeed:    Math.floor(Math.random() * 999999),
    });

    console.log('\nSaved to DB:', product._id);
    console.log('========== generateFashionModel DONE ==========\n');

    return res.status(200).json({
      success:        true,

      
      message:        'AI Fashion Generated Successfully',
      productId:      product._id,
      originalImages: uploadedImages,
      generatedPoses,
    });

  } catch (error) {
    console.error('FATAL:', error.message);
    return res.status(500).json({
      success: false,
      message: 'AI Generation Failed: ' + error.message,
    });
  }
};