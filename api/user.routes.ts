import express, { Request, Response, NextFunction } from "express";
import * as UserService from "../services/user.service";
import { User, UserData } from "../models/users.interface";
import { validateRequest } from "../models/user.validation";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: User[] = await UserService.getAllUsers();

    res.status(200).send(items);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const user: User | undefined = await UserService.getUser(id);

    if (user) {
      return res.status(200).send(user);
    }

    res.status(404).send("User not found");
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

userRouter.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next);
  },
  async (req: Request, res: Response) => {
    try {
      const user: UserData = req.body;
      const newUser: User = await UserService.addUser(user);

      res.status(201).json(newUser);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  }
);

userRouter.put(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    validateRequest(req, next);
  },
  async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
      const userUpdate: UserData = req.body;
      const existingUser: User | undefined = await UserService.getUser(id);

      if (existingUser) {
        const updatedUser: User | null = await UserService.updateUser(
          id,
          userUpdate
        );
        return res.status(200).json(updatedUser);
      }

      const newUser = await UserService.addUser(userUpdate);

      res.status(201).json(newUser);
    } catch (e: any) {
      res.status(400).send(e.message);
    }
  }
);

userRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await UserService.deleteUser(id);

    res.sendStatus(204);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});
