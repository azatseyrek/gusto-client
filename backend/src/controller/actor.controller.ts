import { Actor } from './../entity/actor.entity';
import { Request, Response } from "express";
import { getManager } from "typeorm";



export const Actors = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(Actor);
    const actors = await repository.find();
    res.send(actors);
  } catch (err) {
    res.send(err)
  }
};

export const CreateActor = async (req: Request, res: Response) => {
  const body = req.body
  try {
    const repository = getManager().getRepository(Actor);
    const actor = await repository.save({
      ...body,
      ownerId: req["user"].id
    });
    res.status(201).send("success");
  } catch (err) {
    res.send(err)
  }
};


export const GetMyActors = async (req: Request, res: Response) => {
  try {
    const myActorsRepository = getManager().getRepository(Actor);
    const myActors = await myActorsRepository.find({ ownerId: req["user"].id } && { share: false })
    res.status(201).send(myActors)
  } catch (err) {
    res.send(err)
  }
}

export const GetSharedActors = async (req: Request, res: Response) => {
  try {
    const sharedActorsRepository = getManager().getRepository(Actor);
    const sharedActors = await sharedActorsRepository.find({ share: true })
    res.status(201).send(sharedActors)
  } catch (err) {
    res.send(err)
  }
}

export const UpdateActor = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(Actor);
    const { ownerId, ...body } = req.body
    const id = req.params.id;

    await repository.update(id, {
      ...body
    });

    const actor = await repository.findOne(id);
    res.status(202).send(actor);
  } catch (err) {
    res.send(err)
  }
};

export const DeleteActor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const repository = getManager().getRepository(Actor);

    await repository.delete(id);
    res.status(204).send("success");
  } catch (err) {
    res.send(err)
  }
};
