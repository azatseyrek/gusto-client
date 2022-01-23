import { Permission } from "./../entity/permision.entity";
import { Request, Response } from "express";
import { getManager } from "typeorm";

export const Permissions = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permission);

  res.send(await repository.find());
};
