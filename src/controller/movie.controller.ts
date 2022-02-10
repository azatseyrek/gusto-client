import { Movie } from './../entity/movie.entity';
import { Request, Response } from "express";
import { getManager } from "typeorm";



export const Movies = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Movie);

  const movies = await repository.find();

  res.send(movies);
};

export const CreateMovie = async (req: Request, res: Response) => {
  const body = req.body

  const repository = getManager().getRepository(Movie);


  const movie = await repository.save({
    ...body,
    ownerId : req["user"].id
  });
  res.status(201).send("success");
};

export const GetMyMovies = async (req: Request, res: Response) => {
  
  const myMoviesRepository = getManager().getRepository(Movie);

  const myMovies = await myMoviesRepository.find({ownerId:req["user"].id}&&{share:false})
res.status(201).send(myMovies)
}

export const GetSharedMovies = async (req: Request, res:Response)=>{
  const sharedMoviesRepository = getManager().getRepository(Movie);
  const sharedMovies = await sharedMoviesRepository.find({share:true})
  res.status(201).send(sharedMovies)
}

export const UpdateMovie = async (req: Request, res: Response) => {
  const {ownerId, ...body} = req.body
  const repository = getManager().getRepository(Movie);
  const id = req.params.id;

  await repository.update(id, {
    ...body
  });

  const movie = await repository.findOne(id);
  res.status(202).send(movie);
};

export const DeleteMovie = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = getManager().getRepository(Movie);

  await repository.delete(id);
  res.status(204).send("success");
};
