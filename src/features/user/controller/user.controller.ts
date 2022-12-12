import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post
} from "@nestjs/common";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserService} from "../provider/user.service";
import {User} from "../../../entity/user.entity";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get()
    public async getAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const result = this.userService.findOne(id)
        if (!result) {
            throw new NotFoundException('NotFoundData')
        }

        return result
    }

    @Post()
    public async create(@Body() body: CreateUserDto): Promise<{ id: number }> {
        const result = await this.userService.create(body)
        if (!result.id) {
            throw new InternalServerErrorException('NotCreatedData')
        }

        return result
    }
}
