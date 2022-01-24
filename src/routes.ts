import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  Products,
  UpdateProduct,
} from "./controller/product.controller";
import { Request, Router } from "express";
import {
  Login,
  Register,
  AuthanticatedUser,
  Logout,
  UpdateInfo,
  UpdatePassword,
} from "./controller/auth.controller";
import { Permissions } from "./controller/permission.controller";
import {
  CreateRole,
  DeleteRole,
  GetRole,
  Roles,
  UpdateRole,
} from "./controller/role.controller";
import {
  CreateUser,
  DeleteUser,
  GetUser,
  UpdateUser,
  Users,
} from "./controller/user.controller";
import { AuthMiddleWare } from "./middleware/auth.middleware";
import { Upload } from "./controller/image.controller";
import { Export, Orders } from "./controller/order.controller";

export const routes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleWare, AuthanticatedUser);
  router.post("/api/logout", AuthMiddleWare, Logout);
  router.put("/api/user/info", AuthMiddleWare, UpdateInfo);
  router.put("/api/user/password", AuthMiddleWare, UpdatePassword);

  // User

  router.get("/api/users", AuthMiddleWare, Users);
  router.post("/api/users", AuthMiddleWare, CreateUser);
  router.get("/api/users/:id", AuthMiddleWare, GetUser);
  router.put("/api/users/:id", AuthMiddleWare, UpdateUser);
  router.delete("/api/users/:id", AuthMiddleWare, DeleteUser);

  // Permissions

  router.get("/api/permissions", AuthMiddleWare, Permissions);

  // Role

  router.get("/api/roles", AuthMiddleWare, Roles);
  router.post("/api/roles", AuthMiddleWare, CreateRole);
  router.get("/api/roles/:id", AuthMiddleWare, GetRole);
  router.put("/api/roles/:id", AuthMiddleWare, UpdateRole);
  router.delete("/api/roles/:id", AuthMiddleWare, DeleteRole);

  // Products

  router.get("/api/products", AuthMiddleWare, Products);
  router.post("/api/products", AuthMiddleWare, CreateProduct);
  router.get("/api/products/:id", AuthMiddleWare, GetProduct);
  router.put("/api/products/:id", AuthMiddleWare, UpdateProduct);
  router.delete("/api/products/:id", AuthMiddleWare, DeleteProduct);

  // Upload(image)
  router.post("/api/upload", AuthMiddleWare, Upload);

  // definening static file path
  router.use("/api/uploads", express.static("./uploads"));

  // Order
  router.get("/api/orders", AuthMiddleWare, Orders)
  router.post("/api/export", AuthMiddleWare, Export)
};
