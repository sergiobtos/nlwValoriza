import { getCustomRepository } from "typeorm";
import { AppError } from "../error/AppError";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
 

interface IComplimentRequest {
	tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
	async execute({tag_id, user_sender, user_receiver, message}) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepository = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver){throw new AppError("Incorrect user receiver")};

        const userReceiverExists = await usersRepository.findOne(user_receiver);

        if(!userReceiverExists){throw new AppError("User receiver does not exists!")};

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliment);
        return compliment;
    }
}

export { CreateComplimentService };