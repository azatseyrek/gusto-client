import { ActorReviews } from '../entity/actorReviews.entity';
import { Request, Response } from "express";
import { getManager } from "typeorm";


export const ActorReview = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(ActorReviews);
  const reviews = await repository.find();
  res.send(reviews);
};

export const CreateActorReview = async (req: Request, res: Response) => {
  const body = req.body
  const repository = getManager().getRepository(ActorReviews);
  const review = await repository.save({
    ...body,
    commenterId : req["user"].id,
  });
  res.status(201).send(review);
};
// gereksiz
export const GetActorReview = async (req: Request, res: Response) => {
  const repository =getManager().getRepository(ActorReviews);
  const id = req.params.id;

  const review = await repository.findOne(id)
  res.send(review);
};
// gereksiz
export const UpdateActorReview = async (req: Request, res: Response) => {
  const {owner_id, ...body} = req.body
  const repository = getManager().getRepository(ActorReviews);
  const id = req.params.id;

  await repository.update(id, {
    ...body
  });

  const review = await repository.findOne(id);
  res.status(202).send(review);
};

export const DeleteActorReview = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = getManager().getRepository(ActorReviews);

  await repository.delete(id);
  res.status(204).send("success");
};
