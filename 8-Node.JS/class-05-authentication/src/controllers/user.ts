import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "../databases/sqlite3/services/user/getUserByEmail";
import { createUser } from "../databases/sqlite3/services/user/createUser";
import { getUserByID } from "../databases/sqlite3/services/user/getUserByID";
import { z } from "zod";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = z
        .object({
          name: z
            .string({
              required_error: "name is required!",
              invalid_type_error: "name must be a string!",
            })
            .min(3, { message: "name must have at least 3 characters" }),

          email: z
            .string({ required_error: "email is required!" })
            .email("invalid email!"),

          password: z
            .string({ required_error: "password is required!" })
            .min(7, { message: "password must have at least 7 characters" }),
        })
        .strict();

      const { name, email, password } = userSchema.parse(req.body);

      const userExists = await getUserByEmail(email);
      if (userExists) throw res.status(400).json({ message: "email already exists!" });

      const userCreated = await createUser({ name, email, password });
      return res.status(201).json({ message: "user created!", ...userCreated });
    } catch (error) {
      return next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.userData.id;

      const user = await getUserByID(userID);
      if (!user) throw res.status(404).json({ message: "user not found!" });

      const { name, email } = user;
      return res.status(200).send({ name, email });
    } catch (error) {
      return next(error);
    }
  },
};
