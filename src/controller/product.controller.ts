import { Product } from './../entity/product.entity';
import { Request, Response } from "express";
import { getManager } from "typeorm";


export const Products = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product);

  const products = await repository.find();

  res.send(products);
};

export const CreateProduct = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;

  const repository = getManager().getRepository(Product);

  const product = await repository.save(req.body);
  res.status(201).send(product);
};

export const GetProduct = async (req: Request, res: Response) => {
  const repository = await getManager().getRepository(Product);
  const id = req.params.id;

  const product = await repository.findOne(id)
  res.send(product);
};

export const UpdateProduct = async (req: Request, res: Response) => {

  const repository = getManager().getRepository(Product);
  const id = req.params.id;

  await repository.update(id, req.body);

  const product = await repository.findOne(id);

  res.status(202).send(product);
};

export const DeleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const repository = getManager().getRepository(Product);

  await repository.delete(id);

  res.status(204).send(null);
};
