import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface MyJwtPayload {
  userId: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
      return res.status(401).json({message: "Not authorized, token missing"})
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) 

    if(typeof decoded === "string" || !("userId" in decoded)){
      return res.status(401).json({message: "Invalid token"})
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
