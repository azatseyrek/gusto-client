import { Actor } from './../entity/actor.entity';
import { Request, Response } from "express";
import { getManager } from "typeorm";



export const Actors = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Actor);

  const actors = await repository.find();

  res.send(actors);
};

export const CreateActor = async (req: Request, res: Response) => {
  const body = req.body

  const repository = getManager().getRepository(Actor);


  const actor = await repository.save({
    ...body,
    ownerId : req["user"].id
  });
  res.status(201).send(actor);
};

export const UpdateActor = async (req: Request, res: Response) => {
  const {owner_id, ...body} = req.body
  const repository = getManager().getRepository(Actor);
  const id = req.params.id;

  await repository.update(id, {
    ...body
  });

  const actor = await repository.findOne(id);
  res.status(202).send(actor);
};

export const DeleteActor = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = getManager().getRepository(Actor);

  await repository.delete(id);
  res.status(204).send("success");
};
