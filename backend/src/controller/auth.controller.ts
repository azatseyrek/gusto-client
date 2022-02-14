const dotenv = require("dotenv");
import bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { Request, Response } from "express";

import { RegisterValidation } from "./../validations/register.validation";
import { User } from "../entity/user.entity";

dotenv.config();

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  // check validation error
  const { error } = RegisterValidation.validate(body);

  if (error) {

    return res.send(error.details[0].message)
  }

  try {
    const repository = getManager().getRepository(User);
    const { password, ...user } = await repository.save({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: await bcrypt.hash(body.password, 8),
    });

    res.status(201).send("success");
  } catch (err) {
    res.send(err)
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(User);
    const user = await repository.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        message: "Password or Email is not correct!",
      });
    }
    const userPassword = await bcrypt.compare(req.body.password, user.password);
    if (!userPassword) {
      return res
        .status(400)
        .send({ message: "Password or Email is not correct!" });
    } else {
      //  creating jwt start point
      const payload = {
        id: user.id,
      };
      const token = sign(payload, process.env.SECRET_KEY);

      // save jwt into the cookie
      //  cookie is not enabled on frontend side (client) for that we have to add credentials: true inside the app.use(cors{...})

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, //miliseconds
        sameSite: "none"
      });
      const { password, ...data } = user;
      res.status(200).send("success");
    }
  } catch (err) {
    res.status(400).send({ message: "Password or Email is not correct!" })
  }
};

// AuthanticatedUser Start Point
export const AuthanticatedUser = async (req: Request, res: Response) => {
  try{
  const { password, ...user } = req["user"];
  res.send(user)
  }catch(err) {
    res.send("there is no user logedin")
  }
};

export const UpdateInfo = async (req: Request, res: Response) => {
  const user = req["user"];
  try {
    const repository = getManager().getRepository(User);

    await repository.update(user.id, req.body);

    const { password, ...data } = await repository.findOne(user.id)

    res.status(201).send(data)
  } catch (err) {
    res.send(err)
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    res.send("success");
  } catch (err) {
    res.send(err)
  }
};

