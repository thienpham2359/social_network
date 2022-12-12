import {Body, Controller, Post} from "@nestjs/common";
import {CreateSignUpDto} from "../dto/create-sign-up.dto";
import {AuthService} from "../provider/auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('sign-up')
    public async signUp(@Body() dto: CreateSignUpDto) {
        return this.authService.signUp(dto)
    }

    @Post('sign-in')
    public signIn() {

    }
}
