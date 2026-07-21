import bcrypt from "bcrypt";
import User from "../models/user.js";
import Token from "../utils/Token.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Minimum 6 characters required",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      fullName,
      email,
      password: hash,
      role: "user",
    });

    const token = Token(createUser.email, createUser._id, createUser.role);

    res.cookie("Token", token, cookieOptions);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: createUser._id,
        fullName: createUser.fullName,
        email: createUser.email,
        role: createUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const restaurantRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Minimum 6 characters required",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const restaurant = await User.create({
      fullName,
      email,
      password: hash,
      role: "restaurant",
    });

    const token = Token(restaurant.email, restaurant._id, restaurant.role);

    res.cookie("Token", token, cookieOptions);

    return res.status(201).json({
      message: "Restaurant registered successfully",
      user: {
        id: restaurant._id,
        fullName: restaurant.fullName,
        email: restaurant.email,
        role: restaurant.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    if (user.role !== "user") {
      return res.status(403).json({
        message: "Access denied. Invalid Login API.",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    const token = Token(user.email, user._id, user.role);

    res.cookie("Token", token, cookieOptions);

    return res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const restaurantLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    if (user.role !== "restaurant") {
      return res.status(403).json({
        message: "Access denied. Invalid Login API.",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    const token = Token(user.email, user._id, user.role);

    res.cookie("Token", token, cookieOptions);

    return res.status(200).json({
      message: "Restaurant logged in successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("Token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
