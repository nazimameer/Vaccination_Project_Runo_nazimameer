import { Request, Response } from "express";
import Users, { IUser } from "../../models/userModel";

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    Users.find(
      {},
      "-password -vaccinationStatus -registeredSlot",
      (err: any, users: IUser[]) => {
        if (err) {
          return res.status(404).json({ message: "No users found" });
        } else {
          return res.status(200).json({ users });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetch data" });
  }
};
