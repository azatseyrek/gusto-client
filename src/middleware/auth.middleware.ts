import { Request } from "express";
import { getManager } from "typeorm";
import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";

import { User } from "../entity/user.entity";

export const AuthMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies["jwt"];

    const payload: any = verify(jwt, process.env.SECRET_KEY);

    if (!payload) {
      return res.status(401).send({ message: "unauthanticated" });
    }

    const repository = getManager().getRepository(User);
    const user = await repository.findOne(payload.id);
    // req.user = user without typescript it will work

    req["user"] = user
    
    next();

  } catch (e) {
    return res.status(401).send({ message: "unauthanticated" });
  }
};
