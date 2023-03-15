
import { Request } from "express";
import { User } from "src/users/entities/user.entity";

//estrutura de uma request validada
export interface AuthRequest extends Request {
    user: User;
}