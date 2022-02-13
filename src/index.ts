import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";

import { routes } from "./routes";

// DB Connection
createConnection().then(async (connection) => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser())
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  )

  //calling all routes
  routes(app);

  app.listen(4000, () => console.log("port started on 4000"));

});

