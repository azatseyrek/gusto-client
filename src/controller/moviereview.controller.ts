
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { MovieReviev } from '../entity/movieReview.entity';



export const CreateReview = async (req: Request, res: Response) => {
  const {...body} = req.body
  try {
    const repository = getManager().getRepository(MovieReviev);

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

export const GetCommentReview = async (req: Request, res: Response) => {

const id = Number(req.params.id)

  try {
    const repository = getManager().getRepository(MovieReviev);

    const reviews = await repository.find( {movieId:id })
    res.status(200).send(reviews)
  } catch (err) {
    res.send(err)
  }
}




