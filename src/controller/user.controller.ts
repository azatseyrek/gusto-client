import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";

export const Users = async (req: Request, res: Response) => {

  const repository = getManager().getRepository(User);
  const users = await repository.find({});

  const data = await users.map((info) => {
    const { password, ...userInfo } = info;
    return userInfo;
  });

  res.send(data);
};

export const CreateUser = async (req: Request, res: Response) => {
  const { email, first_name, last_name, password } = req.body;
  const hashedPassword = await bcrypt.hash("1234", 8);

  const repository = getManager().getRepository(User);

  const user = await repository.save({
    email,
    first_name,
    last_name,
    password: hashedPassword,

  });
  res.status(201).send(user);
};

export const GetUser = async (req: Request, res: Response) => {
  const repository = await getManager().getRepository(User);
  const id = req.params.id;

  const { password, ...user } = await repository.findOne(id);
  res.send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
  //update without password
  const { ...body } = req.body;
  const repository = getManager().getRepository(User);
  const id = req.params.id;

  await repository.update(id, {
    ...body,
    
  });

  const { password, ...user } = await repository.findOne(id);

  res.status(202).send(user);
};

export const DeleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = getManager().getRepository(User);
  await repository.delete(id);

  res.status(204).send("success");
};
