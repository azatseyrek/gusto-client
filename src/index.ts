import express, { Request, Response } from "express";
import {createConnection} from "typeorm";
import cors from "cors";
import cookieParser from "cookie-parser";


import { routes } from "./routes";

createConnection().then((connection) => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser())
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:8000"],
    })

  );

  //Tum routelari index sayfamiza cagiriyoruz.
  routes(app);

  app.listen(3000, () => console.log("port started on 3000"));

});

