import { CreateActor, DeleteActor, Actors, UpdateActor } from './controller/actor.controller';
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
import { CreateMovie, DeleteMovie, Movies, UpdateMovie } from './controller/movie.controller';
import { CreateMovieReview, DeleteMovieReview, GetMovieReview, MovieReview, UpdateMovieReview } from './controller/movieReviews.controller';
import { ActorReview, CreateActorReview, DeleteActorReview, GetActorReview } from './controller/actorReviews.controller';




// Login & Register
export const routes = (router: Router) => {
  router.post("/register", Register);
  router.post("/login", Login);

  router.get("/user", AuthMiddleWare, AuthanticatedUser);
  router.post("/logout", AuthMiddleWare, Logout);
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
  // router.get("/actors/:id", AuthMiddleWare, GetActor);
  router.put("/actors/:id", AuthMiddleWare, UpdateActor);
  router.delete("/actors/:id", AuthMiddleWare, DeleteActor);

  // Movies

  router.get("/movies", AuthMiddleWare, Movies);
  router.post("/movies", AuthMiddleWare, CreateMovie);
  // router.get("/movies/:id", AuthMiddleWare, GetMovie);
  router.put("/movies/:id", AuthMiddleWare, UpdateMovie);
  router.delete("/movies/:id", AuthMiddleWare, DeleteMovie);

  // MovieReviews

  router.get("/moviesReview", AuthMiddleWare, MovieReview);
  router.post("/movieReview", AuthMiddleWare, CreateMovieReview);
  router.get("/movieReview/:id", AuthMiddleWare, GetMovieReview);
  router.put("/movieReview/:id", AuthMiddleWare, UpdateMovieReview);
  router.delete("/movieReview/:id", AuthMiddleWare, DeleteMovieReview);

   // ActorReviews

   router.get("/actorReviews", AuthMiddleWare, ActorReview);
   router.post("/actorReview", AuthMiddleWare, CreateActorReview);
   router.get("/actorReview/:id", AuthMiddleWare, GetActorReview);
  //  router.put("/actorReview/:id", AuthMiddleWare, UpdateActorsReview);
   router.delete("/actorReview/:id", AuthMiddleWare, DeleteActorReview);

};
