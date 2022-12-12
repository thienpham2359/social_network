import {Body, Get, HttpException, HttpStatus, Injectable, Post} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../entity/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    public async createUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOneBy({email: email})
        if (user) {
            throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST)
        }
        return this.userRepository.save({email: email, password: password})
    }

    public async create(@Body() user: CreateUserDto): Promise<User> {
        return this.userRepository.save(user)
    }

    public async findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    public async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({id})
    }

    public async delete(id: string): Promise<void> {
        await this.userRepository.delete(id)
    }
}
