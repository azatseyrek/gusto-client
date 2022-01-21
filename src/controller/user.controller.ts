import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";

export const Users = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const users = await repository.find();

  // we are using the map method for send the data without password info.
  const data = users.map((info) => {
    const { password, ...userInfo } = data;
    return userInfo;
  });

  res.send(data);
};

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hashedPassword = await bcrypt.hash("1234", 8);

  const repository = await getManager().getRepository(User);

  const { password, ...user } = await repository.save({
    ...body,
    password: hashedPassword,
  });
  res.send(user);
};

export const GetUser = async (req: Request, res: Response) => {
  const repository = await getManager().getRepository(User);
  const id = req.params.id;

  const { password, ...user } = await repository.findOne(id);
  res.status(201).send(user);
};

export const UpdateUser = async (req: Request, res: Response) => {
  //update without password
  const { role_id, ...body } = req.body;
  const repository = await getManager().getRepository(User);
  const id = req.params.id;

  await repository.update(id, body);

  const { password, ...user } = await repository.findOne(id);

  res.status(202).send(user);
};

export const DeleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = await getManager().getRepository(User);

  await repository.delete(id);

  res.status(204).send(null);
};
