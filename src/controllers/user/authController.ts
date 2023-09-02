import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "../../models/userModel";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;

    // Find the user by phoneNumber in the database
    const user = await Users.findOne({ phoneNumber });

    if (!user || user.password != password) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token

    // Set user details
    const payload = {
      userId: user?._id,
      phoneNumber: user?.phoneNumber,
    };
    // Set the token expiration time
    const expire = {
      expiresIn: "1h",
    };
    // Set secret key for verify
    const secretKey = process.env.JWT_SECRET!;
    // Create token
    const token = jwt.sign(payload, secretKey, expire);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
