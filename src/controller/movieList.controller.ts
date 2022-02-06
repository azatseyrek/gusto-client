import { MovieList } from '../entity/movieList.entity';
import { Request, Response } from "express";
import { getManager } from "typeorm";



export const movieList = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(MovieList);

  const list = await repository.find();

  res.send(list);
};

export const CreateMovieList = async (req: Request, res: Response) => {
  const body = req.body

  const repository = getManager().getRepository(MovieList);


  const list = await repository.save({
    ...body,
    user_id : req["user"].id,
  });
  res.status(201).send(list);
};

export const GetMovieList = async (req: Request, res: Response) => {
  const repository = await getManager().getRepository(MovieList);
  const id = req.params.id;

  const list = await repository.findOne(id)
  res.send(list);
};

export const UpdateMovieList = async (req: Request, res: Response) => {
  const {user_id, ...body} = req.body
  const repository = getManager().getRepository(MovieList);
  const id = req.params.id;

  await repository.update(id, {
    ...body
  });

  const review = await repository.findOne(id);
  res.status(202).send(review);
};

export const DeleteMovieList = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = getManager().getRepository(MovieList);

  await repository.delete(id);
  res.status(204).send("success");
};
