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

export const routes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleWare, AuthanticatedUser);
  router.post("/api/logout", AuthMiddleWare, Logout);
  router.put("/api/user/info", AuthMiddleWare, UpdateInfo);
  router.put("/api/user/password", AuthMiddleWare, UpdatePassword);
  router.get("/api/users", AuthMiddleWare, Users);
  router.post("/api/users", AuthMiddleWare, CreateUser);
  router.get("/api/users/:id", AuthMiddleWare, GetUser);
  router.put("/api/users/:id", AuthMiddleWare, UpdateUser);
  router.delete("/api/users/:id", AuthMiddleWare, DeleteUser);
};
