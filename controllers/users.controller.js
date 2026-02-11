var db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = db.User;
const dotenv = require("dotenv");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    User.prototype.validPassword = async function (password) {
      return await bcrypt.compare(password, this.password);
    };

    // 3. Password Verification: Compare plain text with hashed DB password
    // This assumes your User model has the 'validPassword' method we discussed earlier
    const isPasswordValid = await user.validPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Token Generation: Create a JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // Token valid for 7 days
    );

    // 5. Success Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
};

module.exports = { login };
