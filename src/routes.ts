import { CreateActor, DeleteActor, GetActor, Actors, UpdateActor } from './controller/actor.controller';
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
import { CreateMovie, DeleteMovie, GetMovie, Movies, UpdateMovie } from './controller/movie.controller';


// Login & Register
export const routes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  
  router.get("/api/user", AuthMiddleWare, AuthanticatedUser);
  router.post("/api/logout", AuthMiddleWare, Logout);
  router.put("/api/user/info", AuthMiddleWare, UpdateInfo);
  router.put("/api/user/password", AuthMiddleWare, UpdatePassword);

  // Users

  router.get("/api/users", AuthMiddleWare, Users);
  router.post("/api/users", AuthMiddleWare, CreateUser);
  router.get("/api/users/:id", AuthMiddleWare, GetUser);
  router.put("/api/users/:id", AuthMiddleWare, UpdateUser);
  router.delete("/api/users/:id", AuthMiddleWare, DeleteUser);

  // Actors

  router.get("/api/actors", AuthMiddleWare, Actors);
  router.post("/api/actors", AuthMiddleWare, CreateActor);
  router.get("/api/actors/:id", AuthMiddleWare, GetActor);
  router.put("/api/actors/:id", AuthMiddleWare, UpdateActor);
  router.delete("/api/actors/:id", AuthMiddleWare, DeleteActor);

  // Movies

  router.get("/api/movies", AuthMiddleWare, Movies);
  router.post("/api/movies", AuthMiddleWare, CreateMovie);
  router.get("/api/movies/:id", AuthMiddleWare, GetMovie);
  router.put("/api/movies/:id", AuthMiddleWare, UpdateMovie);
  router.delete("/api/movies/:id", AuthMiddleWare, DeleteMovie);

};
