import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Users from "../../models/userModel";

export const registerUser = async (req: Request, res: Response) => {
  try {

    // Extract the required fields from the request body
    const { phoneNumber, age, pincode, aadharNo, password, name } = req.body;

    // Check if the user already exists based on phoneNumber
    const userExist = await Users.findOne({ phoneNumber });
    if (userExist) {
      res.status(409).json({ message: "User already exist" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new Users({
      name,
      phoneNumber,
      age,
      pincode,
      aadharNo,
      password: hashedPassword,
    });

    // Save the user document to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};
