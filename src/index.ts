import express, { Request, Response } from "express";
import {createConnection, getManager} from "typeorm";
import cors from "cors";
import cookieParser from "cookie-parser";

import { routes } from "./routes";


createConnection().then(async(connection) => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser())
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:8000"],
    })
  )



  
  
  // const movie1 = new Movie();
  // movie1.moviePhotoUrl = "measasa.jpg";
  // movie1.movie_name = "kolpacino";
  // await connection.manager.save(movie1);
  
  // const movie2 = new Movie();
  // movie2.moviePhotoUrl = "asaaaad.jpg";
  // movie2.movie_name = "marakes baba";
  // await connection.manager.save(movie2);
  
  // const movieList = new MovieList();
  // movieList.movies = [movie1, movie2]
  // await connection.manager.save(movieList);
  
  // const user = new User();
  // user.first_name = "azat";
  // user.last_name = "seyrek";
  // user.password = "123123"
  // user.email = "aseyrek@hotmail.com"
  // user.movielist = movieList
  // await connection.manager.save(user);
  
  // const userRepository = getManager().getRepository(User);
  // const user = await userRepository.findOne(14, {relations: ["movielist"]})
  // console.log(user.movielist.id);


  
  // const repository = getManager().getRepository(Movie);
  // const movies = await repository.find({ where: {movielist: user.movielist.id} });

  // console.log(movies);




  //calling all routes
  routes(app);

  app.listen(3000, () => console.log("port started on 3000"));

});

