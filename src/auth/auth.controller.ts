import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { AuthRequest } from './models/AuthRequest';

// @Controller('auth')
@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiBody({
        schema: {
            properties: {
                'email': { type: 'string', example:"joao.mesquita@ancar.com.br" },
                'password': { type: 'string', example:"12345678" }
            }
        }
     })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    //guardião para definir se a pessoa tem acesso ou não a esse endpoint
    //só entra no método de login se passar pelo guardião
    //como LocalAuthGuard usa uma strategy local (local.strategy.ts)
    //só passa pelo guardião caso o retorno do método validate seja positivo (caso a senha enviada pela request bata com a senha do banco e retorne um objeto de user)
    @UseGuards(LocalAuthGuard)
    //ou seja, esse método só vai ser executado caso os dados enviados no payload da request estejam corretos (email & senha)

    @IsPublic() //utilizando decorator personalizado para bypassar jwt guard e tornar a rota pública
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }
}
