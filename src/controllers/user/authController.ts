import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "../../models/userModel";
import bcrypt from "bcrypt";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;

    // Find the user by phoneNumber in the database
    const user = await Users.findOne({ phoneNumber });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(403).json({ message: "Password mismatch" });
      } else if (!result) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // Passwords match, generate a JWT token

      // Set user details
      const payload = {
        userId: user._id,
        phoneNumber: user.phoneNumber,
        role: "user",
      };

      // Set the token expiration time
      const expire = {
        expiresIn: "1h",
      };

      // Set secret key for verify
      const secretKey = process.env.JWT_SECRET!;

      // Create token
      const token = jwt.sign(payload, secretKey, expire);

      return res.status(200).json({ message: "Login successful", token });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};
