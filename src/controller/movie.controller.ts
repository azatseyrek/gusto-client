import { Movie } from './../entity/movie.entity';
import { Request, Response } from "express";
import { getManager } from "typeorm";



export const Movies = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Movie);

  const movies = await repository.find();

  res.send(movies);
};

export const CreateMovie = async (req: Request, res: Response) => {
  const { user_id, ...body } = req.body;

  const repository = getManager().getRepository(Movie);


  const movie = await repository.save({
      ...body,
      user: {
          id: user_id
      }
  });
  res.status(201).send(movie);
};

export const GetMovie = async (req: Request, res: Response) => {
  const repository = await getManager().getRepository(Movie);
  const id = req.params.id;

  const movie = await repository.findOne(id)
  res.send(movie);
};

export const UpdateMovie = async (req: Request, res: Response) => {

  const repository = getManager().getRepository(Movie);
  const id = req.params.id;

  await repository.update(id, req.body);

  const movie = await repository.findOne(id);

  res.status(202).send(movie);
};

export const DeleteMovie = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = getManager().getRepository(Movie);

  await repository.delete(id);

  res.status(204).send("success");
};
