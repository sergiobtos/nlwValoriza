import { getCustomRepository } from "typeorm"
import { AppError } from "../error/AppError";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) { 
            throw new AppError("Email/Password incorrect.");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){ 
            throw new AppError("Email/Password incorrect.");
        }

        const token = sign(
            {
            email: user.email,
            }, 
            "3bffa4ebdf4874e506c2b12405796aa5", 
            {
            subject : user.id,
            expiresIn : "1d"
            }
        );

        return token;
    }

}

export{ AuthenticateUserService }