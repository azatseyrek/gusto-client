import { Request, Response } from "express";
import { Parser } from "json2csv";
import { getManager } from "typeorm";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";

export const Orders = async (req: Request, res: Response) => {
  // paggination
  const take = 15;
  const page = parseInt((req.query.page as string) || "1");

  const repository = getManager().getRepository(Order);

  // const products = await repository.find(); we are going to change the find method with findAndCount for pagination

  const [data, total] = await repository.findAndCount({
    //total came from the findAndCOUNT --> count
    take: take,
    //for exxample if the page is one then skip shoul be 0
    skip: (page - 1) * take,
    relations: ["order_items"],
  });
  // pagination settings
  res.send({
    data: data.map((order) => ({
      id: order.id,
      name: order.name, //it is a function which created insede the order.entity
      email: order.email,
      total: order.total, // it is a function which created insede the order.entity
      created_at: order.created_at,
      order_items: order.order_items,
    })),
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  });
};

// convert to csv file

export const Export = async (req: Request, res: Response) => {
  const parser = new Parser({
    fields: ["ID", "Name", "Email", "Product Title", "Quantity"],
  });

  const repository = getManager().getRepository(Order);

  const orders = await repository.find({ relations: ["order_items"] });

  const json = [];

  orders.forEach((order: Order) => {
    json.push({
      ID: order.id,
      Name: order.name,
      Email: order.email,
      "Product Title": "",
      Price: "",
      Quantity: "",
    });
    order.order_items.forEach((item: OrderItem) => {
      json.push({
        ID: "",
        Name: "",
        Email: "",
        "Product Title": item.product_title,
        Price: item.price,
        Quantity: item.quantity,
      });
    });
  });

  const csv = parser.parse(json);
  res.header("Content-Type", "text/csv");
  res.attachment("orders.csv");
  res.send(csv);
};
