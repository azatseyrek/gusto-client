import { pushToDBArray, countDBArray, serializeArray } from './../helpers/db';
import { getManager } from "typeorm";
import { Request, Response } from "express";
import { Movie } from "../entity/movie.entity";
import { Actor } from '../entity/actor.entity';

export const AddLike = async (req: Request, res: Response) => {
    const { user_id, movie_id } = req.body
    const repository = getManager().getRepository(Movie);
    const movie = await repository.findOne(movie_id);
    const movieLikes = serializeArray(movie.likes)

    if (movieLikes.includes(user_id)) {
        res.status(400).send({ message: "Already liked!" })
    } else {
        const newLikeArray = pushToDBArray(movie.likes, user_id)
        const newMovie = await repository.update(movie_id, { likes: newLikeArray })
        res.status(200).send({ message: "Succesfully liked" })

        movie.likeCount = countDBArray(movie.likes)
        await repository.update(movie_id, { likeCount: movie.likeCount })
    }
};

export const AddActorLike = async (req: Request, res: Response) => {
    const { user_id, actor_id } = req.body
    const repository = getManager().getRepository(Actor);
    const actor = await repository.findOne(actor_id);
    const actorLikes = serializeArray(actor.likes)

    if (actorLikes.includes(user_id)) {
        res.status(400).send({ message: "Already liked!" })
    } else {
        const newLikeArray = pushToDBArray(actor.likes, user_id)
        const newActor = await repository.update(actor_id, { likes: newLikeArray })
        res.status(200).send({ message: "Succesfully liked" })

        actor.likeCount = countDBArray(actor.likes)
        await repository.update(actor_id, { likeCount: actor.likeCount })
    }
};



