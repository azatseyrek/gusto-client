import { Router } from "express";
import {
  Login,
  Register,
  AuthanticatedUser,
  Logout,
  UpdateInfo,
  UpdatePassword,
} from "./controller/auth.controller";
import {
  CreateUser,
  DeleteUser,
  GetUser,
  UpdateUser,
  Users,
} from "./controller/user.controller";

import { AuthMiddleWare } from "./middleware/auth.middleware";
import { ActorReview, CreateActorReview, DeleteActorReview, GetActorReview } from './controller/actorReviews.controller';
import { CreateActor, DeleteActor, Actors, UpdateActor, GetMyActors, GetSharedActors } from './controller/actor.controller';
import { CreateMovie, DeleteMovie, GetMyMovies, GetSharedMovies, Movies, UpdateMovie } from './controller/movie.controller';
import { CreateMovieReview, DeleteMovieReview, GetMovieReview, MovieReview, UpdateMovieReview } from './controller/movieReviews.controller';

// Login & Register
export const routes = (router: Router) => {
  router.post("/register", Register);
  router.post("/login", Login);

  router.get("/user", AuthMiddleWare, AuthanticatedUser);
  router.get("/logout", AuthMiddleWare, Logout);
  router.put("/user/info", AuthMiddleWare, UpdateInfo);
  router.put("/user/password", AuthMiddleWare, UpdatePassword);

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

  // MovieReviews

  router.get("/moviesReview", AuthMiddleWare, MovieReview);
  router.post("/movieReview", AuthMiddleWare, CreateMovieReview);
  router.get("/movieReview/:id", AuthMiddleWare, GetMovieReview);
  router.delete("/movieReview/:id", AuthMiddleWare, DeleteMovieReview);

  // ActorReviews

  router.get("/actorReviews", AuthMiddleWare, ActorReview);
  router.post("/actorReview", AuthMiddleWare, CreateActorReview);
  router.get("/actorReview/:id", AuthMiddleWare, GetActorReview);
  router.delete("/actorReview/:id", AuthMiddleWare, DeleteActorReview);

};
