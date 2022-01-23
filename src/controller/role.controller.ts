import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Role } from "../entity/role.entity";

export const Roles = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);

  res.send(await repository.find());
};

export const CreateRole = async (req: Request, res: Response) => {
  const { name, permissions }: { name: string; permissions: any } = req.body;

  const repository = getManager().getRepository(Role);

  const role = await repository.save({
    name,
    permissions: permissions.map((id) => {
      return {
        id: id,
      };
    }),
  });

  res.status(201).send(role);
};

export const GetRole = async (req: Request, res: Response) => {
  const id = req.params.id;

  const repository = getManager().getRepository(Role);

  const role = await repository.findOne(id, { relations: ["permissions"] });

  res.send(role);
};

export const UpdateRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  const repository = getManager().getRepository(Role);

  const role = await repository.save({
    id: parseInt(req.params.id),
    name,
    permissions: permissions.map(id => ({ id })),
  });
  res.status(202).send(role);
};

export const DeleteRole = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Role);
    const id = req.params.id
    await repository.delete(id)
    res.status(201).send(null)
}
