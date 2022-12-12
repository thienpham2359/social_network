import {Module} from '@nestjs/common';
import {AuthService} from '../provider/auth.service';
import {UserModule} from "../../features/user/module/user.module";
import {UserController} from "../../features/user/controller/user.controller";
import {AuthController} from "../controller/auth.controller";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {
}
