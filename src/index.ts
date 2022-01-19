import express, { Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import {createConnection} from "typeorm";

createConnection().then((connection) => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: ["http://localhost:8000"],
    })

  );

  //Tum routelari index sayfamiza cagiriyoruz.
  routes(app);

  app.listen(3000, () => console.log("port started on 3000"));

});

