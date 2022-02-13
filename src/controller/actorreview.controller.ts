
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { ActorReviev } from '../entity/actorReview.entity';



export const CreateActorReview = async (req: Request, res: Response) => {
  const { ...body } = req.body
  try {
    const repository = getManager().getRepository(ActorReviev);

    const review = await repository.save({
      ...body,
      commenterId: req["user"].id,
      commenterName: req["user"].first_name
    });
    res.status(201).send("success");
  } catch (err) {
    res.send(err)
  }
};

export const GetActorCommentReview = async (req: Request, res: Response) => {

  const id = Number(req.params.id)

  try {
    const repository = getManager().getRepository(ActorReviev);

    const reviews = await repository.find({ actorId: id })
    res.status(200).send(reviews)
  } catch (err) {
    res.send(err)
  }
}




