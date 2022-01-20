import { Router } from "express";
import {
  Login,
  Register,
  AuthanticatedUser,
  Logout,
} from "./controller/auth.controller";
import { AuthMiddleWare } from "./middleware/auth.middleware";

export const routes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleWare, AuthanticatedUser);
  router.post("/api/logout", AuthMiddleWare, Logout);
};
