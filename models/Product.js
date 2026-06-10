
// const mongoose = require("mongoose");

// const poseSchema = new mongoose.Schema({
//   pose: String,
//   image: String,
// });

// const productSchema = new mongoose.Schema(
//   {
//     originalImages: [String],
//     generatedPoses: [poseSchema],
//     gender: {
//       type: String,
//       enum: ["Male", "Female", "Kids"],
//     },
//     backgroundType: {
//       type: String,
//       enum: ["Cream", "LightGrey", "Auto"],
//     },
//     status: {
//       type: String,
//       enum: ["Uploading", "Processing", "Completed", "Failed"],
//       default: "Uploading",
//     },
//     aiModelSeed: Number,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require('mongoose');

const generatedPoseSchema = new mongoose.Schema({
  pose:  { type: String },
  image: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    originalImages: [{ type: String }],
    generatedPoses: [generatedPoseSchema],

    gender: {
      type:    String,
      enum:    ['Female', 'Male', 'Kid'],
      default: 'Female',
    },

    // ✅ FIX: 'Light Grey' add kiya — pehle 'Lightgrey' invalid tha
    backgroundType: {
      type:    String,
      enum:    ['Cream', 'Light Grey', 'Auto'],
      default: 'Cream',
    },

    status: {
      type:    String,
      enum:    ['Pending', 'Processing', 'Completed', 'Failed'],
      default: 'Pending',
    },

    aiModelSeed: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);