import { RegisterValidation } from "./../validations/register.validation";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  const {error} = RegisterValidation.validate(body);

  if(error) {
      return res.status(400).send(error.details)
  }
  if(body.password !== body.password_confirm) {
      return res.status(400).send({
          message: "Password don not match"
      })
  }

//   entity icerisinde user schema mizi olusturduktan sonra verileri Registerdan cekebilmek icin getManager fonksiyonu schemamiza ulasiyoruz.
  const repository = getManager().getRepository(User)
  await repository.save({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password
  })

  res.send(body)
};
