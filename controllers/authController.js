// // const User = require("../models/User");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // const generateToken = (id) => {
// //   return jwt.sign(
// //     { id },
// //     process.env.JWT_SECRET,
// //     {
// //       expiresIn: "30d",
// //     }
// //   );
// // };

// // // ================= REGISTER =================

// // exports.registerUser = async (req, res) => {
// //   try {
// //     const { name, email, password } =
// //       req.body;

// //     // VALIDATION
// //     if (!name || !email || !password) {
// //       return res.status(400).json({
// //         success: false,
// //         message:
// //           "Please provide all fields",
// //       });
// //     }

// //     // CHECK EXISTING USER
// //     const userExists =
// //       await User.findOne({ email });

// //     if (userExists) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "User already exists",
// //       });
// //     }

// //     // CREATE USER
// //     const user = await User.create({
// //       name,
// //       email,
// //       password,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message:
// //         "User registered successfully",
// //       token: generateToken(user._id),
// //       user,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // ================= LOGIN =================

// // exports.loginUser = async (req, res) => {
// //   try {
// //     const { email, password } =
// //       req.body;

// //     // CHECK USER
// //     const user =
// //       await User.findOne({ email });

// //     if (!user) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "User not found",
// //       });
// //     }

// //     // CHECK PASSWORD
// //     const isMatch =
// //       await bcrypt.compare(
// //         password,
// //         user.password
// //       );

// //     if (!isMatch) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Invalid credentials",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       token: generateToken(user._id),
// //       user,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// // ================= REGISTER =================
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide all fields",
//       });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= LOGIN =================
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};