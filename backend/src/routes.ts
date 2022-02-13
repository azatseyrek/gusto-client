import { CreateReview, GetCommentReview } from './controller/moviereview.controller';
import { Router } from "express";

import { Login, Register, AuthanticatedUser, Logout, UpdateInfo, } from "./controller/auth.controller";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";

import { AuthMiddleWare } from "./middleware/auth.middleware";

import { CreateActor, DeleteActor, Actors, UpdateActor, GetMyActors, GetSharedActors } from './controller/actor.controller';
import { CreateMovie, DeleteMovie, GetMyMovies, GetSharedMovies, Movies, UpdateMovie } from './controller/movie.controller';
import { AddActorLike, AddLike } from "./controller/like.controller";
import { CreateActorReview, GetActorCommentReview } from './controller/actorreview.controller';


export const routes = (router: Router) => {
  // Login & Register & Logout
  router.post("/login", Login);
  router.post("/register", Register);
  router.get("/logout", AuthMiddleWare, Logout);

  // User

  router.get("/user", AuthMiddleWare, AuthanticatedUser);
  router.put("/user/info", AuthMiddleWare, UpdateInfo);


  // Users

  router.get("/users", AuthMiddleWare, Users);
  router.post("/users", AuthMiddleWare, CreateUser);
  router.get("/users/:id", AuthMiddleWare, GetUser);
  router.put("/users/:id", AuthMiddleWare, UpdateUser);
  router.delete("/users/:id", AuthMiddleWare, DeleteUser);

  // Actors

  router.get("/actors", AuthMiddleWare, Actors);
  router.post("/actors", AuthMiddleWare, CreateActor);
  router.get("/myactors", AuthMiddleWare, GetMyActors);
  router.put("/actors/:id", AuthMiddleWare, UpdateActor);
  router.delete("/actors/:id", AuthMiddleWare, DeleteActor);
  router.get("/sharedactors", AuthMiddleWare, GetSharedActors);

  // Movies

  router.get("/movies", AuthMiddleWare, Movies);
  router.post("/movies", AuthMiddleWare, CreateMovie);
  router.get("/mymovies", AuthMiddleWare, GetMyMovies);
  router.put("/movies/:id", AuthMiddleWare, UpdateMovie);
  router.delete("/movies/:id", AuthMiddleWare, DeleteMovie);
  router.get("/sharedmovies", AuthMiddleWare, GetSharedMovies);

  // Like
  
  router.post("/addlike", AuthMiddleWare, AddLike);
  router.post("/addactorlike", AuthMiddleWare, AddActorLike);


  // Review

  router.post("/addmoviereview", AuthMiddleWare, CreateReview)
  router.get("/getmoviereview/:id", AuthMiddleWare, GetCommentReview)
  router.post("/addactorreview", AuthMiddleWare, CreateActorReview)
  router.get("/getactorreview/:id", AuthMiddleWare, GetActorCommentReview)

};
