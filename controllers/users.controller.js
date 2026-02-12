var db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = db.User;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const EMAIL = "zaidt7497@gmail.com";
    const PASS = "user1234";

    if (email === EMAIL && password === PASS) {
      const token = jwt.sign(
        { id: "hardcoded-1", email: EMAIL },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
        user: { id: 0, email: EMAIL },
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { login };
