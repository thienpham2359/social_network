import {Injectable} from '@nestjs/common';
import {UserService} from "../../features/user/provider/user.service";
import {CreateSignUpDto} from "../dto/create-sign-up.dto";
import * as bcrypt from 'bcrypt'
import {User} from "../../entity/user.entity";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) {
    }

    public async signUp(dto: CreateSignUpDto): Promise<User> {
        return this.userService.createUser(dto.email, await bcrypt.hash(dto.password, 10))
    }
}
