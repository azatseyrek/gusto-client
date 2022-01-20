import { Router } from "express";
import {
  Login,
  Register,
  AuthanticatedUser,
  Logout,
  UpdateInfo,
  UpdatePassword,
} from "./controller/auth.controller";
import { AuthMiddleWare } from "./middleware/auth.middleware";

export const routes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleWare, AuthanticatedUser);
  router.post("/api/logout", AuthMiddleWare, Logout);
  router.put("/api/user/info",AuthMiddleWare, UpdateInfo)
  router.put("/api/user/password",AuthMiddleWare, UpdatePassword)
};
