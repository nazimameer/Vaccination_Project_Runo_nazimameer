import { Request, Response } from "express";
import Users, { IUser } from "../../models/userModel";

export const fetchSlots = async (req: Request, res: Response) => {
  try {
   const slots = await Users.find({}, "registeredSlot")
    return res.status(200).json({ slots });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};
