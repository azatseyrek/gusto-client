import { MovieReviews } from '../entity/movieReviews.entity';
import { Request, Response } from "express";
import { getManager } from "typeorm";


export const MovieReview = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(MovieReviews);
  const reviews = await repository.find();
  res.send(reviews);
};

export const CreateMovieReview = async (req: Request, res: Response) => {
  const body = req.body
  const repository = getManager().getRepository(MovieReviews);
  const review = await repository.save({
    ...body,
    commenterId : req["user"].id,
  });
  res.status(201).send(review);
};
// gereksiz
export const GetMovieReview = async (req: Request, res: Response) => {
  const repository = await getManager().getRepository(MovieReviews);
  const id = req.params.id;

  const review = await repository.findOne(id)
  res.send(review);
};
// gereksiz
export const UpdateMovieReview = async (req: Request, res: Response) => {
  const {owner_id, ...body} = req.body
  const repository = getManager().getRepository(MovieReviews);
  const id = req.params.id;

  await repository.update(id, {
    ...body
  });

  const review = await repository.findOne(id);
  res.status(202).send(review);
};

export const DeleteMovieReview = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = getManager().getRepository(MovieReviews);

  await repository.delete(id);
  res.status(204).send("success");
};
