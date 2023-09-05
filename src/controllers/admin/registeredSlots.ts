import { Request, Response } from "express";
import Users, { IUser } from "../../models/userModel";

export const fetchSlots = async (req: Request, res: Response) => {
  try {
    Users.find({}, "registeredSlot", (err: any, users: IUser[]) => {
      if (err) {
        // Handle the error
        console.log(err);
        return res.status(404).json({ message: "No registered slots" });
      } else {
        // `users` will contain an array of user documents with only the `registeredSlot` field included
        return res.status(200).json({ users });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};
