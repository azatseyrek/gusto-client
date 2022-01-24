import { Request, Response } from "express";
import multer from "multer";
import { extname } from "path";

export const Upload = async (req: Request, res: Response) => {
  // multer(Multer is a npm package for upload the images )

  // multer middleware and router
  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (_: Request, file: any, cb) {
      const randomName = Math.random().toString(20).substr(2, 12);
      return cb(null, `${randomName}.${extname(file.originalname)}`);
    },
  });

  const upload = multer({ storage }).single("image");

  upload(req, res, (err:any) => {
      if(err) {
          return res.status(400).send(err)
      }
    res.send({
      url: `http://localhost:3000/api/uploads/${req.file.filename}`,
    });
  });
};
