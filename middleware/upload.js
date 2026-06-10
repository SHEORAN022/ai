// // // const multer = require("multer");

// // // const storage = multer.diskStorage({
// // //   destination: "./uploads",

// // //   filename: (req, file, cb) => {
// // //     cb(
// // //       null,
// // //       Date.now() + "-" + file.originalname
// // //     );
// // //   },
// // // });

// // // const upload = multer({ storage });

// // // module.exports = upload;



// // const multer =
// //   require("multer");

// // const storage =
// //   multer.diskStorage({
// //     destination:
// //       function (
// //         req,
// //         file,
// //         cb
// //       ) {
// //         cb(null, "uploads/");
// //       },

// //     filename:
// //       function (
// //         req,
// //         file,
// //         cb
// //       ) {
// //         cb(
// //           null,
// //           Date.now() +
// //             "-" +
// //             file.originalname
// //         );
// //       },
// //   });

// // module.exports =
// //   multer({
// //     storage,
// //   });
// const multer = require("multer");
// const fs = require("fs");

// // Ensure uploads directory exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
const multer = require("multer");
const fs = require("fs");

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;