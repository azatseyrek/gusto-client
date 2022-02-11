import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";

export const Users = async (req: Request, res: Response) => {

  try {
  const repository = getManager().getRepository(User);
  const users = await repository.find({});

  const user = users.map((info) => {
    const { password, ...userInfo } = info;
    return userInfo;
  });

  res.send(user)
} catch(err) {
  res.status(400).send(err)
}
};

export const CreateUser = async (req: Request, res: Response) => {
  const { email, first_name, last_name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
  const repository = getManager().getRepository(User);

  const user = await repository.save({
    email,
    first_name,
    last_name,
    password: hashedPassword,

  });
  res.status(201).send(user);
} catch (err) {
  res.status(400).send(err)
}
};

export const GetUser = async (req: Request, res: Response) => {
  try {
  const repository = await getManager().getRepository(User);
  const id = req.params.id;

  const { password, ...user } = await repository.findOne(id);
  res.send(user);
  } catch (err) {
    res.send(err)
  }
};

export const UpdateUser = async (req: Request, res: Response) => {

  const {...body } = req.body;
  try {
  const repository = getManager().getRepository(User);
  const id = req.params.id;

  await repository.update(id, {
    ...body,
    
  });

  const user = await repository.findOne(id);

  res.status(202).send(user);
}catch (err) {
  res.send(err)
}
};

export const DeleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
  const repository = getManager().getRepository(User);
  await repository.delete(id);

  res.status(204).send("success");
  }catch (err) {
    res.send(err)
  }
};
