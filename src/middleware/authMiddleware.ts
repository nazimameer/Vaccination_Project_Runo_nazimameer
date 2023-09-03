import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { log } from "util";
interface JwtPayload {
  userId: string;
  phoneNumber: string;
  role: string;
  // Add other properties as needed
}

// Extend the Request type to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader == undefined) {
      return res.status(401).json({ message: "No Token Provided" });
    }
    const token = authHeader.split(" ").pop() as string; // Assuming token is a string
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload | null;
    if (!decoded) {
      return res.status(500).json({ message: "Authentication failed" });
    } else {
      req.user = decoded; // Assign the decoded JWT payload to req.user
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Authentication failed" });
  }
};
