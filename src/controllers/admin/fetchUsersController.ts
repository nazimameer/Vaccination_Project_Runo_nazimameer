import { Request, Response } from "express";
import Users, { IUser } from "../../models/userModel";

export const fetchUsers = async (req: Request, res: Response) => {
  try {
   const users = await Users.find(
      {},
      "-password -vaccinationStatus -registeredSlot",
    );
    return res.status(200).json({ users })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetch data" });
  }
};
