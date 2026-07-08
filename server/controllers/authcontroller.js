const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==========================
// Register User
// ==========================
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate Fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create User
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        wallet: user.wallet,
      },
    });

  } catch (error) {

  console.error("REGISTER ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

}
};

// ==========================
// Login User
// ==========================
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please enter Email and Password",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });

    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });

    }

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token: generateToken(user._id),

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        wallet: user.wallet,

      },

    });

  } catch (error) {

  console.error("LOGIN ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

}

};

// ==========================
// Get Profile
// ==========================
const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id).select("-password");

    res.json({

      success: true,

      user,

    });

  } catch (error) {

  console.error("PROFILE ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

}

};

module.exports = {

  register,

  login,

  getProfile,

};