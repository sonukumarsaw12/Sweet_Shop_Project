import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as JwtPayload & { role?: string };

  if (user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};
