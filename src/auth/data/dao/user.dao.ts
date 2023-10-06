import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.scheme";
import { Model } from "mongoose";
import { UserInfoDto } from "src/auth/dto/user-info.dto";

@Injectable()
export class UserDao{

    constructor(@InjectModel(User.name) private model: Model<User>){}


    async insert(userInfo: UserInfoDto) {
        const data: User = {...userInfo, createdAt: new Date()};
        const newUser = new this.model(data);
        await newUser.save();
    }


    async getByEmailAndPassword(email: string, password: string): Promise<UserInfoDto | undefined> {
        const result = await this.model.findOne({ email, password });
        if(!result) {
            return undefined;
        }

        const data = result.toJSON();
        return {
            email: data.email,
            name: data.name,
            password: data.password
        }
    }
}